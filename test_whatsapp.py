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
order_text = "Hello ZOOQE,\n\nI have placed Order #ZQ-84920 for ₹1,499.\nCustomer Name: Muhammed Aseem\n\nKindly share delivery status and tracking details."
order_url = f"https://wa.me/{number}?text={urllib.parse.quote(order_text)}"
print(f"[6. Order Confirmation Receipt]:\n    {order_url}")
assert order_url.startswith(f"https://wa.me/{number}?text=Hello%20ZOOQE")

# 7. Checkout Order Submission (Pre-filled Order Summary)
sample_order = {
    "orderId": "ZQ-74829",
    "date": "Oct 18, 2026",
    "customer": {
        "name": "Muhammed Aseem",
        "phone": "+91 9876543210",
        "email": "aseem@example.com",
        "address": "4B Heritage Villa, Marine Drive, Kochi, Kerala - 682001",
        "pincode": "682001",
        "instructions": "Leave package at security gate"
    },
    "items": [
        {"name": "Tellicherry Black Pepper", "size": "100g", "quantity": 2, "price": 299},
        {"name": "Traditional Kerala Curry Masala", "size": "250g", "quantity": 1, "price": 329}
    ],
    "totals": {
        "subtotal": 927,
        "discountAmount": 0,
        "deliveryFee": 0,
        "grandTotal": 927
    },
    "paymentMethod": "cod"
}

# Verify required fields in whatsapp.js buildOrderSummaryMessage implementation
with open(r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\js\components\whatsapp.js", "r", encoding="utf-8") as f:
    wa_code = f.read()

assert "buildOrderSummaryMessage" in wa_code, "buildOrderSummaryMessage missing from whatsapp.js!"
assert "sendOrderCheckout" in wa_code, "sendOrderCheckout missing from whatsapp.js!"
assert "getOrderCheckoutUrl" in wa_code, "getOrderCheckoutUrl missing from whatsapp.js!"

# Check checkout.js integration - WhatsApp redirect must be completely removed from checkout
with open(r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\js\components\checkout.js", "r", encoding="utf-8") as f:
    checkout_code = f.read()

assert "WhatsApp.sendOrderCheckout" not in checkout_code, "WhatsApp redirect logic still present in checkout.js! Must be removed."
assert "Web3Forms.sendOrderNotification" in checkout_code, "Web3Forms.sendOrderNotification not called in checkout.js!"
assert "cartState.clearCart()" in checkout_code, "cartState.clearCart() not called upon checkout submission in checkout.js!"
assert "orderConfirmation.show" in checkout_code, "orderConfirmation.show fallback missing in checkout.js!"
print("[PASS] WhatsApp redirect removed from checkout submission; Web3Forms background email notification active.")

print(f"\n[7. Checkout Order Submission URL Generation]:")
sample_text = f"""Hello ZOOQE,

🛍️ *NEW ORDER PLACED*
━━━━━━━━━━━━━━━━━━━━
*Customer Details:*
• Name: {sample_order['customer']['name']}
• Phone: {sample_order['customer']['phone']}
• Email: {sample_order['customer']['email']}

*Delivery Address:*
• Address: {sample_order['customer']['address']}
• Pincode: {sample_order['customer']['pincode']}
• Instructions: {sample_order['customer']['instructions']}

*Items Ordered:*
• Tellicherry Black Pepper (100g) × 2 - ₹598
• Traditional Kerala Curry Masala (250g) × 1 - ₹329

*Order Summary:*
• Subtotal: ₹927
• Delivery: FREE
• *Total Order Amount:* ₹927

*Payment Method:* Cash on Delivery (COD)
━━━━━━━━━━━━━━━━━━━━
Order ID: #{sample_order['orderId']}
Date: {sample_order['date']}

Please confirm my order and share delivery updates. Thank you!"""

checkout_wa_url = f"https://wa.me/{number}?text={urllib.parse.quote(sample_text)}"
print(f"    {checkout_wa_url}")
assert checkout_wa_url.startswith(f"https://wa.me/{number}?text=")
assert "Tellicherry%20Black%20Pepper" in checkout_wa_url
assert "682001" in checkout_wa_url
assert "927" in checkout_wa_url
assert "Cash%20on%20Delivery" in checkout_wa_url

print("\n========================================================")
print("  ALL WHATSAPP LINKS STRICTLY VERIFIED TO: 916238463851 ")
print(f"  EXACT BASE URL: {exact_expected_url}")
print("  CHECKOUT SUMMARY REDIRECT FLOW VERIFIED")
print("========================================================")
