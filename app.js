// ==========================================================================
// NovaCraft Digital - Interactive E-Commerce Logic & Application State
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    cart: [
      { id: "nc-soft-01", quantity: 1 },
      { id: "nc-book-01", quantity: 1 }
    ],
    activeCategory: "all",
    searchQuery: "",
    sortBy: "featured",
    appliedPromo: null,
    currency: "USD",
    currencyRates: {
      USD: { symbol: "$", rate: 1.0 },
      EUR: { symbol: "€", rate: 0.92 },
      INR: { symbol: "₹", rate: 83.5 },
      GBP: { symbol: "£", rate: 0.79 }
    },
    currentUser: null,
    selectedPaymentMethod: "card",
    checkoutStep: 1,
    lastOrder: null
  };

  // DOM Elements
  const productsGrid = document.getElementById("productsGrid");
  const categoryTabs = document.getElementById("categoryTabs");
  const sortSelect = document.getElementById("sortSelect");
  const currencySelect = document.getElementById("currencySelect");
  const headerSearchInput = document.getElementById("headerSearchInput");
  const heroSearchInput = document.getElementById("heroSearchInput");
  const cartBtn = document.getElementById("cartBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartBadge = document.getElementById("cartBadge");
  const promoInput = document.getElementById("promoInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoAlert = document.getElementById("promoAlert");
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");

  // Modals
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutCloseBtn = document.getElementById("checkoutCloseBtn");
  const checkoutStepsContainer = document.getElementById("checkoutStepsContainer");

  const productDetailModal = document.getElementById("productDetailModal");
  const productDetailCloseBtn = document.getElementById("productDetailCloseBtn");
  const productDetailContent = document.getElementById("productDetailContent");

  const authModal = document.getElementById("authModal");
  const authTriggerBtn = document.getElementById("authTriggerBtn");
  const authCloseBtn = document.getElementById("authCloseBtn");

  // Toast Container
  const toastContainer = document.getElementById("toastContainer");

  // Currency Formatter Helper
  function formatPrice(amountInUSD) {
    const cur = state.currencyRates[state.currency] || state.currencyRates.USD;
    const converted = amountInUSD * cur.rate;
    if (state.currency === "INR") {
      return `${cur.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${cur.symbol}${converted.toFixed(2)}`;
  }

  // Toast System
  function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "✓" : "⚠";
    toast.innerHTML = `<span style="font-weight:bold; color: ${type === 'success' ? '#10b981' : '#ef4444'}">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================================================
  // Catalog Rendering & Filtering
  // ==========================================================================
  function getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    // Category Filter
    if (state.activeCategory !== "all") {
      list = list.filter(p => p.category === state.activeCategory);
    }

    // Search Query Filter
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.format.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (state.sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "popular") {
      list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    }

    return list;
  }

  function renderProducts() {
    if (!productsGrid) return;
    const products = getFilteredProducts();

    if (products.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-subtle);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 0.5rem;">No Digital Goods Found</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">We couldn't find any products matching "${state.searchQuery}". Try a different keyword or reset filters.</p>
          <button id="resetFiltersBtn" class="btn-primary" style="margin: 0 auto;">Reset All Filters</button>
        </div>
      `;
      document.getElementById("resetFiltersBtn")?.addEventListener("click", () => {
        state.searchQuery = "";
        state.activeCategory = "all";
        if (headerSearchInput) headerSearchInput.value = "";
        if (heroSearchInput) heroSearchInput.value = "";
        updateCategoryButtonsUI();
        renderProducts();
      });
      return;
    }

    productsGrid.innerHTML = products.map(product => {
      const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      const isAlreadyInCart = state.cart.some(item => item.id === product.id);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-top">
            <img src="${product.image}" alt="${product.title}" class="product-card-img" loading="lazy">
            <div class="product-badges">
              <span class="badge-tag highlight">${product.badge}</span>
              <span class="badge-tag format">${product.format.split('/')[0].trim()}</span>
            </div>
          </div>

          <div class="product-card-content">
            <div class="product-category-row">
              <span class="category-name">${product.categoryLabel.split('&')[0]}</span>
              <div class="product-rating">
                <span>★</span>
                <span>${product.rating.toFixed(1)}</span>
                <span class="rating-count">(${product.reviewsCount})</span>
              </div>
            </div>

            <h3 class="product-card-title">${product.title}</h3>
            <p class="product-card-desc">${product.shortDescription}</p>

            <div class="product-meta-pills">
              <span class="meta-pill">⚡ Instant Delivery</span>
              <span class="meta-pill">📦 ${product.fileSize}</span>
              <span class="meta-pill">🔑 License Included</span>
            </div>

            <div class="product-card-footer">
              <div class="price-box">
                <span class="current-price">${formatPrice(product.price)}</span>
                <span class="original-price">${formatPrice(product.originalPrice)}</span>
              </div>

              <div class="product-actions">
                <button class="btn-quick-view" data-action="quick-view" data-id="${product.id}" title="Quick View & Reviews">
                  👁
                </button>
                <button class="btn-add-cart ${isAlreadyInCart ? 'added' : ''}" data-action="add-cart" data-id="${product.id}">
                  ${isAlreadyInCart ? '✓ In Cart' : '+ Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Attach Event Listeners to Buttons
    productsGrid.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });

    productsGrid.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        openQuickViewModal(id);
      });
    });
  }

  function updateCategoryButtonsUI() {
    if (!categoryTabs) return;
    categoryTabs.querySelectorAll(".category-btn").forEach(btn => {
      if (btn.dataset.category === state.activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // ==========================================================================
  // Shopping Cart System
  // ==========================================================================
  function addToCart(productId) {
    const existing = state.cart.find(item => item.id === productId);
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    if (existing) {
      existing.quantity += 1;
      showToast(`Updated quantity for "${product.title}" in cart.`);
    } else {
      state.cart.push({ id: productId, quantity: 1 });
      showToast(`Added "${product.title}" to cart!`);
    }

    // Trigger badge animation
    if (cartBadge) {
      cartBadge.classList.add("bounce");
      setTimeout(() => cartBadge.classList.remove("bounce"), 400);
    }

    updateCartUI();
    renderProducts(); // Update "+ Add to Cart" button state
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    showToast("Item removed from cart.", "error");
    updateCartUI();
    renderProducts();
  }

  function updateQuantity(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }

  function calculateCartTotals() {
    let subtotal = 0;
    state.cart.forEach(item => {
      const product = PRODUCTS_DATA.find(p => p.id === item.id);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });

    let discount = 0;
    if (state.appliedPromo) {
      discount = (subtotal * state.appliedPromo.discountPercent) / 100;
    }

    const total = Math.max(0, subtotal - discount);

    return { subtotal, discount, total };
  }

  function updateCartUI() {
    // Update Badge
    const totalItemCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalItemCount;
      cartBadge.style.display = totalItemCount > 0 ? "flex" : "none";
    }

    // Render Cart Items
    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i>🛍</i>
          <h4 style="margin-bottom: 0.5rem;">Your Cart is Empty</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Browse our collection of software, UI kits, and e-books to get started.</p>
          <button class="btn-primary" style="margin: 0 auto;" onclick="document.getElementById('cartCloseBtn').click(); window.location.hash = '#catalog';">
            Browse Digital Catalog
          </button>
        </div>
      `;
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = true;
    } else {
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.disabled = false;

      cartItemsList.innerHTML = state.cart.map(item => {
        const product = PRODUCTS_DATA.find(p => p.id === item.id);
        if (!product) return "";

        return `
          <div class="cart-item" data-id="${item.id}">
            <img src="${product.image}" alt="${product.title}" class="cart-item-img">
            <div class="cart-item-details">
              <span class="cart-item-title">${product.title}</span>
              <span class="cart-item-format">⚡ ${product.format}</span>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.35rem;">
                <span class="cart-item-price">${formatPrice(product.price * item.quantity)}</span>
                <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.06); padding: 0.15rem 0.5rem; border-radius: var(--radius-sm);">
                  <button style="background:none; border:none; color:var(--text-primary); cursor:pointer; font-size:0.9rem;" data-action="qty-minus" data-id="${item.id}">−</button>
                  <span style="font-size: 0.85rem; font-weight: 700; min-width: 1rem; text-align: center;">${item.quantity}</span>
                  <button style="background:none; border:none; color:var(--text-primary); cursor:pointer; font-size:0.9rem;" data-action="qty-plus" data-id="${item.id}">+</button>
                </div>
              </div>
            </div>
            <button class="cart-item-remove" data-action="remove-item" data-id="${item.id}" title="Remove Item">✕</button>
          </div>
        `;
      }).join("");

      // Cart Action Listeners
      cartItemsList.querySelectorAll('[data-action="qty-minus"]').forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1));
      });
      cartItemsList.querySelectorAll('[data-action="qty-plus"]').forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1));
      });
      cartItemsList.querySelectorAll('[data-action="remove-item"]').forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
      });
    }

    // Totals
    const { subtotal, discount, total } = calculateCartTotals();
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    if (cartDiscountEl) cartDiscountEl.textContent = discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0);
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
  }

  function openCartDrawer() {
    if (cartBackdrop) cartBackdrop.classList.add("open");
    if (cartDrawer) cartDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    if (cartBackdrop) cartBackdrop.classList.remove("open");
    if (cartDrawer) cartDrawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  // ==========================================================================
  // Quick View & Product Reviews Modal
  // ==========================================================================
  function openQuickViewModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !productDetailModal || !productDetailContent) return;

    productDetailContent.innerHTML = `
      <div class="product-detail-grid">
        <div>
          <div class="detail-image-box">
            <img src="${product.image}" alt="${product.title}">
          </div>
          <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted)">Delivery:</span>
              <span style="color:#10b981; font-weight:700;">⚡ Instant Cloud Download</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted)">File Format:</span>
              <span style="font-weight:600;">${product.format}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted)">Package Size:</span>
              <span style="font-weight:600;">${product.fileSize}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted)">Current Version:</span>
              <span style="font-weight:600;">${product.version}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted)">License Tier:</span>
              <span style="font-weight:600; color:var(--accent-secondary);">${product.license}</span>
            </div>
          </div>
        </div>

        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="category-name">${product.categoryLabel}</span>
            <span class="badge-tag highlight" style="font-size:0.68rem;">${product.badge}</span>
          </div>

          <h2 style="font-size: 1.5rem; margin-bottom: 0.75rem;">${product.title}</h2>

          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div class="product-rating" style="font-size: 1rem;">
              <span>★</span>
              <span>${product.rating.toFixed(1)}</span>
            </div>
            <span style="color: var(--text-muted); font-size: 0.85rem;">Based on ${product.reviews.length} verified customer reviews</span>
          </div>

          <div class="price-box" style="margin-bottom: 1.25rem;">
            <span class="current-price" style="font-size: 1.8rem;">${formatPrice(product.price)}</span>
            <span class="original-price" style="font-size: 1.1rem;">${formatPrice(product.originalPrice)}</span>
            <span class="pill-highlight">${Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}% SAVINGS</span>
          </div>

          <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">${product.fullDescription}</p>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--text-primary);">What's Included:</h4>
          <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${product.features.map(f => `<li style="font-size:0.875rem; color:var(--text-secondary); display:flex; align-items:center; gap:0.5rem;"><span style="color:#10b981;">✓</span> ${f}</li>`).join("")}
          </ul>

          <div style="display: flex; gap: 1rem;">
            <button id="modalAddToCartBtn" class="btn-primary" style="flex: 1;">
              + Add to Cart & Checkout
            </button>
            <button id="modalBuyNowBtn" class="btn-secondary" style="flex: 1; border-color: var(--accent-secondary); color: var(--accent-secondary);">
              ⚡ 1-Click Instant Buy
            </button>
          </div>
        </div>
      </div>

      <!-- Customer Reviews Subsection (Guideline 3 requirement) -->
      <div class="reviews-section-box">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <h3 style="font-size: 1.2rem;">Verified Buyer Reviews & Feedback</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Digital Market Peer Validation</span>
        </div>

        <div id="modalReviewsList">
          ${product.reviews.map(r => `
            <div class="review-item">
              <div class="review-header">
                <div>
                  <span class="review-author">${r.author}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.5rem;">${r.role} • ${r.date}</span>
                </div>
                <div class="review-stars">${"★".repeat(Math.round(r.rating))}</div>
              </div>
              <p style="font-size: 0.875rem; color: var(--text-secondary);">${r.text}</p>
            </div>
          `).join("")}
        </div>

        <!-- Add Review Form -->
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1.5rem;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem;">Leave a Review for this Digital Good</h4>
          <form id="addReviewForm" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <input type="text" id="reviewAuthor" placeholder="Your Name" required class="form-input">
              <input type="text" id="reviewRole" placeholder="Role (e.g. Designer, Developer)" class="form-input">
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Your Rating:</span>
              <select id="reviewRatingSelect" class="form-select" style="width: auto; padding: 0.35rem 0.75rem;">
                <option value="5">★★★★★ (5/5 Exceptional)</option>
                <option value="4">★★★★☆ (4/5 Great)</option>
                <option value="3">★★★☆☆ (3/5 Average)</option>
              </select>
            </div>
            <textarea id="reviewText" placeholder="How did this digital asset help your workflow or project?" rows="3" required class="form-textarea"></textarea>
            <button type="submit" class="btn-secondary" style="align-self: flex-start; padding: 0.5rem 1.25rem; font-size: 0.85rem;">
              Submit Verified Review
            </button>
          </form>
        </div>
      </div>
    `;

    // Modal Action Listeners
    document.getElementById("modalAddToCartBtn")?.addEventListener("click", () => {
      addToCart(product.id);
      productDetailModal.classList.remove("open");
      openCartDrawer();
    });

    document.getElementById("modalBuyNowBtn")?.addEventListener("click", () => {
      if (!state.cart.some(item => item.id === product.id)) {
        state.cart.push({ id: product.id, quantity: 1 });
      }
      productDetailModal.classList.remove("open");
      updateCartUI();
      openCheckoutModal();
    });

    document.getElementById("addReviewForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("reviewAuthor").value.trim() || "Anonymous Creator";
      const role = document.getElementById("reviewRole").value.trim() || "Verified Buyer";
      const rating = parseInt(document.getElementById("reviewRatingSelect").value);
      const text = document.getElementById("reviewText").value.trim();

      const newReview = { author, role, rating, date: "Just Now", text };
      product.reviews.unshift(newReview);
      product.reviewsCount += 1;

      showToast("Thank you! Your verified review has been published.");
      openQuickViewModal(product.id); // Refresh modal view
      renderProducts();
    });

    productDetailModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  // ==========================================================================
  // Interactive Multi-Step Checkout Modal
  // ==========================================================================
  function openCheckoutModal() {
    closeCartDrawer();
    if (state.cart.length === 0) {
      showToast("Your cart is empty. Add a digital product first!", "error");
      return;
    }
    state.checkoutStep = 1;
    renderCheckoutStep();
    checkoutModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderCheckoutStep() {
    if (!checkoutStepsContainer) return;
    const { subtotal, discount, total } = calculateCartTotals();

    // Step 1: Customer & Delivery Details
    if (state.checkoutStep === 1) {
      checkoutStepsContainer.innerHTML = `
        <div class="checkout-steps-tracker">
          <div class="step-indicator active"><span class="step-number">1</span> Delivery Info</div>
          <div class="step-indicator"><span class="step-number">2</span> Payment Method</div>
          <div class="step-indicator"><span class="step-number">3</span> Confirmation</div>
        </div>

        <div class="checkout-step-content">
          <div style="margin-bottom: 1.5rem; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">⚡</span>
            <div style="font-size: 0.85rem;">
              <strong>Instant Digital Electronic Delivery:</strong>
              <p style="margin: 0; color: var(--text-secondary);">License keys, GitHub repo invitations, and download links will be issued to your email immediately upon payment authorization.</p>
            </div>
          </div>

          <form id="step1Form" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="custName" class="form-input" required value="${state.currentUser ? state.currentUser.name : 'Sruti Sharma'}" placeholder="e.g. Alex Morgan">
              </div>
              <div class="form-group">
                <label class="form-label">Digital Delivery Email *</label>
                <input type="email" id="custEmail" class="form-input" required value="${state.currentUser ? state.currentUser.email : 'sruti.student@university.edu'}" placeholder="your.name@company.com">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Country / Tax Jurisdiction *</label>
                <select id="custCountry" class="form-select">
                  <option value="IN">India (Digital Goods GST 0% Exempt)</option>
                  <option value="US">United States (Export Exemption)</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany (EU VAT Reverse Charge)</option>
                  <option value="CA">Canada</option>
                  <option value="SG">Singapore</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Billing Postal Code</label>
                <input type="text" id="custZip" class="form-input" value="560001" placeholder="ZIP / PIN Code">
              </div>
            </div>

            <!-- Order Summary Banner -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-top: 0.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.35rem;">
                <span>Digital Products (${state.cart.length} items):</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              ${discount > 0 ? `
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #10b981; margin-bottom: 0.35rem;">
                  <span>Promo Discount:</span>
                  <span>-${formatPrice(discount)}</span>
                </div>
              ` : ''}
              <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem; padding-top: 0.5rem; border-top: 1px solid var(--border-subtle);">
                <span>Total Payable:</span>
                <span style="color: var(--accent-secondary);">${formatPrice(total)}</span>
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 1rem;">
              Continue to Secure Payment →
            </button>
          </form>
        </div>
      `;

      document.getElementById("step1Form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        state.customerDetails = {
          name: document.getElementById("custName").value,
          email: document.getElementById("custEmail").value,
          country: document.getElementById("custCountry").value
        };
        state.checkoutStep = 2;
        renderCheckoutStep();
      });
    }

    // Step 2: Payment Gateway Selection & Interactive Mock Payment
    else if (state.checkoutStep === 2) {
      checkoutStepsContainer.innerHTML = `
        <div class="checkout-steps-tracker">
          <div class="step-indicator completed"><span class="step-number">✓</span> Delivery Info</div>
          <div class="step-indicator active"><span class="step-number">2</span> Payment Method</div>
          <div class="step-indicator"><span class="step-number">3</span> Confirmation</div>
        </div>

        <div class="checkout-step-content">
          <!-- Payment Method Tabs -->
          <div class="payment-methods-grid">
            <div class="payment-method-tab ${state.selectedPaymentMethod === 'card' ? 'active' : ''}" data-method="card">
              <i>💳</i>
              <span>Credit / Debit</span>
            </div>
            <div class="payment-method-tab ${state.selectedPaymentMethod === 'paypal' ? 'active' : ''}" data-method="paypal">
              <i>🅿️</i>
              <span>PayPal</span>
            </div>
            <div class="payment-method-tab ${state.selectedPaymentMethod === 'upi' ? 'active' : ''}" data-method="upi">
              <i>📱</i>
              <span>UPI / QR</span>
            </div>
            <div class="payment-method-tab ${state.selectedPaymentMethod === 'crypto' ? 'active' : ''}" data-method="crypto">
              <i>⚡</i>
              <span>Web3 Crypto</span>
            </div>
          </div>

          <!-- Card Form View -->
          <div id="cardPaymentView" style="${state.selectedPaymentMethod === 'card' ? 'display:block' : 'display:none'}">
            <!-- 3D Interactive Virtual Card Preview -->
            <div class="interactive-credit-card">
              <div class="card-top-row">
                <div class="card-chip"></div>
                <span class="card-brand-label">NovaSecure</span>
              </div>
              <div class="card-preview-number" id="cardPreviewNum">4242 •••• •••• 4242</div>
              <div class="card-bottom-row">
                <div class="card-info-col">
                  <span>Cardholder</span>
                  <span id="cardPreviewName">${state.customerDetails?.name || 'SRUTI SHARMA'}</span>
                </div>
                <div class="card-info-col">
                  <span>Expires</span>
                  <span id="cardPreviewExp">12/28</span>
                </div>
              </div>
            </div>

            <form id="cardForm" style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Card Number</label>
                <input type="text" id="cardNumInput" class="form-input" placeholder="4242 4242 4242 4242" maxlength="19" value="4242 4242 4242 4242" required>
              </div>

              <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 0.75rem;">
                <div class="form-group">
                  <label class="form-label">Name on Card</label>
                  <input type="text" id="cardNameInput" class="form-input" value="${state.customerDetails?.name || 'Sruti Sharma'}" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Expiry (MM/YY)</label>
                  <input type="text" id="cardExpInput" class="form-input" placeholder="12/28" maxlength="5" value="12/28" required>
                </div>
                <div class="form-group">
                  <label class="form-label">CVV / CVC</label>
                  <input type="password" id="cardCvvInput" class="form-input" placeholder="•••" maxlength="4" value="888" required>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
                <span style="color: #10b981;">🔒</span>
                <span>Protected by 256-bit AES Bank-Grade Mock SSL Gateway</span>
              </div>

              <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="button" id="backToStep1Btn" class="btn-secondary" style="flex: 0.5;">
                  ← Back
                </button>
                <button type="submit" class="btn-primary" style="flex: 1.5;">
                  Authorize & Pay ${formatPrice(total)}
                </button>
              </div>
            </form>
          </div>

          <!-- Alternative UPI View -->
          <div id="upiPaymentView" style="${state.selectedPaymentMethod === 'upi' ? 'display:block' : 'display:none'}; text-align:center; padding:1.5rem 0;">
            <div style="background:#fff; padding:1rem; border-radius:var(--radius-md); display:inline-block; margin-bottom:1rem;">
              <!-- Simulated QR Code SVG -->
              <svg width="160" height="160" viewBox="0 0 100 100" fill="#000">
                <rect x="0" y="0" width="30" height="30" fill="#000"/>
                <rect x="5" y="5" width="20" height="20" fill="#fff"/>
                <rect x="10" y="10" width="10" height="10" fill="#000"/>
                <rect x="70" y="0" width="30" height="30" fill="#000"/>
                <rect x="75" y="5" width="20" height="20" fill="#fff"/>
                <rect x="80" y="10" width="10" height="10" fill="#000"/>
                <rect x="0" y="70" width="30" height="30" fill="#000"/>
                <rect x="5" y="75" width="20" height="20" fill="#fff"/>
                <rect x="10" y="80" width="10" height="10" fill="#000"/>
                <rect x="40" y="10" width="10" height="20" fill="#000"/>
                <rect x="55" y="25" width="10" height="10" fill="#000"/>
                <rect x="40" y="45" width="20" height="20" fill="#000"/>
                <rect x="70" y="65" width="25" height="10" fill="#000"/>
                <rect x="70" y="80" width="10" height="15" fill="#000"/>
              </svg>
            </div>
            <p style="font-size:0.9rem; margin-bottom:1rem; color:var(--text-secondary)">Scan with Google Pay, PhonePe, or Paytm UPI</p>
            <div style="max-width:320px; margin:0 auto 1.5rem;">
              <input type="text" class="form-input" value="novacraft.digital@okaxis" readonly style="text-align:center; font-family:var(--font-mono)">
            </div>
            <button id="confirmUpiBtn" class="btn-primary" style="margin:0 auto;">
              I Have Completed UPI Payment (${formatPrice(total)})
            </button>
          </div>

          <!-- PayPal / Crypto generic mock buttons -->
          <div id="altOtherView" style="${(state.selectedPaymentMethod === 'paypal' || state.selectedPaymentMethod === 'crypto') ? 'display:block' : 'display:none'}; text-align:center; padding:2rem 0;">
            <div style="font-size:3rem; margin-bottom:1rem;">
              ${state.selectedPaymentMethod === 'paypal' ? '🅿️' : '⚡'}
            </div>
            <h4 style="margin-bottom:0.5rem;">${state.selectedPaymentMethod === 'paypal' ? 'Mock PayPal Express Checkout' : 'Connect Web3 Wallet (MetaMask / Phantom)'}</h4>
            <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem;">Simulate instant digital settlement for ${formatPrice(total)}</p>
            <button id="confirmAltBtn" class="btn-primary" style="margin:0 auto;">
              Authenticate & Settle ${formatPrice(total)}
            </button>
          </div>
        </div>
      `;

      // Live 3D Credit Card Preview typing reactivity
      const cardNumInput = document.getElementById("cardNumInput");
      const cardNameInput = document.getElementById("cardNameInput");
      const cardExpInput = document.getElementById("cardExpInput");
      const cardPreviewNum = document.getElementById("cardPreviewNum");
      const cardPreviewName = document.getElementById("cardPreviewName");
      const cardPreviewExp = document.getElementById("cardPreviewExp");

      if (cardNumInput) {
        cardNumInput.addEventListener("input", (e) => {
          let val = e.target.value.replace(/\D/g, "").substring(0, 16);
          val = val.replace(/(.{4})/g, "$1 ").trim();
          e.target.value = val;
          cardPreviewNum.textContent = val || "•••• •••• •••• ••••";
        });
      }

      if (cardNameInput) {
        cardNameInput.addEventListener("input", (e) => {
          cardPreviewName.textContent = e.target.value.toUpperCase() || "CARDHOLDER NAME";
        });
      }

      if (cardExpInput) {
        cardExpInput.addEventListener("input", (e) => {
          let val = e.target.value.replace(/\D/g, "").substring(0, 4);
          if (val.length >= 3) {
            val = val.substring(0, 2) + "/" + val.substring(2);
          }
          e.target.value = val;
          cardPreviewExp.textContent = val || "MM/YY";
        });
      }

      // Method Tabs
      checkoutStepsContainer.querySelectorAll(".payment-method-tab").forEach(tab => {
        tab.addEventListener("click", () => {
          state.selectedPaymentMethod = tab.dataset.method;
          renderCheckoutStep();
        });
      });

      document.getElementById("backToStep1Btn")?.addEventListener("click", () => {
        state.checkoutStep = 1;
        renderCheckoutStep();
      });

      // Submit Handlers
      document.getElementById("cardForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        triggerMockPaymentProcessing();
      });

      document.getElementById("confirmUpiBtn")?.addEventListener("click", () => {
        triggerMockPaymentProcessing();
      });

      document.getElementById("confirmAltBtn")?.addEventListener("click", () => {
        triggerMockPaymentProcessing();
      });
    }

    // Step 3: Processing Animation
    else if (state.checkoutStep === 3) {
      checkoutStepsContainer.innerHTML = `
        <div class="payment-processing-spinner">
          <div class="spinner-ring"></div>
          <h3>Authorizing Secure Digital Transaction...</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Please do not refresh or close this window.</p>

          <div class="processing-status-list">
            <div class="processing-step done" id="pstep1">✓ Validating digital cart checksum & anti-fraud rules</div>
            <div class="processing-step" id="pstep2">⟳ Processing mock payment token via gateway...</div>
            <div class="processing-step" id="pstep3">○ Provisioning unique cryptographically signed license keys...</div>
            <div class="processing-step" id="pstep4">○ Preparing instant cloud CDN download manifests...</div>
          </div>
        </div>
      `;
    }

    // Step 4: Order Confirmation & Download Manager
    else if (state.checkoutStep === 4) {
      const order = state.lastOrder;
      checkoutStepsContainer.innerHTML = `
        <div class="checkout-step-content" style="padding-top: 1rem;">
          <div class="order-success-banner">
            <div class="success-icon-circle">✓</div>
            <h2 style="font-size: 1.6rem; margin-bottom: 0.25rem;">Payment Successful!</h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">Your digital order has been verified and processed.</p>
            <span class="order-id-badge">Order ID: ${order.id}</span>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; font-size: 0.85rem;">
            <div>
              <span style="color: var(--text-muted);">Delivery Sent To:</span>
              <strong style="display: block; color: var(--text-primary);">${order.customer.email}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Payment Method:</span>
              <strong style="display: block; text-transform: uppercase;">${order.paymentMethod}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted);">Amount Paid:</span>
              <strong style="display: block; color: #10b981;">${formatPrice(order.total)}</strong>
            </div>
          </div>

          <h4 style="font-size: 1rem; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <span>Your Instant Digital Downloads & Licenses</span>
            <span style="font-size: 0.75rem; color: var(--accent-secondary);">Zero-Friction Access</span>
          </h4>

          <div class="purchased-downloads-list">
            ${order.items.map(item => `
              <div class="download-item-card">
                <div class="download-item-info">
                  <h5>${item.title}</h5>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Format: ${item.format} • Size: ${item.fileSize}</div>
                  <div class="download-license-key">
                    <span>KEY:</span>
                    <code>${item.licenseKey}</code>
                    <button class="btn-copy-key" data-key="${item.licenseKey}" style="background:none; border:none; color:inherit; cursor:pointer; margin-left:0.35rem;" title="Copy License Key">📋</button>
                  </div>
                </div>
                <button class="btn-download-action" data-filename="${item.downloadFilename}" data-title="${item.title}" data-key="${item.licenseKey}">
                  ⬇ Download Asset
                </button>
              </div>
            `).join("")}
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1.75rem;">
            <button id="btnPrintReceiptBtn" class="btn-secondary" style="flex: 1;">
              🖨 Print Official Invoice
            </button>
            <button id="btnFinishOrderBtn" class="btn-primary" style="flex: 1;">
              Return to Digital Store
            </button>
          </div>
        </div>
      `;

      // Copy Key Button Handlers
      checkoutStepsContainer.querySelectorAll(".btn-copy-key").forEach(btn => {
        btn.addEventListener("click", () => {
          navigator.clipboard?.writeText(btn.dataset.key);
          showToast(`License Key copied: ${btn.dataset.key}`);
        });
      });

      // Realistic File Download Simulator
      checkoutStepsContainer.querySelectorAll(".btn-download-action").forEach(btn => {
        btn.addEventListener("click", () => {
          const title = btn.dataset.title;
          const key = btn.dataset.key;
          const filename = btn.dataset.filename || "Digital-Asset.txt";

          // Generate real downloadable text/readme asset file on user's machine
          const content = `================================================================================
NOVACRAFT DIGITAL GOODS - OFFICIAL LICENSE & ACCESS MANIFEST
================================================================================
Product Title:       ${title}
Customer Name:       ${order.customer.name}
Customer Email:      ${order.customer.email}
Order ID:            ${order.id}
Transaction Date:    ${new Date().toISOString()}
License Key:         ${key}
License Tier:        Commercial / Single-User Developer License
================================================================================
HOW TO ACTIVATE / USE THIS DIGITAL ASSET:
1. Visit https://novacraft-digital.example.com/activate
2. Enter your email (${order.customer.email}) and License Key (${key})
3. Access your private GitHub repository, video stream, or cloud drive package.
================================================================================
Support & Verification: support@novacraft-digital.example.com
Thank you for supporting verified creators!
================================================================================`;

          const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename.endsWith(".txt") ? filename : filename.replace(/\.[^/.]+$/, "") + "-LICENSE.txt";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          showToast(`Downloaded package & license for "${title}"!`);
        });
      });

      document.getElementById("btnPrintReceiptBtn")?.addEventListener("click", () => {
        window.print();
      });

      document.getElementById("btnFinishOrderBtn")?.addEventListener("click", () => {
        closeCheckoutModal();
      });
    }
  }

  function triggerMockPaymentProcessing() {
    state.checkoutStep = 3;
    renderCheckoutStep();

    setTimeout(() => {
      const pstep2 = document.getElementById("pstep2");
      if (pstep2) {
        pstep2.className = "processing-step done";
        pstep2.textContent = "✓ Mock payment authorized successfully via 256-bit gateway";
      }
      const pstep3 = document.getElementById("pstep3");
      if (pstep3) {
        pstep3.className = "processing-step";
        pstep3.textContent = "⟳ Provisioning unique cryptographically signed license keys...";
      }
    }, 800);

    setTimeout(() => {
      const pstep3 = document.getElementById("pstep3");
      if (pstep3) {
        pstep3.className = "processing-step done";
        pstep3.textContent = "✓ Electronic license keys provisioned and signed";
      }
      const pstep4 = document.getElementById("pstep4");
      if (pstep4) {
        pstep4.className = "processing-step";
        pstep4.textContent = "⟳ Finalizing order and generating instant download links...";
      }
    }, 1600);

    setTimeout(() => {
      // Assemble Last Order Record
      const { total } = calculateCartTotals();
      const orderId = "NCD-" + Math.floor(100000 + Math.random() * 900000);
      
      const orderItems = state.cart.map(cartItem => {
        const p = PRODUCTS_DATA.find(prod => prod.id === cartItem.id);
        const randomKey = "NC-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                          Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        return {
          id: p.id,
          title: p.title,
          format: p.format,
          fileSize: p.fileSize,
          downloadFilename: p.downloadFilename,
          licenseKey: randomKey
        };
      });

      state.lastOrder = {
        id: orderId,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        customer: state.customerDetails || { name: "Sruti Sharma", email: "sruti.student@university.edu" },
        paymentMethod: state.selectedPaymentMethod,
        total: total,
        items: orderItems
      };

      // Reset cart
      state.cart = [];
      state.appliedPromo = null;
      updateCartUI();
      renderProducts();

      state.checkoutStep = 4;
      renderCheckoutStep();
      showToast("Order completed! Your digital goods are ready for download.", "success");
    }, 2400);
  }

  // ==========================================================================
  // Auth Modal & User Session State
  // ==========================================================================
  function openAuthModal() {
    if (!authModal) return;
    authModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateAuthUI() {
    if (!authTriggerBtn) return;
    if (state.currentUser) {
      authTriggerBtn.innerHTML = `
        <span class="user-avatar-badge">${state.currentUser.name.charAt(0).toUpperCase()}</span>
        <span>${state.currentUser.name.split(' ')[0]}</span>
      `;
    } else {
      authTriggerBtn.innerHTML = `
        <span>👤</span>
        <span>Sign In</span>
      `;
    }
  }

  // ==========================================================================
  // Global Event Listeners & Initializers
  // ==========================================================================

  // Category Filter Pills
  categoryTabs?.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.category;
      updateCategoryButtonsUI();
      renderProducts();
    });
  });

  // Sort Dropdown
  sortSelect?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Currency Dropdown
  currencySelect?.addEventListener("change", (e) => {
    state.currency = e.target.value;
    renderProducts();
    updateCartUI();
  });

  // Live Search in Header
  headerSearchInput?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  // Hero Search Input
  heroSearchInput?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    if (headerSearchInput) headerSearchInput.value = e.target.value;
    renderProducts();
  });

  // Keyboard shortcut '/' to search
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== headerSearchInput && document.activeElement !== heroSearchInput && !document.activeElement.matches("input, textarea")) {
      e.preventDefault();
      headerSearchInput?.focus();
    }
  });

  // Cart Drawer open/close
  cartBtn?.addEventListener("click", openCartDrawer);
  cartCloseBtn?.addEventListener("click", closeCartDrawer);
  cartBackdrop?.addEventListener("click", closeCartDrawer);
  proceedToCheckoutBtn?.addEventListener("click", openCheckoutModal);

  // Promo Code Applicator
  applyPromoBtn?.addEventListener("click", () => {
    const code = promoInput.value.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      state.appliedPromo = PROMO_CODES[code];
      promoAlert.textContent = `Promo applied! ${PROMO_CODES[code].description}`;
      promoAlert.className = "promo-alert active success";
      showToast(`Promo ${code} applied successfully!`);
      updateCartUI();
    } else {
      promoAlert.textContent = "Invalid code. Try DIGITAL20 or SRUTI50";
      promoAlert.className = "promo-alert active error";
      showToast("Invalid coupon code.", "error");
    }
  });

  // Checkout Modal Close
  checkoutCloseBtn?.addEventListener("click", closeCheckoutModal);

  // Product Detail Modal Close
  productDetailCloseBtn?.addEventListener("click", () => {
    productDetailModal.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Auth Modal Trigger & Close
  authTriggerBtn?.addEventListener("click", () => {
    if (state.currentUser) {
      if (confirm(`Logged in as ${state.currentUser.name} (${state.currentUser.email}). Do you want to sign out?`)) {
        state.currentUser = null;
        updateAuthUI();
        showToast("Signed out successfully.");
      }
    } else {
      openAuthModal();
    }
  });

  authCloseBtn?.addEventListener("click", closeAuthModal);

  // Auth Tabs (Login / Register)
  const authTabBtns = document.querySelectorAll(".auth-tab-btn");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  authTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      authTabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      if (tab === "login") {
        if (loginForm) loginForm.style.display = "flex";
        if (registerForm) registerForm.style.display = "none";
      } else {
        if (loginForm) loginForm.style.display = "none";
        if (registerForm) registerForm.style.display = "flex";
      }
    });
  });

  // Login Form Submission
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const name = email.split("@")[0].replace(".", " ");
    state.currentUser = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email
    };
    updateAuthUI();
    closeAuthModal();
    showToast(`Welcome back, ${state.currentUser.name}!`);
  });

  // Register Form Submission
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    state.currentUser = { name, email };
    updateAuthUI();
    closeAuthModal();
    showToast(`Account created successfully! Welcome, ${name}.`);
  });

  // FAQ Accordion
  document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // Contact Form Submission
  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message received! NovaCraft support will reply within 2 hours.");
    e.target.reset();
  });

  // Newsletter Form
  document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Subscribed! 20% discount code sent to your inbox.");
    e.target.reset();
  });

  // Initialize
  renderProducts();
  updateCartUI();
  updateAuthUI();
});
