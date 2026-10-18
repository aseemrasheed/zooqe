/**
 * ZOOQE Premium E-Commerce Configuration
 * Easily configure your brand details, WhatsApp number, and shopping rules.
 */
export const CONFIG = {
  brandName: 'ZOOQE',
  tagline: 'Premium Taste. Distinctly ZOOQE.',
  currency: '₹',
  currencyCode: 'INR',
  
  // WhatsApp Number (Include country code without '+' for wa.me URL)
  // Edit this single variable to point all website WhatsApp buttons to your actual number!
  whatsappNumber: '916238463851',

  // Shopping Calculations
  freeShippingThreshold: 999, // Free delivery on orders over ₹999
  standardShippingFee: 99,    // Standard delivery fee if under threshold
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
  },

  // Web3Forms Direct Background Email Notification Configuration
  web3forms: {
    // Web3Forms Public Access Key (from https://web3forms.com)
    accessKey: 'd78c8ba7-9ec7-4fe0-bb29-1891016f6dc7',
    targetEmail: 'orders@zooqe.com',
    endpoint: 'https://api.web3forms.com/submit'
  }
};

/**
 * Format numerical amounts using Indian Rupee (₹) and Indian numbering system (e.g. ₹299, ₹1,499)
 */
export const formatPrice = (amount) => {
  const num = Number(amount || 0);
  return `${CONFIG.currency}${num.toLocaleString('en-IN')}`;
};
