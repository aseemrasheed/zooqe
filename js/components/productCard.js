import { CONFIG, formatPrice } from '../config.js';
import { wishlistState } from '../state/wishlistState.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';

export function createProductCard(product, { onQuickView, onBuyNow }) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.productId = product.id;

  const isWishlisted = wishlistState.isInWishlist(product.id);
  const primaryImage = (product.images && product.images[0]) || product.image || 'assets/images/logo-mark.svg';

  // Badges markup
  let badgeHtml = '';
  if (product.badge) {
    badgeHtml += `<span class="badge-tag">${product.badge}</span>`;
  }
  if (product.discountPercentage) {
    badgeHtml += `<span class="badge-tag badge-discount">${product.discountPercentage}% OFF</span>`;
  }

  // Sizes pill preview
  const sizesHtml = product.sizes && product.sizes.length > 0
    ? product.sizes.map(s => `<span class="size-tag">${s.size || s.weight}</span>`).join('')
    : '<span class="size-tag">100g</span>';

  card.innerHTML = `
    <div class="product-card-media">
      <img src="${primaryImage}" alt="${product.name}" class="product-card-img" loading="lazy" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
      <div class="product-card-overlay"></div>
      <div class="product-badges">${badgeHtml}</div>
      <button class="product-card-wishlist-btn ${isWishlisted ? 'active' : ''}" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <button class="product-quick-view-btn">QUICK VIEW</button>
    </div>

    <div class="product-card-body">
      <h3 class="product-card-title">${product.name}</h3>

      <div class="product-card-pricing">
        <span class="price-current">${formatPrice(product.basePrice || product.startingPrice)}</span>
        ${(product.previousPrice || product.originalPrice) ? `<span class="price-previous">${formatPrice(product.previousPrice || product.originalPrice)}</span>` : ''}
      </div>

      <div class="product-card-sizes">${sizesHtml}</div>

      <div class="product-card-actions">
        <button class="btn-card-add-cart">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          ADD TO CART
        </button>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const media = card.querySelector('.product-card-media');
  const title = card.querySelector('.product-card-title');
  const quickViewBtn = card.querySelector('.product-quick-view-btn');
  const wishlistBtn = card.querySelector('.product-card-wishlist-btn');
  const addCartBtn = card.querySelector('.btn-card-add-cart');
  const buyNowBtn = card.querySelector('.btn-card-buy-now');

  // Open Quick View / Details
  const handleOpenDetail = () => {
    if (onQuickView) onQuickView(product);
  };
  media.addEventListener('click', (e) => {
    if (e.target.closest('.product-card-wishlist-btn')) return;
    handleOpenDetail();
  });
  title.addEventListener('click', handleOpenDetail);
  quickViewBtn.addEventListener('click', handleOpenDetail);

  // Toggle Wishlist
  wishlistBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const added = wishlistState.toggle(product);
    wishlistBtn.classList.toggle('active', added);
    if (added) {
      toast.show(`Added "${product.name}" to Wishlist ✓`);
    } else {
      toast.show(`Removed from Wishlist`);
    }
  });

  // Add to Cart
  addCartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0].size : '100g';
    cartState.addItem(product, defaultSize, 1);
    toast.show(`Added to Cart ✓ (${defaultSize})`);
  });

  // Direct Buy Now
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0].size : '100g';
      if (onBuyNow) {
        onBuyNow(product, defaultSize, 1);
      }
    });
  }

  return card;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;
  }
  return stars;
}
