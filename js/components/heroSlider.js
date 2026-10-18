/**
 * ZOOQE Hero Product Showcase Slider
 * Manages the dynamic alternating carousel between:
 * State 0: Premium Luxury Pickle Bottle
 * State 1: Rich Raw Malabar Spices Arrangement
 */

export function initHeroSlider() {
  const stage = document.getElementById('hero-showcase-stage');
  const track = document.getElementById('showcase-slide-track');
  const badgeText = document.getElementById('showcase-badge-text');
  const dots = document.querySelectorAll('.showcase-dot');
  const slides = document.querySelectorAll('.showcase-slide-item');

  if (!stage || !track || slides.length < 2) return;

  const SLIDE_METADATA = [
    {
      index: 0,
      badge: '01 / HERITAGE PICKLE',
      ariaLabel: 'ZOOQE Artisanal Kerala Pickle Jar'
    },
    {
      index: 1,
      badge: '02 / MALABAR SPICES',
      ariaLabel: 'ZOOQE Single-Origin Malabar Spices'
    }
  ];

  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTOPLAY_INTERVAL = 5500; // 5.5 seconds per state

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    // Update track position for smooth horizontal sliding
    track.style.transform = `translateX(-${currentIndex * 50}%)`;

    // Update active classes on slide items
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update badge text with subtle fade
    if (badgeText) {
      badgeText.style.opacity = '0';
      setTimeout(() => {
        badgeText.textContent = SLIDE_METADATA[currentIndex].badge;
        badgeText.style.opacity = '1';
      }, 200);
    }

    // Update dot indicators
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
      dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // Interactive Dot Navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoPlay();
      }
    });
  });

  // Pause on hover / touch so visitors can inspect details
  stage.addEventListener('mouseenter', stopAutoPlay);
  stage.addEventListener('mouseleave', startAutoPlay);
  stage.addEventListener('touchstart', stopAutoPlay, { passive: true });
  stage.addEventListener('touchend', startAutoPlay, { passive: true });

  // Mobile Swipe Gesture Support
  let touchStartX = 0;
  let touchEndX = 0;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped Left
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped Right
      goToSlide(currentIndex - 1);
    }
  }

  // Initial setup
  goToSlide(0);
  startAutoPlay();
}
