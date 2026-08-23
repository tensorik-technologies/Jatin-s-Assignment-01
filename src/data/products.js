export const PRODUCTS = [
  // =========================================================================
  // --- REAL SMARTPHONES (APPLE, SAMSUNG, ONEPLUS, GOOGLE) ---
  // =========================================================================
  {
    id: 101,
    name: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
    category: "Electronics",
    brand: "Apple",
    price: 148900,
    originalPrice: 159900,
    discount: 7,
    rating: 4.9,
    reviews: 1420,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1695048133021-f3b14515152a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Forged in aerospace-grade titanium, iPhone 15 Pro Max features the groundbreaking A17 Pro chip, customizable Action button, the most powerful iPhone camera system with 5x optical telephoto zoom, and USB-C with USB 3 speeds.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR with ProMotion 120Hz",
      "Processor": "A17 Pro chip with 6-core GPU",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      "Material": "Titanium design with Ceramic Shield front",
      "Connector": "USB-C with USB 3 support (Up to 10Gb/s)",
      "Warranty": "1 Year Apple India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["iphone", "apple", "iphone15promax", "mobile", "smartphone", "5g", "titanium"]
  },
  {
    id: 102,
    name: "Apple iPhone 15 Pro (128 GB) - Blue Titanium",
    category: "Electronics",
    brand: "Apple",
    price: 127990,
    originalPrice: 134900,
    discount: 5,
    rating: 4.8,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1695048133021-f3b14515152a?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133021-f3b14515152a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Compact powerhouse featuring titanium construction, the A17 Pro gaming beast, 48MP high-resolution camera system, Dynamic Island, and USB-C connectivity.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR with ProMotion 120Hz",
      "Processor": "A17 Pro Bionic Chip",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto",
      "Safety": "Emergency SOS via Satellite & Crash Detection",
      "Warranty": "1 Year Apple India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["iphone", "apple", "iphone15pro", "mobile", "smartphone", "5g"]
  },
  {
    id: 103,
    name: "Apple iPhone 15 (128 GB) - Black",
    category: "Electronics",
    brand: "Apple",
    price: 70999,
    originalPrice: 79900,
    discount: 11,
    rating: 4.8,
    reviews: 2150,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "iPhone 15 brings Dynamic Island, a 48MP main camera with 2x Telephoto, color-infused back glass, aluminum design, all-day battery life, and universal USB-C charging.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR OLED",
      "Processor": "A16 Bionic Chip",
      "Camera": "48MP Dual Camera with 2x Optical Zoom",
      "Battery": "Up to 20 hours video playback",
      "Connector": "USB-C charging",
      "Warranty": "1 Year Apple India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["iphone", "apple", "iphone15", "mobile", "smartphone", "5g"]
  },
  {
    id: 104,
    name: "Apple iPhone 14 (128 GB) - Midnight Blue",
    category: "Electronics",
    brand: "Apple",
    price: 58999,
    originalPrice: 69900,
    discount: 16,
    rating: 4.7,
    reviews: 3410,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience exceptional performance with the A15 Bionic chip, advanced dual-camera system with Photonic Engine, Cinematic mode in 4K Dolby Vision, and industry-leading durability.",
    specifications: {
      "Display": "6.1-inch Super Retina XDR OLED",
      "Processor": "A15 Bionic (5-core GPU)",
      "Camera": "12MP Main + 12MP Ultra-Wide with Action Mode",
      "Water Resistance": "IP68 (6 meters up to 30 mins)",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["iphone", "apple", "iphone14", "mobile", "smartphone"]
  },
  {
    id: 105,
    name: "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB Storage) - Titanium Gray",
    category: "Electronics",
    brand: "Samsung",
    price: 129999,
    originalPrice: 134999,
    discount: 4,
    rating: 4.9,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Unleash Galaxy AI with Circle to Search, Live Translate, and Note Assist. Features a 200MP camera with Quad Tele System, built-in S Pen, Titanium frame, and Snapdragon 8 Gen 3 for Galaxy processor.",
    specifications: {
      "Display": "6.8\" Dynamic AMOLED 2X QHD+ (2600 nits, 120Hz)",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy (4nm)",
      "Camera": "200MP + 50MP + 12MP + 10MP with 100x Space Zoom",
      "Battery": "5000mAh with 45W Fast Charging",
      "Stylus": "Built-in S Pen included",
      "Warranty": "1 Year Comprehensive Samsung India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["samsung", "galaxy", "s24ultra", "mobile", "5g", "ai", "spen"]
  },
  {
    id: 106,
    name: "Samsung Galaxy S24 5G (8GB RAM, 128GB Storage) - Onyx Black",
    category: "Electronics",
    brand: "Samsung",
    price: 74999,
    originalPrice: 79999,
    discount: 6,
    rating: 4.7,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Compact flagship with Galaxy AI capabilities, Armor Aluminum frame, 50MP pro-grade camera, and 4000mAh intelligent battery life.",
    specifications: {
      "Display": "6.2\" Dynamic AMOLED 2X FHD+ 120Hz",
      "Processor": "Exynos 2400 Deca-Core 4nm",
      "Camera": "50MP Triple Camera with 30x Space Zoom",
      "Battery": "4000mAh Super Fast Charging",
      "Warranty": "1 Year Samsung India Warranty"
    },
    inStock: true,
    featured: false,
    trending: false,
    isNew: true,
    tags: ["samsung", "galaxy", "s24", "mobile", "5g", "android"]
  },
  {
    id: 107,
    name: "Samsung Galaxy A55 5G (8GB RAM, 128GB Storage) - Awesome Iceblue",
    category: "Electronics",
    brand: "Samsung",
    price: 39999,
    originalPrice: 42999,
    discount: 7,
    rating: 4.6,
    reviews: 820,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Premium metal frame design with Corning Gorilla Glass Victus+, 50MP OIS camera, Samsung Knox Vault security, and IP67 water and dust resistance.",
    specifications: {
      "Display": "6.6\" Super AMOLED FHD+ 120Hz (1000 nits)",
      "Processor": "Exynos 1480 with AMD Xclipse GPU",
      "Camera": "50MP Main OIS + 12MP Ultra-Wide + 5MP Macro",
      "Battery": "5000mAh with 25W Fast Charge",
      "Protection": "IP67 Water & Dust Resistance"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: true,
    tags: ["samsung", "galaxya55", "mobile", "5g", "smartphone"]
  },
  {
    id: 108,
    name: "Samsung Galaxy M34 5G (6GB RAM, 128GB Storage) - Prism Silver",
    category: "Electronics",
    brand: "Samsung",
    price: 15999,
    originalPrice: 24499,
    discount: 35,
    rating: 4.5,
    reviews: 4200,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Monster 6000mAh battery champion with 120Hz Super AMOLED display, 50MP No Shake OIS Camera, and up to 4 generations of Android OS upgrades.",
    specifications: {
      "Display": "6.5\" FHD+ Super AMOLED 120Hz Display",
      "Battery": "6000mAh Massive 2-Day Battery",
      "Camera": "50MP Triple Camera with OIS",
      "Processor": "Exynos 1280 Octa-Core",
      "Warranty": "1 Year Brand Warranty"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["samsung", "galaxym34", "mobile", "5g", "budget", "battery"]
  },
  {
    id: 109,
    name: "OnePlus 12 5G (16GB RAM, 512GB Storage) - Flowy Emerald",
    category: "Electronics",
    brand: "OnePlus",
    price: 69999,
    originalPrice: 74999,
    discount: 7,
    rating: 4.8,
    reviews: 1150,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Powered by Qualcomm Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, 2K 120Hz ProXDR display, 5400mAh battery, and lightning 100W SUPERVOOC charging.",
    specifications: {
      "Display": "6.82\" 2K 120Hz ProXDR LTPO AMOLED (4500 nits)",
      "Processor": "Snapdragon 8 Gen 3 with Dual Cryo-velocity VC",
      "Camera": "50MP Sony LYT-808 + 64MP 3X Periscope + 48MP Ultra-Wide",
      "Charging": "100W Wired (1-100% in 26 mins) + 50W Wireless AIRVOOC",
      "Warranty": "1 Year OnePlus India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["oneplus", "oneplus12", "mobile", "flagship", "5g", "hasselblad"]
  },

  // =========================================================================
  // --- REAL EARBUDS & AUDIO (BOAT, JBL, NOISE, REALME, SONY, APPLE) ---
  // =========================================================================
  {
    id: 110,
    name: "boAt Airdopes 141 ANC TWS Earbuds - Gunmetal Black",
    category: "Electronics",
    brand: "boAt",
    price: 1499,
    originalPrice: 4490,
    discount: 67,
    rating: 4.5,
    reviews: 8400,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    description: "India's bestselling budget ANC true wireless earbuds featuring 32dB Active Noise Cancellation, ENx Quad Mics for clear calls, Beast Mode with 50ms low latency, and massive 42-hour playtime.",
    specifications: {
      "Active Noise Cancellation": "Up to 32dB Hybrid ANC",
      "Playtime": "Up to 42 Hours Total Playback",
      "Drivers": "10mm boAt Signature Sound Drivers",
      "Fast Charge": "ASAP Charge (10 mins = 150 mins)",
      "Water Resistance": "IPX5 Sweat & Splash Proof",
      "Warranty": "1 Year boAt India Replacement Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["boat", "airdopes", "earbuds", "tws", "anc", "audio", "bluetooth"]
  },
  {
    id: 111,
    name: "boAt Nirvana Ion ANC True Wireless Earbuds - Crystal Black",
    category: "Electronics",
    brand: "boAt",
    price: 2499,
    originalPrice: 7990,
    discount: 69,
    rating: 4.7,
    reviews: 3120,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Unrivaled 120-hour massive battery life with HiFi DSP audio processing, 32dB active noise cancelling, dual EQ modes (Crystal & Bass), and in-ear detection sensors.",
    specifications: {
      "Playtime": "120 Hours Total (24H single charge)",
      "Audio Technology": "HiFi DSP processing + Crystal Bionic Sound",
      "ANC": "32dB Active Noise Cancellation",
      "Microphones": "Quad Mics with ENx Tech",
      "Warranty": "1 Year boAt Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["boat", "nirvana", "tws", "earbuds", "hifi", "longbattery"]
  },
  {
    id: 112,
    name: "Noise Buds VS102 Plus Truly Wireless Earbuds - Deep Wine",
    category: "Electronics",
    brand: "Noise",
    price: 1199,
    originalPrice: 3999,
    discount: 70,
    rating: 4.4,
    reviews: 5600,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Unique flywheel casing design with impressive 70 hours total playtime, 11mm dynamic drivers, Instacharge (10 mins = 120 mins playtime), and Quad Mic ENC for crystal-clear calling.",
    specifications: {
      "Playtime": "Up to 70 Hours Playback",
      "Driver Size": "11mm Dynamic Speaker Drivers",
      "Calling": "Quad Mic Environmental Noise Cancellation",
      "Charging": "Instacharge Type-C Fast Charging",
      "Protection": "IPX5 Water Resistant",
      "Warranty": "1 Year Noise India Warranty"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["noise", "earbuds", "tws", "wireless", "budget", "audio"]
  },
  {
    id: 113,
    name: "Noise Buds N1 Pro ANC In-Ear Earbuds - Chrome Forest",
    category: "Electronics",
    brand: "Noise",
    price: 1799,
    originalPrice: 4999,
    discount: 64,
    rating: 4.6,
    reviews: 1940,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Chrome metallic aesthetics featuring 32dB Active Noise Cancellation, 60 hours playtime, ultra low 40ms gaming latency, and dual device smart pairing.",
    specifications: {
      "ANC": "32dB Active Noise Cancellation",
      "Playtime": "60 Hours with Charging Case",
      "Gaming Mode": "40ms Ultra Low Latency",
      "Connectivity": "Dual Device Pairing Bluetooth 5.3",
      "Warranty": "1 Year Replacement Warranty"
    },
    inStock: true,
    featured: false,
    trending: false,
    isNew: true,
    tags: ["noise", "buds", "earbuds", "anc", "tws", "metallic"]
  },
  {
    id: 114,
    name: "realme Buds Air 5 Pro ANC Earbuds - Sunrise Beige",
    category: "Electronics",
    brand: "realme",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.8,
    reviews: 2180,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Flagship-grade 50dB Deep Sea Noise Cancellation 2.0 with LDAC Hi-Res Audio certification, coaxial dual drivers (11mm bass + 6mm micro-planar tweeter), and 40-hour total playback.",
    specifications: {
      "Noise Cancellation": "50dB Active Noise Cancellation with 4000Hz Ultra-Wideband",
      "Sound Architecture": "11mm Bass Driver + 6mm Micro-Planar Tweeter",
      "Codec": "LDAC Hi-Res Audio Certified (990kbps)",
      "Battery Life": "40 Hours Playback (Fast charge 10 mins = 7 hours)",
      "Warranty": "1 Year realme Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["realme", "budsair5pro", "earbuds", "hires", "anc", "ldac"]
  },
  {
    id: 115,
    name: "realme Buds T300 TWS Earbuds - Stylish Black",
    category: "Electronics",
    brand: "realme",
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.6,
    reviews: 3800,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Equipped with 12.4mm dynamic bass boost driver, 30dB active noise cancellation, 360-degree spatial audio effect, and IP55 water and dust resistance.",
    specifications: {
      "Drivers": "12.4mm Dynamic Bass Boost Driver",
      "Noise Cancellation": "30dB ANC + 4-Mic Call Noise Cancellation",
      "Battery": "40 Hours Total Playtime",
      "Spatial Audio": "360° Spatial Audio Effect",
      "Warranty": "1 Year realme Warranty"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["realme", "budst300", "earbuds", "tws", "bass", "audio"]
  },
  {
    id: 116,
    name: "JBL Tune 230NC TWS Active Noise Cancelling Earbuds - Black",
    category: "Electronics",
    brand: "JBL",
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.6,
    reviews: 4920,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    description: "JBL Pure Bass Sound with Active Noise Cancelling and Smart Ambient technology. 4 microphones ensure perfect voice calls, while the IPX4 water-resistant design handles workouts and rainy commutes.",
    specifications: {
      "Sound": "JBL Pure Bass Sound (6.0mm Drivers)",
      "ANC": "Active Noise Cancelling with Smart Ambient & TalkThru",
      "Playtime": "Up to 40 Hours (10h earbuds + 30h case)",
      "Mics": "4-Mic Technology for crisp stereo calls",
      "Warranty": "1 Year Official Harman JBL India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["jbl", "jblearbuds", "purebass", "anc", "tws", "audio"]
  },
  {
    id: 117,
    name: "JBL Wave Flex True Wireless Earbuds - White",
    category: "Electronics",
    brand: "JBL",
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    rating: 4.4,
    reviews: 1750,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Stick open-ear ergonomic fit delivering JBL Deep Bass Sound with 32 hours total playtime, Smart Ambient mode, and IP54 dust and splash resistance.",
    specifications: {
      "Drivers": "12mm Deep Bass Drivers",
      "Battery": "32 Hours Total (8h + 24h case)",
      "Fit": "Ergonomic Stick Open Design",
      "Protection": "IP54 Earbuds / IPX2 Case",
      "Warranty": "1 Year Harman JBL Warranty"
    },
    inStock: true,
    featured: false,
    trending: false,
    isNew: false,
    tags: ["jbl", "waveflex", "earbuds", "tws", "jblbass"]
  },
  {
    id: 118,
    name: "Apple AirPods Pro (2nd Generation with USB-C MagSafe Case)",
    category: "Electronics",
    brand: "Apple",
    price: 22990,
    originalPrice: 24900,
    discount: 8,
    rating: 4.9,
    reviews: 3840,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Powered by the Apple-designed H2 chip, AirPods Pro features up to 2x more Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio with dynamic head tracking, and USB-C MagSafe charging.",
    specifications: {
      "Processor": "Apple H2 Headphone Chip",
      "ANC": "Pro-level Active Noise Cancellation & Transparency Mode",
      "Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Charging": "USB-C, MagSafe, Apple Watch charger compatible",
      "Battery": "Up to 6 hours listening (30h with MagSafe Case)",
      "Warranty": "1 Year Apple India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["apple", "airpodspro", "airpods", "tws", "anc", "spatialaudio"]
  },
  {
    id: 119,
    name: "Sony WH-1000XM5 Wireless Industry Leading ANC Headphones - Silver",
    category: "Electronics",
    brand: "Sony",
    price: 28990,
    originalPrice: 34990,
    discount: 17,
    rating: 4.9,
    reviews: 2450,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Industry-leading noise cancellation optimized by two processors and 8 microphones. Features Auto NC Optimizer, crystal clear hands-free calling with 4 beamforming mics, and 30-hour battery life.",
    specifications: {
      "Noise Cancellation": "Dual Processors (V1 + QN1) with 8 Microphones",
      "Drivers": "30mm Precision Engineered Carbon Fiber Drivers",
      "Battery": "30 Hours (3 mins quick charge = 3 hours playback)",
      "Multipoint": "Connects to 2 Bluetooth devices simultaneously",
      "Warranty": "1 Year Official Sony India Warranty"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["sony", "wh1000xm5", "headphones", "anc", "sonyheadphones", "audio"]
  },
  {
    id: 120,
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones - Hazel Beige",
    category: "Electronics",
    brand: "boAt",
    price: 1299,
    originalPrice: 3990,
    discount: 67,
    rating: 4.5,
    reviews: 9500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sleek matte finish on-ear wireless headphones with 40mm dynamic drivers, padded earcups, integrated mic, and up to 15 hours non-stop playback.",
    specifications: {
      "Drivers": "40mm High-Def Drivers",
      "Playtime": "Up to 15 Hours",
      "Connectivity": "Bluetooth v5.0 and 3.5mm AUX Dual Mode",
      "Warranty": "1 Year boAt Warranty"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["boat", "rockerz", "headphones", "wireless", "budget", "bluetooth"]
  },

  // =========================================================================
  // --- FASHION, BEAUTY, HOME, SPORTS, BOOKS, ACCESSORIES ---
  // =========================================================================
  {
    id: 7,
    name: "UrbanAura Minimalist Oversized Hoodie",
    category: "Fashion",
    brand: "UrbanAura",
    price: 1699,
    originalPrice: 2799,
    discount: 39,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Crafted from heavyweight 380 GSM combed French terry cotton, this relaxed-fit unisex hoodie delivers everyday luxury and thermal comfort.",
    specifications: {
      "Fabric": "100% Combed Organic French Terry (380 GSM)",
      "Fit": "Relaxed Oversized Drop-Shoulder",
      "Care": "Machine wash cold, tumble dry low"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: true,
    tags: ["hoodie", "streetwear", "cotton", "casual", "oversized"]
  },
  {
    id: 8,
    name: "Classic Tailored Linen Casual Shirt",
    category: "Fashion",
    brand: "Vanguard",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Breathable pure European flax linen shirt featuring a relaxed spread collar, mother-of-pearl buttons, and rounded cuffs.",
    specifications: {
      "Fabric": "100% Natural Breathable Linen",
      "Collar": "Modern Spread Collar",
      "Fit": "Regular Slim"
    },
    inStock: true,
    featured: false,
    trending: false,
    isNew: false,
    tags: ["shirt", "linen", "summer", "formal", "casual"]
  },
  {
    id: 9,
    name: "Heritage Denim Trucker Jacket",
    category: "Fashion",
    brand: "DenimCraft",
    price: 2799,
    originalPrice: 4299,
    discount: 35,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Timeless vintage washed 14oz rigid denim jacket with antique brass shank buttons and dual chest flap pockets.",
    specifications: {
      "Material": "14 oz 100% Ringspun Denim",
      "Closure": "Heavy Duty Brass Shank Buttons",
      "Wash": "Vintage Indigo Medium Fade"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["denim", "jacket", "outerwear", "vintage", "casual"]
  },
  {
    id: 11,
    name: "Aura Flow Breathable Sports Bra & Leggings Set",
    category: "Fashion",
    brand: "AuraAthletics",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    rating: 4.9,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "High-waisted compression athletic matching co-ord set featuring moisture-wicking squat-proof fabric.",
    specifications: {
      "Fabric Blend": "75% Nylon, 25% Spandex",
      "Compression": "Medium-High Support"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: true,
    tags: ["activewear", "gym", "yoga", "leggings", "athleisure"]
  },
  {
    id: 12,
    name: "GlowRadiance Vitamin C Serum 30ml",
    category: "Beauty",
    brand: "GlowRadiance",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.7,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Formulated with 15% Pure L-Ascorbic Acid and Botanical Hyaluronic Acid. Fades dark spots and boosts radiant glow.",
    specifications: {
      "Key Actives": "15% Pure Vitamin C + 1% Ferulic Acid",
      "Volume": "30ml / 1.0 fl oz"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["serum", "skincare", "vitaminc", "glow", "beauty"]
  },
  {
    id: 13,
    name: "HydroPlump Multi-Molecule Barrier Moisturizer",
    category: "Beauty",
    brand: "DermaPure",
    price: 649,
    originalPrice: 999,
    discount: 35,
    rating: 4.6,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Ultra-lightweight gel cream infused with 5 essential ceramides and peptides to lock in 72-hour hydration.",
    specifications: {
      "Key Ingredients": "5 Ceramides, Centella Asiatica, Peptides",
      "Volume": "50g"
    },
    inStock: true,
    featured: false,
    trending: false,
    isNew: false,
    tags: ["moisturizer", "skincare", "ceramides", "hydration", "beauty"]
  },
  {
    id: 16,
    name: "AromaMist Ceramic Ultrasonic Diffuser",
    category: "Home",
    brand: "ZenLiving",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.8,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handcrafted matte ceramic exterior with whisper-quiet ultrasonic aromatherapy and 7 warm LED mood lights.",
    specifications: {
      "Capacity": "280ml (Runs up to 10 hours)",
      "Material": "Artisanal Matte Ceramic"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["diffuser", "aromatherapy", "homedecor", "ceramic", "wellness"]
  },
  {
    id: 18,
    name: "Nordic Minimalist Adjustable Desk Lamp",
    category: "Home",
    brand: "LumiCraft",
    price: 1999,
    originalPrice: 3199,
    discount: 38,
    rating: 4.6,
    reviews: 144,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sleek architectural desk lamp with swivel articulated arm, step-less dimming, and built-in 10W wireless smartphone charging base.",
    specifications: {
      "Material": "Anodized Aluminum + Oak Accents",
      "Color Temp": "3000K - 6500K Adjustable"
    },
    inStock: true,
    featured: true,
    trending: false,
    isNew: false,
    tags: ["lamp", "desklamp", "lighting", "minimalist", "nordic"]
  },
  {
    id: 21,
    name: "FlexPro Adjustable Quick-Dial Dumbbell 24kg",
    category: "Sports",
    brand: "IronStrength",
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Seamless dial mechanism shifts weight smoothly from 2.5kg to 24kg in 15 precise increments.",
    specifications: {
      "Weight Range": "2.5kg to 24kg",
      "Settings": "15 Precise Increments"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["dumbbell", "weights", "gym", "fitness", "strength"]
  },
  {
    id: 24,
    name: "ApexPro Deep Tissue Percussive Massage Gun",
    category: "Sports",
    brand: "ApexHealth",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "High-torque brushless motor delivering up to 3200 RPM with 6 interchangeable therapeutic heads.",
    specifications: {
      "Speeds": "30 Intensity Levels",
      "Battery": "2500mAh Lithium-ion (6 hours)"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["massagegun", "recovery", "fitness", "therapy", "gym"]
  },
  {
    id: 26,
    name: "Atomic Habits by James Clear (Hardcover Edition)",
    category: "Books",
    brand: "Penguin Random House",
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.9,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The definitive guide to breaking bad behaviors and adopting good habits through tiny 1% daily improvements.",
    specifications: {
      "Author": "James Clear",
      "Format": "Collector's Hardcover",
      "Pages": "320 Pages"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["books", "selfhelp", "atomichabits", "productivity", "bestseller"]
  },
  {
    id: 27,
    name: "The Psychology of Money by Morgan Housel",
    category: "Books",
    brand: "Harriman House",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.8,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Timeless lessons on wealth, greed, and happiness doing what you want, when you want, with whom you want.",
    specifications: {
      "Author": "Morgan Housel",
      "Format": "Paperback",
      "Pages": "252 Pages"
    },
    inStock: true,
    featured: false,
    trending: true,
    isNew: false,
    tags: ["books", "finance", "investing", "psychology", "money"]
  },
  {
    id: 30,
    name: "Chronos Classic Sapphire Chronograph Watch",
    category: "Accessories",
    brand: "Chronos",
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.9,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sleek 41mm timepiece housing Japanese Miyota Quartz movement beneath scratch-resistant sapphire crystal glass.",
    specifications: {
      "Movement": "Japanese Miyota Quartz Chronograph",
      "Glass": "Sapphire Crystal with AR Coating",
      "Strap": "Full-Grain Italian Leather"
    },
    inStock: true,
    featured: true,
    trending: true,
    isNew: false,
    tags: ["watch", "chronograph", "luxury", "leather", "accessories"]
  },
  {
    id: 31,
    name: "Voyager Full-Grain Leather Weekender Duffle Bag",
    category: "Accessories",
    brand: "VoyagerCraft",
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handmade from premium oiled full-grain buffalo leather with heavy antique brass hardware and shoe tunnel.",
    specifications: {
      "Dimensions": "52 x 28 x 26 cm (45L Carry-On)",
      "Material": "100% Genuine Full-Grain Leather"
    },
    inStock: true,
    featured: true,
    trending: false,
    isNew: true,
    tags: ["bag", "leather", "duffle", "travel", "accessories"]
  }
];
