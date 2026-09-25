# SHITPRINT — UI/UX Requirements

## Navigation Flow

HOME
↓
SHOP
↓
PRODUCT
↓
ADD TO CART
↓
CART
↓
CHECKOUT

## Home UX

The first screen should immediately communicate:

- Brand
- Streetwear identity
- Main product
- CTA

The user should understand what ShitPrint sells within a few seconds.

## Product UX

Users should be able to:

1. View product
2. Select size
3. Change quantity
4. Add to cart
5. Continue shopping

Prevent adding a product without selecting a size.

Display a small validation message if required.

## Cart UX

Cart should update instantly.

Quantity changes should update:

- Item quantity
- Item subtotal
- Cart subtotal
- Shipping status

## Feedback

After adding an item:

Display a small animated toast:

"Added to cart ✓"

Do not use browser alert().

## Loading

Use subtle skeleton/loading animations only where needed.

## Empty Cart

Create a designed empty state:

"YOUR CART IS EMPTY."

CTA:

"FIND SOMETHING YOU'LL REGRET BUYING."

## Error Handling

No broken images.

If an image cannot be loaded, use a visually consistent fallback.

No console errors.

## Accessibility

Include:

- Alt text
- Keyboard navigation
- Visible focus states
- Proper button labels
- Semantic HTML
- Adequate contrast