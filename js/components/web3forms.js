import { CONFIG } from '../config.js';

/**
 * Web3Forms Email Notification Service
 * Sends automated direct background email notifications for new orders
 * API Documentation: https://web3forms.com
 */
export const Web3Forms = {
  /**
   * Helper to map payment method code to a descriptive label
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
   * Generate direct WhatsApp confirmation action link for the store owner
   * Format: https://wa.me/91[CustomerPhoneNumber]?text=Hi%20[CustomerName],%20your%20Zooqe%20order%20%23[OrderNumber]%20has%20been%20confirmed!%20We%20are%20preparing%20your%20items%20for%20dispatch.%20Thank%20you%20for%20choosing%20Zooqe.
   */
  generateWhatsAppConfirmationUrl(phone, customerName, orderId) {
    let cleanPhone = String(phone || '').replace(/\D/g, '');
    if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
      cleanPhone = cleanPhone.slice(1);
    }
    const targetPhone = `91${cleanPhone}`;

    const name = (customerName || 'Customer').trim();
    const orderNumber = String(orderId || 'ZQ-NEW').replace(/^#/, '');
    const encodedName = encodeURIComponent(name);

    return `https://wa.me/${targetPhone}?text=Hi%20${encodedName},%20your%20Zooqe%20order%20%23${orderNumber}%20has%20been%20confirmed!%20We%20are%20preparing%20your%20items%20for%20dispatch.%20Thank%20you%20for%20choosing%20Zooqe.`;
  },

  /**
   * Compile order details into a clean, luxury email body message
   */
  compileOrderMessage(orderData) {
    const customer = orderData.customer || {};
    const totals = orderData.totals || {};
    const items = orderData.items || [];
    const paymentMode = this.getPaymentMethodLabel(orderData.paymentMethod);
    const grandTotal = Number(totals.grandTotal || 0).toLocaleString('en-IN');
    const orderNumber = String(orderData.orderId || 'ZQ-NEW').replace(/^#/, '');

    const whatsappActionUrl = this.generateWhatsAppConfirmationUrl(
      customer.phone,
      customer.name,
      orderNumber
    );

    const address = customer.address || 
      [customer.house, customer.street, customer.city, customer.state, customer.pincode].filter(Boolean).join(', ');

    const itemsSummary = items.map((item, idx) => {
      const sizeStr = item.size ? ` (${item.size})` : '';
      const totalItemPrice = Number(item.price * item.quantity).toLocaleString('en-IN');
      return `  ${idx + 1}. ${item.name}${sizeStr} — Quantity: ${item.quantity} — Price: ₹${totalItemPrice}`;
    }).join('\n');

    return `=====================================================
ZOOQE LUXURY STORE — NEW ORDER SUBMISSION
Order ID: #${orderNumber}
Date: ${orderData.date || new Date().toLocaleString()}
=====================================================

⚡ STORE OWNER ACTION — 1-CLICK WHATSAPP CONFIRMATION:
Click this link to send an instant WhatsApp confirmation to the customer:
${whatsappActionUrl}

-----------------------------------------------------
CUSTOMER INFORMATION:
- Name: ${customer.name || 'N/A'}
- Phone: ${customer.phone || 'N/A'}
- Email: ${customer.email || 'N/A'}

DELIVERY ADDRESS:
- Address: ${address || 'N/A'}
- Pincode: ${customer.pincode || 'N/A'}
${customer.instructions ? `- Delivery Instructions: ${customer.instructions}\n` : ''}
ITEMS ORDERED:
${itemsSummary || '  (No items specified)'}

FINANCIAL SUMMARY:
- Subtotal: ₹${Number(totals.subtotal || 0).toLocaleString('en-IN')}
${totals.discountAmount > 0 ? `- Discount: -₹${Number(totals.discountAmount).toLocaleString('en-IN')}\n` : ''}- Delivery Fee: ${totals.deliveryFee === 0 ? 'FREE' : '₹' + totals.deliveryFee}
- TOTAL BILL AMOUNT: ₹${grandTotal}

PAYMENT MODE:
- ${paymentMode}

-----------------------------------------------------
👉 DIRECT WHATSAPP ACTION LINK:
${whatsappActionUrl}
=====================================================
Automated background order notification generated via Web3Forms API.
Store: ${CONFIG.brandName || 'ZOOQE'}`;
  },

  /**
   * Build payload for Web3Forms API
   * Exactly matching requested schema:
   * - access_key: "d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7"
   * - subject: "New Order Received - Zooqe"
   * - customer_name: (Customer Name)
   * - phone: (Customer Phone Number)
   * - address: (Delivery Address)
   * - order_items: (List of ordered products and quantities)
   * - total_amount: (Total Bill Amount)
   * - payment_method: (e.g. COD)
   */
  buildPayload(orderData) {
    const customer = orderData.customer || {};
    const totals = orderData.totals || {};
    const items = orderData.items || [];
    const paymentMode = this.getPaymentMethodLabel(orderData.paymentMethod);
    const paymentMethodCode = (orderData.paymentMethod || 'COD').toUpperCase();
    const grandTotal = `₹${Number(totals.grandTotal || 0).toLocaleString('en-IN')}`;
    const orderNumber = String(orderData.orderId || 'ZQ-NEW').replace(/^#/, '');

    const whatsappActionUrl = this.generateWhatsAppConfirmationUrl(
      customer.phone,
      customer.name,
      orderNumber
    );

    const address = customer.address || 
      [customer.house, customer.street, customer.city, customer.state, customer.pincode].filter(Boolean).join(', ');

    const orderItemsSummary = items.map(item => 
      `${item.name}${item.size ? ' (' + item.size + ')' : ''} × ${item.quantity}`
    ).join(', ');

    return {
      access_key: CONFIG.web3forms?.accessKey || 'd78c8ba7-9ec7-4fe0-bb29-1891016f6dc7',
      subject: 'New Order Received - Zooqe',
      customer_name: customer.name || '',
      phone: customer.phone || '',
      address: address || '',
      order_items: orderItemsSummary || '',
      total_amount: grandTotal,
      payment_method: paymentMethodCode === 'COD' ? 'COD' : paymentMode,
      whatsapp_confirmation_link: whatsappActionUrl,
      // Additional helpful metadata for store inbox
      email: customer.email || '',
      order_id: orderData.orderId || '',
      message: this.compileOrderMessage(orderData)
    };
  },

  /**
   * Send the order details via background AJAX POST request to https://api.web3forms.com/submit
   */
  async sendOrderNotification(orderData) {
    const payload = this.buildPayload(orderData);
    const endpoint = CONFIG.web3forms?.endpoint || 'https://api.web3forms.com/submit';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));
      
      if (response.ok && data.success === true) {
        return {
          success: true,
          data: data,
          message: data.message || 'Form submitted successfully!'
        };
      } else {
        console.warn('Web3Forms returned unsuccessful response:', response.status, data);
        return {
          success: false,
          status: response.status,
          message: data.message || `Web3Forms returned status ${response.status}`
        };
      }
    } catch (err) {
      console.warn('Web3Forms background request failed:', err);
      return {
        success: false,
        error: err.message,
        message: err.message || 'Network error occurred while contacting Web3Forms API'
      };
    }
  }
};
