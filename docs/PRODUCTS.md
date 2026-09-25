# SHITPRINT — Product Data

Use the uploaded T-shirt images as the source of truth for product visuals.

Do not invent product images.

If the images have recognizable designs, create suitable product names based on their visual style.

If names cannot be inferred, use temporary names such as:

ShitPrint Graphic Tee 01
ShitPrint Graphic Tee 02
ShitPrint Graphic Tee 03

## Pricing

Use Indian Rupees.

Suggested pricing range:

₹699
₹799
₹899
₹999
₹1,099
₹1,199

Assign prices based on the product/design.

Avoid making every product the same price.

## Example Product Structure

{
  id: "sp-001",
  name: "Bad Decisions Tee",
  price: 899,
  category: "Graphic",
  image: "/products/tshirt-01.png",
  sizes: ["S", "M", "L", "XL", "XXL"],
  fit: "Oversized",
  material: "100% Cotton",
  description: "A bold graphic tee designed for people who refuse to dress normally.",
  featured: true,
  bestseller: true
}

## Important

Create a centralized product data file.

Do not hardcode product information inside multiple components.

The product data should be easy to edit later.

Use local image paths.

If the exact image filenames differ from the example filenames, use the actual uploaded filenames.