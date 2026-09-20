const STORAGE_KEY = 'zooqe_wishlist_v1';

class WishlistState {
  constructor() {
    this.items = this.loadWishlist();
  }

  loadWishlist() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
    this.notify();
  }

  notify() {
    window.dispatchEvent(new CustomEvent('zooqe:wishlist-updated', {
      detail: {
        items: this.items,
        count: this.items.length
      }
    }));
  }

  isInWishlist(productId) {
    return this.items.some(item => item.id === productId);
  }

  toggle(product) {
    const exists = this.isInWishlist(product.id);
    if (exists) {
      this.items = this.items.filter(item => item.id !== product.id);
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        category: product.category,
        basePrice: product.basePrice,
        image: product.images && product.images[0] ? product.images[0] : 'assets/images/logo-mark.svg',
        addedAt: Date.now()
      });
    }
    this.saveWishlist();
    return !exists;
  }

  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveWishlist();
  }

  getCount() {
    return this.items.length;
  }
}

export const wishlistState = new WishlistState();
