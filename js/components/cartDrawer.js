import { CONFIG, formatPrice } from '../config.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';

class CartDrawerManager {
  constructor() {
    this.drawer = null;
    this.backdrop = null;
    this.onCheckoutCallback = null;
    this.init();
  }

  init() {
    this.drawer = document.getElementById('cart-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');

    const closeBtn = document.getElementById('cart-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    window.addEventListener('zooqe:cart-updated', () => {
      if (this.drawer && this.drawer.classList.contains('open')) {
        this.render();
      }
    });
  }

  open(onCheckout) {
    this.onCheckoutCallback = onCheckout;
    this.render();
    if (this.drawer) this.drawer.classList.add('open');
    if (this.backdrop) this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.drawer) this.drawer.classList.remove('open');
    if (this.backdrop) this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  render() {
    if (!this.drawer) return;
    const items = cartState.items;
    const calcs = cartState.getCalculations();
    const count = cartState.getTotalCount();

    // Update Header Count
    const countEl = document.getElementById('cart-drawer-count');
    if (countEl) countEl.textContent = `(${count} ${count === 1 ? 'item' : 'items'})`;

    // Free Shipping Progress
    const meterContainer = document.getElementById('cart-shipping-meter');
    if (meterContainer) {
      if (calcs.isFreeDelivery && calcs.subtotal > 0) {
        meterContainer.innerHTML = `
          <div class="shipping-meter-text">
            ✧ <strong>Complimentary VIP Express Delivery Unlocked!</strong>
          </div>
          <div class="shipping-progress-track">
            <div class="shipping-progress-bar" style="width: 100%;"></div>
          </div>
        `;
      } else if (calcs.subtotal > 0) {
        meterContainer.innerHTML = `
          <div class="shipping-meter-text">
            Add <strong>${formatPrice(calcs.amountToFreeShipping)}</strong> more for Complimentary VIP Delivery
          </div>
          <div class="shipping-progress-track">
            <div class="shipping-progress-bar" style="width: ${calcs.shippingProgressPercent}%;"></div>
          </div>
        `;
      } else {
        meterContainer.innerHTML = '';
      }
    }

    // Items List or Empty State
    const itemsContainer = document.getElementById('cart-items-container');
    const footerContainer = document.getElementById('cart-footer-container');

    if (items.length === 0) {
      if (itemsContainer) {
        itemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 class="cart-empty-title">Your ZOOQE cart is waiting.</h3>
            <p class="cart-empty-desc">Discover our rare signature reserves and elevate your culinary collection.</p>
            <button class="btn-luxury-primary" id="cart-empty-continue-btn" style="padding: 0.85rem 2rem;">
              CONTINUE SHOPPING
            </button>
          </div>
        `;
        const continueBtn = document.getElementById('cart-empty-continue-btn');
        if (continueBtn) {
          continueBtn.addEventListener('click', () => {
            this.close();
            const shopSection = document.getElementById('shop');
            if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }
      if (footerContainer) footerContainer.style.display = 'none';
      return;
    }

    if (footerContainer) footerContainer.style.display = 'block';

    // Render Line Items
    if (itemsContainer) {
      itemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-item-key="${item.itemKey}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">
              <span class="cart-item-size-pill">${item.size}</span>
              <span>• SKU: ${item.sku}</span>
            </div>
            <div class="cart-item-bottom">
              <div class="cart-item-stepper">
                <button class="cart-stepper-btn cart-qty-minus" data-key="${item.itemKey}">−</button>
                <span class="cart-stepper-value">${item.quantity}</span>
                <button class="cart-stepper-btn cart-qty-plus" data-key="${item.itemKey}">+</button>
              </div>
              <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
            </div>
          </div>
          <button class="cart-item-remove-btn" data-key="${item.itemKey}" title="Remove item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `).join('');

      // Stepper & Remove Event Handlers
      itemsContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          cartState.updateQuantity(btn.dataset.key, -1);
        });
      });

      itemsContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          cartState.updateQuantity(btn.dataset.key, 1);
        });
      });

      itemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          cartState.removeItem(btn.dataset.key);
          toast.show('Item removed from Cart');
        });
      });
    }

    // Render Footer Calculations & Promo
    if (footerContainer) {
      footerContainer.innerHTML = `
        <div class="cart-promo-row">
          <input type="text" id="cart-promo-input" class="cart-promo-input" placeholder="PROMO CODE (e.g. ZOOQE10)" value="${calcs.appliedPromo ? calcs.appliedPromo.code : ''}" ${calcs.appliedPromo ? 'disabled' : ''} />
          ${calcs.appliedPromo ? `
            <button class="cart-promo-btn" id="cart-promo-remove-btn">REMOVE</button>
          ` : `
            <button class="cart-promo-btn" id="cart-promo-apply-btn">APPLY</button>
          `}
        </div>

        <div class="cart-summary-rows">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(calcs.subtotal)}</span>
          </div>
          ${calcs.discountAmount > 0 ? `
          <div class="summary-row" style="color:#ffffff;">
            <span>Privilege Discount (${calcs.appliedPromo.discountPercent}%)</span>
            <span>-${formatPrice(calcs.discountAmount)}</span>
          </div>` : ''}
          <div class="summary-row">
            <span>VIP Express Delivery</span>
            <span>${calcs.deliveryFee === 0 ? 'COMPLIMENTARY' : formatPrice(calcs.deliveryFee)}</span>
          </div>
          <div class="summary-row total-row">
            <span>Grand Total</span>
            <span>${formatPrice(calcs.grandTotal)}</span>
          </div>
        </div>

        <button class="btn-cart-checkout" id="cart-drawer-checkout-btn">
          PROCEED TO CHECKOUT
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      `;

      // Promo Code handler
      const promoInput = document.getElementById('cart-promo-input');
      const applyBtn = document.getElementById('cart-promo-apply-btn');
      const removeBtn = document.getElementById('cart-promo-remove-btn');

      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          const res = cartState.applyPromoCode(promoInput.value);
          toast.show(res.message);
          this.render();
        });
      }

      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          cartState.removePromoCode();
          toast.show('Promo code removed');
          this.render();
        });
      }

      // Checkout handler
      const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          this.close();
          if (this.onCheckoutCallback) {
            this.onCheckoutCallback({ isDirectBuy: false });
          }
        });
      }
    }
  }
}

export const cartDrawer = new CartDrawerManager();
