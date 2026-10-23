# BookNest — Online Bookstore (B2C with Digital Goods)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Paper: MIS SEC301](https://img.shields.io/badge/Paper-MIS%20SEC301-success.svg)]()
[![Platform: Web](https://img.shields.io/badge/Platform-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)]()

> **Practical Work Assignment:** Design and Build an E-Commerce Website  
> **Course / Class:** BBA 2nd Year – 3rd Semester (PCA2_MIS)  
> **Paper:** Management Information System (**SEC301**)  
> **Assigned Track:** **SECTION B: BookNest — Online Bookstore**  
> **Evaluator:** **Dr. Sudipta Halder**  
> **Student / Submitter:** Sruti Das (CC 130)  
> **Digital Form Deadline:** 31st October 2026 (via `https://forms.gle/pjCwV1EPm3fJpcv8A`)  
> **Hard Copy Spiral Binding Submission:** 6th & 7th November 2026 (Max 30 Pages)

---

## 🌟 Overview

**BookNest** is a modern B2C electronic commerce bookstore specifically designed for **university academic textbooks, bestselling novels, instant digital e-books, and semester revision notes**. 

Engineered in strict accordance with the **Section B** university guidelines, BookNest combines physical book retail with **instant electronic fulfillment (< 0.8s)**, **interactive sample chapter previews**, and **cryptographically generated academic licenses**, eliminating traditional retail supply chain friction through zero marginal reproduction costs.

---

## 🚀 Key Features (Section B Requirements)

1. **Book Catalog & Categorization:**
   * **Academic Textbooks:** *Management Information Systems (17th Ed)* by Kenneth C. Laudon & Jane P. Laudon (prescribed text for SEC301), *Principles of Marketing (18th Ed)* by Philip Kotler, *Financial Accounting for Management*.
   * **Novels & Literature:** *Atomic Habits* by James Clear, *The Psychology of Money* by Morgan Housel, *1984* by George Orwell.
   * **Instant Digital E-Books:** *Zero to One* by Peter Thiel, *Designing Data-Intensive Applications*.
   * **Semester Study Notes:** *BBA 3rd Sem MIS Comprehensive Revision Notes & Solved Papers (SEC301)*.
2. **Special Feature — Book Preview Reader:**
   * Interactive **"📖 Read Sample / Look Inside"** modal on each book card.
   * Renders sample chapter excerpts, interactive Table of Contents, reading time estimate, and direct "Buy / Add to Cart" buttons.
3. **Live Instant Search:** Search by book title, author (Laudon, Kotler, Clear), subject keyword (MIS, Accounting), or ISBN (press `/` to focus).
4. **Off-Canvas Shopping Cart:** Line-item controls, promo discount applicator (`BOOK20` for 20% off, `SRUTI50` for 50% assignment discount), and real-time total recalculations.
5. **Multi-Step Checkout Flow:**
   * Delivery details (campus/hostel address for physical books + university email for instant digital downloads).
   * Multi-rail payment interface: UPI QR, NetBanking, and Credit/Debit Card with an **interactive 3D virtual card preview** that live-updates as you type.
   * Animated mock payment authorization spinner.
   * Post-purchase digital downloads manager with HTML5 Blob file generation and printable invoice.
6. **Multi-Currency Converter:** Real-time conversion across INR (₹), USD ($), EUR (€), and GBP (£).
7. **Customer Authentication:** Tabbed Sign In / Registration with validation and student session state.
8. **Student Support Desk:** Working contact form and expandable FAQ accordion.

---

## 📁 Repository Structure

```
├── index.html               # Main interactive BookNest bookstore application
├── report.html              # Printable academic report (12-section layout, max 30 pages)
├── ASSIGNMENT_REPORT.md     # Detailed academic report for SEC301 MIS
├── styles.css               # Modern dark glassmorphism design system & book reader
├── app.js                   # Application state (Cart, Search, Previews, Checkout, Currency)
├── data.js                  # Book catalog, preview excerpts, and promo codes
├── server.js                # Lightweight zero-dependency Node.js HTTP server
├── screenshots/             # Application flow screenshots
└── README.md
```

---

## 🛠️ How to Run Locally

1. Clone / navigate to the repository directory:
   ```bash
   cd c:\CODE\sruti\-E-Commerce-Website
   ```

2. Start the local server:
   ```bash
   node server.js
   ```

3. Open in your browser:
   * **Bookstore Storefront:** [http://localhost:3000](http://localhost:3000)
   * **Practical Work Report:** [http://localhost:3000/report.html](http://localhost:3000/report.html)

---

## 📚 Academic Documentation (Dr. Sudipta Halder Guidelines)

The complete practical work report strictly follows the 12-section layout specified on Page 2 of the university notice:
1. **Cover Page** (Department, BBA 3rd Sem, Paper SEC301, Student: Sruti Das, Teacher: Dr. Sudipta Halder)
2. **Declaration**
3. **Acknowledgement**
4. **Table of Contents**
5. **Introduction and Objectives**
6. **Company Profile and Business Model (B2C with Digital Goods)**
7. **Website Design and Features**
8. **Digital Markets and Digital Goods (Zero Marginal Cost & Non-Rivalry)**
9. **Technologies Used and Development Process**
10. **Screenshots of Website Pages**
11. **Benefits, Limitations, And Security Issues**
12. **Conclusion**
13. **References**

Viewable online at **[`report.html`](http://localhost:3000/report.html)** or via **[`ASSIGNMENT_REPORT.md`](ASSIGNMENT_REPORT.md)**.
