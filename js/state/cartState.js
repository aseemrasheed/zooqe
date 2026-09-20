import { CONFIG } from '../config.js';

const STORAGE_KEY = 'zooqe_cart_v1';
const PROMO_KEY = 'zooqe_promo_v1';

class CartState {
  constructor() {
    this.items = this.loadCart();
    this.appliedPromo = this.loadPromo();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
      return [];
    }
  }

  loadPromo() {
    try {
      const saved = localStorage.getItem(PROMO_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      if (this.appliedPromo) {
        localStorage.setItem(PROMO_KEY, JSON.stringify(this.appliedPromo));
      } else {
        localStorage.removeItem(PROMO_KEY);
      }
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
    this.notify();
  }

  notify() {
    window.dispatchEvent(new CustomEvent('zooqe:cart-updated', {
      detail: {
        items: this.items,
        calculations: this.getCalculations(),
        count: this.getTotalCount()
      }
    }));
  }

  /**
   * Add product variant to cart
   */
  addItem(product, size = '100g', quantity = 1) {
    const variant = (product.sizes && product.sizes.find(s => s.size === size)) || {
      size: size,
      price: product.basePrice,
      previousPrice: product.previousPrice,
      sku: product.sku
    };

    const itemKey = `${product.id}__${variant.size}`;
    const existingIndex = this.items.findIndex(item => item.itemKey === itemKey);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        itemKey: itemKey,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        category: product.category,
        image: product.images && product.images[0] ? product.images[0] : 'assets/images/logo-mark.svg',
        size: variant.size,
        price: variant.price,
        previousPrice: variant.previousPrice || 0,
        sku: variant.sku || product.sku,
        quantity: quantity,
        maxStock: product.stock || 99
      });
    }

    this.saveCart();
    return true;
  }

  /**
   * Update quantity of a line item
   */
  updateQuantity(itemKey, deltaOrAbsolute, isAbsolute = false) {
    const item = this.items.find(i => i.itemKey === itemKey);
    if (!item) return;

    if (isAbsolute) {
      item.quantity = Math.max(1, Math.min(item.maxStock, deltaOrAbsolute));
    } else {
      item.quantity = Math.max(1, Math.min(item.maxStock, item.quantity + deltaOrAbsolute));
    }

    this.saveCart();
  }

  /**
   * Remove item from cart
   */
  removeItem(itemKey) {
    this.items = this.items.filter(item => item.itemKey !== itemKey);
    this.saveCart();
  }

  /**
   * Clear entire cart (e.g. upon checkout completion)
   */
  clearCart() {
    this.items = [];
    this.appliedPromo = null;
    this.saveCart();
  }

  /**
   * Apply promotional discount code
   */
  applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (CONFIG.promoCodes && CONFIG.promoCodes[cleanCode]) {
      this.appliedPromo = {
        code: cleanCode,
        ...CONFIG.promoCodes[cleanCode]
      };
      this.saveCart();
      return { success: true, message: `Promo code ${cleanCode} applied!` };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  }

  removePromoCode() {
    this.appliedPromo = null;
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getCalculations() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const isFreeDelivery = subtotal >= CONFIG.freeShippingThreshold || subtotal === 0;
    const deliveryFee = (subtotal === 0 || isFreeDelivery) ? 0 : CONFIG.standardShippingFee;
    
    let discountAmount = 0;
    if (this.appliedPromo && subtotal > 0) {
      discountAmount = Math.round((subtotal * this.appliedPromo.discountPercent) / 100);
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
    const amountToFreeShipping = Math.max(0, CONFIG.freeShippingThreshold - subtotal);
    const shippingProgressPercent = Math.min(100, Math.round((subtotal / CONFIG.freeShippingThreshold) * 100));

    return {
      subtotal,
      deliveryFee,
      isFreeDelivery,
      discountAmount,
      appliedPromo: this.appliedPromo,
      grandTotal,
      amountToFreeShipping,
      shippingProgressPercent
    };
  }
}

export const cartState = new CartState();
