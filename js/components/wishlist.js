import { CONFIG } from '../config.js';
import { wishlistState } from '../state/wishlistState.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';
import { PRODUCTS } from '../data/products.js';

class WishlistManager {
  constructor() {
    this.drawer = null;
    this.backdrop = null;
    this.init();
  }

  init() {
    this.drawer = document.getElementById('wishlist-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');

    const closeBtn = document.getElementById('wishlist-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    window.addEventListener('zooqe:wishlist-updated', () => {
      if (this.drawer && this.drawer.classList.contains('open')) {
        this.render();
      }
    });
  }

  open() {
    this.render();
    if (this.drawer) this.drawer.classList.add('open');
    if (this.backdrop) this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.drawer) this.drawer.classList.remove('open');
    if (this.backdrop) this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  render() {
    const listContainer = document.getElementById('wishlist-items-container');
    if (!listContainer) return;

    const items = wishlistState.items;

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div class="wishlist-empty-state">
          <div class="wishlist-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 class="cart-empty-title">Your wishlist is empty.</h3>
          <p class="cart-empty-desc">Save your favourite luxury reserves to revisit anytime.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = items.map(item => `
      <div class="wishlist-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="wishlist-item-img" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
        <div class="wishlist-item-info">
          <h4 class="wishlist-item-title">${item.name}</h4>
          <div class="wishlist-item-price">${CONFIG.currency}${item.basePrice}</div>
          <div class="wishlist-item-actions">
            <button class="btn-wishlist-add-cart" data-id="${item.id}">ADD TO CART</button>
            <button class="btn-wishlist-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // Add to Cart from Wishlist
    listContainer.querySelectorAll('.btn-wishlist-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = PRODUCTS.find(p => p.id === btn.dataset.id);
        if (prod) {
          const defaultSize = prod.sizes && prod.sizes[0] ? prod.sizes[0].size : '100g';
          cartState.addItem(prod, defaultSize, 1);
          toast.show(`Added "${prod.name}" to Cart ✓`);
        }
      });
    });

    // Remove from Wishlist
    listContainer.querySelectorAll('.btn-wishlist-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        wishlistState.remove(btn.dataset.id);
        toast.show('Removed from Wishlist');
      });
    });
  }
}

export const wishlistDrawer = new WishlistManager();
