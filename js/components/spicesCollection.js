import { PRODUCTS } from '../data/products.js';
import { cartState } from '../state/cartState.js';
import { wishlistState } from '../state/wishlistState.js';
import { toast } from './toast.js';
import { formatPrice } from '../config.js';

export function initSpicesCollection({ onQuickView, onBuyNow } = {}) {
  const cards = document.querySelectorAll('.spice-card, .pickle-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const prodId = card.dataset.productId;
    const product = PRODUCTS.find(p => p.id === prodId);
    if (!product) return;

    // Set default selected size
    const defaultBtn = card.querySelector('.spice-weight-btn.active, .pickle-weight-btn.active') ||
                       card.querySelector('.spice-weight-btn, .pickle-weight-btn');
    if (defaultBtn) {
      card.dataset.selectedSize = defaultBtn.dataset.size;
    }

    // 1. Weight Button Switchers
    const weightBtns = card.querySelectorAll('.spice-weight-btn, .pickle-weight-btn');
    weightBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        weightBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const size = btn.dataset.size;
        const price = parseInt(btn.dataset.price, 10);
        const mrp = parseInt(btn.dataset.mrp, 10);

        card.dataset.selectedSize = size;

        const currentPriceEl = card.querySelector('.spice-current-price, .pickle-current-price');
        const mrpPriceEl = card.querySelector('.spice-mrp-price, .pickle-mrp-price');
        const savePillEl = card.querySelector('.spice-save-pill, .pickle-save-pill');

        if (currentPriceEl && !isNaN(price)) {
          currentPriceEl.textContent = formatPrice(price);
        }
        if (mrpPriceEl && !isNaN(mrp)) {
          mrpPriceEl.textContent = formatPrice(mrp);
        }
        if (savePillEl && !isNaN(price) && !isNaN(mrp) && mrp > price) {
          const discount = Math.round(((mrp - price) / mrp) * 100);
          savePillEl.textContent = `${discount}% OFF`;
        }
      });
    });

    // 2. Quick View on Image or Title Click
    const mediaWrap = card.querySelector('.spice-card-media-wrap, .pickle-card-media-wrap');
    if (mediaWrap) {
      mediaWrap.addEventListener('click', (e) => {
        if (e.target.closest('.spice-card-wishlist-btn, .pickle-card-wishlist-btn')) return;
        if (typeof onQuickView === 'function') {
          onQuickView(product);
        }
      });
    }

    const titleEl = card.querySelector('.spice-card-title, .pickle-card-title');
    if (titleEl) {
      titleEl.addEventListener('click', (e) => {
        if (typeof onQuickView === 'function') {
          onQuickView(product);
        }
      });
    }

    // 3. Wishlist Toggle
    const wishBtn = card.querySelector('.spice-card-wishlist-btn, .pickle-card-wishlist-btn');
    if (wishBtn) {
      if (wishlistState.isInWishlist(product.id)) {
        wishBtn.classList.add('active');
      }

      wishBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isAdded = wishlistState.toggle(product);
        wishBtn.classList.toggle('active', isAdded);
        toast.show(isAdded ? `Added ${product.name} to Wishlist` : `Removed ${product.name} from Wishlist`);
      });
    }

    // 4. Add to Cart Action
    const addBtn = card.querySelector('.spice-card-add-btn, .pickle-card-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedSize = card.dataset.selectedSize || (product.sizes && product.sizes[0]?.size) || '100g';
        cartState.addItem(product, selectedSize, 1);
        toast.show(`${product.name} (${selectedSize}) added to cart.`);

        const textEl = addBtn.querySelector('.btn-archive-text');
        if (textEl) {
          const prevText = textEl.textContent;
          textEl.textContent = 'ADDED ✓';
          setTimeout(() => {
            textEl.textContent = prevText;
          }, 1200);
        }
      });
    }
  });

  // Global Wishlist Synchronization
  window.addEventListener('zooqe:wishlist-updated', () => {
    cards.forEach(card => {
      const prodId = card.dataset.productId;
      const wishBtn = card.querySelector('.spice-card-wishlist-btn, .pickle-card-wishlist-btn');
      if (wishBtn && prodId) {
        wishBtn.classList.toggle('active', wishlistState.isInWishlist(prodId));
      }
    });
  });
}
