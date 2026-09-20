import { REVIEWS } from '../data/reviews.js';

export function initReviewSlider() {
  const track = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('reviews-prev-btn');
  const nextBtn = document.getElementById('reviews-next-btn');
  const dotsContainer = document.getElementById('reviews-dots');

  if (!track) return;

  // Render slides
  track.innerHTML = REVIEWS.map(r => `
    <div class="review-slide">
      <div class="review-card">
        <div class="review-rating-stars">
          ${renderStars(r.rating)}
        </div>
        <p class="review-quote">“${r.quote}”</p>
        <div class="review-author-wrap">
          <div>
            <div class="review-author-name">${r.name}</div>
            <div style="font-size: 0.76rem; color: var(--silver-600); margin-top: 2px;">${r.location} • ${r.product}</div>
          </div>
          ${r.verified ? `
          <div class="review-verified-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Verified
          </div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  let currentIndex = 0;
  const totalSlides = REVIEWS.length;

  function getVisibleSlides() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, totalSlides - getVisibleSlides());
  }

  function updateSlider() {
    const visible = getVisibleSlides();
    const slidePercent = 100 / visible;
    track.style.transform = `translateX(-${currentIndex * slidePercent}%)`;

    // Update dots
    if (dotsContainer) {
      const maxIdx = getMaxIndex();
      dotsContainer.innerHTML = Array.from({ length: maxIdx + 1 }).map((_, i) => `
        <div class="carousel-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></div>
      `).join('');

      dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          currentIndex = parseInt(dot.dataset.index, 10);
          updateSlider();
        });
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      updateSlider();
    });
  }

  window.addEventListener('resize', () => {
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    updateSlider();
  }, { passive: true });

  updateSlider();
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
