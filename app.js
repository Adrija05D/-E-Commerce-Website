// ==========================================================================
// BookNest — Online Bookstore Application Logic & State Engine
// Model: B2C E-Commerce Bookstore with Physical Books & Digital Goods
// Headquarters: College Street Academic Hub, Kolkata, India
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Reactive State Store with LocalStorage Persistence
  // ------------------------------------------------------------------------
  const STORAGE_KEYS = {
    CART: "booknest_cart_v2",
    WISHLIST: "booknest_wishlist_v2",
    CURRENCY: "booknest_currency_v2"
  };

  const defaultCart = [
    { id: "bn-acad-01", format: "Paperback (Print Edition)", quantity: 1 },
    { id: "bn-notes-01", format: "Digital Revision Pack (PDF + Solved Papers)", quantity: 1 }
  ];

  function loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  const state = {
    cart: loadFromStorage(STORAGE_KEYS.CART, defaultCart),
    wishlist: loadFromStorage(STORAGE_KEYS.WISHLIST, ["bn-acad-01", "bn-nov-01"]),
    currency: loadFromStorage(STORAGE_KEYS.CURRENCY, "INR"),
    currencyRates: {
      INR: { symbol: "₹", rate: 83.5 },
      USD: { symbol: "$", rate: 1.0 },
      EUR: { symbol: "€", rate: 0.92 },
      GBP: { symbol: "£", rate: 0.79 }
    },
    activeCategory: "all",
    searchQuery: "",
    sortBy: "featured",
    showWishlistOnly: false,
    appliedPromo: null,
    readerFontSize: "normal",
    selectedPaymentMethod: "card",
    checkoutStep: 1,
    lastOrder: null
  };

  // ------------------------------------------------------------------------
  // 2. DOM Elements
  // ------------------------------------------------------------------------
  const booksGrid = document.getElementById("booksGrid");
  const departmentTabs = document.getElementById("departmentTabs");
  const sortSelect = document.getElementById("sortSelect");
  const currencySelect = document.getElementById("currencySelect");
  const headerSearchInput = document.getElementById("headerSearchInput");
  const searchFilterStatus = document.getElementById("searchFilterStatus");
  const searchStatusText = document.getElementById("searchStatusText");
  const wishlistFilterToggle = document.getElementById("wishlistFilterToggle");
  const wishlistFilterCount = document.getElementById("wishlistFilterCount");

  // Badges & Counters
  const cartBadge = document.getElementById("cartBadge");
  const wishlistBadge = document.getElementById("wishlistBadge");
  const wishlistDrawerCount = document.getElementById("wishlistDrawerCount");

  // Drawers
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartTotalEl = document.getElementById("cartTotal");
  const promoInput = document.getElementById("promoInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoAlert = document.getElementById("promoAlert");
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");

  const wishlistDrawer = document.getElementById("wishlistDrawer");
  const wishlistBackdrop = document.getElementById("wishlistBackdrop");
  const wishlistCloseBtn = document.getElementById("wishlistCloseBtn");
  const wishlistItemsList = document.getElementById("wishlistItemsList");
  const wishlistTriggerBtn = document.getElementById("wishlistTriggerBtn");

  // Modals
  const bookPreviewModal = document.getElementById("bookPreviewModal");
  const bookPreviewCloseBtn = document.getElementById("bookPreviewCloseBtn");
  const bookPreviewContent = document.getElementById("bookPreviewContent");
  const previewModalTitle = document.getElementById("previewModalTitle");

  const productDetailModal = document.getElementById("productDetailModal");
  const productDetailCloseBtn = document.getElementById("productDetailCloseBtn");
  const productDetailContent = document.getElementById("productDetailContent");

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutCloseBtn = document.getElementById("checkoutCloseBtn");
  const checkoutStepsContainer = document.getElementById("checkoutStepsContainer");

  const authModal = document.getElementById("authModal");
  const authTriggerBtn = document.getElementById("authTriggerBtn");
  const authCloseBtn = document.getElementById("authCloseBtn");

  const toastContainer = document.getElementById("toastContainer");

  // ------------------------------------------------------------------------
  // 3. Helper Functions: Pricing & Toast
  // ------------------------------------------------------------------------
  function formatPrice(amountInUSD) {
    const cur = state.currencyRates[state.currency] || state.currencyRates.INR;
    const converted = amountInUSD * cur.rate;
    if (state.currency === "INR") {
      return `${cur.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${cur.symbol}${converted.toFixed(2)}`;
  }
  window.formatPrice = formatPrice;

  function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "✓" : "⚠";
    toast.innerHTML = `<span style="font-weight:700; color:${type === 'success' ? '#10b981' : '#ef4444'}">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }
  window.showToast = showToast;

  // ------------------------------------------------------------------------
  // 4. Catalog Filtering & Rendering
  // ------------------------------------------------------------------------
  function getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    // Wishlist Only Filter
    if (state.showWishlistOnly) {
      list = list.filter(p => state.wishlist.includes(p.id));
    }

    // Category Filter
    if (state.activeCategory !== "all") {
      list = list.filter(p => p.category === state.activeCategory);
    }

    // Search Query Filter
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.isbn13 && p.isbn13.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (state.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "downloads") {
      list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    }

    return list;
  }

  function renderProducts() {
    if (!booksGrid) return;
    const products = getFilteredProducts();

    // Update Search Status Bar
    if (searchFilterStatus && searchStatusText) {
      if (state.searchQuery.trim() !== "") {
        searchFilterStatus.style.display = "flex";
        searchStatusText.textContent = `Showing results for "${state.searchQuery}" (${products.length} titles)`;
      } else if (state.showWishlistOnly) {
        searchFilterStatus.style.display = "flex";
        searchStatusText.textContent = `Showing saved wishlist books (${products.length} titles)`;
      } else {
        searchFilterStatus.style.display = "none";
      }
    }

    // Update Wishlist Badges
    const wishlistCount = state.wishlist.length;
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistCount;
      wishlistBadge.style.display = wishlistCount > 0 ? "flex" : "none";
    }
    if (wishlistFilterCount) wishlistFilterCount.textContent = wishlistCount;
    if (wishlistDrawerCount) wishlistDrawerCount.textContent = wishlistCount;

    if (products.length === 0) {
      booksGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📚</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #fff; margin-bottom: 0.5rem;">No books match your criteria</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 420px; margin: 0 auto 1.5rem;">
            Try checking for spelling variations or search for "Laudon", "MIS", "Atomic Habits", or "Notes".
          </p>
          <button type="button" class="btn-primary" onclick="resetSearchAndFilter()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    booksGrid.innerHTML = products.map(book => {
      const isWishlisted = state.wishlist.includes(book.id);
      const isCarted = state.cart.some(item => item.id === book.id);
      const defaultFormat = book.availableFormats ? book.availableFormats[0].type : book.format;

      return `
        <article class="book-card" data-id="${book.id}">
          <div class="book-card-cover-wrap">
            <img src="${book.image}" alt="${book.title} cover" class="book-card-cover" loading="lazy">
            <span class="book-card-badge">${book.badge}</span>
            <button type="button" class="book-card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="toggle-wishlist" data-id="${book.id}" aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
              ♥
            </button>
          </div>

          <div class="book-card-dept">${book.categoryLabel.split('&')[0].trim()}</div>
          <h3 class="book-card-title">${book.title}</h3>
          <div class="book-card-author">✍ ${book.author}</div>

          <div class="book-card-rating">
            <span class="rating-star">★</span>
            <span style="font-weight: 600; color: #fff;">${book.rating.toFixed(1)}</span>
            <span style="color: var(--text-muted); font-size: 0.75rem;">(${book.reviewsCount})</span>
          </div>

          <div class="book-card-meta-line">
            <span>📖 ${book.pages} pgs</span>
            <span>•</span>
            <span style="color: ${book.inStock ? 'var(--success)' : 'var(--warning)'};">
              ${book.inStock ? '✓ In Stock' : 'Digital Only'}
            </span>
          </div>

          <div class="book-card-footer">
            <div>
              <div class="current-price">${formatPrice(book.price)}</div>
              <div class="original-price">${formatPrice(book.originalPrice)}</div>
            </div>

            <div class="book-card-actions">
              <button type="button" class="btn-sample-trigger" data-action="preview" data-id="${book.id}" title="Read Sample Chapter">
                Read Sample
              </button>
              <button type="button" class="btn-cart-trigger ${isCarted ? 'in-cart' : ''}" data-action="add-cart" data-id="${book.id}" data-format="${defaultFormat}">
                ${isCarted ? '✓ In Cart' : '+ Cart'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Attach Event Listeners
    booksGrid.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.dataset.id, btn.dataset.format, 1);
      });
    });

    booksGrid.querySelectorAll('[data-action="preview"]').forEach(btn => {
      btn.addEventListener("click", () => {
        openBookPreview(btn.dataset.id);
      });
    });

    booksGrid.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
      btn.addEventListener("click", () => {
        toggleWishlist(btn.dataset.id);
      });
    });

    // Clicking on card title or image opens full details
    booksGrid.querySelectorAll('.book-card-title, .book-card-cover').forEach(el => {
      el.addEventListener("click", (e) => {
        const card = e.target.closest('.book-card');
        if (card) openProductDetail(card.dataset.id);
      });
      el.style.cursor = "pointer";
    });
  }

  window.resetSearchAndFilter = function() {
    state.searchQuery = "";
    state.activeCategory = "all";
    state.showWishlistOnly = false;
    if (headerSearchInput) headerSearchInput.value = "";
    if (wishlistFilterToggle) wishlistFilterToggle.classList.remove("active");
    updateDepartmentTabsUI();
    renderProducts();
  };

  function updateDepartmentTabsUI() {
    if (!departmentTabs) return;
    departmentTabs.querySelectorAll(".tab-btn").forEach(btn => {
      const isMatch = btn.dataset.category === state.activeCategory;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-selected", isMatch ? "true" : "false");
    });
  }

  // ------------------------------------------------------------------------
  // 5. Wishlist Management
  // ------------------------------------------------------------------------
  function toggleWishlist(productId) {
    const book = PRODUCTS_DATA.find(p => p.id === productId);
    if (!book) return;

    if (state.wishlist.includes(productId)) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
      showToast(`Removed "${book.title}" from your wishlist.`, "info");
    } else {
      state.wishlist.push(productId);
      showToast(`Saved "${book.title}" to your wishlist!`);
    }

    saveToStorage(STORAGE_KEYS.WISHLIST, state.wishlist);
    renderProducts();
    renderWishlistDrawer();
  }
  window.toggleWishlist = toggleWishlist;

  function filterByWishlist() {
    state.showWishlistOnly = !state.showWishlistOnly;
    if (wishlistFilterToggle) {
      wishlistFilterToggle.classList.toggle("active", state.showWishlistOnly);
      wishlistFilterToggle.setAttribute("aria-pressed", state.showWishlistOnly ? "true" : "false");
    }
    renderProducts();
  }
  window.filterByWishlist = filterByWishlist;

  if (wishlistFilterToggle) {
    wishlistFilterToggle.addEventListener("click", filterByWishlist);
  }

  function renderWishlistDrawer() {
    if (!wishlistItemsList) return;
    if (state.wishlist.length === 0) {
      wishlistItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">♥</div>
          <p style="font-size: 1rem; color: #fff; margin-bottom: 0.25rem;">Your wishlist is empty</p>
          <p style="font-size: 0.8125rem;">Click the heart icon on any book to save it for later.</p>
        </div>
      `;
      return;
    }

    wishlistItemsList.innerHTML = state.wishlist.map(id => {
      const book = PRODUCTS_DATA.find(p => p.id === id);
      if (!book) return "";
      const defaultFormat = book.availableFormats ? book.availableFormats[0].type : book.format;

      return `
        <div class="cart-item-card">
          <img src="${book.image}" alt="${book.title}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h4>${book.title}</h4>
            <div class="cart-item-author">✍ ${book.author}</div>
            <div style="font-size: 0.875rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">${formatPrice(book.price)}</div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="addToCart('${book.id}', '${defaultFormat}', 1); toggleWishlist('${book.id}');">
                Move to Cart
              </button>
              <button type="button" class="cart-item-remove-btn" onclick="toggleWishlist('${book.id}')">
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function openWishlist() {
    renderWishlistDrawer();
    if (wishlistDrawer) wishlistDrawer.classList.add("active");
    if (wishlistBackdrop) wishlistBackdrop.classList.add("active");
  }

  function closeWishlist() {
    if (wishlistDrawer) wishlistDrawer.classList.remove("active");
    if (wishlistBackdrop) wishlistBackdrop.classList.remove("active");
  }
  window.closeWishlist = closeWishlist;

  if (wishlistTriggerBtn) wishlistTriggerBtn.addEventListener("click", openWishlist);
  if (wishlistCloseBtn) wishlistCloseBtn.addEventListener("click", closeWishlist);
  if (wishlistBackdrop) wishlistBackdrop.addEventListener("click", closeWishlist);

  // ------------------------------------------------------------------------
  // 6. Shopping Cart Management
  // ------------------------------------------------------------------------
  function addToCart(productId, formatName = "Standard Edition", quantity = 1) {
    const book = PRODUCTS_DATA.find(p => p.id === productId);
    if (!book) return;

    const existing = state.cart.find(item => item.id === productId && item.format === formatName);
    if (existing) {
      existing.quantity = Math.min(10, existing.quantity + quantity);
      showToast(`Updated quantity of "${book.title}" to ${existing.quantity}.`);
    } else {
      state.cart.push({ id: productId, format: formatName, quantity: Math.min(10, quantity) });
      showToast(`Added "${book.title}" to your cart!`);
    }

    saveToStorage(STORAGE_KEYS.CART, state.cart);
    renderCart();
    renderProducts();
  }
  window.addToCart = addToCart;

  function removeFromCart(productId, formatName) {
    state.cart = state.cart.filter(item => !(item.id === productId && item.format === formatName));
    saveToStorage(STORAGE_KEYS.CART, state.cart);
    showToast("Book removed from cart.", "info");
    renderCart();
    renderProducts();
  }

  function updateCartQuantity(productId, formatName, delta) {
    const item = state.cart.find(i => i.id === productId && i.format === formatName);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId, formatName);
    } else if (item.quantity > 10) {
      showToast("Maximum 10 copies per academic order allowed.", "warning");
      item.quantity = 10;
      renderCart();
    } else {
      saveToStorage(STORAGE_KEYS.CART, state.cart);
      renderCart();
    }
  }

  function calculateCartTotals() {
    let subtotalUSD = 0;
    state.cart.forEach(item => {
      const book = PRODUCTS_DATA.find(p => p.id === item.id);
      if (book) {
        let price = book.price;
        if (book.availableFormats) {
          const matched = book.availableFormats.find(f => f.type === item.format);
          if (matched) price = matched.priceUSD;
        }
        subtotalUSD += price * item.quantity;
      }
    });

    let discountUSD = 0;
    if (state.appliedPromo && PROMO_CODES[state.appliedPromo]) {
      const percent = PROMO_CODES[state.appliedPromo].discountPercent;
      discountUSD = (subtotalUSD * percent) / 100;
    }

    const totalUSD = Math.max(0, subtotalUSD - discountUSD);
    const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotalUSD, discountUSD, totalUSD, itemCount };
  }

  function renderCart() {
    const { subtotalUSD, discountUSD, totalUSD, itemCount } = calculateCartTotals();

    if (cartBadge) {
      cartBadge.textContent = itemCount;
      cartBadge.style.display = itemCount > 0 ? "flex" : "none";
    }

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotalUSD);
    if (cartDiscountEl) cartDiscountEl.textContent = discountUSD > 0 ? `-${formatPrice(discountUSD)}` : formatPrice(0);
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(totalUSD);

    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🛒</div>
          <p style="font-size: 1rem; color: #fff; margin-bottom: 0.25rem;">Your cart is empty</p>
          <p style="font-size: 0.8125rem;">Explore university textbooks and exam revision notes.</p>
        </div>
      `;
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = true;
      return;
    }

    if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = false;

    cartItemsList.innerHTML = state.cart.map(item => {
      const book = PRODUCTS_DATA.find(p => p.id === item.id);
      if (!book) return "";

      let unitPrice = book.price;
      if (book.availableFormats) {
        const matched = book.availableFormats.find(f => f.type === item.format);
        if (matched) unitPrice = matched.priceUSD;
      }

      return `
        <div class="cart-item-card">
          <img src="${book.image}" alt="${book.title}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h4>${book.title}</h4>
            <div class="cart-item-author">✍ ${book.author}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
              Format: <span style="color:#fff;">${item.format.split('(')[0].trim()}</span>
            </div>
            
            <div class="cart-item-row">
              <div class="quantity-stepper">
                <button type="button" class="stepper-btn" data-action="minus" data-id="${item.id}" data-format="${item.format}">−</button>
                <span class="stepper-val">${item.quantity}</span>
                <button type="button" class="stepper-btn" data-action="plus" data-id="${item.id}" data-format="${item.format}">+</button>
              </div>
              <div style="font-weight: 700; color: #fff; font-size: 0.9375rem;">
                ${formatPrice(unitPrice * item.quantity)}
              </div>
              <button type="button" class="cart-item-remove-btn" data-action="remove" data-id="${item.id}" data-format="${item.format}">
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    cartItemsList.querySelectorAll('[data-action="minus"]').forEach(btn => {
      btn.addEventListener("click", () => updateCartQuantity(btn.dataset.id, btn.dataset.format, -1));
    });
    cartItemsList.querySelectorAll('[data-action="plus"]').forEach(btn => {
      btn.addEventListener("click", () => updateCartQuantity(btn.dataset.id, btn.dataset.format, 1));
    });
    cartItemsList.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(btn.dataset.id, btn.dataset.format));
    });
  }

  function openCart() {
    renderCart();
    if (cartDrawer) cartDrawer.classList.add("active");
    if (cartBackdrop) cartBackdrop.classList.add("active");
  }
  window.openCart = openCart;

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove("active");
    if (cartBackdrop) cartBackdrop.classList.remove("active");
  }
  window.closeCart = closeCart;

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Promo Code Validation
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener("click", () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;

      if (PROMO_CODES[code]) {
        state.appliedPromo = code;
        if (promoAlert) {
          promoAlert.style.display = "block";
          promoAlert.style.color = "var(--success)";
          promoAlert.textContent = `✓ Applied ${code}: ${PROMO_CODES[code].description}`;
        }
        showToast(`Promo code ${code} applied successfully!`);
        renderCart();
      } else {
        if (promoAlert) {
          promoAlert.style.display = "block";
          promoAlert.style.color = "var(--danger)";
          promoAlert.textContent = `✕ Invalid promo code. Try BOOK20 or SRUTI50.`;
        }
        showToast("Invalid promo coupon code.", "error");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. Book Preview / Sample Reader Modal (Look Inside)
  // ------------------------------------------------------------------------
  function openBookPreview(productId) {
    const book = PRODUCTS_DATA.find(p => p.id === productId);
    if (!book || !bookPreviewModal || !bookPreviewContent) return;

    if (previewModalTitle) {
      previewModalTitle.textContent = `${book.title} — Look Inside`;
    }

    const preview = book.preview || {
      sampleChapterTitle: "Chapter 1: Overview & Objectives",
      pagesAvailable: 10,
      tableOfContents: ["1. Introduction", "2. Core Principles", "3. Solved Exercises"],
      excerptHtml: `<div class="sample-excerpt"><p>${book.fullDescription}</p></div>`
    };

    bookPreviewContent.innerHTML = `
      <div class="reader-layout-grid" style="width: 100%;">
        <aside class="reader-sidebar">
          <img src="${book.image}" alt="${book.title}" style="width: 130px; border-radius: var(--radius-xs); box-shadow: var(--shadow-book); margin: 0 auto; display: block;">
          <div style="text-align: center;">
            <div style="font-weight: 600; font-size: 0.9375rem; color: #fff;">${book.title}</div>
            <div style="font-size: 0.8125rem; color: var(--brand-accent); margin-top: 0.2rem;">✍ ${book.author}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.25rem;">ISBN: ${book.isbn13}</div>
          </div>

          <div>
            <div class="reader-toc-title">Table of Contents (${preview.pagesAvailable} Preview Pages)</div>
            <div style="display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.5rem;">
              ${preview.tableOfContents.map((ch, idx) => `
                <div class="reader-toc-item ${idx === 0 ? 'active' : ''}">${ch}</div>
              `).join("")}
            </div>
          </div>
        </aside>

        <section class="reader-content-pane ${state.readerFontSize !== 'normal' ? 'font-' + state.readerFontSize : ''}" id="readerTextPane">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brand-accent); font-weight: 700; margin-bottom: 0.25rem;">
            Sample Chapter Preview • ~6 Min Read
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
            ${preview.sampleChapterTitle}
          </h2>

          <div class="reader-body-text">
            ${preview.excerptHtml}
          </div>

          <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Available in Print & Instant Digital E-Book:</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: #fff;">${formatPrice(book.price)}</div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn-secondary" onclick="closeBookPreviewModal()">Close Preview</button>
              <button type="button" class="btn-primary" onclick="addToCart('${book.id}', '${book.availableFormats ? book.availableFormats[0].type : book.format}', 1); closeBookPreviewModal(); openCart();">
                Add to Cart (${formatPrice(book.price)})
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    bookPreviewModal.classList.add("active");
  }
  window.openBookPreview = openBookPreview;

  function closeBookPreviewModal() {
    if (bookPreviewModal) bookPreviewModal.classList.remove("active");
  }
  window.closeBookPreviewModal = closeBookPreviewModal;

  if (bookPreviewCloseBtn) bookPreviewCloseBtn.addEventListener("click", closeBookPreviewModal);
  if (bookPreviewModal) {
    bookPreviewModal.addEventListener("click", (e) => {
      if (e.target === bookPreviewModal) closeBookPreviewModal();
    });
  }

  function setReaderFontSize(size) {
    state.readerFontSize = size;
    const pane = document.getElementById("readerTextPane");
    if (pane) {
      pane.className = `reader-content-pane ${size !== 'normal' ? 'font-' + size : ''}`;
    }
  }
  window.setReaderFontSize = setReaderFontSize;

  // ------------------------------------------------------------------------
  // 8. Product Quick-View / Detail Modal
  // ------------------------------------------------------------------------
  function openProductDetail(productId) {
    const book = PRODUCTS_DATA.find(p => p.id === productId);
    if (!book || !productDetailModal || !productDetailContent) return;

    const formats = book.availableFormats || [
      { type: "Standard Edition", priceUSD: book.price, originalPriceUSD: book.originalPrice, delivery: "Standard delivery" }
    ];

    productDetailContent.innerHTML = `
      <div class="detail-modal-grid">
        <div>
          <img src="${book.image}" alt="${book.title}" style="width: 100%; border-radius: var(--radius-xs); box-shadow: var(--shadow-book);">
          
          <table class="specs-table">
            <tbody>
              <tr><td class="specs-label">ISBN-13</td><td class="specs-value" style="font-family: var(--font-mono);">${book.isbn13}</td></tr>
              <tr><td class="specs-label">Publisher</td><td class="specs-value">${book.publisher || 'BookNest Academic Press'}</td></tr>
              <tr><td class="specs-label">Publication Year</td><td class="specs-value">${book.publicationYear || '2022'}</td></tr>
              <tr><td class="specs-label">Edition</td><td class="specs-value">${book.edition || 'Current Edition'}</td></tr>
              <tr><td class="specs-label">Pages</td><td class="specs-value">${book.pages} Printed Pages</td></tr>
              <tr><td class="specs-label">Language</td><td class="specs-value">${book.language || 'English'}</td></tr>
              <tr><td class="specs-label">Stock Status</td><td class="specs-value" style="color: var(--success);">In Stock (${book.stockCount || 50} copies)</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: var(--brand-accent); margin-bottom: 0.25rem;">
            ${book.categoryLabel}
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: #fff; line-height: 1.25; margin-bottom: 0.35rem;">
            ${book.title}
          </h2>
          <div style="font-size: 0.9375rem; color: var(--brand-accent); margin-bottom: 0.75rem; font-weight: 500;">
            ✍ Author: ${book.author}
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem;">
            <span style="color: #fbbf24;">★</span>
            <span style="font-weight: 700; color: #fff;">${book.rating.toFixed(1)}</span>
            <span style="color: var(--text-muted);">(${book.reviewsCount} verified reviews)</span>
            <span style="color: var(--text-muted);">•</span>
            <span style="color: var(--success); font-weight: 500;">${book.downloadsCount.toLocaleString()} downloads</span>
          </div>

          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
            ${book.fullDescription}
          </p>

          <div style="margin-bottom: 1.25rem;">
            <label class="form-label" style="margin-bottom: 0.5rem;">Select Edition & Format:</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="formatChoiceGroup">
              ${formats.map((f, idx) => `
                <label style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.85rem; border: 1px solid ${idx === 0 ? 'var(--brand-primary)' : 'var(--border-subtle)'}; background: ${idx === 0 ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface-elevated)'}; border-radius: var(--radius-xs); cursor: pointer;">
                  <span style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem;">
                    <input type="radio" name="formatChoice" value="${f.type}" data-price="${f.priceUSD}" ${idx === 0 ? 'checked' : ''}>
                    <span>${f.type}</span>
                  </span>
                  <span style="font-weight: 700; color: #fff; font-size: 0.875rem;">${formatPrice(f.priceUSD)}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
            <button type="button" class="btn-secondary" style="flex: 1;" onclick="closeProductDetailModal(); openBookPreview('${book.id}')">
              📖 Read Sample
            </button>
            <button type="button" class="btn-primary" style="flex: 1.5;" id="modalAddCartBtn">
              Add to Cart (<span id="modalCurrentPriceDisplay">${formatPrice(formats[0].priceUSD)}</span>)
            </button>
          </div>

          <!-- Customer Reviews List -->
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
            <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: #fff; margin-bottom: 0.75rem;">Student Reviews</h4>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${book.reviews.map(r => `
                <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 0.25rem;">
                    <strong>${r.author} <span style="font-weight: normal; color: var(--text-muted); font-size: 0.75rem;">(${r.role})</span></strong>
                    <span style="color: #fbbf24;">★ ${r.rating}</span>
                  </div>
                  <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">${r.text}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    // Dynamic Format Radio Handler
    const formatRadios = productDetailContent.querySelectorAll('input[name="formatChoice"]');
    formatRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        const price = parseFloat(e.target.dataset.price);
        document.getElementById("modalCurrentPriceDisplay").textContent = formatPrice(price);
      });
    });

    const addBtn = document.getElementById("modalAddCartBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const selected = productDetailContent.querySelector('input[name="formatChoice"]:checked');
        const formatName = selected ? selected.value : formats[0].type;
        addToCart(book.id, formatName, 1);
        closeProductDetailModal();
        openCart();
      });
    }

    productDetailModal.classList.add("active");
  }
  window.openProductDetail = openProductDetail;

  function closeProductDetailModal() {
    if (productDetailModal) productDetailModal.classList.remove("active");
  }
  window.closeProductDetailModal = closeProductDetailModal;

  if (productDetailCloseBtn) productDetailCloseBtn.addEventListener("click", closeProductDetailModal);
  if (productDetailModal) {
    productDetailModal.addEventListener("click", (e) => {
      if (e.target === productDetailModal) closeProductDetailModal();
    });
  }

  // ------------------------------------------------------------------------
  // 9. Interactive 4-Step Checkout Flow
  // ------------------------------------------------------------------------
  function openCheckout() {
    if (state.cart.length === 0) {
      showToast("Your cart is empty! Add books or revision notes first.", "error");
      return;
    }
    state.checkoutStep = 1;
    renderCheckoutStep();
    if (checkoutModal) checkoutModal.classList.add("active");
    closeCart();
  }
  window.openCheckout = openCheckout;

  function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove("active");
  }
  window.closeCheckout = closeCheckout;

  if (proceedToCheckoutBtn) proceedToCheckoutBtn.addEventListener("click", openCheckout);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener("click", closeCheckout);
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }

  function updateCheckoutTracker(step) {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`trackStep${i}`);
      if (!el) continue;
      el.classList.remove("active", "completed");
      if (i < step) el.classList.add("completed");
      if (i === step) el.classList.add("active");
    }
  }

  function renderCheckoutStep() {
    if (!checkoutStepsContainer) return;
    updateCheckoutTracker(state.checkoutStep);
    const { subtotalUSD, discountUSD, totalUSD } = calculateCartTotals();

    if (state.checkoutStep === 1) {
      // Step 1: Delivery & Contact
      checkoutStepsContainer.innerHTML = `
        <div class="demo-mode-notice" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #a7f3d0;">
          <span style="font-size: 1.1rem;">🔒</span>
          <span><strong>256-bit SSL Secure Checkout:</strong> Guaranteed encrypted transaction with instant digital license fulfillment.</span>
        </div>

        <form id="checkoutStep1Form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="chkName">Full Name *</label>
              <input type="text" id="chkName" class="form-input" required value="Sruti Das">
            </div>
            <div class="form-group">
              <label class="form-label" for="chkEmail">Email Address (For Instant Download Delivery) *</label>
              <input type="email" id="chkEmail" class="form-input" required value="sruti.das@booknest.in">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="chkAddress">Shipping Address (For Physical Editions) *</label>
            <input type="text" id="chkAddress" class="form-input" required value="48/1 College Street, Bowbazar, Kolkata">
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="chkCity">City & State *</label>
              <input type="text" id="chkCity" class="form-input" required value="Kolkata, West Bengal">
            </div>
            <div class="form-group">
              <label class="form-label" for="chkPin">PIN Code *</label>
              <input type="text" id="chkPin" class="form-input" required value="700073">
            </div>
          </div>

          <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
            <div class="summary-line"><span>Subtotal:</span><span>${formatPrice(subtotalUSD)}</span></div>
            ${discountUSD > 0 ? `<div class="summary-line" style="color:var(--success);"><span>Discount (${state.appliedPromo}):</span><span>-${formatPrice(discountUSD)}</span></div>` : ''}
            <div class="summary-line total"><span>Total Payable:</span><span style="color:var(--brand-accent);">${formatPrice(totalUSD)}</span></div>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%;">Continue to Payment Selection →</button>
        </form>
      `;

      document.getElementById("checkoutStep1Form").addEventListener("submit", (e) => {
        e.preventDefault();
        state.checkoutStep = 2;
        renderCheckoutStep();
      });

    } else if (state.checkoutStep === 2) {
      // Step 2: Payment Rails
      checkoutStepsContainer.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <label class="form-label">Select Payment Rail (Total: <strong>${formatPrice(totalUSD)}</strong>):</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
            <button type="button" class="btn-secondary payment-tab-btn ${state.selectedPaymentMethod === 'card' ? 'active' : ''}" data-method="card" style="padding: 0.5rem; font-size: 0.8125rem;">💳 Card</button>
            <button type="button" class="btn-secondary payment-tab-btn ${state.selectedPaymentMethod === 'upi' ? 'active' : ''}" data-method="upi" style="padding: 0.5rem; font-size: 0.8125rem;">📱 UPI QR</button>
            <button type="button" class="btn-secondary payment-tab-btn ${state.selectedPaymentMethod === 'netbanking' ? 'active' : ''}" data-method="netbanking" style="padding: 0.5rem; font-size: 0.8125rem;">🏛 NetBanking</button>
          </div>
        </div>

        <!-- Card View -->
        <div id="cardPaymentPane" style="display: ${state.selectedPaymentMethod === 'card' ? 'block' : 'none'};">
          <form id="cardForm">
            <div class="form-group">
              <label class="form-label" for="cardNum">Card Number (Visa / Mastercard / RuPay)</label>
              <input type="text" id="cardNum" class="form-input" required maxlength="19" value="4532 8921 7741 4242" style="font-family: var(--font-mono);">
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label" for="cardHolder">Cardholder Name</label>
                <input type="text" id="cardHolder" class="form-input" required value="Sruti Das">
              </div>
              <div class="form-group">
                <label class="form-label" for="cardExp">Expiry (MM/YY)</label>
                <input type="text" id="cardExp" class="form-input" required maxlength="5" value="10/28" style="font-family: var(--font-mono);">
              </div>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%; margin-top: 0.5rem;">
              Complete Secure Order (${formatPrice(totalUSD)}) →
            </button>
          </form>
        </div>

        <!-- UPI View -->
        <div id="upiPaymentPane" style="display: ${state.selectedPaymentMethod === 'upi' ? 'block' : 'none'}; text-align: center; padding: 1rem 0;">
          <div style="background: #fff; padding: 1rem; border-radius: var(--radius-sm); display: inline-block; margin-bottom: 0.75rem;">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="#000" aria-label="UPI QR Code">
              <rect x="10" y="10" width="20" height="20"/>
              <rect x="14" y="14" width="12" height="12" fill="#fff"/>
              <rect x="70" y="10" width="20" height="20"/>
              <rect x="74" y="14" width="12" height="12" fill="#fff"/>
              <rect x="10" y="70" width="20" height="20"/>
              <rect x="14" y="74" width="12" height="12" fill="#fff"/>
              <rect x="36" y="14" width="8" height="8"/>
              <rect x="48" y="24" width="12" height="8"/>
              <rect x="36" y="38" width="28" height="24"/>
              <rect x="42" y="44" width="16" height="12" fill="#fff"/>
              <rect x="70" y="40" width="12" height="8"/>
              <rect x="18" y="48" width="8" height="14"/>
              <rect x="70" y="70" width="18" height="18"/>
            </svg>
          </div>
          <p style="font-size: 0.875rem; font-weight: 600;">Scan with GPay / PhonePe / Paytm / BHIM</p>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">UPI ID: <code>booknest.orders@icici</code></p>
          <button type="button" class="btn-primary" id="upiConfirmBtn" style="width: 100%;">
            ✓ I Have Scanned & Completed UPI Payment
          </button>
        </div>

        <!-- NetBanking View -->
        <div id="netbankingPaymentPane" style="display: ${state.selectedPaymentMethod === 'netbanking' ? 'block' : 'none'}; padding: 0.5rem 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1.25rem;">
            <button type="button" class="btn-secondary" style="padding: 0.65rem; text-align: left; font-size: 0.8125rem;">State Bank of India</button>
            <button type="button" class="btn-secondary" style="padding: 0.65rem; text-align: left; font-size: 0.8125rem;">HDFC Bank</button>
            <button type="button" class="btn-secondary" style="padding: 0.65rem; text-align: left; font-size: 0.8125rem;">ICICI Bank</button>
            <button type="button" class="btn-secondary" style="padding: 0.65rem; text-align: left; font-size: 0.8125rem;">Axis Bank</button>
          </div>
          <button type="button" class="btn-primary" id="netbankingConfirmBtn" style="width: 100%;">
            Proceed to Secure Bank Gateway (${formatPrice(totalUSD)}) →
          </button>
        </div>

        <div style="margin-top: 1.25rem; text-align: center;">
          <button type="button" class="btn-secondary" style="font-size: 0.8125rem; padding: 0.4rem 0.75rem;" onclick="state.checkoutStep = 1; renderCheckoutStep();">
            ← Back to Delivery Information
          </button>
        </div>
      `;

      // Method tabs
      checkoutStepsContainer.querySelectorAll('.payment-tab-btn').forEach(btn => {
        btn.addEventListener("click", () => {
          state.selectedPaymentMethod = btn.dataset.method;
          renderCheckoutStep();
        });
      });

      const cardForm = document.getElementById("cardForm");
      if (cardForm) {
        cardForm.addEventListener("submit", (e) => {
          e.preventDefault();
          executePaymentProcessing();
        });
      }

      const upiBtn = document.getElementById("upiConfirmBtn");
      if (upiBtn) upiBtn.addEventListener("click", executePaymentProcessing);

      const netbankingBtn = document.getElementById("netbankingConfirmBtn");
      if (netbankingBtn) netbankingBtn.addEventListener("click", executePaymentProcessing);

    } else if (state.checkoutStep === 3) {
      // Step 3: Processing
      checkoutStepsContainer.innerHTML = `
        <div style="padding: 3rem 1.5rem; text-align: center;">
          <div style="width: 44px; height: 44px; border: 3px solid rgba(99, 102, 241, 0.2); border-top-color: var(--brand-primary); border-radius: 50%; margin: 0 auto 1.5rem; animation: spin 0.8s linear infinite;"></div>
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: #fff; margin-bottom: 0.5rem;">Authorizing Transaction...</h4>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;" id="stepProgressText">
            Validating payment token and provisioning digital access licenses...
          </p>
          <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--brand-accent);" id="stepCodeLog">
            [1/3] Securing encrypted 256-bit SSL connection...
          </div>
        </div>
      `;

      setTimeout(() => {
        const text = document.getElementById("stepProgressText");
        const log = document.getElementById("stepCodeLog");
        if (text) text.textContent = "Provisioning cryptographically signed electronic study licenses...";
        if (log) log.textContent = "[2/3] Generating instant Blob download tokens...";
      }, 800);

      setTimeout(() => {
        const text = document.getElementById("stepProgressText");
        const log = document.getElementById("stepCodeLog");
        if (text) text.textContent = "Transaction verified. Generating invoice...";
        if (log) log.textContent = "[3/3] Finalizing digital fulfillment dispatch...";
      }, 1600);

      setTimeout(() => {
        state.checkoutStep = 4;
        state.lastOrder = {
          orderId: `BN-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          items: [...state.cart],
          total: totalUSD
        };
        state.cart = [];
        saveToStorage(STORAGE_KEYS.CART, state.cart);
        renderCart();
        renderProducts();
        renderCheckoutStep();
      }, 2400);

    } else if (state.checkoutStep === 4) {
      // Step 4: Confirmation
      const order = state.lastOrder;
      checkoutStepsContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center;">
          <div style="width: 52px; height: 52px; background: var(--success-bg); color: var(--success); border: 2px solid var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem;">
            ✓
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #fff; margin-bottom: 0.25rem;">Order Confirmed & Provisioned</h3>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Thank you! Order <strong>#${order.orderId}</strong> has been confirmed successfully.
          </p>

          <div style="text-align: left; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 1.25rem; margin-bottom: 1.5rem;">
            <div style="font-size: 0.875rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">
              📥 Instant Electronic Downloads & Book Access Licenses:
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${order.items.map(item => {
                const book = PRODUCTS_DATA.find(p => p.id === item.id);
                if (!book) return "";
                const licenseKey = `BN-LIC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

                return `
                  <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                      <div style="font-weight: 600; font-size: 0.875rem; color: #fff;">${book.title}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
                        License: <span style="color:#a5b4fc;">${licenseKey}</span> • ${item.format.split('(')[0]}
                      </div>
                    </div>
                    <button type="button" class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="triggerDigitalDownload('${book.id}', '${licenseKey}')">
                      ⬇ Download Digital Asset
                    </button>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" onclick="window.print()">🖨 Print Invoice</button>
            <button type="button" class="btn-primary" onclick="closeCheckout()">Return to Storefront</button>
          </div>
        </div>
      `;
    }
  }

  function executePaymentProcessing() {
    state.checkoutStep = 3;
    renderCheckoutStep();
  }

  // Real Client-Side Binary/PDF Manifest Download Generator (HTML5 Blob API)
  function triggerDigitalDownload(productId, licenseKey) {
    const book = PRODUCTS_DATA.find(p => p.id === productId);
    if (!book) return;

    const manifestContent = `
================================================================================
BOOKNEST BOOKSTORE & DIGITAL PUBLICATIONS — OFFICIAL ELECTRONIC LICENSE
BookNest Retail & Academic Publications Pvt. Ltd. | College Street, Kolkata
================================================================================

TITLE:         ${book.title}
AUTHOR:        ${book.author}
ISBN-13:       ${book.isbn13}
PUBLISHER:     ${book.publisher || 'BookNest Academic Press'}
LICENSE KEY:   ${licenseKey}
ISSUED TO:     Authorized Reader (customer@booknest.in)
STORE PLATFORM:BookNest Online Bookstore (https://booknest.in)
DATE ISSUED:   ${new Date().toUTCString()}

CUSTOMER DIGITAL LICENSE AGREEMENT:
This electronic asset is provisioned strictly for individual personal and
educational use under the BookNest Digital E-Book License. Reproduction or
commercial redistribution without explicit written authorization is prohibited.

SYLLABUS HIGHLIGHTS & KEY MODULES:
${book.features.map(f => `* ${f}`).join("\n")}

TABLE OF CONTENTS PREVIEW:
${book.preview ? book.preview.tableOfContents.join("\n") : "Full digital edition included."}

================================================================================
Generated automatically via BookNest Fulfillment Engine (< 0.8s delivery)
================================================================================
    `;

    const blob = new Blob([manifestContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = book.downloadFilename || `${book.id}-Student-Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded official study manifest for "${book.title}"!`);
  }
  window.triggerDigitalDownload = triggerDigitalDownload;

  // ------------------------------------------------------------------------
  // 10. Currency Switcher
  // ------------------------------------------------------------------------
  if (currencySelect) {
    currencySelect.value = state.currency;
    currencySelect.addEventListener("change", (e) => {
      state.currency = e.target.value;
      saveToStorage(STORAGE_KEYS.CURRENCY, state.currency);
      renderProducts();
      renderCart();
      renderWishlistDrawer();

      // Update Hero Spotlight Price
      const spotlight = PRODUCTS_DATA.find(p => p.id === "bn-acad-01");
      const heroPrice = document.getElementById("heroSpotlightPrice");
      const heroOrigPrice = document.getElementById("heroSpotlightOriginalPrice");
      if (spotlight && heroPrice) heroPrice.textContent = formatPrice(spotlight.price);
      if (spotlight && heroOrigPrice) heroOrigPrice.textContent = formatPrice(spotlight.originalPrice);

      showToast(`Switched bookstore currency to ${state.currency}`);
    });
  }

  // ------------------------------------------------------------------------
  // 11. Department Tabs & Search
  // ------------------------------------------------------------------------
  if (departmentTabs) {
    departmentTabs.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeCategory = btn.dataset.category;
        state.showWishlistOnly = false;
        if (wishlistFilterToggle) wishlistFilterToggle.classList.remove("active");
        updateDepartmentTabsUI();
        renderProducts();
      });
    });
  }

  window.filterByCategory = function(category) {
    state.activeCategory = category;
    state.showWishlistOnly = false;
    if (wishlistFilterToggle) wishlistFilterToggle.classList.remove("active");
    updateDepartmentTabsUI();
    renderProducts();
  };

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Keyboard Shortcuts: `/` to focus search, `Esc` to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (headerSearchInput) headerSearchInput.focus();
    }
    if (e.key === "Escape") {
      closeCart();
      closeWishlist();
      closeBookPreviewModal();
      closeProductDetailModal();
      closeCheckout();
      if (authModal) authModal.classList.remove("active");
    }
  });

  // ------------------------------------------------------------------------
  // 12. Customer Authentication Modal
  // ------------------------------------------------------------------------
  if (authTriggerBtn && authModal) {
    authTriggerBtn.addEventListener("click", () => authModal.classList.add("active"));
  }
  if (authCloseBtn && authModal) {
    authCloseBtn.addEventListener("click", () => authModal.classList.remove("active"));
  }
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) authModal.classList.remove("active");
    });
  }

  window.switchAuthTab = function(mode) {
    const loginForm = document.getElementById("loginForm");
    const regForm = document.getElementById("registerForm");
    const tabLogin = document.getElementById("tabAuthLogin");
    const tabReg = document.getElementById("tabAuthRegister");

    if (mode === "login") {
      if (loginForm) loginForm.style.display = "flex";
      if (regForm) regForm.style.display = "none";
      if (tabLogin) tabLogin.classList.add("active");
      if (tabReg) tabReg.classList.remove("active");
    } else {
      if (loginForm) loginForm.style.display = "none";
      if (regForm) regForm.style.display = "flex";
      if (tabLogin) tabLogin.classList.remove("active");
      if (tabReg) tabReg.classList.add("active");
    }
  };

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const name = email.split("@")[0];
      if (authTriggerBtn) {
        authTriggerBtn.innerHTML = `<span>🎓</span> <span>${name}</span>`;
      }
      authModal.classList.remove("active");
      showToast(`Welcome back, ${name}!`);
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      if (authTriggerBtn) {
        authTriggerBtn.innerHTML = `<span>🎓</span> <span>${name}</span>`;
      }
      authModal.classList.remove("active");
      showToast(`Student account registered for ${name}!`);
    });
  }

  // ------------------------------------------------------------------------
  // 13. Initial Boot Sequence
  // ------------------------------------------------------------------------
  updateDepartmentTabsUI();
  renderProducts();
  renderCart();
  renderWishlistDrawer();
});
