import os

products_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\assets\images\products"
collections_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\assets\images\collections"
images_dir = r"C:\Users\MuhammedAseem\.gemini\antigravity\scratch\zooqe-store\assets\images"

os.makedirs(products_dir, exist_ok=True)
os.makedirs(collections_dir, exist_ok=True)

# 1. Generate Logo SVG
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#e1e1e6"/>
      <stop offset="50%" stop-color="#a2a2a8"/>
      <stop offset="75%" stop-color="#d4d4d8"/>
      <stop offset="100%" stop-color="#808085"/>
    </linearGradient>
    <filter id="emboss" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
  </defs>
  <!-- Outer circle with gap -->
  <path d="M 250,55 A 195,195 0 1,1 112,390" fill="none" stroke="url(#silverGrad)" stroke-width="15" stroke-linecap="round" filter="url(#emboss)"/>
  <!-- Z and Q monogram -->
  <path d="M 175,130 L 325,130 L 305,152 L 195,152 Z" fill="url(#silverGrad)" filter="url(#emboss)"/>
  <path d="M 315,142 L 180,360 L 205,360 L 338,142 Z" fill="url(#silverGrad)" filter="url(#emboss)"/>
  <path d="M 175,348 L 270,348 C 240,368 200,368 175,348 Z" fill="url(#silverGrad)" filter="url(#emboss)"/>
  <path d="M 230,315 C 265,300 295,315 320,350 C 350,390 395,405 435,385 C 385,415 330,405 295,360 C 275,335 250,325 230,315 Z" fill="url(#silverGrad)" filter="url(#emboss)"/>
</svg>
"""

with open(os.path.join(images_dir, "logo-mark.svg"), "w", encoding="utf-8") as f:
    f.write(logo_svg)

# Distinct Product Visuals for Kerala Pickles & Spices
products = [
    {
        "filename": "mango-pickle",
        "title": "Mango Pickle",
        "category": "KERALA ACHAR",
        "accent": "#661E0A", # Rich spicy chili & mustard oil tone
        "glow": "rgba(220, 70, 20, 0.25)",
        "jar_type": "pickle_jar",
        "element": "mango",
        "detail": "Tender Raw Mango • Gingelly Oil & Spices",
        "icon": "✦ MANGO ACHAR ✦"
    },
    {
        "filename": "lemon-pickle",
        "title": "Lemon Pickle",
        "category": "KERALA ACHAR",
        "accent": "#4D3808", # Sun-cured citrus spice tone
        "glow": "rgba(200, 150, 20, 0.25)",
        "jar_type": "pickle_jar",
        "element": "lemon",
        "detail": "Slow-Cured Whole Lemons • Mustard & Fenugreek",
        "icon": "✦ LEMON ACHAR ✦"
    },
    {
        "filename": "fish-pickle",
        "title": "Fish Pickle",
        "category": "KERALA SEAFOOD ACHAR",
        "accent": "#5E1710", # Deep coastal roasted chili & tamarind tone
        "glow": "rgba(210, 50, 30, 0.25)",
        "jar_type": "pickle_jar",
        "element": "fish",
        "detail": "Wild-Caught Seer Fish • Malabar Spices",
        "icon": "✦ MEEN ACHAR ✦"
    },
    {
        "filename": "beef-pickle",
        "title": "Beef Pickle",
        "category": "KERALA SPECIALTY ACHAR",
        "accent": "#33150D", # Dark slow-roasted Malabar meat spice tone
        "glow": "rgba(140, 45, 20, 0.25)",
        "jar_type": "pickle_jar",
        "element": "beef",
        "detail": "Slow-Roasted Beef Chunks • Coconut Slices",
        "icon": "✦ ERACHI ACHAR ✦"
    },
    {
        "filename": "garlic-pickle",
        "title": "Garlic Pickle",
        "category": "KERALA ACHAR",
        "accent": "#422812", # Golden aged garlic & gingelly oil tone
        "glow": "rgba(180, 100, 30, 0.25)",
        "jar_type": "pickle_jar",
        "element": "garlic",
        "detail": "Whole Aged Garlic Cloves • Cold-Pressed Oil",
        "icon": "✦ VELUTHULLI ACHAR ✦"
    },
    {
        "filename": "black-pepper",
        "title": "Black Pepper",
        "category": "MALABAR SPICES",
        "accent": "#1A1A1E", # Deep black tellicherry peppercorn tone
        "glow": "rgba(220, 220, 235, 0.15)",
        "jar_type": "spice_tin",
        "element": "pepper",
        "detail": "Tellicherry Bold Whole Peppercorns",
        "icon": "✧ MALABAR BLACK GOLD ✧"
    },
    {
        "filename": "cardamom",
        "title": "Cardamom",
        "category": "MALABAR SPICES",
        "accent": "#1C2E1D", # High-altitude fragrant green cardamom pod tone
        "glow": "rgba(60, 140, 70, 0.22)",
        "jar_type": "spice_tin",
        "element": "cardamom",
        "detail": "Jumbo Grade-A Fragrant Green Pods",
        "icon": "✧ GREEN CARDAMOM PODS ✧"
    },
    {
        "filename": "heritage-hamper",
        "title": "Heritage Hamper",
        "category": "CURATED GIFT SET",
        "accent": "#1F1F24",
        "glow": "rgba(255, 255, 255, 0.18)",
        "jar_type": "hamper_chest",
        "element": "hamper",
        "detail": "Artisanal Pickles & Single-Origin Spices Box",
        "icon": "♚ KERALA HERITAGE COLLECTION ♚"
    }
]

def render_inner_elements(element_type):
    if element_type == "mango":
        return """
        <!-- Mango Pickle Visual Elements -->
        <path d="M 220,240 Q 240,220 260,250 Q 245,280 220,270 Z" fill="#D9531E" opacity="0.65"/>
        <path d="M 330,230 Q 360,240 350,270 Q 320,280 325,250 Z" fill="#E67E22" opacity="0.6"/>
        <circle cx="280" cy="275" r="4" fill="#5C1005" opacity="0.8"/>
        <circle cx="310" cy="245" r="3.5" fill="#3D0B04" opacity="0.9"/>
        <circle cx="260" cy="295" r="5" fill="#F39C12" opacity="0.5"/>
        <path d="M 270,305 Q 295,315 285,335 Q 260,330 265,310 Z" fill="#C0392B" opacity="0.7"/>
        """
    elif element_type == "lemon":
        return """
        <!-- Lemon Pickle Visual Elements -->
        <circle cx="240" cy="250" r="18" fill="#F1C40F" opacity="0.5"/>
        <circle cx="340" cy="265" r="16" fill="#D4AC0D" opacity="0.55"/>
        <path d="M 285,230 Q 310,240 300,265 Q 275,260 280,235 Z" fill="#B7950B" opacity="0.6"/>
        <circle cx="260" cy="305" r="4" fill="#4A2700" opacity="0.8"/>
        <circle cx="320" cy="310" r="4.5" fill="#361B00" opacity="0.85"/>
        <circle cx="295" cy="285" r="3" fill="#6E2C00" opacity="0.9"/>
        """
    elif element_type == "fish":
        return """
        <!-- Fish Pickle Visual Elements -->
        <rect x="230" y="240" width="35" height="22" rx="4" fill="#922B21" opacity="0.75"/>
        <rect x="315" y="250" width="40" height="25" rx="5" fill="#7B241C" opacity="0.8"/>
        <rect x="265" y="295" width="38" height="24" rx="4" fill="#A93226" opacity="0.7"/>
        <circle cx="250" cy="280" r="3.5" fill="#2C0B08" opacity="0.9"/>
        <circle cx="340" cy="300" r="4" fill="#2C0B08" opacity="0.9"/>
        <path d="M 280,245 Q 300,235 295,255 Z" fill="#E74C3C" opacity="0.6"/>
        """
    elif element_type == "beef":
        return """
        <!-- Beef Pickle Visual Elements -->
        <rect x="225" y="245" width="38" height="30" rx="6" fill="#4A2318" opacity="0.85"/>
        <rect x="310" y="240" width="42" height="32" rx="6" fill="#3D1C13" opacity="0.9"/>
        <rect x="260" y="290" width="45" height="34" rx="7" fill="#5C2C1E" opacity="0.8"/>
        <!-- Toasted Coconut Slice accents -->
        <path d="M 275,235 Q 295,230 300,245" stroke="#E5E7E9" stroke-width="3" fill="none" opacity="0.85" stroke-linecap="round"/>
        <path d="M 245,295 Q 260,305 250,320" stroke="#F2F4F4" stroke-width="2.5" fill="none" opacity="0.8" stroke-linecap="round"/>
        <circle cx="330" cy="295" r="4" fill="#1C0D09" opacity="0.9"/>
        """
    elif element_type == "garlic":
        return """
        <!-- Garlic Pickle Visual Elements -->
        <path d="M 240,240 Q 255,225 260,250 Q 255,275 235,265 Z" fill="#FAD7A0" opacity="0.75"/>
        <path d="M 330,245 Q 350,235 345,265 Q 325,280 320,255 Z" fill="#F8C471" opacity="0.7"/>
        <path d="M 275,290 Q 295,280 290,310 Q 270,320 265,295 Z" fill="#F5CBA7" opacity="0.8"/>
        <circle cx="295" cy="245" r="4" fill="#641E16" opacity="0.85"/>
        <circle cx="245" cy="300" r="4.5" fill="#4A120B" opacity="0.9"/>
        <circle cx="335" cy="305" r="3.5" fill="#51140E" opacity="0.85"/>
        """
    elif element_type == "pepper":
        return """
        <!-- Tellicherry Black Peppercorn Elements -->
        <circle cx="240" cy="245" r="8" fill="#1B1B1E" stroke="#555558" stroke-width="0.75"/>
        <circle cx="265" cy="235" r="7.5" fill="#141416" stroke="#444446" stroke-width="0.75"/>
        <circle cx="330" cy="240" r="9" fill="#1B1B1E" stroke="#66666A" stroke-width="0.75"/>
        <circle cx="355" cy="255" r="8" fill="#111113" stroke="#444446" stroke-width="0.75"/>
        <circle cx="250" cy="285" r="9.5" fill="#18181A" stroke="#555558" stroke-width="0.75"/>
        <circle cx="280" cy="270" r="8.5" fill="#141416" stroke="#444446" stroke-width="0.75"/>
        <circle cx="310" cy="280" r="9" fill="#1E1E22" stroke="#66666A" stroke-width="0.75"/>
        <circle cx="340" cy="300" r="8" fill="#141416" stroke="#444446" stroke-width="0.75"/>
        <circle cx="280" cy="315" r="9" fill="#18181B" stroke="#555558" stroke-width="0.75"/>
        <circle cx="305" cy="325" r="8.5" fill="#121214" stroke="#444446" stroke-width="0.75"/>
        """
    elif element_type == "cardamom":
        return """
        <!-- Green Cardamom Pod Elements -->
        <path d="M 230,240 Q 255,220 265,245 Q 250,270 225,260 Z" fill="#2E7D32" stroke="#81C784" stroke-width="1"/>
        <line x1="230" y1="240" x2="255" y2="255" stroke="#81C784" stroke-width="0.75" opacity="0.6"/>
        <path d="M 330,235 Q 355,225 350,255 Q 325,275 315,250 Z" fill="#28692B" stroke="#81C784" stroke-width="1"/>
        <line x1="330" y1="235" x2="335" y2="260" stroke="#81C784" stroke-width="0.75" opacity="0.6"/>
        <path d="M 270,285 Q 295,270 300,300 Q 280,325 255,305 Z" fill="#338A37" stroke="#A5D6A7" stroke-width="1"/>
        <line x1="270" y1="285" x2="285" y2="310" stroke="#A5D6A7" stroke-width="0.75" opacity="0.7"/>
        <path d="M 320,295 Q 345,285 340,315 Q 315,330 305,310 Z" fill="#1E5A21" stroke="#66BB6A" stroke-width="1"/>
        """
    elif element_type == "hamper":
        return """
        <!-- Hamper Presentation Box Details -->
        <rect x="220" y="235" width="160" height="90" rx="4" fill="#0E0E12" stroke="url(#silverGrad)" stroke-width="1"/>
        <line x1="300" y1="235" x2="300" y2="325" stroke="url(#silverGrad)" stroke-width="1.5"/>
        <line x1="220" y1="280" x2="380" y2="280" stroke="url(#silverGrad)" stroke-width="1.5"/>
        <circle cx="300" cy="280" r="14" fill="#000000" stroke="url(#silverGrad)" stroke-width="1.5"/>
        <text x="300" y="284" font-family="'Cinzel', serif" font-size="9" font-weight="bold" fill="url(#silverGrad)" text-anchor="middle">ZQ</text>
        """
    return ""

def make_product_svg(p, view_num=1):
    inner_svg = render_inner_elements(p['element'])
    
    # Check if jar or tin styling
    is_spice = p['jar_type'] == "spice_tin"
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#202026"/>
      <stop offset="50%" stop-color="#0F0F12"/>
      <stop offset="100%" stop-color="#050506"/>
    </radialGradient>
    <radialGradient id="productGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{p['accent']}"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#d4d4d8"/>
      <stop offset="70%" stop-color="#8e8e93"/>
      <stop offset="100%" stop-color="#c7c7cc"/>
    </linearGradient>
    <linearGradient id="silverBorder" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
      <stop offset="50%" stop-color="rgba(142,142,147,0.12)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.25)"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="20" flood-color="#000000" flood-opacity="0.88"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="600" fill="url(#bgGlow)"/>
  
  <!-- Subtle circular grid / concentric luxury rings -->
  <circle cx="300" cy="270" r="220" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  <circle cx="300" cy="270" r="175" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4 6"/>
  <circle cx="300" cy="270" r="125" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <!-- Product-specific warm ambient glow -->
  <circle cx="300" cy="280" r="160" fill="url(#productGlow)" opacity="0.35"/>

  <!-- Pedestal shadow -->
  <ellipse cx="300" cy="440" rx="180" ry="24" fill="#000000" opacity="0.9" filter="url(#softShadow)"/>
  <ellipse cx="300" cy="435" rx="140" ry="12" fill="url(#silverGrad)" opacity="0.15"/>

  <!-- Centerpiece Vessel / Container -->
  <g filter="url(#softShadow)">
    <!-- Container Body -->
    <rect x="190" y="160" width="220" height="250" rx="16" fill="#141417" stroke="url(#silverBorder)" stroke-width="1.5"/>
    
    <!-- Transparent Glass Viewport / Product Color Tone -->
    <rect x="202" y="172" width="196" height="226" rx="10" fill="{p['accent']}" opacity="0.45"/>
    
    <!-- Distinct Internal Food Texture Elements -->
    <g>
      {inner_svg}
    </g>

    <!-- Metallic Chrome Label Plaque -->
    <rect x="215" y="215" width="170" height="145" rx="6" fill="#0B0B0D" stroke="url(#silverGrad)" stroke-width="1"/>
    
    <!-- ZOOQE Monogram on Plaque -->
    <circle cx="300" cy="245" r="16" fill="none" stroke="url(#silverGrad)" stroke-width="1"/>
    <text x="300" y="249" font-family="'Cinzel', serif" font-size="11" font-weight="bold" fill="url(#silverGrad)" text-anchor="middle" letter-spacing="1">ZQ</text>
    
    <!-- Exact Product Title on Label -->
    <text x="300" y="278" font-family="'Cinzel', serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">ZOOQE</text>
    <line x1="240" y1="288" x2="360" y2="288" stroke="url(#silverGrad)" stroke-width="0.75" opacity="0.7"/>
    <text x="300" y="306" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">{p['title'].upper()}</text>
    <text x="300" y="322" font-family="'Inter', sans-serif" font-size="7.5" font-weight="600" fill="#A1A1A6" text-anchor="middle" letter-spacing="1.2">{p['category']}</text>
    <text x="300" y="340" font-family="'Inter', sans-serif" font-size="7" fill="url(#silverGrad)" text-anchor="middle">PREMIUM KERALA HERITAGE</text>

    <!-- Chrome Cap / Lid -->
    <rect x="220" y="125" width="160" height="40" rx="6" fill="url(#silverGrad)" stroke="#ffffff" stroke-width="0.5"/>
    <line x1="225" y1="138" x2="375" y2="138" stroke="#555558" stroke-width="1"/>
    <line x1="225" y1="148" x2="375" y2="148" stroke="#555558" stroke-width="1"/>
    <rect x="260" y="112" width="80" height="15" rx="3" fill="url(#silverGrad)"/>

    <!-- Subtle Silver Light Reflection across Glass -->
    <path d="M 200,170 L 228,170 L 208,400 L 195,400 Z" fill="url(#silverGrad)" opacity="0.15"/>
  </g>

  <!-- Bottom Captions -->
  <text x="300" y="520" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">{p['title']}</text>
  <text x="300" y="545" font-family="'Inter', sans-serif" font-size="11" fill="#8e8e93" text-anchor="middle" letter-spacing="1">{p['detail']}</text>
  <text x="540" y="565" font-family="'Inter', sans-serif" font-size="10" fill="#636366" text-anchor="end" letter-spacing="1">VIEW 0{view_num}</text>
</svg>
"""

# Generate 3 views for each product for interactive gallery
for p in products:
    for v in [1, 2, 3]:
        fname = f"{p['filename']}-{v}.svg"
        with open(os.path.join(products_dir, fname), "w", encoding="utf-8") as f:
            f.write(make_product_svg(p, v))

# Collections Banners
collections = [
    {
        "filename": "collection-pickles",
        "title": "PREMIUM PICKLES",
        "tag": "KERALA ACHAR COLLECTION",
        "desc": "Authentic Mango, Lemon, Fish, Beef and Garlic pickles crafted with heritage recipes.",
        "accent": "#5C1D10"
    },
    {
        "filename": "collection-spices",
        "title": "SIGNATURE SPICES",
        "tag": "MALABAR SPICE HARVEST",
        "desc": "Single-origin Tellicherry black pepper and fragrant jumbo green cardamom pods.",
        "accent": "#1A2E1C"
    },
    {
        "filename": "collection-hampers",
        "title": "HERITAGE GIFT BOXES",
        "tag": "BESPOKE CURATED GIFTING",
        "desc": "An exclusive presentation box of signature Kerala pickles and single-origin spices.",
        "accent": "#1A1A20"
    }
]

def make_collection_svg(c):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181c"/>
      <stop offset="50%" stop-color="#0d0d0f"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#d1d1d6"/>
      <stop offset="70%" stop-color="#8e8e93"/>
      <stop offset="100%" stop-color="#c7c7cc"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  <circle cx="650" cy="250" r="220" fill="{c['accent']}" opacity="0.35"/>
  <circle cx="650" cy="250" r="180" fill="none" stroke="url(#silverGrad)" stroke-width="1" opacity="0.3"/>
  <circle cx="650" cy="250" r="130" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6 8"/>

  <rect x="25" y="25" width="750" height="450" fill="none" stroke="url(#silverGrad)" stroke-width="1" opacity="0.25"/>

  <text x="650" y="270" font-family="'Cinzel', serif" font-size="110" font-weight="bold" fill="url(#silverGrad)" text-anchor="middle" opacity="0.08" letter-spacing="4">ZQ</text>

  <text x="70" y="160" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="url(#silverGrad)" letter-spacing="4">{c['tag']}</text>
  <text x="70" y="215" font-family="'Cinzel', serif" font-size="32" font-weight="700" fill="#ffffff" letter-spacing="2">{c['title']}</text>
  <line x1="70" y1="245" x2="280" y2="245" stroke="url(#silverGrad)" stroke-width="1.5"/>
  <text x="70" y="290" font-family="'Inter', sans-serif" font-size="14" fill="#a1a1a6" width="400">
    <tspan x="70" dy="0">{c['desc'][:45]}</tspan>
    <tspan x="70" dy="24">{c['desc'][45:]}</tspan>
  </text>
  
  <rect x="70" y="360" width="220" height="45" rx="4" fill="#000000" stroke="url(#silverGrad)" stroke-width="1"/>
  <text x="180" y="388" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="2">EXPLORE COLLECTION →</text>
</svg>
"""

for c in collections:
    fname = f"{c['filename']}.svg"
    with open(os.path.join(collections_dir, fname), "w", encoding="utf-8") as f:
        f.write(make_collection_svg(c))

print("Kerala Pickles & Spices visual assets successfully generated!")
