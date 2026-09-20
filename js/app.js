import { PRODUCTS } from './data/products.js';
import { createProductCard } from './components/productCard.js';
import { initNavbar } from './components/navbar.js';
import { productModal } from './components/productModal.js';
import { cartDrawer } from './components/cartDrawer.js';
import { wishlistDrawer } from './components/wishlist.js';
import { searchModal } from './components/search.js';
import { filterManager } from './components/filter.js';
import { checkout } from './components/checkout.js';
import { orderConfirmation } from './components/orderConfirmation.js';
import { initReviewSlider } from './components/reviewSlider.js';
import { toast } from './components/toast.js';
import { WhatsApp } from './components/whatsapp.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Splash Loader Dismissal
  const loader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 400);
  });
  // Fallback in case window load fired earlier
  setTimeout(() => {
    if (loader && !loader.classList.contains('loaded')) {
      loader.classList.add('loaded');
    }
  }, 1000);

  // 2. Product Grid Container
  const gridContainer = document.getElementById('product-grid');

  function renderGrid(productsToRender) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (productsToRender.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--silver-500);">
          <h3 style="font-size: 1.3rem; color: #ffffff; margin-bottom: 0.5rem;">No products match the selected criteria.</h3>
          <p style="margin-bottom: 1.5rem;">Try adjusting your price range, sizes, or category filter.</p>
          <button class="btn-luxury-secondary" id="grid-reset-filters-btn">RESET FILTERS</button>
        </div>
      `;
      const resetBtn = document.getElementById('grid-reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => filterManager.reset());
      }
      return;
    }

    productsToRender.forEach(p => {
      const card = createProductCard(p, {
        onQuickView: (prod) => {
          productModal.open(prod, (prodToBuy, size, qty) => {
            checkout.open({
              isDirectBuy: true,
              directProduct: prodToBuy,
              directSize: size,
              directQuantity: qty
            }, handleOrderSuccess);
          });
        },
        onBuyNow: (prod, size, qty) => {
          checkout.open({
            isDirectBuy: true,
            directProduct: prod,
            directSize: size,
            directQuantity: qty
          }, handleOrderSuccess);
        }
      });
      gridContainer.appendChild(card);
    });
  }

  // 3. Initialize Filters & Product Catalog
  filterManager.init((filteredProducts) => {
    renderGrid(filteredProducts);
  });
  renderGrid(PRODUCTS);

  // 4. Handle Order Placement Success
  function handleOrderSuccess(orderData) {
    orderConfirmation.show(orderData);
    toast.show(`Order #${orderData.orderId} Confirmed! Thank you.`);
  }

  // 5. Initialize Navbar with Drawer Triggers
  initNavbar({
    onOpenCart: () => {
      cartDrawer.open(({ isDirectBuy }) => {
        checkout.open({ isDirectBuy: false }, handleOrderSuccess);
      });
    },
    onOpenWishlist: () => {
      wishlistDrawer.open();
    },
    onOpenSearch: () => {
      searchModal.open((selectedProduct) => {
        productModal.open(selectedProduct, (prodToBuy, size, qty) => {
          checkout.open({
            isDirectBuy: true,
            directProduct: prodToBuy,
            directSize: size,
            directQuantity: qty
          }, handleOrderSuccess);
        });
      });
    }
  });

  // 6. Initialize Testimonial Carousel
  initReviewSlider();

  // 7. Hero CTA Button Smooth Scrolls
  const heroShopBtn = document.getElementById('hero-shop-btn');
  const heroExploreBtn = document.getElementById('hero-explore-btn');

  if (heroShopBtn) {
    heroShopBtn.addEventListener('click', () => {
      const shop = document.getElementById('shop');
      if (shop) shop.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
      const collections = document.getElementById('collections');
      if (collections) collections.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 8. Collections Click-Throughs
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      if (cat) {
        filterManager.activeCategory = cat;
        filterManager.renderCategoryPills();
        filterManager.apply();
        const shop = document.getElementById('shop');
        if (shop) shop.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 9. Newsletter VIP Signup in Footer
  const vipForm = document.getElementById('footer-vip-form');
  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('footer-vip-email');
      if (input && input.value.trim()) {
        toast.show('Thank you for subscribing to the ZOOQE Private Gazette.');
        input.value = '';
      }
    });
  }

  // Contact section WhatsApp button
  const contactWhatsappBtn = document.getElementById('contact-whatsapp-btn');
  if (contactWhatsappBtn) {
    contactWhatsappBtn.addEventListener('click', () => {
      WhatsApp.openConcierge();
    });
  }

  // 10. Legal / Policy Modals Handlers
  const policyModal = document.getElementById('policy-modal-backdrop');
  const policyTitle = document.getElementById('policy-modal-title');
  const policyBody = document.getElementById('policy-modal-body');
  const policyClose = document.getElementById('policy-modal-close');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: '<p>At ZOOQE, we regard your privacy with the utmost discretion and confidentiality. Customer information is strictly utilized to process orders, arrange secure delivery, and provide priority customer support.</p><p>We never sell or distribute your personal data to external third parties.</p>'
    },
    terms: {
      title: 'Terms & Conditions',
      content: '<p>All orders placed through ZOOQE adhere to high culinary quality standards. By placing an order, you agree to receive hand-inspected artisanal Kerala pickles and spices prepared under strict quality, freshness, and packaging standards.</p>'
    },
    shipping: {
      title: 'Shipping Policy',
      content: '<p>Orders above $100 receive complimentary delivery. Each glass jar and spice canister is cushioned in secure packaging with airtight seals to ensure peak freshness upon arrival.</p><p>Standard delivery takes 2–4 business days with direct order tracking.</p>'
    },
    returns: {
      title: 'Return & Quality Policy',
      content: '<p>Every ZOOQE product is crafted with uncompromising commitment to quality. In the rare event that jar seal integrity is compromised during transit, please contact us immediately on WhatsApp for an express replacement or resolution.</p>'
    }
  };

  document.querySelectorAll('[data-policy]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = link.dataset.policy;
      if (policies[policyKey] && policyModal) {
        policyTitle.textContent = policies[policyKey].title;
        policyBody.innerHTML = policies[policyKey].content;
        policyModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (policyClose) {
    policyClose.addEventListener('click', () => {
      policyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (policyModal) {
    policyModal.addEventListener('click', (e) => {
      if (e.target === policyModal) {
        policyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 11. Universal Smooth Scroll & Focus Clearance for Internal Links
  // Prevents residual anchor fragments in browser history and dismisses lingering link preview tooltips
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          if (typeof anchor.blur === 'function') {
            anchor.blur();
          }
          // Avoid appending hash fragment to URL bar
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }
      }
    });
  });
});
