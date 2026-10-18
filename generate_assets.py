import os

base_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(base_dir, "assets", "images")
products_dir = os.path.join(images_dir, "products")
spices_dir = os.path.join(products_dir, "spices")
collections_dir = os.path.join(images_dir, "collections")
about_dir = os.path.join(images_dir, "about")

os.makedirs(images_dir, exist_ok=True)
os.makedirs(products_dir, exist_ok=True)
os.makedirs(spices_dir, exist_ok=True)
os.makedirs(collections_dir, exist_ok=True)
os.makedirs(about_dir, exist_ok=True)

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

# 2. Distinct Product Visuals for Kerala Pickles & Curated Sets
pickle_products = [
    {
        "filename": "mango-pickle",
        "title": "Mango Pickle",
        "category": "KERALA ACHAR",
        "accent": "#661E0A",
        "element": "mango",
        "detail": "Tender Raw Mango • Gingelly Oil & Spices"
    },
    {
        "filename": "lemon-pickle",
        "title": "Lemon Pickle",
        "category": "KERALA ACHAR",
        "accent": "#4D3808",
        "element": "lemon",
        "detail": "Slow-Cured Whole Lemons • Mustard & Fenugreek"
    },
    {
        "filename": "fish-pickle",
        "title": "Fish Pickle",
        "category": "KERALA SEAFOOD ACHAR",
        "accent": "#5E1710",
        "element": "fish",
        "detail": "Wild-Caught Seer Fish • Malabar Spices"
    },
    {
        "filename": "beef-pickle",
        "title": "Beef Pickle",
        "category": "KERALA SPECIALTY ACHAR",
        "accent": "#33150D",
        "element": "beef",
        "detail": "Slow-Roasted Beef Chunks • Coconut Slices"
    },
    {
        "filename": "chicken_pickle",
        "title": "Chicken Pickle",
        "category": "KERALA SPECIALTY ACHAR",
        "accent": "#541A0E",
        "element": "chicken",
        "detail": "Tender Chicken Chunks • Malabar Masala"
    },
    {
        "filename": "carrot_pickle",
        "title": "Carrot Pickle",
        "category": "KERALA ACHAR",
        "accent": "#68250C",
        "element": "carrot",
        "detail": "Farm-Fresh Carrots • Gingelly Oil & Mustard"
    },
    {
        "filename": "prawns_pickle",
        "title": "Prawns Pickle",
        "category": "KERALA SEAFOOD ACHAR",
        "accent": "#6B1D0F",
        "element": "prawns",
        "detail": "Wild Coastal Prawns • Fiery Gingelly Sauce"
    },
    {
        "filename": "garlic-pickle",
        "title": "Garlic Pickle",
        "category": "KERALA ACHAR",
        "accent": "#422812",
        "element": "garlic",
        "detail": "Whole Aged Garlic Cloves • Cold-Pressed Oil"
    },
    {
        "filename": "heritage-hamper",
        "title": "Heritage Hamper",
        "category": "CURATED GIFT SET",
        "accent": "#1F1F24",
        "element": "hamper",
        "detail": "Artisanal Pickles & Single-Origin Spices Box"
    }
]

# 3. 9 Distinct Spices Collection Product Definitions
spice_products = [
    {
        "id": "tellicherry-black-pepper",
        "filename": "tellicherry_black_pepper",
        "title": "Tellicherry Black Pepper",
        "malayalam": "Extra Bold (Kurumulaku)",
        "category": "spices",
        "badge": "Single Origin",
        "startingPrice": 149,
        "mrp": 189,
        "accent": "#1B1B20",
        "gold_accent": "#d4af37",
        "detail": "Grade TGEB 4.25mm+ Whole Tellicherry Black Peppercorns",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "pepper"
    },
    {
        "id": "idukki-green-cardamom",
        "filename": "idukki_green_cardamom",
        "title": "Idukki Green Cardamom",
        "malayalam": "Jumbo 8mm+ (Elakkaya)",
        "category": "spices",
        "badge": "Single Origin",
        "startingPrice": 219,
        "mrp": 279,
        "accent": "#1E3B22",
        "gold_accent": "#81C784",
        "detail": "High-Altitude Mist-Estate Jumbo Green Cardamom Pods",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "cardamom"
    },
    {
        "id": "cloves-grambu",
        "filename": "cloves_grambu",
        "title": "Cloves (Grambu)",
        "malayalam": "Hand-Picked Malabar (Grambu)",
        "category": "spices",
        "badge": "Premium Harvest",
        "startingPrice": 119,
        "mrp": 149,
        "accent": "#381810",
        "gold_accent": "#D35400",
        "detail": "Intensely Aromatic Whole Dried Clove Buds with Full Crowns",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "cloves"
    },
    {
        "id": "cinnamon-bark",
        "filename": "cinnamon_bark",
        "title": "Cinnamon Bark (Patta)",
        "malayalam": "True Ceylon Bark (Patta)",
        "category": "spices",
        "badge": "Single Origin",
        "startingPrice": 99,
        "mrp": 129,
        "accent": "#5E2E16",
        "gold_accent": "#E67E22",
        "detail": "Fragrant Thin-Rolled Ceylon Cinnamon Quills",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "cinnamon"
    },
    {
        "id": "royal-mixed-masala",
        "filename": "royal_mixed_masala",
        "title": "Royal Mixed Masala",
        "malayalam": "Imperial Whole Blend",
        "category": "spices",
        "badge": "Signature Blend",
        "startingPrice": 129,
        "mrp": 169,
        "accent": "#4A2810",
        "gold_accent": "#F39C12",
        "detail": "Whole Malabar Spice Harmony for Royal Biryanis & Curries",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "royal_masala"
    },
    {
        "id": "kerala-curry-masala",
        "filename": "kerala_curry_masala",
        "title": "Traditional Kerala Curry Masala",
        "malayalam": "Stone-Ground Curry Podi",
        "category": "spices",
        "badge": "Heritage Recipe",
        "startingPrice": 79,
        "mrp": 99,
        "accent": "#6B1F0A",
        "gold_accent": "#E74C3C",
        "detail": "Slow-Roasted Chili, Coriander & Heritage Malabar Spices",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "curry_masala"
    },
    {
        "id": "star-anise-thakkolam",
        "filename": "star_anise",
        "title": "Star Anise (Thakkolam)",
        "malayalam": "Eight-Point Whole (Thakkolam)",
        "category": "spices",
        "badge": "Single Origin",
        "startingPrice": 109,
        "mrp": 139,
        "accent": "#4A2412",
        "gold_accent": "#D4AC0D",
        "detail": "Whole Autumn Harvest 8-Pointed Star Anise Pods",
        "sizes": ["50g", "100g", "250g", "500g", "1kg"],
        "element": "star_anise"
    },
    {
        "id": "nutmeg-mace",
        "filename": "nutmeg_mace",
        "title": "Nutmeg Mace (Jaathipathiri)",
        "malayalam": "Golden Mace Blades",
        "category": "spices",
        "badge": "Rare Reserve",
        "startingPrice": 149,
        "mrp": 189,
        "accent": "#6E2A0E",
        "gold_accent": "#E59866",
        "detail": "Whole Sun-Dried Golden Red Lacy Mace Arils & Whole Nutmeg",
        "sizes": ["25g", "50g", "100g", "250g", "500g"],
        "element": "mace"
    },
    {
        "id": "kashmiri-saffron",
        "filename": "kashmiri_saffron",
        "title": "Premium Kashmiri Saffron (Kunkuma Poovu)",
        "malayalam": "Grade A1 Mongra",
        "category": "spices",
        "badge": "Ultra Luxury",
        "startingPrice": 349,
        "mrp": 449,
        "accent": "#6E0D1B",
        "gold_accent": "#F1948A",
        "detail": "Pure All-Red Mongra Saffron Filaments from Pampore",
        "sizes": ["1g", "2g", "5g", "10g", "25g"],
        "element": "saffron"
    }
]

def render_spice_inner_graphic(element):
    if element == "pepper":
        return """
        <!-- Peppercorn texture -->
        <circle cx="300" cy="270" r="14" fill="#18181C" stroke="#444448" stroke-width="1"/>
        <circle cx="270" cy="255" r="12" fill="#141418" stroke="#3A3A3E" stroke-width="1"/>
        <circle cx="330" cy="260" r="13" fill="#1A1A20" stroke="#48484E" stroke-width="1"/>
        <circle cx="285" cy="295" r="13.5" fill="#16161B" stroke="#404044" stroke-width="1"/>
        <circle cx="320" cy="290" r="12.5" fill="#121216" stroke="#36363A" stroke-width="1"/>
        <circle cx="250" cy="280" r="10" fill="#19191E" stroke="#44444A" stroke-width="0.8"/>
        <circle cx="348" cy="280" r="11" fill="#15151A" stroke="#3C3C42" stroke-width="0.8"/>
        """
    elif element == "cardamom":
        return """
        <!-- Cardamom Pods -->
        <path d="M 260,240 Q 290,215 305,245 Q 285,280 255,265 Z" fill="#2E7D32" stroke="#81C784" stroke-width="1.5"/>
        <path d="M 335,235 Q 365,225 360,260 Q 330,285 320,255 Z" fill="#28692B" stroke="#81C784" stroke-width="1.5"/>
        <path d="M 290,270 Q 320,250 325,285 Q 300,315 275,295 Z" fill="#338A37" stroke="#A5D6A7" stroke-width="1.5"/>
        <line x1="260" y1="240" x2="285" y2="255" stroke="#A5D6A7" stroke-width="1" opacity="0.8"/>
        <line x1="335" y1="235" x2="345" y2="265" stroke="#A5D6A7" stroke-width="1" opacity="0.8"/>
        """
    elif element == "cloves":
        return """
        <!-- Cloves / Grambu -->
        <rect x="288" y="240" width="8" height="35" rx="3" fill="#2E160E" transform="rotate(-20 292 255)"/>
        <circle cx="282" cy="235" r="9" fill="#4A2318"/>
        <rect x="315" y="250" width="8" height="38" rx="3" fill="#331A12" transform="rotate(25 319 265)"/>
        <circle cx="330" cy="245" r="9.5" fill="#52271B"/>
        <rect x="260" y="270" width="7" height="32" rx="3" fill="#26120C" transform="rotate(45 263 285)"/>
        <circle cx="275" cy="290" r="8.5" fill="#441E15"/>
        """
    elif element == "cinnamon":
        return """
        <!-- Cinnamon Bark / Patta -->
        <rect x="250" y="235" width="22" height="75" rx="5" fill="#6E371C" stroke="#8C4623" stroke-width="1.2" transform="rotate(-15 260 270)"/>
        <rect x="285" y="230" width="24" height="80" rx="5" fill="#5A2C16" stroke="#7A3B1E" stroke-width="1.2"/>
        <rect x="325" y="240" width="20" height="72" rx="5" fill="#6E371C" stroke="#8C4623" stroke-width="1.2" transform="rotate(15 335 275)"/>
        <path d="M 288,232 Q 297,225 306,232" fill="none" stroke="#D35400" stroke-width="2"/>
        """
    elif element == "star_anise":
        return """
        <!-- Star Anise / Thakkolam (8-pointed star) -->
        <g transform="translate(300, 275)">
          <path d="M 0,-40 L 9,-10 L 40,0 L 9,10 L 0,40 L -9,10 L -40,0 L -9,-10 Z" fill="#5C2D16" stroke="#823F1F" stroke-width="1.5"/>
          <path d="M -28,-28 L 0,-12 L 28,-28 L 12,0 L 28,28 L 0,12 L -28,28 L -12,0 Z" fill="#6E361B" stroke="#8E4623" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="8" fill="#3D1E0E"/>
          <ellipse cx="0" cy="-22" rx="3" ry="5" fill="#A0522D"/>
          <ellipse cx="22" cy="0" rx="5" ry="3" fill="#A0522D"/>
          <ellipse cx="0" cy="22" rx="3" ry="5" fill="#A0522D"/>
          <ellipse cx="-22" cy="0" rx="5" ry="3" fill="#A0522D"/>
        </g>
        """
    elif element == "mace":
        return """
        <!-- Nutmeg Mace / Jaathipathiri -->
        <path d="M 270,290 C 250,260 260,230 280,240 C 295,250 300,280 320,250 C 335,230 350,260 330,290 C 310,310 290,300 270,290 Z" fill="#C0392B" opacity="0.85"/>
        <path d="M 285,250 Q 295,270 310,260 Q 320,275 305,295" fill="none" stroke="#F39C12" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="295" cy="275" rx="14" ry="18" fill="#3E2723" opacity="0.9"/>
        """
    elif element == "saffron":
        return """
        <!-- Kashmiri Saffron Filaments -->
        <g stroke="#C0392B" stroke-width="2.5" fill="none" stroke-linecap="round">
          <path d="M 270,300 Q 285,260 280,230 Q 285,225 292,232"/>
          <path d="M 290,305 Q 300,265 305,225 Q 312,220 318,228"/>
          <path d="M 315,300 Q 318,260 328,235 Q 335,230 340,238"/>
          <path d="M 280,300 Q 305,270 315,245"/>
        </g>
        <circle cx="292" cy="232" r="2.5" fill="#F39C12"/>
        <circle cx="318" cy="228" r="2.5" fill="#F39C12"/>
        <circle cx="340" cy="238" r="2.5" fill="#F39C12"/>
        """
    elif element == "royal_masala":
        return """
        <!-- Royal Mixed Whole Masala Blend -->
        <circle cx="270" cy="265" r="10" fill="#18181C" stroke="#555558" stroke-width="1"/>
        <path d="M 315,240 Q 335,230 330,260 Q 310,275 300,250 Z" fill="#2E7D32" stroke="#81C784" stroke-width="1.2"/>
        <rect x="250" y="245" width="12" height="38" rx="3" fill="#5A2C16" stroke="#7A3B1E" stroke-width="1" transform="rotate(-30 255 260)"/>
        <path d="M 290,285 L 295,275 L 305,278 L 300,288 Z" fill="#6E361B"/>
        <circle cx="330" cy="285" r="7" fill="#4A2318"/>
        """
    elif element == "curry_masala":
        return """
        <!-- Traditional Curry Masala Powder Texture -->
        <ellipse cx="300" cy="275" rx="60" ry="35" fill="#9C3A16" opacity="0.85"/>
        <ellipse cx="300" cy="275" rx="45" ry="25" fill="#B8441A" opacity="0.9"/>
        <circle cx="280" cy="270" r="2.5" fill="#F39C12"/>
        <circle cx="315" cy="265" r="2" fill="#E67E22"/>
        <circle cx="295" cy="285" r="3" fill="#D35400"/>
        <circle cx="325" cy="280" r="2.5" fill="#F1C40F"/>
        """
    return ""

def make_spice_svg(s):
    inner = render_spice_inner_graphic(s['element'])
    accent = s['accent']
    gold_accent = s['gold_accent']

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow_{s['filename']}" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1c1c24"/>
      <stop offset="50%" stop-color="#0c0c0f"/>
      <stop offset="100%" stop-color="#050506"/>
    </radialGradient>
    <radialGradient id="spiceGlow_{s['filename']}" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <linearGradient id="goldBorder_{s['filename']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2d6"/>
      <stop offset="35%" stop-color="#d4af37"/>
      <stop offset="70%" stop-color="#8c6614"/>
      <stop offset="100%" stop-color="#e6be68"/>
    </linearGradient>
    <linearGradient id="silverPlaque_{s['filename']}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#cfcfd4"/>
      <stop offset="100%" stop-color="#7a7a80"/>
    </linearGradient>
    <filter id="shadow_{s['filename']}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="22" flood-color="#000000" flood-opacity="0.92"/>
    </filter>
  </defs>

  <!-- Deep Obsidian Background -->
  <rect width="600" height="600" fill="url(#bgGlow_{s['filename']})"/>

  <!-- Concentric Luxury Rings -->
  <circle cx="300" cy="275" r="230" fill="none" stroke="rgba(212,175,55,0.06)" stroke-width="1"/>
  <circle cx="300" cy="275" r="180" fill="none" stroke="rgba(212,175,55,0.08)" stroke-width="1" stroke-dasharray="6 8"/>
  <circle cx="300" cy="275" r="130" fill="none" stroke="rgba(212,175,55,0.12)" stroke-width="1"/>

  <!-- Warm Spice Ambient Halo -->
  <circle cx="300" cy="275" r="170" fill="url(#spiceGlow_{s['filename']})" opacity="0.6"/>

  <!-- Pedestal Base Shadow -->
  <ellipse cx="300" cy="455" rx="190" ry="26" fill="#000000" opacity="0.95" filter="url(#shadow_{s['filename']})"/>
  <ellipse cx="300" cy="448" rx="150" ry="14" fill="url(#goldBorder_{s['filename']})" opacity="0.2"/>

  <!-- Centerpiece Vessel / Luxury Matte Black Craft Pouch / Jar -->
  <g filter="url(#shadow_{s['filename']})">
    <!-- Pouch / Jar Body -->
    <rect x="185" y="150" width="230" height="270" rx="18" fill="#101014" stroke="url(#goldBorder_{s['filename']})" stroke-width="1.5"/>
    
    <!-- Transparent spice window / inner aura -->
    <rect x="198" y="162" width="204" height="246" rx="12" fill="{accent}" opacity="0.45"/>

    <!-- Spice Graphics -->
    <g>
      {inner}
    </g>

    <!-- Luxury Gold & Obsidian Label Plaque -->
    <rect x="210" y="225" width="180" height="155" rx="8" fill="#09090C" stroke="url(#goldBorder_{s['filename']})" stroke-width="1.2"/>
    
    <!-- ZOOQE Crest Monogram -->
    <circle cx="300" cy="255" r="16" fill="none" stroke="url(#goldBorder_{s['filename']})" stroke-width="1"/>
    <text x="300" y="260" font-family="'Cinzel', serif" font-size="11" font-weight="bold" fill="#f7df99" text-anchor="middle" letter-spacing="1">ZQ</text>

    <!-- Brand & Spice Name on Label -->
    <text x="300" y="290" font-family="'Cinzel', serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">ZOOQE</text>
    <line x1="235" y1="300" x2="365" y2="300" stroke="url(#goldBorder_{s['filename']})" stroke-width="0.8" opacity="0.8"/>
    <text x="300" y="318" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="9.5" font-weight="700" fill="#f7df99" text-anchor="middle" letter-spacing="1.2">{s['title'].upper()[:22]}</text>
    <text x="300" y="334" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="8" font-weight="600" fill="#a1a1a8" text-anchor="middle" letter-spacing="0.8">{s['malayalam'].upper()}</text>
    <text x="300" y="352" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="7.5" fill="#d4af37" text-anchor="middle" letter-spacing="1.5">✦ SINGLE ORIGIN MALABAR ✦</text>

    <!-- Metallic Gold Cap / Seal -->
    <rect x="215" y="115" width="170" height="42" rx="6" fill="url(#goldBorder_{s['filename']})" stroke="#fff2d6" stroke-width="0.6"/>
    <line x1="220" y1="128" x2="380" y2="128" stroke="#8c6614" stroke-width="1"/>
    <line x1="220" y1="138" x2="380" y2="138" stroke="#8c6614" stroke-width="1"/>
    <rect x="255" y="103" width="90" height="15" rx="3" fill="url(#goldBorder_{s['filename']})"/>
  </g>

  <!-- Bottom Captions -->
  <text x="300" y="525" font-family="'Cinzel', serif" font-size="17" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">{s['title']}</text>
  <text x="300" y="550" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" fill="#d4af37" text-anchor="middle" letter-spacing="1">{s['detail']}</text>
</svg>
"""

# Generate SVGs for all 9 Spices in assets/images/products/spices/
for s in spice_products:
    svg_content = make_spice_svg(s)
    svg_path = os.path.join(spices_dir, f"{s['filename']}.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    # Also create a copy in assets/images/products/ for direct product references
    flat_svg_path = os.path.join(products_dir, f"{s['filename']}.svg")
    with open(flat_svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Generated SVGs for all {len(spice_products)} luxury spices in {spices_dir}")

# 4. Generate Collections Banners
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
        "title": "THE SPICES COLLECTION",
        "tag": "MALABAR HIGHLANDS HARVEST",
        "desc": "Single-origin Tellicherry black pepper, Idukki cardamom, cloves, cinnamon, saffron and masala blends.",
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
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2d6"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#997018"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  <circle cx="650" cy="250" r="220" fill="{c['accent']}" opacity="0.35"/>
  <circle cx="650" cy="250" r="180" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.3"/>
  <circle cx="650" cy="250" r="130" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6 8"/>

  <rect x="25" y="25" width="750" height="450" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.25"/>

  <text x="650" y="270" font-family="'Cinzel', serif" font-size="110" font-weight="bold" fill="url(#silverGrad)" text-anchor="middle" opacity="0.08" letter-spacing="4">ZQ</text>

  <text x="70" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="url(#goldGrad)" letter-spacing="4">{c['tag']}</text>
  <text x="70" y="215" font-family="'Cinzel', serif" font-size="32" font-weight="700" fill="#ffffff" letter-spacing="2">{c['title']}</text>
  <line x1="70" y1="245" x2="280" y2="245" stroke="url(#goldGrad)" stroke-width="1.5"/>
  <text x="70" y="290" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#a1a1a6" width="400">
    <tspan x="70" dy="0">{c['desc'][:45]}</tspan>
    <tspan x="70" dy="24">{c['desc'][45:]}</tspan>
  </text>
  
  <rect x="70" y="360" width="220" height="45" rx="4" fill="#000000" stroke="url(#goldGrad)" stroke-width="1"/>
  <text x="180" y="388" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="2">EXPLORE COLLECTION →</text>
</svg>
"""

for c in collections:
    fname = f"{c['filename']}.svg"
    with open(os.path.join(collections_dir, fname), "w", encoding="utf-8") as f:
        f.write(make_collection_svg(c))

print("ZOOQE Pickles & Spices visual assets successfully generated!")
