import { CONFIG, formatPrice } from '../config.js';
import { cartState } from '../state/cartState.js';
import { toast } from './toast.js';
import { WhatsApp } from './whatsapp.js';

class ProductModalManager {
  constructor() {
    this.modalBackdrop = null;
    this.currentProduct = null;
    this.selectedSize = '100g';
    this.selectedPrice = 0;
    this.selectedPrevPrice = 0;
    this.quantity = 1;
    this.onBuyNowCallback = null;
    this.init();
  }

  init() {
    let backdrop = document.getElementById('product-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'product-modal-backdrop';
      backdrop.className = 'product-modal-backdrop';
      backdrop.innerHTML = `
        <div class="product-modal-container">
          <button class="product-modal-close-btn" id="product-modal-close">✕</button>
          <div id="product-modal-content"></div>
        </div>
      `;
      document.body.appendChild(backdrop);
    }
    this.modalBackdrop = backdrop;

    const closeBtn = document.getElementById('product-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('open')) {
        this.close();
      }
    });
  }

  open(product, onBuyNow) {
    this.currentProduct = product;
    this.onBuyNowCallback = onBuyNow;
    this.selectedSize = (product.sizes && product.sizes[0]) ? (product.sizes[0].size || product.sizes[0].weight) : '100g';
    this.selectedPrice = (product.sizes && product.sizes[0]) ? product.sizes[0].price : (product.basePrice || product.startingPrice);
    this.selectedPrevPrice = (product.sizes && product.sizes[0]) ? (product.sizes[0].previousPrice || product.sizes[0].mrp || 0) : (product.previousPrice || product.originalPrice || 0);
    this.quantity = 1;

    this.render();
    this.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  updatePrice() {
    const variant = this.currentProduct.sizes.find(s => (s.size || s.weight) === this.selectedSize);
    if (variant) {
      this.selectedPrice = variant.price;
      this.selectedPrevPrice = variant.previousPrice || variant.mrp || 0;
    }
    const priceEl = document.getElementById('modal-product-price');
    const prevPriceEl = document.getElementById('modal-product-prev-price');
    if (priceEl) priceEl.textContent = formatPrice(this.selectedPrice);
    if (prevPriceEl) {
      if (this.selectedPrevPrice) {
        prevPriceEl.textContent = formatPrice(this.selectedPrevPrice);
        prevPriceEl.style.display = 'inline';
      } else {
        prevPriceEl.style.display = 'none';
      }
    }
  }

  render() {
    const p = this.currentProduct;
    const content = document.getElementById('product-modal-content');
    if (!content) return;

    // Gallery thumbnails
    const images = (p.images && p.images.length > 0) ? p.images : (p.image ? [p.image] : ['assets/images/logo-mark.svg']);
    const thumbsHtml = images.map((img, idx) => `
      <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${img}" alt="${p.name} view ${idx + 1}" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
      </div>
    `).join('');

    // Variant pills
    const sizes = p.sizes || [{ size: '100g', price: p.basePrice || p.startingPrice }];
    const variantsHtml = sizes.map(s => {
      const szLabel = s.size || s.weight;
      return `
      <button class="variant-btn ${szLabel === this.selectedSize ? 'active' : ''}" data-size="${szLabel}">
        ${szLabel} • ${formatPrice(s.price)}
      </button>
    `;
    }).join('');

    content.innerHTML = `
      <div class="product-detail-layout">
        <!-- Left: Gallery -->
        <div class="product-gallery">
          <div class="product-gallery-main">
            <img id="modal-main-img" src="${images[0]}" alt="${p.name}" onerror="if(!this.src.endsWith('.svg')){ this.src = this.src.replace(/\\.(jpg|jpeg|png|webp)$/i, '.svg'); }" />
          </div>
          <div class="product-gallery-thumbs">${thumbsHtml}</div>
        </div>

        <!-- Right: Info -->
        <div class="product-info-col">
          <div class="product-detail-meta">
            <span class="product-detail-category">${p.category}</span>
            <span class="product-detail-sku">SKU: ${p.sku}</span>
          </div>

          <h2 class="product-detail-title">${p.name}</h2>
          
          <div class="product-detail-rating">
            <div class="rating-stars">
              ${renderStars(p.rating || 5)}
            </div>
            <span>${p.rating || 5.0} (${p.reviewsCount || 42} Connoisseur Reviews)</span>
          </div>

          <div class="product-detail-price-wrap">
            <span class="product-detail-price" id="modal-product-price">${formatPrice(this.selectedPrice)}</span>
            <span class="product-detail-prev-price" id="modal-product-prev-price" style="${this.selectedPrevPrice ? '' : 'display:none;'}">
              ${formatPrice(this.selectedPrevPrice)}
            </span>
            ${p.discountPercentage ? `<span class="product-detail-save-badge">SAVE ${p.discountPercentage}%</span>` : ''}
          </div>

          <!-- Variant Sizes -->
          <div class="variant-selector-group">
            <label class="variant-label">Select Weight / Size:</label>
            <div class="variant-options">${variantsHtml}</div>
          </div>

          <!-- Quantity & Actions -->
          <div class="product-detail-actions-wrap">
            <div class="product-qty-row">
              <span class="variant-label" style="margin-bottom:0;">Quantity:</span>
              <div class="qty-stepper">
                <button class="qty-btn" id="modal-qty-minus">−</button>
                <span class="qty-value" id="modal-qty-value">${this.quantity}</span>
                <button class="qty-btn" id="modal-qty-plus">+</button>
              </div>
            </div>

            <div class="detail-cta-row">
              <button class="btn-detail-cart" id="modal-add-cart-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                ADD TO CART
              </button>
              <button class="btn-detail-buy" id="modal-buy-now-btn">BUY NOW</button>
            </div>

            <button class="btn-detail-whatsapp" id="modal-whatsapp-enquiry-btn">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"></path>
              </svg>
              ENQUIRE ON WHATSAPP
            </button>
          </div>

          <!-- Details Accordion -->
          <div class="product-detail-accordion">
            <div class="accordion-item">
              <div class="accordion-header">Product Philosophy</div>
              <div class="accordion-content">${p.description}</div>
            </div>
            ${p.ingredients ? `
            <div class="accordion-item">
              <div class="accordion-header">Ingredients & Composition</div>
              <div class="accordion-content">${p.ingredients}</div>
            </div>` : ''}
            ${p.origin ? `
            <div class="accordion-item">
              <div class="accordion-header">Harvest Origin</div>
              <div class="accordion-content">${p.origin}</div>
            </div>` : ''}
          </div>
        </div>
      </div>
    `;

    this.attachEvents(images);
  }

  attachEvents(images) {
    const mainImg = document.getElementById('modal-main-img');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    // Gallery switching
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const idx = parseInt(thumb.dataset.index, 10);
        if (mainImg && images[idx]) {
          mainImg.src = images[idx];
        }
      });
    });

    // Variant Selection
    const variantBtns = document.querySelectorAll('.variant-btn');
    variantBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        variantBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSize = btn.dataset.size;
        this.updatePrice();
      });
    });

    // Quantity Stepper
    const minusBtn = document.getElementById('modal-qty-minus');
    const plusBtn = document.getElementById('modal-qty-plus');
    const qtyVal = document.getElementById('modal-qty-value');

    minusBtn.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        qtyVal.textContent = this.quantity;
      }
    });

    plusBtn.addEventListener('click', () => {
      this.quantity++;
      qtyVal.textContent = this.quantity;
    });

    // Add to Cart
    const addCartBtn = document.getElementById('modal-add-cart-btn');
    addCartBtn.addEventListener('click', () => {
      cartState.addItem(this.currentProduct, this.selectedSize, this.quantity);
      toast.show(`Added ${this.quantity} × "${this.currentProduct.name}" (${this.selectedSize}) to Cart ✓`);
      this.close();
    });

    // Buy Now
    const buyNowBtn = document.getElementById('modal-buy-now-btn');
    buyNowBtn.addEventListener('click', () => {
      this.close();
      if (this.onBuyNowCallback) {
        this.onBuyNowCallback(this.currentProduct, this.selectedSize, this.quantity);
      }
    });

    // WhatsApp Enquiry
    const whatsappBtn = document.getElementById('modal-whatsapp-enquiry-btn');
    whatsappBtn.addEventListener('click', () => {
      WhatsApp.openProductEnquiry(this.currentProduct.name, this.selectedSize, this.quantity);
    });
  }
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;
  }
  return stars;
}

export const productModal = new ProductModalManager();
