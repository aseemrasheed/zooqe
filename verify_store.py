import os

base_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store"

print("--- Running ZOOQE Kerala Pickles & Spices Verification Suite ---")

# 1. Check index.html exists
index_path = os.path.join(base_dir, "index.html")
assert os.path.exists(index_path), "index.html is missing!"
with open(index_path, "r", encoding="utf-8") as f:
    index_html = f.read()

# 2. Check all CSS files
css_files = [
    "css/variables.css",
    "css/reset.css",
    "css/typography.css",
    "css/main.css",
    "css/components/navbar.css",
    "css/components/hero.css",
    "css/components/product-card.css",
    "css/components/product-details.css",
    "css/components/cart-drawer.css",
    "css/components/checkout.css",
    "css/components/order-confirmed.css",
    "css/components/search-filter.css",
    "css/components/wishlist.css",
    "css/components/review-section.css",
    "css/components/about-brand.css",
    "css/components/toast.css",
    "css/components/footer.css",
]

for cf in css_files:
    full_p = os.path.join(base_dir, cf)
    assert os.path.exists(full_p), f"Missing CSS file: {cf}"
    print(f"[OK] CSS verified: {cf}")

# 3. Check JS files
js_files = [
    "js/config.js",
    "js/data/products.js",
    "js/data/reviews.js",
    "js/state/cartState.js",
    "js/state/wishlistState.js",
    "js/components/navbar.js",
    "js/components/productCard.js",
    "js/components/productModal.js",
    "js/components/cartDrawer.js",
    "js/components/checkout.js",
    "js/components/orderConfirmation.js",
    "js/components/search.js",
    "js/components/filter.js",
    "js/components/wishlist.js",
    "js/components/reviewSlider.js",
    "js/components/toast.js",
    "js/components/whatsapp.js",
    "js/app.js"
]

for jf in js_files:
    full_p = os.path.join(base_dir, jf)
    assert os.path.exists(full_p), f"Missing JS file: {jf}"
    print(f"[OK] JS module verified: {jf}")

# 4. Check Logo and Visual Assets
assert os.path.exists(os.path.join(base_dir, "assets/images/logo.jpg")), "Logo image missing!"
assert os.path.exists(os.path.join(base_dir, "assets/images/logo-mark.svg")), "Logo mark SVG missing!"

product_svgs = [
    "mango-pickle-1.svg", "mango-pickle-2.svg", "mango-pickle-3.svg",
    "lemon-pickle-1.svg", "lemon-pickle-2.svg", "lemon-pickle-3.svg",
    "fish-pickle-1.svg", "fish-pickle-2.svg", "fish-pickle-3.svg",
    "beef-pickle-1.svg", "beef-pickle-2.svg", "beef-pickle-3.svg",
    "garlic-pickle-1.svg", "garlic-pickle-2.svg", "garlic-pickle-3.svg",
    "black-pepper-1.svg", "black-pepper-2.svg", "black-pepper-3.svg",
    "cardamom-1.svg", "cardamom-2.svg", "cardamom-3.svg",
    "heritage-hamper-1.svg", "heritage-hamper-2.svg", "heritage-hamper-3.svg"
]

for psvg in product_svgs:
    p_path = os.path.join(base_dir, "assets/images/products", psvg)
    assert os.path.exists(p_path), f"Missing product SVG: {psvg}"

print(f"[OK] All {len(product_svgs)} product gallery visual assets verified!")

collection_svgs = [
    "collection-pickles.svg",
    "collection-spices.svg",
    "collection-hampers.svg"
]

for csvg in collection_svgs:
    c_path = os.path.join(base_dir, "assets/images/collections", csvg)
    assert os.path.exists(c_path), f"Missing collection SVG: {csvg}"

print(f"[OK] All {len(collection_svgs)} collection showcase banners verified!")

print("\n--- ALL KERALA PICKLES & SPICES CHECKS PASSED PERFECTLY! ---")
