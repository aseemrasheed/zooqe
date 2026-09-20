/**
 * ZOOQE Central Product Data Structure — Kerala Pickles & Spices
 * ==============================================================================
 * NOTE: Easily edit product names, prices, size variants, descriptions,
 * or ingredients directly in this file.
 * ==============================================================================
 */

export const PRODUCTS = [
  {
    id: 'zq-mango-pickle',
    name: 'Mango Pickle',
    subtitle: 'Authentic Kerala Spiced Mango Achar',
    category: 'Premium Pickles',
    categorySlug: 'pickles',
    basePrice: 12,
    previousPrice: 15,
    discountPercentage: 20,
    sku: 'ZQE-PCL-MNG',
    rating: 5.0,
    reviewsCount: 48,
    stock: 45,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: 'Bestseller',
    description: 'Traditional Kerala style cut mango pickle prepared with hand-selected raw mangoes, roasted mustard, fenugreek, Kashmiri chili, and cold-pressed gingelly (sesame) oil. Aged to perfection in airtight luxury jars.',
    ingredients: 'Raw Green Mangoes, Cold-Pressed Sesame Oil, Kashmiri Chili Powder, Mustard Seeds, Fenugreek, Asafoetida, Turmeric, Sea Salt, Vinegar.',
    origin: 'Traditional Kerala Recipe',
    sizes: [
      { size: '100g', price: 12, previousPrice: 15, sku: 'ZQE-PCL-MNG-100G' },
      { size: '250g', price: 24, previousPrice: 30, sku: 'ZQE-PCL-MNG-250G' },
      { size: '500g', price: 42, previousPrice: 52, sku: 'ZQE-PCL-MNG-500G' },
      { size: '1kg', price: 78, previousPrice: 95, sku: 'ZQE-PCL-MNG-1KG' }
    ],
    images: [
      'assets/images/products/mango-pickle-1.svg',
      'assets/images/products/mango-pickle-2.svg',
      'assets/images/products/mango-pickle-3.svg'
    ]
  },
  {
    id: 'zq-lemon-pickle',
    name: 'Lemon Pickle',
    subtitle: 'Slow-Cured Whole Lemons with Malabar Spices',
    category: 'Premium Pickles',
    categorySlug: 'pickles',
    basePrice: 12,
    previousPrice: 15,
    discountPercentage: 20,
    sku: 'ZQE-PCL-LMN',
    rating: 4.9,
    reviewsCount: 36,
    stock: 40,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    badge: 'Traditional',
    description: 'Authentic Kerala lemon achar made from sun-cured thin-skinned lemons. Infused with aromatic roasted spices, green chilies, and gingelly oil for a rich, tangy, and robust flavor.',
    ingredients: 'Fresh Farm Lemons, Pure Sesame Oil, Red Chili Powder, Mustard, Fenugreek, Green Chilies, Ginger, Asafoetida, Salt.',
    origin: 'Traditional Kerala Recipe',
    sizes: [
      { size: '100g', price: 12, previousPrice: 15, sku: 'ZQE-PCL-LMN-100G' },
      { size: '250g', price: 24, previousPrice: 30, sku: 'ZQE-PCL-LMN-250G' },
      { size: '500g', price: 42, previousPrice: 52, sku: 'ZQE-PCL-LMN-500G' },
      { size: '1kg', price: 78, previousPrice: 95, sku: 'ZQE-PCL-LMN-1KG' }
    ],
    images: [
      'assets/images/products/lemon-pickle-1.svg',
      'assets/images/products/lemon-pickle-2.svg',
      'assets/images/products/lemon-pickle-3.svg'
    ]
  },
  {
    id: 'zq-fish-pickle',
    name: 'Fish Pickle',
    subtitle: 'Wild-Caught Seer Fish in Coastal Malabar Masala',
    category: 'Premium Pickles',
    categorySlug: 'pickles',
    basePrice: 18,
    previousPrice: 22,
    discountPercentage: 18,
    sku: 'ZQE-PCL-FSH',
    rating: 5.0,
    reviewsCount: 52,
    stock: 30,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    badge: 'Signature',
    description: 'Premium Kerala Meen Achar prepared with wild-caught fresh fish cuts, fried to crisp perfection and slow-cooked in a fiery, aromatic ginger-garlic and chili masala sauce.',
    ingredients: 'Fresh Seer Fish / King Fish Fillets, Cold-Pressed Gingelly Oil, Garlic, Ginger, Kashmiri Chili, Curry Leaves, Mustard, Fenugreek, Spices, Vinegar, Salt.',
    origin: 'Coastal Kerala Recipe',
    sizes: [
      { size: '100g', price: 18, previousPrice: 22, sku: 'ZQE-PCL-FSH-100G' },
      { size: '250g', price: 38, previousPrice: 46, sku: 'ZQE-PCL-FSH-250G' },
      { size: '500g', price: 68, previousPrice: 82, sku: 'ZQE-PCL-FSH-500G' },
      { size: '1kg', price: 125, previousPrice: 150, sku: 'ZQE-PCL-FSH-1KG' }
    ],
    images: [
      'assets/images/products/fish-pickle-1.svg',
      'assets/images/products/fish-pickle-2.svg',
      'assets/images/products/fish-pickle-3.svg'
    ]
  },
  {
    id: 'zq-beef-pickle',
    name: 'Beef Pickle',
    subtitle: 'Slow-Roasted Beef Chunks in Malabar Spices',
    category: 'Premium Pickles',
    categorySlug: 'pickles',
    basePrice: 18,
    previousPrice: 22,
    discountPercentage: 18,
    sku: 'ZQE-PCL-BEEF',
    rating: 5.0,
    reviewsCount: 64,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    badge: 'Specialty',
    description: 'A celebrated Kerala delicacy. Tender boneless beef pieces slow-roasted with crushed Tellicherry black pepper, shallots, garlic, fried coconut slices (thenga kothu), and Malabar spices.',
    ingredients: 'Prime Tender Boneless Beef, Fried Coconut Slivers, Garlic, Ginger, Crushed Black Pepper, Red Chili, Coriander, Fennel, Curry Leaves, Sesame Oil, Vinegar, Salt.',
    origin: 'Malabar Heritage Recipe',
    sizes: [
      { size: '100g', price: 18, previousPrice: 22, sku: 'ZQE-PCL-BEEF-100G' },
      { size: '250g', price: 38, previousPrice: 46, sku: 'ZQE-PCL-BEEF-250G' },
      { size: '500g', price: 68, previousPrice: 82, sku: 'ZQE-PCL-BEEF-500G' },
      { size: '1kg', price: 125, previousPrice: 150, sku: 'ZQE-PCL-BEEF-1KG' }
    ],
    images: [
      'assets/images/products/beef-pickle-1.svg',
      'assets/images/products/beef-pickle-2.svg',
      'assets/images/products/beef-pickle-3.svg'
    ]
  },
  {
    id: 'zq-garlic-pickle',
    name: 'Garlic Pickle',
    subtitle: 'Whole Aged Garlic Cloves in Gingelly Oil',
    category: 'Premium Pickles',
    categorySlug: 'pickles',
    basePrice: 14,
    previousPrice: 18,
    discountPercentage: 22,
    sku: 'ZQE-PCL-GRL',
    rating: 4.9,
    reviewsCount: 29,
    stock: 40,
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    badge: 'Popular',
    description: 'Whole peeled garlic cloves slow-cooked and aged in spicy mustard and sesame oil gravy. Rich, pungent, savory, and packed with authentic traditional Kerala flavors.',
    ingredients: 'Whole Fresh Garlic Cloves, Pure Gingelly Oil, Kashmiri Chili, Mustard Seeds, Fenugreek, Asafoetida, Curry Leaves, Vinegar, Salt.',
    origin: 'Traditional Kerala Recipe',
    sizes: [
      { size: '100g', price: 14, previousPrice: 18, sku: 'ZQE-PCL-GRL-100G' },
      { size: '250g', price: 28, previousPrice: 35, sku: 'ZQE-PCL-GRL-250G' },
      { size: '500g', price: 50, previousPrice: 62, sku: 'ZQE-PCL-GRL-500G' },
      { size: '1kg', price: 92, previousPrice: 115, sku: 'ZQE-PCL-GRL-1KG' }
    ],
    images: [
      'assets/images/products/garlic-pickle-1.svg',
      'assets/images/products/garlic-pickle-2.svg',
      'assets/images/products/garlic-pickle-3.svg'
    ]
  },
  {
    id: 'zq-black-pepper',
    name: 'Black Pepper',
    subtitle: 'Tellicherry Bold Whole Black Peppercorns',
    category: 'Signature Spices',
    categorySlug: 'spices',
    basePrice: 16,
    previousPrice: 20,
    discountPercentage: 20,
    sku: 'ZQE-SPC-PEP',
    rating: 5.0,
    reviewsCount: 42,
    stock: 50,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    badge: 'Malabar Gold',
    description: 'Authentic high-grade Tellicherry bold black peppercorns from the hills of Malabar. Hand-harvested, sun-dried, and celebrated worldwide for intense pungent aroma and complex spicy finish.',
    ingredients: '100% Pure Whole Tellicherry Black Peppercorns (Grade TGEB - Tellicherry Garbled Extra Bold).',
    origin: 'Malabar Hills, Kerala',
    sizes: [
      { size: '100g', price: 16, previousPrice: 20, sku: 'ZQE-SPC-PEP-100G' },
      { size: '250g', price: 34, previousPrice: 42, sku: 'ZQE-SPC-PEP-250G' },
      { size: '500g', price: 62, previousPrice: 78, sku: 'ZQE-SPC-PEP-500G' },
      { size: '1kg', price: 115, previousPrice: 145, sku: 'ZQE-SPC-PEP-1KG' }
    ],
    images: [
      'assets/images/products/black-pepper-1.svg',
      'assets/images/products/black-pepper-2.svg',
      'assets/images/products/black-pepper-3.svg'
    ]
  },
  {
    id: 'zq-cardamom',
    name: 'Cardamom',
    subtitle: 'Jumbo Grade-A Fragrant Green Pods',
    category: 'Signature Spices',
    categorySlug: 'spices',
    basePrice: 22,
    previousPrice: 28,
    discountPercentage: 21,
    sku: 'ZQE-SPC-CRD',
    rating: 5.0,
    reviewsCount: 38,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    badge: 'Premium Grade',
    description: 'Grade-A 8mm+ jumbo green cardamom pods sourced from high-altitude mist-covered estates of Idukki. Intensely fragrant, sweet, eucalyptus-spice notes with fully mature dark seeds inside.',
    ingredients: '100% Pure Natural Whole Green Cardamom Pods (8mm+ Jumbo Grade).',
    origin: 'Idukki Cardamom Hills, Kerala',
    sizes: [
      { size: '100g', price: 22, previousPrice: 28, sku: 'ZQE-SPC-CRD-100G' },
      { size: '250g', price: 48, previousPrice: 60, sku: 'ZQE-SPC-CRD-250G' },
      { size: '500g', price: 88, previousPrice: 110, sku: 'ZQE-SPC-CRD-500G' },
      { size: '1kg', price: 165, previousPrice: 205, sku: 'ZQE-SPC-CRD-1KG' }
    ],
    images: [
      'assets/images/products/cardamom-1.svg',
      'assets/images/products/cardamom-2.svg',
      'assets/images/products/cardamom-3.svg'
    ]
  },
  {
    id: 'zq-heritage-hamper',
    name: 'Heritage Luxury Hamper',
    subtitle: 'Curated Box of Artisanal Pickles & Spices',
    category: 'Heritage Gift Sets',
    categorySlug: 'gifts',
    basePrice: 85,
    previousPrice: 110,
    discountPercentage: 22,
    sku: 'ZQE-HMP-HRT',
    rating: 5.0,
    reviewsCount: 26,
    stock: 15,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    badge: 'Exclusive Gift',
    description: 'An exclusive gift collection presented in signature ZOOQE luxury packaging. Contains Mango Pickle (250g), Beef Pickle (250g), Fish Pickle (250g), Tellicherry Black Pepper (100g), and Green Cardamom (100g).',
    ingredients: 'Curated selection of ZOOQE signature Kerala pickles and single-origin Malabar spices.',
    origin: 'ZOOQE Kerala Master Selection',
    sizes: [
      { size: '100g', price: 85, previousPrice: 110, sku: 'ZQE-HMP-HRT-100G' },
      { size: '250g', price: 145, previousPrice: 180, sku: 'ZQE-HMP-HRT-250G' },
      { size: '500g', price: 240, previousPrice: 300, sku: 'ZQE-HMP-HRT-500G' },
      { size: '1kg', price: 420, previousPrice: 520, sku: 'ZQE-HMP-HRT-1KG' }
    ],
    images: [
      'assets/images/products/heritage-hamper-1.svg',
      'assets/images/products/heritage-hamper-2.svg',
      'assets/images/products/heritage-hamper-3.svg'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'pickles', name: 'Premium Pickles' },
  { id: 'spices', name: 'Signature Spices' },
  { id: 'gifts', name: 'Heritage Gift Sets' }
];
