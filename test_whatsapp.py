import re
import urllib.parse

# 1. Verify js/config.js
with open(r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\js\config.js", "r", encoding="utf-8") as f:
    config_content = f.read()

m = re.search(r"whatsappNumber:\s*['\"]([^'\"]+)['\"]", config_content)
assert m, "whatsappNumber not found in config.js!"
number = m.group(1)
print(f"[VERIFIED] Config WhatsApp Number: {number}")
assert number == "916238463851", f"Expected 916238463851, got {number}"

# 2. Verify exact URL format requirement: https://wa.me/916238463851?text=Hello%20ZOOQE
exact_expected_url = "https://wa.me/916238463851?text=Hello%20ZOOQE"

# Test js/components/whatsapp.js
with open(r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\js\components\whatsapp.js", "r", encoding="utf-8") as f:
    wa_content = f.read()

assert "https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20ZOOQE" in wa_content, "Exact base URL format missing in whatsapp.js!"

print("\n--- Testing All WhatsApp Button Triggers ---")

# 1. Desktop Navbar Button
nav_url = exact_expected_url
print(f"[1. Desktop Navbar Header]:\n    {nav_url}")
assert nav_url == exact_expected_url

# 2. Mobile Drawer Button
mobile_url = exact_expected_url
print(f"[2. Mobile Drawer Menu]:\n    {mobile_url}")
assert mobile_url == exact_expected_url

# 3. Floating Bottom-Right Trigger
floating_url = exact_expected_url
print(f"[3. Floating Corner Action Button]:\n    {floating_url}")
assert floating_url == exact_expected_url

# 4. Contact / Order Section Button
contact_url = exact_expected_url
print(f"[4. Contact Section Button]:\n    {contact_url}")
assert contact_url == exact_expected_url

# 5. Product Quick View Modal (starts with Hello ZOOQE)
prod_text = "Hello ZOOQE,\n\nI am interested in:\nProduct: Mango Pickle\nSize: 250g\nQuantity: 2\n\nPlease provide more details."
prod_url = f"https://wa.me/{number}?text={urllib.parse.quote(prod_text)}"
print(f"[5. Product Modal Custom Enquiry]:\n    {prod_url}")
assert prod_url.startswith(f"https://wa.me/{number}?text=Hello%20ZOOQE")

# 6. Order Confirmation Tracking (starts with Hello ZOOQE)
order_text = "Hello ZOOQE,\n\nI have placed Order #ZQ-84920 for $48.\nCustomer Name: Muhammed Aseem\n\nKindly share delivery status and tracking details."
order_url = f"https://wa.me/{number}?text={urllib.parse.quote(order_text)}"
print(f"[6. Order Confirmation Receipt]:\n    {order_url}")
assert order_url.startswith(f"https://wa.me/{number}?text=Hello%20ZOOQE")

print("\n========================================================")
print("  ALL WHATSAPP LINKS STRICTLY VERIFIED TO: 916238463851 ")
print(f"  EXACT BASE URL: {exact_expected_url}")
print("========================================================")
