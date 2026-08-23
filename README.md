# BASKET BOOST — Modern React E-Commerce Web Application

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.22-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 📌 Description

**BASKET BOOST** is a high-performance, portfolio-grade, mobile-first e-commerce frontend web application built with **React.js (functional components & hooks)**, **React Router**, pure **CSS3 custom design tokens**, and **LocalStorage** state persistence.

The application delivers an ultra-smooth, commercial-grade shopping experience with multi-faceted product discovery, instant client-side keyword search, category filtering, dynamic price range filtering, interactive product details with thumbnail galleries, real-time quantity steppers, persistent wishlist management, dark/light theme switching, and simulated multi-step checkout.

> **Note:** This project is built as a frontend client-side application with browser-persisted catalogs, cart items, wishlists, and user preferences. Razorpay Checkout is used for online payments; production deployments should add a backend for Razorpay order creation and payment signature verification.

---

## 🚀 Features

### Mandatory Features
* **Component-Based Architecture**: Modular, decoupled, reusable functional React components (`Navbar`, `Footer`, `ProductCard`, `ProductGrid`, `SearchBar`, `CategoryFilter`, `PriceFilter`, `SortDropdown`, `CartItem`, `OrderSummary`, `EmptyState`, `SkeletonCard`).
* **Multi-Page Client Routing**: Complete React Router (`react-router-dom` v6) navigation structure:
  * `/` — Landing Page with Hero banner, Category shortcuts, Featured Picks, and Flash Deals.
  * `/products` — Discovery catalogue with live search, category pills, price range slider, and sort selectors.
  * `/products/:id` — Dynamic product details page with image preview gallery, full specs table, stock indicator, related items, and Add-to-Cart/Buy-Now controls.
  * `/cart` — Full shopping cart breakdown with reactive item calculations, coupon codes, and checkout initiation.
  * `/wishlist` — Saved items dashboard with one-click "Move to Cart" and delete functionality.
  * `/orders` — Customer order history and live delivery tracker.
  * `/profile` — Interactive User Profile Dashboard with custom photo upload, personal info editor, address manager, order tracking, and loyalty rewards.
  * `/login` — User authentication portal with tabbed Sign In / Register and 1-click demo logins.
  * `/admin` — Administrator KPIs and store analytics overview.
  * `/admin/products` — Administrator product inventory CRUD manager.
  * `/admin/orders` — Administrator order processing and fulfillment manager.
  * `/*` — Custom 404 Not Found error page with quick recovery navigation.

### 🔑 Demo Credentials
| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@basketboost.com` | `password123` | Storefront Shopping, Cart, Wishlist, Order History |
| **Admin** | `admin@basketboost.com` | `adminpassword` | Full Admin Console, Product CRUD, Order Fulfillment |

* **Category Filtering**: Seamless category switching across *Electronics*, *Fashion*, *Beauty*, *Home*, *Sports*, *Books*, and *Accessories*.
* **Dynamic Price Sorting**: Sort products dynamically by Featured Picks, Price (Low to High), Price (High to Low), Rating, and Discount percentage.
* **Interactive Product Details**: Deep-dive view featuring high-definition images, detailed technical specification sheets, stock status badges, and related category recommendations.
* **Cart Management**: Add products to cart, increment/decrement quantities with automatic subtotal updates, prevent duplicate entries, and remove items with instant UI feedback.
* **Mobile-First Responsive Layout**: Clean CSS grid and flexbox styling tested and optimized across mobile (320px–425px), tablet (768px), and desktop (1024px–1440px) viewports without horizontal overflow.

### Bonus Features
* **Persistent Dark / Light Theme**: Built-in theme engine toggleable directly from the navigation bar, synchronized with `document.documentElement` and persisted in `localStorage`.
* **Price Range Slider Filter**: Interactive price range filter allowing users to filter products up to ₹10,000 in real-time, working harmoniously with search and category filters.
* **Quantity Steppers & Controls**: Reactive stepper `[-] qty [+]` with minimum constraints and live financial recalculation.
* **Interactive Wishlist**: Heart toggle animations with live navbar badge counter and LocalStorage persistence.
* **LocalStorage State Synchronization**: Custom `useLocalStorage` hook ensuring cart items, wishlist items, and theme preferences survive browser reloads.
* **Shimmer Skeleton Loading**: Animated shimmer placeholders rendered during page transitions and filter adjustments.
* **Contextual Empty States**: Custom empty state illustrations and CTA buttons for empty carts, empty wishlists, and zero-match search results.
* **Razorpay Checkout Modal**: Complete order checkout workflow with address validation, Razorpay payment collection for UPI/cards, cash on delivery, and order confirmation ID generation.
* **Floating Toast Notifications**: Animated feedback messages (`✓ Added to cart`, `Saved to Wishlist`, `Promo Code Applied`) with auto-dismissal.

---

## 🛠️ Tech Stack

* **Core Framework**: React.js (v18+)
* **Language**: JavaScript (ES6+)
* **Routing**: React Router DOM (v6+)
* **Styling**: HTML5 & Vanilla CSS3 (Custom Design System with CSS Variables)
* **Icons**: Lucide React
* **State Management**: React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`) & React Context API
* **Client Storage**: Web LocalStorage API
* **Build Tool**: Vite

## 💳 Razorpay Setup

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_RAZORPAY_KEY_ID` to your Razorpay test or live key ID.
3. Run `npm run dev` and use UPI or card checkout.

Only the Razorpay key ID belongs in the frontend. Never expose a Razorpay key secret in Vite environment variables or client-side code. A production backend should create Razorpay orders and verify the returned payment signature before fulfilling orders.

---

## 📂 Project Structure

```text
basket-boost/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CheckoutModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── home/
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategorySection.jsx
│   │   │   └── Hero.jsx
│   │   ├── products/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── PriceFilter.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SortDropdown.jsx
│   │   └── cart/
│   │       ├── CartItem.jsx
│   │       └── OrderSummary.jsx
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── data/
│   │   ├── categories.js
│   │   └── products.js
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── WishlistPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Setup & Installation Instructions

Follow these steps to run the application locally on your machine:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "BASKET BOOST (E-COMMERCE)"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).

### 4. Build for Production
```bash
npm run build
```

---

## 🔄 Demo Overview & User Flow

1. **Home Discovery**: Land on `/` and browse hero promotions, department category cards, and top-rated featured items.
2. **Category Filter**: Click on any category card (e.g. *Electronics* or *Fashion*) to jump to `/products` with that category pre-selected.
3. **Multi-Filter & Search**: Type "headphones" or "watch" into the search bar, slide the price filter up/down, and sort by "Price: Low to High".
4. **Product Deep Dive**: Click a product card to open `/products/:id`. Inspect full specification table, switch gallery thumbnails, and select desired quantity.
5. **Add to Cart & Wishlist**: Click **Add to Cart** or **Save to Wishlist** and watch the navbar counter badge and floating toast notification trigger in real-time.
6. **Cart Management & Checkout**: Navigate to `/cart`, adjust item quantities with `[-] [+]`, apply promo code `BOOST10` for a 10% discount, and click **Proceed to Checkout** to view the completed order receipt.
7. **LocalStorage Persistence**: Refresh the browser page at any time — your cart, wishlist, and dark mode preferences remain completely intact.
8. **Dark Mode**: Tap the sun/moon toggle button in the navbar to test seamless dark and light mode transitions.

---

## 🌐 Deployment

* **Live Demo URL**: `https://basket-boost.vercel.app` *(Placeholder for deployment)*

---

## 🔗 GitHub Repository

* **Repository**: `https://github.com/JATINXGOUR1111/basket-boost` 

---

## 📸 Screenshots

| Light Mode - Home Page | Dark Mode - Products Discovery |
| :---: | :---: |
| *(Desktop Screenshot Placeholder)* | *(Desktop Screenshot Placeholder)* |

| Product Details View | Responsive Mobile View |
| :---: | :---: |
| *(Desktop Screenshot Placeholder)* | *(Mobile Screenshot Placeholder)* |

---

## 📜 License

This project is created for React.js certification and portfolio demonstration under the MIT License.
#   B A S K E T - B O O S T  
 