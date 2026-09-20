import { CONFIG } from '../config.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';

class CheckoutManager {
  constructor() {
    this.backdrop = null;
    this.checkoutData = null;
    this.selectedPaymentMethod = 'cod';
    this.onOrderPlacedCallback = null;
    this.init();
  }

  init() {
    let backdrop = document.getElementById('checkout-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'checkout-modal-backdrop';
      backdrop.className = 'checkout-modal-backdrop';
      backdrop.innerHTML = `
        <div class="checkout-container">
          <div class="checkout-header">
            <h2 class="checkout-header-title">CHECKOUT</h2>
            <button class="checkout-close-btn" id="checkout-close-btn">✕</button>
          </div>
          <div id="checkout-body-content"></div>
        </div>
      `;
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;

    const closeBtn = document.getElementById('checkout-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('open')) {
        this.close();
      }
    });
  }

  open({ isDirectBuy = false, directProduct = null, directSize = '100g', directQuantity = 1 }, onOrderPlaced) {
    this.onOrderPlacedCallback = onOrderPlaced;

    if (isDirectBuy && directProduct) {
      const variant = (directProduct.sizes && directProduct.sizes.find(s => s.size === directSize)) || {
        size: directSize,
        price: directProduct.basePrice,
        sku: directProduct.sku
      };
      this.checkoutData = {
        isDirectBuy: true,
        items: [{
          productId: directProduct.id,
          name: directProduct.name,
          subtitle: directProduct.subtitle,
          category: directProduct.category,
          image: directProduct.images && directProduct.images[0] ? directProduct.images[0] : 'assets/images/logo-mark.svg',
          size: variant.size,
          price: variant.price,
          sku: variant.sku || directProduct.sku,
          quantity: directQuantity
        }]
      };
    } else {
      this.checkoutData = {
        isDirectBuy: false,
        items: [...cartState.items]
      };
    }

    if (this.checkoutData.items.length === 0) {
      toast.show('Your cart is empty. Add products before checking out.');
      return;
    }

    this.render();
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  calculateTotals() {
    const items = this.checkoutData.items;
    const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const isFreeDelivery = subtotal >= CONFIG.freeShippingThreshold;
    const deliveryFee = isFreeDelivery ? 0 : CONFIG.standardShippingFee;
    
    let discountAmount = 0;
    if (cartState.appliedPromo && subtotal > 0) {
      discountAmount = Math.round((subtotal * cartState.appliedPromo.discountPercent) / 100);
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

    return { subtotal, deliveryFee, discountAmount, grandTotal };
  }

  render() {
    const content = document.getElementById('checkout-body-content');
    if (!content) return;

    const totals = this.calculateTotals();
    const items = this.checkoutData.items;

    const itemsSummaryHtml = items.map(item => `
      <div class="checkout-mini-item">
        <div class="checkout-mini-item-info">
          <img src="${item.image}" alt="${item.name}" class="checkout-mini-item-img" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
          <div>
            <div class="checkout-mini-item-title">${item.name}</div>
            <div class="checkout-mini-item-meta">${item.size} × ${item.quantity}</div>
          </div>
        </div>
        <div class="checkout-mini-item-price">${CONFIG.currency}${item.price * item.quantity}</div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="checkout-layout">
        <!-- Left: Customer Information & Address Form -->
        <form id="checkout-form" class="checkout-form-section">
          <!-- Contact Details -->
          <div class="checkout-section-title">
            <span>01</span> Contact Information
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="co-name">Full Name <span>*</span></label>
              <input type="text" id="co-name" class="form-input" placeholder="Full Name" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="co-phone">Mobile Number <span>*</span></label>
              <input type="tel" id="co-phone" class="form-input" placeholder="Mobile Number" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="co-email">Email Address <span>*</span></label>
            <input type="email" id="co-email" class="form-input" placeholder="Email Address" required />
          </div>

          <!-- Shipping Destination -->
          <div class="checkout-section-title" style="margin-top: 1rem;">
            <span>02</span> Delivery Address
          </div>
          <div class="form-group">
            <label class="form-label" for="co-house">House / Building / Apartment <span>*</span></label>
            <input type="text" id="co-house" class="form-input" placeholder="House / Building No." required />
          </div>
          <div class="form-group">
            <label class="form-label" for="co-street">Street Address <span>*</span></label>
            <input type="text" id="co-street" class="form-input" placeholder="Street / Area" required />
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="co-city">City <span>*</span></label>
              <input type="text" id="co-city" class="form-input" placeholder="City" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="co-state">State <span>*</span></label>
              <input type="text" id="co-state" class="form-input" placeholder="State" required />
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="co-pincode">PIN / Postal Code <span>*</span></label>
              <input type="text" id="co-pincode" class="form-input" placeholder="PIN Code" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="co-instructions">Delivery Instructions</label>
              <input type="text" id="co-instructions" class="form-input" placeholder="Optional delivery instructions" />
            </div>
          </div>

          <!-- Payment Options -->
          <div class="checkout-section-title" style="margin-top: 1rem;">
            <span>03</span> Payment Method
          </div>
          <div class="payment-methods">
            <div class="payment-method-card active" data-method="cod">
              <div class="payment-icon">❖</div>
              <div class="payment-name">Cash on Delivery</div>
            </div>
            <div class="payment-method-card" data-method="upi">
              <div class="payment-icon">◈</div>
              <div class="payment-name">UPI / QR Payment</div>
            </div>
            <div class="payment-method-card" data-method="card">
              <div class="payment-icon">✦</div>
              <div class="payment-name">Credit / Debit Card</div>
            </div>
            <div class="payment-method-card" data-method="netbanking">
              <div class="payment-icon">✧</div>
              <div class="payment-name">Net Banking</div>
            </div>
          </div>
        </form>

        <!-- Right: Order Summary & Place Order -->
        <div class="checkout-summary-card">
          <div class="checkout-section-title">Order Summary</div>
          
          <div class="checkout-items-list">
            ${itemsSummaryHtml}
          </div>

          <div class="cart-summary-rows">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${CONFIG.currency}${totals.subtotal}</span>
            </div>
            ${totals.discountAmount > 0 ? `
            <div class="summary-row" style="color:#ffffff;">
              <span>Discount</span>
              <span>-${CONFIG.currency}${totals.discountAmount}</span>
            </div>` : ''}
            <div class="summary-row">
              <span>Delivery</span>
              <span>${totals.deliveryFee === 0 ? 'FREE' : `${CONFIG.currency}${totals.deliveryFee}`}</span>
            </div>
            <div class="summary-row total-row">
              <span>Grand Total</span>
              <span>${CONFIG.currency}${totals.grandTotal}</span>
            </div>
          </div>

          <button class="btn-place-order" id="btn-place-order">
            PLACE ORDER
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>

          <div class="checkout-guarantee-note">
            ✦ Carefully packaged in signature ZOOQE packaging.<br/>
            ✦ Prompt delivery and order support.
          </div>
        </div>
      </div>
    `;

    this.attachEvents(totals);
  }

  attachEvents(totals) {
    const form = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('btn-place-order');
    const paymentCards = document.querySelectorAll('.payment-method-card');

    paymentCards.forEach(card => {
      card.addEventListener('click', () => {
        paymentCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedPaymentMethod = card.dataset.method;
      });
    });

    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('co-name').value.trim();
      const phone = document.getElementById('co-phone').value.trim();
      const email = document.getElementById('co-email').value.trim();
      const house = document.getElementById('co-house').value.trim();
      const street = document.getElementById('co-street').value.trim();
      const city = document.getElementById('co-city').value.trim();
      const state = document.getElementById('co-state').value.trim();
      const pincode = document.getElementById('co-pincode').value.trim();
      const instructions = document.getElementById('co-instructions').value.trim();

      if (!name || !phone || !email || !house || !street || !city || !state || !pincode) {
        toast.show('Please fill in all required delivery fields.');
        return;
      }

      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      const orderId = `ZQ-${randomDigits}`;

      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        customer: { name, phone, email, address: `${house}, ${street}, ${city}, ${state} - ${pincode}`, instructions },
        items: this.checkoutData.items,
        totals,
        paymentMethod: this.selectedPaymentMethod
      };

      if (!this.checkoutData.isDirectBuy) {
        cartState.clearCart();
      }

      this.close();

      if (this.onOrderPlacedCallback) {
        this.onOrderPlacedCallback(orderData);
      }
    });
  }
}

export const checkout = new CheckoutManager();
