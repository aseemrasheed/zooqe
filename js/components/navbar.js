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
    if (header) {
      if (currentScroll > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
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
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeDrawer();
        const target = document.querySelector(href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      } else {
        closeDrawer();
      }
    });
  });

  // Desktop smooth scrolling on nav links
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          desktopNavLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // Dynamic ScrollSpy for Desktop Navigation Links
  const spySections = [
    { id: 'hero', el: document.getElementById('hero') },
    { id: 'pickles', el: document.getElementById('pickles') },
    { id: 'spices', el: document.getElementById('spices') },
    { id: 'dry-fruits', el: document.getElementById('dry-fruits') || document.getElementById('snacks') },
    { id: 'about', el: document.getElementById('about') },
    { id: 'contact', el: document.getElementById('contact') }
  ].filter(s => s.el !== null);

  function updateScrollSpy() {
    if (!desktopNavLinks.length || !spySections.length) return;
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    let activeId = '';
    const picklesSection = spySections.find(s => s.id === 'pickles');
    const heroLimit = picklesSection ? (picklesSection.el.offsetTop - 180) : 350;

    if (scrollPos < heroLimit) {
      activeId = 'hero';
    } else {
      for (let i = spySections.length - 1; i >= 0; i--) {
        const sec = spySections[i];
        if (sec.id === 'hero') continue;
        if (scrollPos >= sec.el.offsetTop - 180) {
          activeId = sec.id;
          break;
        }
      }
    }

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}` || (activeId === 'dry-fruits' && href === '#snacks')) {
        link.classList.add('active');
      } else if (href && href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }

  let spyTicking = false;
  window.addEventListener('scroll', () => {
    if (!spyTicking) {
      window.requestAnimationFrame(() => {
        updateScrollSpy();
        spyTicking = false;
      });
      spyTicking = true;
    }
  }, { passive: true });

  // Initial ScrollSpy synchronization
  updateScrollSpy();

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
