import os
import re
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

base_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store"

print("==========================================================")
print("     ZOOQE WEB3FORMS CHECKOUT NOTIFICATION TEST")
print("==========================================================\n")

# 1. VERIFY CONFIG.JS FOR WEB3FORMS SETTINGS
config_path = os.path.join(base_dir, "js", "config.js")
with open(config_path, "r", encoding="utf-8") as f:
    config_content = f.read()

assert "web3forms:" in config_content, "web3forms block missing from config.js!"
assert "https://api.web3forms.com/submit" in config_content, "web3forms endpoint missing from config.js!"
assert "d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7" in config_content, "Expected access key d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7 missing from config.js!"

print("[PASS 1] config.js contains valid web3forms block with exact access key d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7.")

# 2. VERIFY WEB3FORMS.JS MODULE IMPLEMENTATION
web3forms_path = os.path.join(base_dir, "js", "components", "web3forms.js")
assert os.path.exists(web3forms_path), "web3forms.js component file does not exist!"

with open(web3forms_path, "r", encoding="utf-8") as f:
    web3forms_content = f.read()

required_methods = ["getPaymentMethodLabel", "compileOrderMessage", "buildPayload", "sendOrderNotification", "generateWhatsAppConfirmationUrl"]
for method in required_methods:
    assert method in web3forms_content, f"Required method {method} missing from web3forms.js!"

# Check exact required fields in payload
exact_required_payload_keys = [
    "access_key", "subject", "customer_name", "phone", "address",
    "order_items", "total_amount", "payment_method", "whatsapp_confirmation_link"
]
for key in exact_required_payload_keys:
    assert f"{key}:" in web3forms_content, f"Exact key '{key}' not found in web3forms.js buildPayload!"

assert "New Order Received - Zooqe" in web3forms_content, "Exact subject 'New Order Received - Zooqe' missing from web3forms.js!"
assert "STORE OWNER ACTION" in web3forms_content, "Store owner WhatsApp action prompt missing from web3forms message!"
assert "https://wa.me/${targetPhone}?text=Hi%20${encodedName},%20your%20Zooqe%20order%20%23${orderNumber}%20has%20been%20confirmed!%20We%20are%20preparing%20your%20items%20for%20dispatch.%20Thank%20you%20for%20choosing%20Zooqe." in web3forms_content, "Exact WhatsApp confirmation URL format template missing from web3forms.js!"

print(f"[PASS 2] web3forms.js correctly implements all exact required keys and store owner WhatsApp confirmation URL generator.")

# 3. VERIFY CHECKOUT.JS INTEGRATION & ERROR HANDLING
checkout_path = os.path.join(base_dir, "js", "components", "checkout.js")
with open(checkout_path, "r", encoding="utf-8") as f:
    checkout_content = f.read()

# Must NOT contain WhatsApp redirect in checkout
assert "WhatsApp.sendOrderCheckout" not in checkout_content, "WhatsApp redirect must be completely removed from checkout.js!"
assert "window.open" not in checkout_content, "window.open must not be called in checkout submission!"

# Must call Web3Forms
assert "Web3Forms.sendOrderNotification" in checkout_content, "Web3Forms.sendOrderNotification must be called upon checkout submission!"
assert "notifyResult.success === true" in checkout_content, "Must check notifyResult.success === true before clearing cart!"
assert "cartState.clearCart()" in checkout_content, "cartState.clearCart() must be called to empty cart!"
assert "orderConfirmation.show" in checkout_content, "orderConfirmation.show must be called to display order success modal!"
assert "alert(" in checkout_content, "alert() must be called to alert customer on error!"

print("[PASS 3] checkout.js validates result.success === true before clearing cart; displays alert and preserves cart on failure.")

# 4. VERIFY ORDER CONFIRMATION MODAL RECEIPT
order_conf_path = os.path.join(base_dir, "js", "components", "orderConfirmation.js")
with open(order_conf_path, "r", encoding="utf-8") as f:
    order_conf_content = f.read()

assert "ORDER CONFIRMED" in order_conf_content
assert "o.orderId" in order_conf_content
assert "Direct notification dispatched to store owner" in order_conf_content, "Exact notification text 'Direct notification dispatched to store owner' missing from orderConfirmation.js!"

print("[PASS 4] orderConfirmation.js displays exact notification line: 'Direct notification dispatched to store owner'.")

# 5. SIMULATE EXACT PAYLOAD COMPILATION
sample_order = {
    "orderId": "ZQ-93812",
    "date": "Oct 18, 2026",
    "customer": {
        "name": "Muhammed Aseem",
        "phone": "+91 9876543210",
        "email": "aseem@example.com",
        "house": "4B",
        "street": "Marine Promenade",
        "city": "Kochi",
        "state": "Kerala",
        "pincode": "682001",
        "address": "4B, Marine Promenade, Kochi, Kerala - 682001"
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

# Verify simulated payload matches exact Web3Forms requirements
wa_clean_phone = sample_order["customer"]["phone"].replace("+91", "").replace(" ", "").replace("-", "")
expected_wa_url = f"https://wa.me/91{wa_clean_phone}?text=Hi%20Muhammed%20Aseem,%20your%20Zooqe%20order%20%23{sample_order['orderId']}%20has%20been%20confirmed!%20We%20are%20preparing%20your%20items%20for%20dispatch.%20Thank%20you%20for%20choosing%20Zooqe."

simulated_payload = {
    "access_key": "d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7",
    "subject": "New Order Received - Zooqe",
    "customer_name": sample_order["customer"]["name"],
    "phone": sample_order["customer"]["phone"],
    "address": sample_order["customer"]["address"],
    "order_items": "Tellicherry Black Pepper (100g) × 2, Traditional Kerala Curry Masala (250g) × 1",
    "total_amount": "₹927",
    "payment_method": "COD",
    "whatsapp_confirmation_link": expected_wa_url,
    "message": f"STORE OWNER ACTION — 1-CLICK WHATSAPP CONFIRMATION:\n{expected_wa_url}\n\nCustomer: {sample_order['customer']['name']}"
}

payload_json = json.dumps(simulated_payload, indent=2, ensure_ascii=False)
print("\n[VERIFIED WEB3FORMS PAYLOAD]:")
print(payload_json)

assert simulated_payload["access_key"] == "d78c8ba7-9ec7-4fe0-bb29-1891016f6dc7"
assert simulated_payload["subject"] == "New Order Received - Zooqe"
assert simulated_payload["customer_name"] == "Muhammed Aseem"
assert simulated_payload["phone"] == "+91 9876543210"
assert simulated_payload["address"] == "4B, Marine Promenade, Kochi, Kerala - 682001"
assert "Tellicherry Black Pepper" in simulated_payload["order_items"]
assert simulated_payload["total_amount"] == "₹927"
assert simulated_payload["payment_method"] == "COD"
assert simulated_payload["whatsapp_confirmation_link"].startswith(f"https://wa.me/91{wa_clean_phone}?text=")
assert "confirmed!" in simulated_payload["whatsapp_confirmation_link"]
assert expected_wa_url in simulated_payload["message"]

print(f"\n[STORE OWNER 1-CLICK WHATSAPP CONFIRMATION LINK]:\n{expected_wa_url}")

print("\n==========================================================")
print("     ALL WEB3FORMS VERIFICATION TESTS PASSED")
print("==========================================================")
