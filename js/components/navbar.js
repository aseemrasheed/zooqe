import { cartState } from '../state/cartState.js';
import { wishlistState } from '../state/wishlistState.js';
import { WhatsApp } from './whatsapp.js';
import { toast } from './toast.js';

export function initNavbar({ onOpenCart, onOpenWishlist, onOpenSearch }) {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');

  const cartBtn = document.getElementById('nav-cart-btn');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  const wishlistBtn = document.getElementById('nav-wishlist-btn');
  const mobileWishlistBtn = document.getElementById('mobile-wishlist-btn');
  const searchBtn = document.getElementById('nav-search-btn');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const navSearchPill = document.getElementById('nav-search-pill');

  const topbarWishlistLink = document.getElementById('topbar-wishlist-link');
  const topbarWishlistCount = document.getElementById('topbar-wishlist-count');
  const topbarAuthBtn = document.getElementById('topbar-auth-btn');

  const whatsappBtn = document.getElementById('nav-whatsapp-btn');
  const mobileWhatsappBtn = document.getElementById('mobile-whatsapp-btn');
  const floatingWhatsappBtn = document.getElementById('floating-whatsapp-btn');

  const cartBadge = document.getElementById('nav-cart-badge');
  const mobileCartBadge = document.getElementById('mobile-cart-badge');
  const wishlistBadge = document.getElementById('nav-wishlist-badge');

  // Sticky Scroll compression
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile Drawer toggles
  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    if (mobileDrawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });

  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Close drawer on clicking internal nav links
  document.querySelectorAll('.mobile-drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Action listeners
  if (cartBtn) cartBtn.addEventListener('click', onOpenCart);
  if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      onOpenCart();
    });
  }

  if (wishlistBtn) wishlistBtn.addEventListener('click', onOpenWishlist);
  if (mobileWishlistBtn) {
    mobileWishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      onOpenWishlist();
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', onOpenSearch);
  if (navSearchPill) navSearchPill.addEventListener('click', onOpenSearch);
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      onOpenSearch();
    });
  }

  // Top utility header listeners
  if (topbarWishlistLink) topbarWishlistLink.addEventListener('click', onOpenWishlist);
  if (topbarAuthBtn) {
    topbarAuthBtn.addEventListener('click', () => {
      toast.show('ZOOQE Member Portal opening soon! Place orders directly or via WhatsApp.');
    });
  }

  // WhatsApp listeners
  if (whatsappBtn) whatsappBtn.addEventListener('click', () => WhatsApp.openConcierge());
  if (mobileWhatsappBtn) mobileWhatsappBtn.addEventListener('click', () => WhatsApp.openConcierge());
  if (floatingWhatsappBtn) floatingWhatsappBtn.addEventListener('click', () => WhatsApp.openConcierge());

  // Update Cart badge counter
  function updateCartBadge(count) {
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.classList.remove('bump');
      void cartBadge.offsetWidth; // trigger reflow
      cartBadge.classList.add('bump');
    }
    if (mobileCartBadge) {
      mobileCartBadge.textContent = count;
    }
  }

  // Update Wishlist badge counter
  function updateWishlistBadge(count) {
    if (wishlistBadge) {
      wishlistBadge.textContent = count;
      wishlistBadge.classList.remove('bump');
      void wishlistBadge.offsetWidth;
      wishlistBadge.classList.add('bump');
    }
    if (topbarWishlistCount) {
      topbarWishlistCount.textContent = count;
    }
  }

  // Listen to State Events
  window.addEventListener('zooqe:cart-updated', (e) => {
    updateCartBadge(e.detail.count);
  });

  window.addEventListener('zooqe:wishlist-updated', (e) => {
    updateWishlistBadge(e.detail.count);
  });

  // Initial Sync
  updateCartBadge(cartState.getTotalCount());
  updateWishlistBadge(wishlistState.getCount());
}
