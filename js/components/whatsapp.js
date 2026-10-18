import { CONFIG } from '../config.js';

/**
 * WhatsApp Helper Module
 * Centralized WhatsApp chat builder for ZOOQE
 */
export const WhatsApp = {
  /**
   * Base URL generator ensuring https://wa.me/916238463851?text=Hello%20ZOOQE format
   */
  getBaseUrl() {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20ZOOQE`;
  },

  /**
   * Generate URL for General Concierge Support
   */
  getConciergeUrl(customText = 'Hello ZOOQE') {
    if (!customText || customText === 'Hello ZOOQE') {
      return `https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20ZOOQE`;
    }
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(customText)}`;
  },

  /**
   * Generate URL for Product Specific Enquiry
   */
  getProductEnquiryUrl(productName, size = '100g', quantity = 1) {
    if (!productName) {
      return this.getBaseUrl();
    }
    const text = `Hello ZOOQE,

I am interested in:
Product: ${productName}
Size: ${size}
Quantity: ${quantity}

Please provide more details.`;
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  },

  /**
   * Generate URL for Order Status Verification
   */
  getOrderTrackingUrl(orderId, customerName, total) {
    const formattedTotal = Number(total || 0).toLocaleString('en-IN');
    const text = `Hello ZOOQE,

I have placed Order #${orderId} for ${CONFIG.currency}${formattedTotal}.
Customer Name: ${customerName}

Kindly share delivery status and tracking details.`;
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  },

  /**
   * Map payment code to human-readable label
   */
  getPaymentMethodLabel(method) {
    const paymentNames = {
      cod: 'Cash on Delivery (COD)',
      upi: 'UPI / QR Payment',
      card: 'Credit / Debit Card',
      netbanking: 'Net Banking'
    };
    return paymentNames[method] || (method ? String(method).toUpperCase() : 'Cash on Delivery (COD)');
  },

  /**
   * Compile all order details into a clean summary message
   * Formatted with:
   * - Customer Name & Phone Number
   * - Delivery Address & Pincode
   * - Items Ordered (Product name, quantity, price)
   * - Total Order Amount
   * - Payment Method
   */
  buildOrderSummaryMessage(orderData) {
    if (!orderData) return 'Hello ZOOQE';

    const customer = orderData.customer || {};
    const totals = orderData.totals || {};
    const items = orderData.items || [];
    const paymentLabel = this.getPaymentMethodLabel(orderData.paymentMethod);
    const grandTotalFormatted = Number(totals.grandTotal || orderData.total || 0).toLocaleString('en-IN');

    // Build address string
    let addressStr = customer.address || '';
    if (!addressStr) {
      const parts = [customer.house, customer.street, customer.city, customer.state].filter(Boolean);
      addressStr = parts.join(', ');
    }
    const pincodeStr = customer.pincode ? String(customer.pincode) : '';

    // Build items ordered list (Product name, quantity, price)
    const itemsText = items.map(item => {
      const sizeStr = item.size ? ` (${item.size})` : '';
      const itemPrice = Number(item.price * item.quantity).toLocaleString('en-IN');
      return `• ${item.name}${sizeStr} × ${item.quantity} - ${CONFIG.currency}${itemPrice}`;
    }).join('\n');

    let message = `Hello ZOOQE,

🛍️ *NEW ORDER PLACED*
━━━━━━━━━━━━━━━━━━━━
*Customer Details:*
• Name: ${customer.name || 'Valued Customer'}
• Phone: ${customer.phone || 'N/A'}${customer.email ? `\n• Email: ${customer.email}` : ''}

*Delivery Address:*
• Address: ${addressStr}
• Pincode: ${pincodeStr}${customer.instructions ? `\n• Instructions: ${customer.instructions}` : ''}

*Items Ordered:*
${itemsText || '• (No items specified)'}

*Order Summary:*
• Subtotal: ${CONFIG.currency}${Number(totals.subtotal || 0).toLocaleString('en-IN')}`;

    if (totals.discountAmount && totals.discountAmount > 0) {
      message += `\n• Discount: -${CONFIG.currency}${Number(totals.discountAmount).toLocaleString('en-IN')}`;
    }

    const deliveryText = totals.deliveryFee === 0 ? 'FREE' : `${CONFIG.currency}${Number(totals.deliveryFee || 0).toLocaleString('en-IN')}`;
    message += `\n• Delivery: ${deliveryText}
• *Total Order Amount:* ${CONFIG.currency}${grandTotalFormatted}

*Payment Method:* ${paymentLabel}
━━━━━━━━━━━━━━━━━━━━
Order ID: #${orderData.orderId || 'ZQ-NEW'}
Date: ${orderData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}

Please confirm my order and share delivery updates. Thank you!`;

    return message;
  },

  /**
   * Generate URL for checkout order submission
   */
  getOrderCheckoutUrl(orderData) {
    const text = this.buildOrderSummaryMessage(orderData);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  },

  /**
   * Immediately redirect or open WhatsApp with compiled order summary
   */
  sendOrderCheckout(orderData) {
    const url = this.getOrderCheckoutUrl(orderData);
    try {
      const waWindow = window.open(url, '_blank');
      if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
        window.location.href = url;
      }
    } catch (e) {
      window.location.href = url;
    }
    return url;
  },

  /**
   * Open WhatsApp in a new tab
   */
  openProductEnquiry(productName, size, quantity) {
    window.open(this.getProductEnquiryUrl(productName, size, quantity), '_blank');
  },

  openConcierge(text = 'Hello ZOOQE') {
    window.open(this.getConciergeUrl(text), '_blank');
  },

  openOrderTracking(orderId, customerName, total) {
    window.open(this.getOrderTrackingUrl(orderId, customerName, total), '_blank');
  }
};
