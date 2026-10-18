import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { formatPrice } from '../config.js';

class FilterManager {
  constructor() {
    this.activeCategory = 'all';
    this.maxPrice = 5000;
    this.selectedSize = 'all';
    this.inStockOnly = false;
    this.activeSort = 'featured';
    this.drawer = null;
    this.backdrop = null;
    this.onChangeCallback = null;
  }
 
  init(onChange) {
    this.onChangeCallback = onChange;
    this.drawer = document.getElementById('filter-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');

    this.renderCategoryPills();
    this.attachEventListeners();
  }

  renderCategoryPills() {
    const pillsContainer = document.getElementById('category-pills-wrap');
    if (!pillsContainer) return;

    pillsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="category-pill ${cat.id === this.activeCategory ? 'active' : ''}" data-category-id="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    pillsContainer.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        pillsContainer.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.dataset.categoryId;
        this.apply();
      });
    });
  }

  attachEventListeners() {
    // Sort Select
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.apply();
      });
    }

    // Filter Drawer Triggers
    const filterTriggerBtn = document.getElementById('filter-drawer-trigger');
    const filterCloseBtn = document.getElementById('filter-drawer-close');

    if (filterTriggerBtn) filterTriggerBtn.addEventListener('click', () => this.openDrawer());
    if (filterCloseBtn) filterCloseBtn.addEventListener('click', () => this.closeDrawer());

    // Drawer Price Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceLabel = document.getElementById('filter-price-val');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = parseInt(e.target.value, 10);
        if (priceLabel) priceLabel.textContent = formatPrice(this.maxPrice);
        this.apply();
      });
    }

    // Drawer Size Pills
    const sizeBtns = document.querySelectorAll('.filter-size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSize = btn.dataset.size;
        this.apply();
      });
    });

    // Reset Filters Button
    const resetBtn = document.getElementById('filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.reset();
      });
    }

    // Apply & Close Button
    const applyCloseBtn = document.getElementById('filter-apply-close-btn');
    if (applyCloseBtn) {
      applyCloseBtn.addEventListener('click', () => {
        this.closeDrawer();
      });
    }
  }

  openDrawer() {
    if (this.drawer) this.drawer.classList.add('open');
    if (this.backdrop) this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.drawer) this.drawer.classList.remove('open');
    if (this.backdrop) this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  reset() {
    this.activeCategory = 'all';
    this.maxPrice = 5000;
    this.selectedSize = 'all';
    this.activeSort = 'featured';

    const priceSlider = document.getElementById('filter-price-slider');
    const priceLabel = document.getElementById('filter-price-val');
    if (priceSlider) priceSlider.value = 5000;
    if (priceLabel) priceLabel.textContent = formatPrice(5000);

    document.querySelectorAll('.filter-size-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.size === 'all');
    });

    this.renderCategoryPills();
    this.apply();
  }

  apply() {
    let filtered = [...PRODUCTS];

    // Category Filter
    if (this.activeCategory !== 'all') {
      if (this.activeCategory === 'other' || this.activeCategory === 'gifts') {
        filtered = filtered.filter(p => p.categorySlug === 'other' || p.categorySlug === 'gifts');
      } else {
        filtered = filtered.filter(p => p.categorySlug === this.activeCategory);
      }
    }

    // Price Filter
    filtered = filtered.filter(p => p.basePrice <= this.maxPrice);

    // Size Filter
    if (this.selectedSize !== 'all') {
      filtered = filtered.filter(p => {
        return p.sizes && p.sizes.some(s => s.size === this.selectedSize);
      });
    }

    // Sorting
    switch (this.activeSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case 'bestselling':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    if (this.onChangeCallback) {
      this.onChangeCallback(filtered);
    }
  }
}

export const filterManager = new FilterManager();
