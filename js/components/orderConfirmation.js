import { CONFIG, formatPrice } from '../config.js';
import { WhatsApp } from './whatsapp.js';

class OrderConfirmationManager {
  constructor() {
    this.backdrop = null;
    this.orderData = null;
    this.options = {};
    this.init();
  }

  init() {
    let backdrop = document.getElementById('order-confirmed-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'order-confirmed-backdrop';
      backdrop.className = 'order-confirmed-backdrop';
      backdrop.innerHTML = `
        <div class="order-confirmed-container" id="order-confirmed-content"></div>
      `;
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;
  }

  show(orderData, options = {}) {
    this.orderData = orderData;
    this.options = options || {};
    this.render();
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  render() {
    const o = this.orderData;
    const content = document.getElementById('order-confirmed-content');
    if (!content || !o) return;

    const isFailed = Boolean(this.options?.notificationFailed);
    const fallbackNotice = this.options?.fallbackNotice || "Notice: Direct notification failed to reach store inbox. Please tap 'Confirm on WhatsApp' to complete your order.";

    const itemsHtml = o.items.map(item => `
      <div class="receipt-item-row">
        <span class="name">${item.name} (${item.size}) × ${item.quantity}</span>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('');

    const fallbackBannerHtml = isFailed ? `
      <div class="order-fallback-notice-banner" role="alert">
        <div class="fallback-banner-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="fallback-banner-text">
          <strong>Action Required:</strong> ${fallbackNotice}
        </div>
      </div>
    ` : '';

    const notificationLine = isFailed
      ? `<span class="notification-failed-text">${fallbackNotice}</span>`
      : `Direct notification dispatched to store owner`;

    content.innerHTML = `
      ${fallbackBannerHtml}

      <div class="confirmed-emblem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 class="confirmed-title">ORDER CONFIRMED</h2>
      <p class="confirmed-sub">“Thank you for choosing ZOOQE.”</p>
      
      <div class="confirmed-order-number-pill">
        <span>ORDER NUMBER:</span>
        <strong>#${o.orderId}</strong>
      </div>

      <!-- Receipt Summary Card -->
      <div class="receipt-card">
        <div class="receipt-header">Order Summary</div>
        
        <div class="receipt-items-list">
          ${itemsHtml}
        </div>

        <div class="receipt-totals">
          <div class="receipt-total-row">
            <span>Subtotal</span>
            <span>${formatPrice(o.totals.subtotal)}</span>
          </div>
          ${o.totals.discountAmount > 0 ? `
          <div class="receipt-total-row">
            <span>Discount</span>
            <span>-${formatPrice(o.totals.discountAmount)}</span>
          </div>` : ''}
          <div class="receipt-total-row">
            <span>Delivery</span>
            <span>${o.totals.deliveryFee === 0 ? 'FREE' : formatPrice(o.totals.deliveryFee)}</span>
          </div>
          <div class="receipt-total-row grand-total">
            <span>Total</span>
            <span>${formatPrice(o.totals.grandTotal)}</span>
          </div>
        </div>

        <div class="receipt-shipping-info">
          <strong>Customer:</strong> ${o.customer.name} (${o.customer.phone})<br/>
          <strong>Address:</strong> ${o.customer.address}<br/>
          <strong>Payment:</strong> ${o.paymentMethod.toUpperCase()}<br/>
          <strong>Notification:</strong> ${notificationLine}<br/>
          <strong>Estimated Delivery:</strong> 2–4 Business Days
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="confirmed-actions">
        <button class="btn-confirmed-whatsapp ${isFailed ? 'fallback-highlight' : ''}" id="btn-confirmed-whatsapp">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"></path>
          </svg>
          ${isFailed ? 'CONFIRM ON WHATSAPP' : 'ENQUIRE ON WHATSAPP'}
        </button>

        <button class="btn-confirmed-continue" id="btn-confirmed-continue">
          CONTINUE SHOPPING
        </button>

        <button class="btn-confirmed-print" id="btn-confirmed-print">
          🖶 Print Order Details
        </button>
      </div>
    `;

    // Event Handlers
    const whatsappBtn = document.getElementById('btn-confirmed-whatsapp');
    const continueBtn = document.getElementById('btn-confirmed-continue');
    const printBtn = document.getElementById('btn-confirmed-print');

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        WhatsApp.openOrderTracking(o.orderId, o.customer.name, o.totals.grandTotal, o.items, isFailed);
      });
    }

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.close();
        const shopSection = document.getElementById('collections') || document.getElementById('pickles');
        if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
}

export const orderConfirmation = new OrderConfirmationManager();
