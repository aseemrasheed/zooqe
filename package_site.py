import urllib.request
import json
import zipfile
import io
import os

base_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store"

# Create a zip of the site in memory
zip_buffer = io.BytesIO()
with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
    for root, dirs, files in os.walk(base_dir):
        # ignore git or temp files
        if '.git' in root or '__pycache__' in root:
            continue
        for file in files:
            if file.endswith('.py') or file.endswith('.log') or file.endswith('.exe') or file.endswith('.zip'):
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, base_dir)
            zip_file.write(file_path, arcname)

zip_data = zip_buffer.getvalue()
print(f"Zip package created, size: {len(zip_data)} bytes")

# Save zip file locally too
zip_path = os.path.join(base_dir, "zooqe-site.zip")
with open(zip_path, "wb") as f:
    f.write(zip_data)
print(f"Saved local zip package to {zip_path}")
