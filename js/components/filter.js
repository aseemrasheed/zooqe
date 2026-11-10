/**
 * ZOOQE Filter Module (Cleaned & Modularized)
 * Note: Product catalog is now organized into dedicated category showcases
 * (Pickles, Spices, Dry Fruits) with interactive weight selectors and instant cart actions.
 */

export class FilterManager {
  constructor() {
    this.activeCategory = 'all';
    this.maxPrice = 5000;
    this.selectedSize = 'all';
    this.inStockOnly = false;
    this.activeSort = 'featured';
  }

  init(onChange) {
    if (typeof onChange === 'function') {
      this.onChangeCallback = onChange;
    }
  }

  apply() {
    if (typeof this.onChangeCallback === 'function') {
      this.onChangeCallback();
    }
  }

  reset() {
    this.activeCategory = 'all';
    this.maxPrice = 5000;
    this.selectedSize = 'all';
    this.inStockOnly = false;
    this.activeSort = 'featured';
    this.apply();
  }
}

export const filterManager = new FilterManager();
