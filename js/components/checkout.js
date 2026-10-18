import { CONFIG, formatPrice } from '../config.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';
import { Web3Forms } from './web3forms.js';
import { orderConfirmation } from './orderConfirmation.js';

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
          <div class="checkout-mini-item-text">
            <div class="checkout-mini-item-title">${item.name}</div>
            <div class="checkout-mini-item-meta">${item.size} • Qty: ${item.quantity}</div>
          </div>
        </div>
        <div class="checkout-mini-item-price">${formatPrice(item.price * item.quantity)}</div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="checkout-flow-wrapper">
        <form id="checkout-form" class="checkout-vertical-form">
          
          <!-- STEP 1: Contact & Delivery Address -->
          <section class="checkout-step-card" aria-labelledby="step-1-heading">
            <div class="checkout-step-header">
              <span class="step-num-badge">1</span>
              <div class="step-header-text">
                <h3 id="step-1-heading" class="step-title">Contact & Delivery Address</h3>
                <p class="step-desc">Enter your recipient details and shipping address</p>
              </div>
            </div>

            <div class="checkout-step-body">
              <div class="form-grid-3">
                <div class="form-group">
                  <label class="form-label" for="co-name">Full Name <span>*</span></label>
                  <input type="text" id="co-name" class="form-input" placeholder="Recipient Name" autocomplete="name" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-phone">Mobile Number <span>*</span></label>
                  <input type="tel" id="co-phone" class="form-input" placeholder="10-digit mobile" autocomplete="tel" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-email">Email Address <span>*</span></label>
                  <input type="email" id="co-email" class="form-input" placeholder="email@domain.com" autocomplete="email" required />
                </div>
              </div>

              <div class="form-grid-2" style="margin-top: 0.85rem;">
                <div class="form-group">
                  <label class="form-label" for="co-house">House / Building / Apartment <span>*</span></label>
                  <input type="text" id="co-house" class="form-input" placeholder="Flat / House No., Building" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-street">Street Address & Landmark <span>*</span></label>
                  <input type="text" id="co-street" class="form-input" placeholder="Street, Colony, Landmark" required />
                </div>
              </div>

              <div class="form-grid-3" style="margin-top: 0.85rem;">
                <div class="form-group">
                  <label class="form-label" for="co-city">City / Town <span>*</span></label>
                  <input type="text" id="co-city" class="form-input" placeholder="City" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-state">State <span>*</span></label>
                  <input type="text" id="co-state" class="form-input" placeholder="State" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="co-pincode">PIN / Postal Code <span>*</span></label>
                  <input type="text" id="co-pincode" class="form-input" placeholder="6-digit PIN" required />
                </div>
              </div>

              <div class="form-group" style="margin-top: 0.85rem;">
                <label class="form-label" for="co-instructions">Delivery Instructions <span class="optional-tag">(Optional)</span></label>
                <input type="text" id="co-instructions" class="form-input" placeholder="E.g., Leave package with security guard" />
              </div>
            </div>
          </section>

          <!-- STEP 2: Payment Method (Compact pill buttons / simple radio cards) -->
          <section class="checkout-step-card" aria-labelledby="step-2-heading">
            <div class="checkout-step-header">
              <span class="step-num-badge">2</span>
              <div class="step-header-text">
                <h3 id="step-2-heading" class="step-title">Payment Method</h3>
                <p class="step-desc">Select your preferred payment method</p>
              </div>
            </div>

            <div class="checkout-step-body">
              <div class="payment-pills-grid">
                <div class="payment-method-card active" data-method="cod" role="radio" aria-checked="true" tabindex="0">
                  <div class="payment-radio-indicator">
                    <span class="payment-radio-inner"></span>
                  </div>
                  <div class="payment-pill-content">
                    <div class="payment-name">Cash on Delivery (COD)</div>
                    <div class="payment-desc">Pay cash when your order arrives</div>
                  </div>
                  <span class="payment-badge-popular">Popular</span>
                </div>

                <div class="payment-method-card" data-method="upi" role="radio" aria-checked="false" tabindex="0">
                  <div class="payment-radio-indicator">
                    <span class="payment-radio-inner"></span>
                  </div>
                  <div class="payment-pill-content">
                    <div class="payment-name">UPI / QR Payment</div>
                    <div class="payment-desc">Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                </div>

                <div class="payment-method-card" data-method="card" role="radio" aria-checked="false" tabindex="0">
                  <div class="payment-radio-indicator">
                    <span class="payment-radio-inner"></span>
                  </div>
                  <div class="payment-pill-content">
                    <div class="payment-name">Debit / Credit Card</div>
                    <div class="payment-desc">Visa, Mastercard, RuPay, Amex</div>
                  </div>
                </div>

                <div class="payment-method-card" data-method="netbanking" role="radio" aria-checked="false" tabindex="0">
                  <div class="payment-radio-indicator">
                    <span class="payment-radio-inner"></span>
                  </div>
                  <div class="payment-pill-content">
                    <div class="payment-name">Net Banking</div>
                    <div class="payment-desc">All major verified Indian banks</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- STEP 3: Compact Order Summary -->
          <section class="checkout-step-card checkout-summary-step" aria-labelledby="step-3-heading">
            <div class="checkout-step-header">
              <span class="step-num-badge">3</span>
              <div class="step-header-text">
                <h3 id="step-3-heading" class="step-title">Order Summary</h3>
                <p class="step-desc">Review your items and complete your order</p>
              </div>
            </div>

            <div class="checkout-step-body">
              <div class="checkout-items-list-compact">
                ${itemsSummaryHtml}
              </div>

              <div class="checkout-summary-breakdown">
                <div class="summary-line">
                  <span>Subtotal (${items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>${formatPrice(totals.subtotal)}</span>
                </div>
                ${totals.discountAmount > 0 ? `
                <div class="summary-line discount-line">
                  <span>Promotional Discount</span>
                  <span>-${formatPrice(totals.discountAmount)}</span>
                </div>` : ''}
                <div class="summary-line">
                  <span>Standard Delivery</span>
                  <span>${totals.deliveryFee === 0 ? '<span class="free-delivery-tag">FREE</span>' : formatPrice(totals.deliveryFee)}</span>
                </div>
                <div class="summary-line total-line">
                  <span>Total Payable</span>
                  <span class="grand-total-amount">${formatPrice(totals.grandTotal)}</span>
                </div>
              </div>

              <!-- Primary Action Button ("Place Order") - Bold, Clean, Stands out effortlessly -->
              <button type="submit" class="btn-place-order" id="btn-place-order">
                <span>PLACE ORDER</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>

              <div class="checkout-trust-footer">
                <div class="trust-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>100% Secure Checkout</span>
                </div>
                <span class="trust-sep">•</span>
                <div class="trust-item">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Direct background order notification dispatched</span>
                </div>
              </div>
            </div>
          </section>

        </form>
      </div>
    `;

    this.attachEvents(totals);
  }

  attachEvents(totals) {
    const form = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('btn-place-order');
    const paymentCards = document.querySelectorAll('.payment-method-card');

    paymentCards.forEach(card => {
      const selectPayment = () => {
        paymentCards.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
        this.selectedPaymentMethod = card.dataset.method;
      };

      card.addEventListener('click', selectPayment);
      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          selectPayment();
        }
      });
    });

    const handlePlaceOrder = async (e) => {
      if (e) e.preventDefault();
      
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
        customer: {
          name,
          phone,
          email,
          house,
          street,
          city,
          state,
          pincode,
          address: `${house}, ${street}, ${city}, ${state} - ${pincode}`,
          instructions
        },
        items: this.checkoutData.items,
        totals,
        paymentMethod: this.selectedPaymentMethod
      };

      // Visual feedback: Show luxury processing spinner
      const originalBtnHtml = placeOrderBtn.innerHTML;
      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML = `
        <span class="btn-place-order-spinner"></span>
        DISPATCHING ORDER...
      `;

      try {
        // 1. Send background POST request (using fetch API) to https://api.web3forms.com/submit
        const notifyResult = await Web3Forms.sendOrderNotification(orderData);

        if (notifyResult && notifyResult.success === true) {
          // 2. On successful response (result.success === true):
          // Clear the cart items
          cartState.clearCart();

          // Close checkout modal
          this.close();

          // Restore button state
          placeOrderBtn.disabled = false;
          placeOrderBtn.innerHTML = originalBtnHtml;

          // Display the Order Confirmed screen
          if (this.onOrderPlacedCallback) {
            this.onOrderPlacedCallback(orderData);
          } else {
            orderConfirmation.show(orderData);
          }
          toast.show(`Order #${orderData.orderId} Confirmed! Direct notification dispatched to store owner.`);
        } else {
          // 3. If an error occurs, show an alert message and do not clear the cart
          const errorMsg = notifyResult?.message || 'Failed to submit order. Please check your details and try again.';
          placeOrderBtn.disabled = false;
          placeOrderBtn.innerHTML = originalBtnHtml;
          alert(`Order Submission Error: ${errorMsg}\n\nYour cart items are saved. Please try submitting again.`);
          toast.show(errorMsg);
        }
      } catch (err) {
        console.error('Checkout submission error:', err);
        const errorMsg = err.message || 'Network error occurred while submitting order.';
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = originalBtnHtml;
        alert(`Order Submission Error: ${errorMsg}\n\nYour cart items are saved. Please try submitting again.`);
        toast.show(errorMsg);
      }
    };

    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', handlePlaceOrder);
    }
    if (form) {
      form.addEventListener('submit', handlePlaceOrder);
    }
  }
}

export const checkout = new CheckoutManager();
