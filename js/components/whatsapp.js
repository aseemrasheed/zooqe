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
    const text = `Hello ZOOQE,

I have placed Order #${orderId} for ${CONFIG.currency}${total}.
Customer Name: ${customerName}

Kindly share delivery status and tracking details.`;
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
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
