# NovaCraft Digital — Next-Gen Digital Goods & Creative Tech Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Complete](https://img.shields.io/badge/Status-Completed-success.svg)]()
[![Platform: Web](https://img.shields.io/badge/Platform-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)]()

> **Assignment Objective:** Design and build an e-commerce website to understand how digital markets, intangible digital goods, and various e-commerce business models operate.

---

## 🌟 Overview

**NovaCraft Digital** is a modern e-commerce marketplace specifically designed for intangible digital assets—including full-stack software boilerplates, modular Figma design systems, engineering e-books, and video masterclasses. Unlike physical e-commerce platforms with shipping logistics and warehousing constraints, NovaCraft features **zero marginal reproduction cost**, **instant electronic fulfillment (< 0.8s)**, and **cryptographically generated software license keys**.

---

## 🚀 Key Features

* **Glassmorphic Modern UI:** Dark palette, Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*), glowing accents, and micro-interactions.
* **Instant Digital Fulfillment:** Automated download generation via HTML5 Blob API and signed electronic license keys.
* **Product Catalog & Filtering:** Search by keyword (hotkey `/`), filter by categories (Software, UI/UX, E-Books, Courses, 3D & Audio), and sort by price, rating, or popularity.
* **Product Quick-View Modal:** Detailed specifications, file formats, license tiers, and live customer review thread with a review submission form.
* **Off-Canvas Shopping Cart:** Line-item controls, promo discount applicator (`DIGITAL20` for 20% off, `SRUTI50` for 50% off), and real-time total recalculations.
* **Multi-Step Checkout Flow:**
  1. Delivery details & tax jurisdiction (India GST 0% export, EU VAT, US tax rules).
  2. Multi-rail payment gateway (Credit/Debit Card, PayPal, UPI QR, Web3 Crypto).
  3. Interactive **3D virtual credit card preview** that live-updates as you type.
  4. Animated mock payment authorization spinner.
  5. Post-purchase download manager with direct download actions and printable invoice.
* **Multi-Currency Converter:** Real-time conversion across USD ($), EUR (€), INR (₹), and GBP (£).
* **Customer Authentication:** Tabbed Sign In / Registration with validation and user session state.
* **Customer Support Desk:** Working contact form and expandable FAQ accordion.

---

## 📁 Repository Structure

```
├── index.html               # Main interactive e-commerce application
├── report.html              # Printable academic assignment report
├── ASSIGNMENT_REPORT.md     # Detailed academic documentation
├── styles.css               # Modern dark glassmorphism design system
├── app.js                   # Application state (Cart, Search, Checkout, Reviews, Currency)
├── data.js                  # Digital catalog data, company info, and promo codes
├── server.js                # Lightweight zero-dependency Node.js HTTP server
├── screenshots/             # High-resolution screenshots of the live application
│   ├── 01_homepage_hero.png
│   ├── 02_product_catalog.png
│   ├── 03_product_detail_modal.png
│   ├── 04_customer_reviews.png
│   ├── 05_shopping_cart.png
│   ├── 06_shopping_cart_discount.png
│   ├── 07_checkout_virtual_card.png
│   └── 08_order_confirmation_downloads.png
└── README.md
```

---

## 📸 Screenshots

| 1. Homepage & Hero Banner | 2. Product Catalog |
| :---: | :---: |
| ![Homepage](screenshots/01_homepage_hero.png) | ![Catalog](screenshots/02_product_catalog.png) |

| 3. Product Details & Reviews | 4. Shopping Cart Drawer |
| :---: | :---: |
| ![Quick View](screenshots/03_product_detail_modal.png) | ![Cart](screenshots/06_shopping_cart_discount.png) |

| 5. Multi-Step Checkout (3D Card) | 6. Instant Downloads & Licenses |
| :---: | :---: |
| ![Checkout](screenshots/07_checkout_virtual_card.png) | ![Confirmation](screenshots/08_order_confirmation_downloads.png) |

---

## 🛠️ How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/Adrija05D/-E-Commerce-Website.git
   cd -E-Commerce-Website
   ```

2. Start the local server:
   ```bash
   node server.js
   ```

3. Open in your browser:
   * **Storefront:** [http://localhost:3000](http://localhost:3000)
   * **Assignment Report:** [http://localhost:3000/report.html](http://localhost:3000/report.html)

---

## 📚 Academic Documentation

A complete analysis addressing all 5 assignment guidelines (Company Introduction, Website Features, Digital Goods Economics, Business Models, and Technology Architecture) is available in **[`ASSIGNMENT_REPORT.md`](ASSIGNMENT_REPORT.md)** and viewable via **[`report.html`](report.html)**.

---

## 📄 License

This project is created for educational and academic evaluation purposes.
