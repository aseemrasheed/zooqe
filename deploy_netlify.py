import urllib.request
import json
import os

base_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store"
zip_path = os.path.join(base_dir, "zooqe-site.zip")

# Let's test deploying the zip to Netlify via Netlify's open site deploy API
with open(zip_path, "rb") as f:
    zip_bytes = f.read()

print(f"Read {len(zip_bytes)} bytes of zip file")

# Netlify allows creating a site and deploying a zip file directly
try:
    req = urllib.request.Request(
        "https://api.netlify.com/api/v1/sites",
        data=zip_bytes,
        headers={
            "Content-Type": "application/zip",
            "User-Agent": "ZOOQE-Deployer/1.0"
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        print("Netlify Deploy Success!")
        print("URL:", result.get("url"))
        print("SSL URL:", result.get("ssl_url"))
        print("Admin URL:", result.get("admin_url"))
except Exception as e:
    print("Netlify direct API note:", e)
