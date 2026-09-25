# SHITPRINT — Implementation Specification

## Stack

Use:

React
Vite
JavaScript or TypeScript
Tailwind CSS
Framer Motion
React Router

Do not introduce unnecessary frameworks.

## Architecture

Recommended structure:

src/
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductModal
│   ├── CartDrawer
│   ├── SearchBar
│   ├── FilterBar
│   ├── Button
│   └── Toast
│
├── pages/
│   ├── Home
│   ├── Shop
│   └── Product
│
├── data/
│   └── products.js
│
├── context/
│   └── CartContext
│
├── assets/
│
├── App.jsx
└── main.jsx

## Routing

Use React Router.

Routes:

/
 /shop
 /product/:id

## Cart State

Use React Context or another lightweight state solution.

Persist cart using localStorage.

Cart should survive page refresh.

## Product Data

Keep products in:

src/data/products.js

Do not duplicate product objects across components.

## Image Handling

Use the actual uploaded T-shirt images.

Place them in:

public/products/

Use paths such as:

/products/tshirt-01.png

## Animations

Use Framer Motion.

Implement:

- Hero entrance
- Product card reveal
- Hover animations
- Cart drawer slide
- Toast animation
- Page transitions

Animations should remain performant.

## Code Quality

Use reusable components.

Avoid:

- Duplicate code
- Massive components
- Inline repeated styling
- Unused packages
- Console errors
- Hardcoded repeated product data

## Final Quality Check

Before completing the project:

1. Run the development server.
2. Test every route.
3. Test navigation.
4. Test product filtering.
5. Test search.
6. Test size selection.
7. Test Add to Cart.
8. Test quantity changes.
9. Test remove item.
10. Test localStorage persistence.
11. Test mobile layout.
12. Test desktop layout.
13. Check browser console for errors.
14. Fix all broken imports.
15. Fix all broken image paths.
16. Ensure the website starts with a single npm command.

The final website should feel like a finished mini-project suitable for a college demonstration.