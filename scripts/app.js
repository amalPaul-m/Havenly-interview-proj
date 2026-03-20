// Sticky header shadow
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// Mobile nav toggle
const nav = document.getElementById('mainNav');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const mobileNavPanel = document.getElementById('mobileNavPanel');

const closeMobileMenu = () => {
  if (!nav || !menuToggleBtn) return;
  nav.classList.remove('open');
  menuToggleBtn.setAttribute('aria-expanded', 'false');
  menuToggleBtn.setAttribute('aria-label', 'Open account menu');
};

if (nav && menuToggleBtn && mobileNavPanel) {
  menuToggleBtn.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    menuToggleBtn.setAttribute('aria-expanded', String(willOpen));
    menuToggleBtn.setAttribute('aria-label', willOpen ? 'Close account menu' : 'Open account menu');
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      closeMobileMenu();
    }
  });

  mobileNavPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

// Desktop nav active state
const navLinks = document.querySelectorAll('.nav > .nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  });
});

// Shared search data/state
const suggestionData = {
  where: [
    { icon: 'pin', title: 'Goa', sub: 'India', color: '#ffe7cc', fg: '#ce5f15' },
    { icon: 'mountain', title: 'Manali', sub: 'Himachal Pradesh', color: '#ddeeff', fg: '#2563eb' },
    { icon: 'city', title: 'Bengaluru', sub: 'Karnataka', color: '#e9ddff', fg: '#7c3aed' },
    { icon: 'island', title: 'Bali', sub: 'Indonesia', color: '#dbf6dd', fg: '#0f9f59' }
  ],
  who: [
    { icon: 'user', title: '1 Guest', sub: 'Solo stay', color: '#ffe8d7', fg: '#d9480f' },
    { icon: 'couple', title: '2 Guests', sub: 'Couple trip', color: '#dcefff', fg: '#2563eb' },
    { icon: 'family', title: 'Family', sub: '3-5 guests', color: '#e8f9df', fg: '#15803d' },
    { icon: 'group', title: 'Group', sub: '6+ guests', color: '#f0e3ff', fg: '#7e22ce' }
  ]
};

const iconMap = {
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a6.25 6.25 0 0 0-6.25 6.25c0 4.7 5.26 10.75 6.25 12 1-1.25 6.25-7.3 6.25-12A6.25 6.25 0 0 0 12 2.5Zm0 9a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m3 19 5.3-8.2 2.2 3.4 3.5-5.2L21 19H3Z"/><path fill="currentColor" d="m12.2 9 1.8-2.8 2.1 3.2h-1.8L13 11.2Z"/></svg>',
  city: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 20V8.5l6-2v13.5H4Zm2-9h2v2H6v-2Zm0 4h2v2H6v-2Zm6 5V4l8-2v18h-4v-3h-2v3h-4Zm2-12h2v2h-2V8Zm0 4h2v2h-2v-2Zm4-4h2v2h-2V8Zm0 4h2v2h-2v-2Z"/></svg>',
  island: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 3h2v7h-2zM4 18a8 8 0 0 1 16 0H4Zm4.2-9.2 2 1.5a1 1 0 0 0 1.6-.6l.5-2.2c.1-.5-.5-.9-.9-.6l-3 2.4a.5.5 0 0 0-.2.7Z"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm-7 9a7 7 0 0 1 14 0H5Z"/></svg>',
  couple: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 11Zm8 0a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 16 11ZM2.5 21a5.5 5.5 0 0 1 11 0h-11Zm8 0a5.5 5.5 0 0 1 11 0h-11Z"/></svg>',
  family: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM6.5 10.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5ZM17.5 10.5A2.5 2.5 0 1 0 15 8a2.5 2.5 0 0 0 2.5 2.5ZM3 21a4.5 4.5 0 0 1 9 0H3Zm9 0a5 5 0 0 1 10 0h-10Z"/></svg>',
  group: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM6 11a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 6 11Zm12 0a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 18 11ZM2 21a4.5 4.5 0 0 1 9 0H2Zm11 0a4.5 4.5 0 0 1 9 0h-9Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v17H4V4h3V2Zm11 7H6v10h12V9Zm-8 2h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Z"/></svg>'
};

const today = new Date();
const searchState = {
  where: '',
  who: '',
  checkIn: '',
  checkOut: ''
};

const toISODate = dateObj => {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const addDays = (dateObj, days) => {
  const next = new Date(dateObj);
  next.setDate(next.getDate() + days);
  return next;
};

const formatDate = iso => new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric'
});

const formatRangeLabel = (start, end) => {
  if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
  if (start) return `${formatDate(start)} - Add checkout`;
  return '';
};

const searchViews = [];

const syncAllSearchViews = () => {
  const dateLabel = formatRangeLabel(searchState.checkIn, searchState.checkOut);

  searchViews.forEach(view => {
    if (view.values.where) {
      view.values.where.textContent = searchState.where || 'Search destination';
      view.values.where.classList.toggle('placeholder', !searchState.where);
    }

    if (view.values.when) {
      view.values.when.textContent = dateLabel || 'Add dates';
      view.values.when.classList.toggle('placeholder', !dateLabel);
    }

    if (view.values.who) {
      view.values.who.textContent = searchState.who || 'Add guest';
      view.values.who.classList.toggle('placeholder', !searchState.who);
    }
  });
};

const createSearchController = ({ root, suggestions, values, outsideRoot }) => {
  if (!root || !suggestions) return null;

  const segments = root.querySelectorAll('.search-segment');

  const clearActive = () => {
    segments.forEach(item => item.classList.remove('active'));
  };

  const closeSuggestions = () => {
    suggestions.classList.remove('open');
  };

  const applyDateSelection = () => {
    syncAllSearchViews();
    closeSuggestions();
    clearActive();
  };

  const renderListSuggestions = field => {
    if (!suggestionData[field]) return;

    suggestions.innerHTML = suggestionData[field].map(item => `
      <button class="suggestion-item" type="button" data-field="${field}" data-value="${item.title}">
        <span class="suggestion-icon" style="background:${item.color};color:${item.fg};">
          ${iconMap[item.icon] || iconMap.pin}
        </span>
        <span class="suggestion-text">
          <span class="suggestion-title">${item.title}</span>
          <span class="suggestion-sub">${item.sub}</span>
        </span>
      </button>
    `).join('');

    suggestions.classList.add('open');
  };

  const renderWhenSuggestions = () => {
    const minDate = toISODate(today);
    const checkIn = searchState.checkIn || '';
    const checkOut = searchState.checkOut || '';
    const minCheckout = checkIn || minDate;

    suggestions.innerHTML = `
      <div class="calendar-panel">
        <div class="calendar-title-wrap">
          <span class="suggestion-icon calendar-title-icon" style="background:#ffe0ea;color:#e11d48;">
            ${iconMap.calendar}
          </span>
          <div>
            <p class="calendar-title">Choose your dates</p>
            <p class="calendar-subtitle">Select check-in and check-out</p>
          </div>
        </div>
        <div class="calendar-inputs">
          <label class="calendar-field">
            <span>Check in</span>
            <input type="date" class="date-input" data-role="checkin" min="${minDate}" value="${checkIn}">
          </label>
          <label class="calendar-field">
            <span>Check out</span>
            <input type="date" class="date-input" data-role="checkout" min="${minCheckout}" value="${checkOut}">
          </label>
        </div>
        <div class="calendar-chips">
          <button type="button" class="date-chip" data-range="weekend">This weekend</button>
          <button type="button" class="date-chip" data-range="week">Next 7 days</button>
          <button type="button" class="date-chip" data-range="month">Next month</button>
        </div>
        <button type="button" class="calendar-apply">Apply dates</button>
      </div>
    `;

    suggestions.classList.add('open');
  };

  const renderSuggestions = field => {
    if (field === 'when') {
      renderWhenSuggestions();
      return;
    }
    renderListSuggestions(field);
  };

  segments.forEach(segment => {
    segment.addEventListener('click', () => {
      const isSameOpen = segment.classList.contains('active') && suggestions.classList.contains('open');
      if (isSameOpen) {
        closeSuggestions();
        clearActive();
        return;
      }

      clearActive();
      segment.classList.add('active');
      renderSuggestions(segment.dataset.field);
    });
  });

  suggestions.addEventListener('click', e => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
      const field = item.dataset.field;
      searchState[field] = item.dataset.value;
      syncAllSearchViews();
      closeSuggestions();
      clearActive();
      return;
    }

    const chip = e.target.closest('.date-chip');
    if (chip) {
      const range = chip.dataset.range;
      if (range === 'weekend') {
        searchState.checkIn = toISODate(addDays(today, 2));
        searchState.checkOut = toISODate(addDays(today, 4));
      } else if (range === 'week') {
        searchState.checkIn = toISODate(addDays(today, 1));
        searchState.checkOut = toISODate(addDays(today, 8));
      } else if (range === 'month') {
        searchState.checkIn = toISODate(addDays(today, 30));
        searchState.checkOut = toISODate(addDays(today, 37));
      }
      renderWhenSuggestions();
      return;
    }

    if (e.target.closest('.calendar-apply')) {
      applyDateSelection();
    }
  });

  suggestions.addEventListener('change', e => {
    if (!e.target.classList.contains('date-input')) return;

    const checkInInput = suggestions.querySelector('[data-role="checkin"]');
    const checkOutInput = suggestions.querySelector('[data-role="checkout"]');
    if (!checkInInput || !checkOutInput) return;

    searchState.checkIn = checkInInput.value;
    searchState.checkOut = checkOutInput.value;

    if (searchState.checkIn) {
      checkOutInput.min = searchState.checkIn;
      if (searchState.checkOut && searchState.checkOut < searchState.checkIn) {
        searchState.checkOut = searchState.checkIn;
        checkOutInput.value = searchState.checkIn;
      }
    }
  });

  document.addEventListener('click', e => {
    if (!outsideRoot.contains(e.target)) {
      closeSuggestions();
      clearActive();
    }
  });

  return {
    closeSuggestions,
    clearActive
  };
};

const desktopRoot = document.getElementById('searchBar');
const desktopController = createSearchController({
  root: desktopRoot,
  suggestions: document.getElementById('searchSuggestions'),
  values: {
    where: document.getElementById('locationVal'),
    when: document.getElementById('whenVal'),
    who: document.getElementById('guestsVal')
  },
  outsideRoot: desktopRoot || document.body
});

if (desktopRoot) {
  searchViews.push({
    values: {
      where: document.getElementById('locationVal'),
      when: document.getElementById('whenVal'),
      who: document.getElementById('guestsVal')
    }
  });
}

const mobileSearchModal = document.getElementById('mobileSearchModal');
const mobileSearchBtn = document.querySelector('.search-mobile-btn');
const closeSearchModalBtn = document.getElementById('closeSearchModal');
const mobileRoot = document.getElementById('mobileSearchBar');

const mobileController = createSearchController({
  root: mobileRoot,
  suggestions: document.getElementById('searchSuggestionsMobile'),
  values: {
    where: document.getElementById('locationValMobile'),
    when: document.getElementById('whenValMobile'),
    who: document.getElementById('guestsValMobile')
  },
  outsideRoot: mobileRoot ? mobileRoot.closest('.mobile-search-dialog') : document.body
});

if (mobileRoot) {
  searchViews.push({
    values: {
      where: document.getElementById('locationValMobile'),
      when: document.getElementById('whenValMobile'),
      who: document.getElementById('guestsValMobile')
    }
  });
}

const openMobileSearchModal = () => {
  if (!mobileSearchModal) return;
  mobileSearchModal.classList.add('open');
  mobileSearchModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (mobileSearchBtn) {
    mobileSearchBtn.setAttribute('aria-expanded', 'true');
    mobileSearchBtn.setAttribute('aria-controls', 'mobileSearchModal');
  }
  closeMobileMenu();
};

const closeMobileSearchModal = () => {
  if (!mobileSearchModal) return;
  mobileSearchModal.classList.remove('open');
  mobileSearchModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (mobileSearchBtn) {
    mobileSearchBtn.setAttribute('aria-expanded', 'false');
  }
  if (mobileController) {
    mobileController.closeSuggestions();
    mobileController.clearActive();
  }
};

if (mobileSearchBtn) {
  mobileSearchBtn.addEventListener('click', openMobileSearchModal);
}

if (closeSearchModalBtn) {
  closeSearchModalBtn.addEventListener('click', closeMobileSearchModal);
}

if (mobileSearchModal) {
  mobileSearchModal.addEventListener('click', e => {
    if (e.target === mobileSearchModal) {
      closeMobileSearchModal();
    }
  });
}

const mobileSearchSubmit = document.querySelector('.mobile-search-submit');
if (mobileSearchSubmit) {
  mobileSearchSubmit.addEventListener('click', () => {
    if (mobileController) {
      mobileController.closeSuggestions();
      mobileController.clearActive();
    }
    closeMobileSearchModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeMobileSearchModal();
    if (desktopController) {
      desktopController.closeSuggestions();
      desktopController.clearActive();
    }
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMobileSearchModal();
  }
});

syncAllSearchViews();

// Category active state
const catItems = document.querySelectorAll('.cat-item');
catItems.forEach(item => {
  item.addEventListener('click', () => {
    catItems.forEach(c => c.classList.remove('active'));
    item.classList.add('active');
  });
});

// Category horizontal nav arrows
const categoriesEl = document.getElementById('categories');
const catNavLeft = document.getElementById('catNavLeft');
const catNavRight = document.getElementById('catNavRight');

const updateCategoryNavState = () => {
  if (!categoriesEl || !catNavLeft || !catNavRight) return;
  const maxScroll = Math.max(0, categoriesEl.scrollWidth - categoriesEl.clientWidth);
  const atStart = categoriesEl.scrollLeft <= 2;
  const atEnd = categoriesEl.scrollLeft >= maxScroll - 2;
  catNavLeft.classList.toggle('is-disabled', atStart);
  catNavRight.classList.toggle('is-disabled', atEnd);
};

if (categoriesEl && catNavLeft && catNavRight) {
  const getScrollStep = () => Math.max(240, Math.round(categoriesEl.clientWidth * 0.42));

  catNavLeft.addEventListener('click', () => {
    categoriesEl.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  catNavRight.addEventListener('click', () => {
    categoriesEl.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  categoriesEl.addEventListener('scroll', updateCategoryNavState, { passive: true });
  window.addEventListener('resize', updateCategoryNavState);
  updateCategoryNavState();
}

// Wishlist toggle
document.querySelectorAll('.card-wish').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.classList.toggle('active');
  });
});

// Stagger cards on load
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});






// Image fallback placeholder (prevents broken image slots)
const buildFallbackImageSrc = img => {
  const rawSeed = (img.alt || 'havenly-stay').toLowerCase().replace(/\s+/g, '-');
  const safeSeed = encodeURIComponent(rawSeed);
  return `https://picsum.photos/seed/${safeSeed}/1200/900`;
};

const applyImageFallback = img => {
  if (img.dataset.fallbackApplied === 'true') return;
  img.dataset.fallbackApplied = 'true';
  img.src = buildFallbackImageSrc(img);
  if (!img.alt) img.alt = 'Stay image placeholder';
};

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => applyImageFallback(img));

  // Handle empty/missing src values immediately.
  if (!img.getAttribute('src')) {
    applyImageFallback(img);
  }
});
