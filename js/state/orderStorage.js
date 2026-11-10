/**
 * ZOOQE Order Persistence & Fallback Storage Module
 * Saves full order payloads into localStorage under 'zooqe_orders_log'
 * Provides robust error fallback, order recovery, and an Admin/Debug Panel
 */
import { CONFIG } from '../config.js';
import { WhatsApp } from '../components/whatsapp.js';

export const ORDER_STORAGE_KEY = 'zooqe_orders_log';

class OrderStorageManager {
  constructor() {
    this.storageKey = ORDER_STORAGE_KEY;
    this.init();
  }

  init() {
    // Expose global debug API on window
    if (typeof window !== 'undefined') {
      window.zooqeOrders = {
        getLog: () => this.getOrders(),
        printLog: () => this.printLog(),
        clearLog: () => this.clearOrders(),
        showAdminPanel: () => this.showAdminPanel(),
        hideAdminPanel: () => this.hideAdminPanel()
      };

      // Keyboard shortcut: Ctrl + Shift + O or Alt + O opens the Admin/Debug Panel
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.shiftKey && (e.key === 'O' || e.key === 'o')) || 
            (e.altKey && (e.key === 'O' || e.key === 'o'))) {
          e.preventDefault();
          this.showAdminPanel();
        }
      });

      console.log('📦 [ZOOQE Orders System] Order persistence active. Press Ctrl+Shift+O or run window.zooqeOrders.showAdminPanel() to inspect orders.');
    }
  }

  /**
   * Retrieve all saved orders from localStorage
   */
  getOrders() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Failed to parse zooqe_orders_log from localStorage:', err);
      return [];
    }
  }

  /**
   * Save a full order payload into localStorage with status ('sent' | 'failed' | 'pending')
   */
  saveOrder(orderData, status = 'pending', error = null) {
    if (!orderData || !orderData.orderId) return null;

    try {
      const orders = this.getOrders();
      const existingIdx = orders.findIndex(o => o.orderId === orderData.orderId);

      const items = orderData.items || [];
      const itemsSummary = items.map(i => {
        const sizeStr = i.size ? ` (${i.size})` : '';
        return `${i.name}${sizeStr} × ${i.quantity}`;
      }).join(', ');

      const orderEntry = {
        orderId: orderData.orderId,
        timestamp: new Date().toISOString(),
        dateFormatted: orderData.date || new Date().toLocaleString(),
        status: status, // 'sent' or 'failed'
        customer: {
          name: orderData.customer?.name || '',
          phone: orderData.customer?.phone || '',
          email: orderData.customer?.email || '',
          address: orderData.customer?.address || '',
          house: orderData.customer?.house || '',
          street: orderData.customer?.street || '',
          city: orderData.customer?.city || '',
          state: orderData.customer?.state || '',
          pincode: orderData.customer?.pincode || '',
          instructions: orderData.customer?.instructions || ''
        },
        items: items,
        itemsSummary: itemsSummary,
        totals: orderData.totals || {},
        totalAmount: orderData.totals?.grandTotal ? `₹${Number(orderData.totals.grandTotal).toLocaleString('en-IN')}` : '',
        paymentMethod: orderData.paymentMethod || 'COD',
        error: error ? String(error) : null,
        fullOrderData: orderData
      };

      if (existingIdx >= 0) {
        orders[existingIdx] = orderEntry;
      } else {
        orders.unshift(orderEntry);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(orders));
      console.log(`📦 [ZOOQE Orders Log] Saved Order #${orderData.orderId} [Status: ${status}]`, orderEntry);
      return orderEntry;
    } catch (err) {
      console.error('Failed to save order to zooqe_orders_log:', err);
      return null;
    }
  }

  /**
   * Update the status and error info for an existing order in localStorage
   */
  updateStatus(orderId, status, error = null) {
    if (!orderId) return false;

    try {
      const orders = this.getOrders();
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.status = status;
        order.error = error ? String(error) : null;
        order.updatedAt = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(orders));
        console.log(`📦 [ZOOQE Orders Log] Updated Order #${orderId} -> [${status}]`, error || '');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update order status in zooqe_orders_log:', err);
      return false;
    }
  }

  /**
   * Clear all saved orders from localStorage
   */
  clearOrders() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('📦 [ZOOQE Orders Log] All orders cleared.');
      if (typeof window !== 'undefined') {
        const modal = document.getElementById('zooqe-admin-orders-modal');
        if (modal && modal.classList.contains('open')) {
          this.renderAdminModal();
        }
      }
      return true;
    } catch (err) {
      console.error('Failed to clear zooqe_orders_log:', err);
      return false;
    }
  }

  /**
   * Pretty console log view of all saved orders
   */
  printLog() {
    const orders = this.getOrders();
    if (!orders.length) {
      console.log('📦 [ZOOQE Orders Log] No orders currently saved.');
      return;
    }

    console.group(`📦 [ZOOQE Orders Log] — Total Saved Orders: ${orders.length}`);
    console.table(orders.map(o => ({
      'Order ID': o.orderId,
      'Status': o.status.toUpperCase(),
      'Customer': o.customer?.name || 'N/A',
      'Phone': o.customer?.phone || 'N/A',
      'Total': o.totalAmount,
      'Payment': o.paymentMethod.toUpperCase(),
      'Items': o.itemsSummary,
      'Error': o.error || 'None'
    })));
    console.groupEnd();
  }

  /**
   * Render and open the interactive Admin / Debug Panel Modal
   */
  showAdminPanel() {
    let modal = document.getElementById('zooqe-admin-orders-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'zooqe-admin-orders-modal';
      modal.className = 'admin-orders-modal';
      document.body.appendChild(modal);
    }

    this.renderAdminModal();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  hideAdminPanel() {
    const modal = document.getElementById('zooqe-admin-orders-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  renderAdminModal() {
    const modal = document.getElementById('zooqe-admin-orders-modal');
    if (!modal) return;

    const orders = this.getOrders();
    const totalCount = orders.length;
    const sentCount = orders.filter(o => o.status === 'sent').length;
    const failedCount = orders.filter(o => o.status === 'failed').length;

    let ordersHtml = '';
    if (totalCount === 0) {
      ordersHtml = `
        <div class="admin-orders-empty">
          <p>No orders recorded yet. Submit a test checkout to see order persistence in action.</p>
        </div>
      `;
    } else {
      ordersHtml = `
        <div class="admin-orders-table-wrap">
          <table class="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Notification Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => {
                const isSent = o.status === 'sent';
                const statusBadge = isSent 
                  ? `<span class="admin-status-badge status-sent">✓ SENT</span>`
                  : `<span class="admin-status-badge status-failed">⚠️ FAILED</span>`;
                
                const waUrl = WhatsApp.getOrderTrackingUrl(
                  o.orderId, 
                  o.customer?.name || 'Customer', 
                  o.totals?.grandTotal || 0, 
                  o.items || [], 
                  !isSent
                );

                return `
                  <tr>
                    <td><strong>#${o.orderId}</strong><br/><small class="text-muted">${o.dateFormatted}</small></td>
                    <td>${statusBadge}</td>
                    <td>
                      <strong>${o.customer?.name || 'N/A'}</strong><br/>
                      <small>${o.customer?.phone || ''}</small><br/>
                      <small class="text-muted">${o.customer?.address || ''}</small>
                    </td>
                    <td><small>${o.itemsSummary || 'N/A'}</small></td>
                    <td><strong>${o.totalAmount || '—'}</strong></td>
                    <td><span class="admin-payment-tag">${o.paymentMethod.toUpperCase()}</span></td>
                    <td>
                      <small>${isSent ? 'Direct notification dispatched to store owner' : `<span class="text-danger">${o.error || 'Failed to reach inbox'}</span>`}</small>
                    </td>
                    <td>
                      <div class="admin-action-btns">
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-admin-wa" title="Confirm on WhatsApp">
                          WhatsApp
                        </a>
                        <button type="button" class="btn-admin-copy" data-order-id="${o.orderId}" title="Copy Order JSON">
                          Copy
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="admin-modal-backdrop" id="admin-modal-backdrop"></div>
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <div class="admin-header-title">
            <h3>📦 ZOOQE Store Orders Log</h3>
            <span class="admin-subtitle">Order Persistence & LocalStorage Fallback System</span>
          </div>
          <button type="button" class="admin-close-btn" id="admin-close-btn" aria-label="Close Admin Panel">&times;</button>
        </div>

        <div class="admin-stats-bar">
          <div class="admin-stat-card">
            <span class="stat-num">${totalCount}</span>
            <span class="stat-label">Total Orders Logged</span>
          </div>
          <div class="admin-stat-card stat-success">
            <span class="stat-num">${sentCount}</span>
            <span class="stat-label">Successfully Dispatched</span>
          </div>
          <div class="admin-stat-card stat-warning">
            <span class="stat-num">${failedCount}</span>
            <span class="stat-label">WhatsApp Fallback / Failed</span>
          </div>
        </div>

        <div class="admin-orders-body">
          ${ordersHtml}
        </div>

        <div class="admin-modal-footer">
          <div class="admin-footer-left">
            <button type="button" class="btn-admin-export" id="btn-admin-export">📥 Export All JSON</button>
            <button type="button" class="btn-admin-clear" id="btn-admin-clear">🗑 Clear Log</button>
          </div>
          <button type="button" class="btn-admin-done" id="btn-admin-done">Close Panel</button>
        </div>
      </div>
    `;

    // Attach Admin Modal Event Handlers
    const closeBtn = modal.querySelector('#admin-close-btn');
    const doneBtn = modal.querySelector('#btn-admin-done');
    const backdrop = modal.querySelector('#admin-modal-backdrop');
    const clearBtn = modal.querySelector('#btn-admin-clear');
    const exportBtn = modal.querySelector('#btn-admin-export');

    const handleClose = () => this.hideAdminPanel();
    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (doneBtn) doneBtn.addEventListener('click', handleClose);
    if (backdrop) backdrop.addEventListener('click', handleClose);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the entire zooqe_orders_log from localStorage?')) {
          this.clearOrders();
          this.renderAdminModal();
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const jsonStr = JSON.stringify(this.getOrders(), null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zooqe-orders-log-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Copy single order button
    modal.querySelectorAll('.btn-admin-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.dataset.orderId;
        const order = orders.find(o => o.orderId === orderId);
        if (order) {
          navigator.clipboard.writeText(JSON.stringify(order, null, 2)).then(() => {
            const prevText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = prevText; }, 1500);
          }).catch(() => {
            alert(JSON.stringify(order, null, 2));
          });
        }
      });
    });
  }
}

export const orderStorage = new OrderStorageManager();
