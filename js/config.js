/**
 * ZOOQE Premium E-Commerce Configuration
 * Easily configure your brand details, WhatsApp number, and shopping rules.
 */
export const CONFIG = {
  brandName: 'ZOOQE',
  tagline: 'Premium Taste. Distinctly ZOOQE.',
  currency: '$',
  currencyCode: 'USD',
  
  // WhatsApp Number (Include country code without '+' for wa.me URL)
  // Edit this single variable to point all website WhatsApp buttons to your actual number!
  whatsappNumber: '916238463851',

  // Shopping Calculations
  freeShippingThreshold: 100, // Free delivery on orders over $100
  standardShippingFee: 15,    // Standard delivery fee if under threshold
  taxPercentage: 0,

  // Active Promo Codes (uppercase)
  promoCodes: {
    'ZOOQE10': { discountPercent: 10, label: '10% Discount' }
  },

  // Contact Info
  email: 'support@zooqe.com',
  phone: '+91 62384 63851',
  supportHours: 'Mon – Sat: 9:00 AM – 9:00 PM',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  }
};
