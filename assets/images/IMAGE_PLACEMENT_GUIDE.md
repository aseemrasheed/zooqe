# ZOOQE Image Placement Guide

This guide outlines the exact folders and file names for adding your own product photography and collection banners.

---

## 1. Product Photos

**Folder Path**:
`assets/images/products/`

* **Format**: `.jpg`, `.jpeg`, `.png`, or `.webp`
* **Recommended Aspect Ratio**: 1:1 Square (e.g. 1000 × 1000 px or 800 × 800 px)
* **Background Recommendation**: Dark obsidian (`#050507` / `#0f0f12`) or transparent PNG for best seamless luxury appearance.

### Exact File Names:

| Product Name | View 1 (Front / Primary) | View 2 (Angle / Label) | View 3 (Texture / Packaging) |
| :--- | :--- | :--- | :--- |
| **Mango Pickle** | `mango-pickle-1.jpg` | `mango-pickle-2.jpg` | `mango-pickle-3.jpg` |
| **Lemon Pickle** | `lemon-pickle-1.jpg` | `lemon-pickle-2.jpg` | `lemon-pickle-3.jpg` |
| **Fish Pickle** | `fish-pickle-1.jpg` | `fish-pickle-2.jpg` | `fish-pickle-3.jpg` |
| **Beef Pickle** | `beef-pickle-1.jpg` | `beef-pickle-2.jpg` | `beef-pickle-3.jpg` |
| **Garlic Pickle** | `garlic-pickle-1.jpg` | `garlic-pickle-2.jpg` | `garlic-pickle-3.jpg` |
| **Black Pepper** | `black-pepper-1.jpg` | `black-pepper-2.jpg` | `black-pepper-3.jpg` |
| **Cardamom** | `cardamom-1.jpg` | `cardamom-2.jpg` | `cardamom-3.jpg` |
| **Heritage Luxury Hamper** | `heritage-hamper-1.jpg` | `heritage-hamper-2.jpg` | `heritage-hamper-3.jpg` |

> [!TIP]
> After placing your `.jpg` or `.png` files, update the extension in `js/data/products.js` (e.g., change `mango-pickle-1.svg` to `mango-pickle-1.jpg`).
> If any image file is missing or still being edited, the site automatically falls back to the built-in ZOOQE luxury vector packaging placeholder.

---

## 2. Collections / Showcase Banners

**Folder Path**:
`assets/images/collections/`

* **Format**: `.jpg`, `.jpeg`, `.png`, or `.webp`
* **Recommended Dimensions**: 800 × 500 px (Landscape 16:10 aspect ratio)

### Exact File Names:
* **Premium Pickles Banner**: `collection-pickles.jpg` (or `.svg`)
* **Signature Spices Banner**: `collection-spices.jpg` (or `.svg`)
* **Heritage Gift Boxes Banner**: `collection-hampers.jpg` (or `.svg`)

---

## 3. Brand Logo

**Folder Path**:
`assets/images/`

* **Square Monogram / Header & Footer Logo**: `logo.jpg` (500 × 500 px)
* **Vector Monogram Mark**: `logo-mark.svg`
