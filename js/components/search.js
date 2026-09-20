import { CONFIG } from '../config.js';
import { PRODUCTS } from '../data/products.js';

class SearchManager {
  constructor() {
    this.backdrop = null;
    this.onSelectProductCallback = null;
    this.init();
  }

  init() {
    let backdrop = document.getElementById('search-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'search-modal-backdrop';
      backdrop.className = 'search-modal-backdrop';
      backdrop.innerHTML = `
        <div class="search-modal-container">
          <div class="search-input-wrap">
            <div class="search-input-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input type="text" id="search-modal-input" class="search-input-field" placeholder="Search by name, category, ingredients, or SKU..." autocomplete="off" />
            <button id="search-modal-clear" class="search-clear-btn" style="display:none;">✕</button>
          </div>
          <div class="search-close-escape-note">Press ESC or click background to close</div>
          <div id="search-results-list" class="search-results-list"></div>
        </div>
      `;
      document.body.appendChild(backdrop);
    }
    this.backdrop = backdrop;

    const input = document.getElementById('search-modal-input');
    const clearBtn = document.getElementById('search-modal-clear');

    if (input) {
      input.addEventListener('input', () => {
        const q = input.value.trim();
        if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
        this.performSearch(q);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        this.performSearch('');
        input.focus();
      });
    }

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('open')) {
        this.close();
      }
    });
  }

  open(onSelectProduct) {
    this.onSelectProductCallback = onSelectProduct;
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('search-modal-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
    this.performSearch('');
  }

  close() {
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  performSearch(query) {
    const resultsContainer = document.getElementById('search-results-list');
    if (!resultsContainer) return;

    const cleanQuery = query.toLowerCase().trim();

    let matched = PRODUCTS;
    if (cleanQuery) {
      matched = PRODUCTS.filter(p => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(cleanQuery)) ||
          (p.description && p.description.toLowerCase().includes(cleanQuery)) ||
          (p.sku && p.sku.toLowerCase().includes(cleanQuery)) ||
          (p.origin && p.origin.toLowerCase().includes(cleanQuery))
        );
      });
    }

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <h4 class="search-empty-title">No products found.</h4>
          <p style="margin-bottom: 1.5rem;">We could not find anything matching "${query}".</p>
          <button class="btn-luxury-secondary" id="search-view-all-btn" style="padding: 0.6rem 1.5rem;">
            VIEW ALL PRODUCTS
          </button>
        </div>
      `;
      const viewAllBtn = document.getElementById('search-view-all-btn');
      if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
          this.close();
          const shop = document.getElementById('shop');
          if (shop) shop.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    resultsContainer.innerHTML = matched.map(p => `
      <div class="search-result-item" data-product-id="${p.id}">
        <div class="search-result-left">
          <img src="${p.images && p.images[0] ? p.images[0] : 'assets/images/logo-mark.svg'}" alt="${p.name}" class="search-result-img" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
          <div>
            <div class="search-result-title">${p.name}</div>
            <div class="search-result-meta">${p.category} • SKU: ${p.sku}</div>
          </div>
        </div>
        <div class="search-result-price">${CONFIG.currency}${p.basePrice}</div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const prodId = item.dataset.productId;
        const prod = PRODUCTS.find(p => p.id === prodId);
        this.close();
        if (this.onSelectProductCallback && prod) {
          this.onSelectProductCallback(prod);
        }
      });
    });
  }
}

export const searchModal = new SearchManager();
