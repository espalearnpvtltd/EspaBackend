// Sample Course Data with Prices and Discounts
// Use this data to populate your database with realistic course information and pricing

const coursesWithPrices = [
  // ========== CLASS 10 COURSES ==========
  {
    title: "Science Fundamentals - Class 10",
    description: "Complete science course covering physics, chemistry, and biology for class 10",
    subject: "Science",
    class: "10",
    stream: "science",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1999,
    discountPercentage: 15,
    duration: 80,
    isRecommended: true,
    filepath: "/courses/10_science"
  },
  {
    title: "Mathematics Basics - Class 10",
    description: "Comprehensive mathematics course for class 10 board exams",
    subject: "Mathematics",
    class: "10",
    stream: "science",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 1799,
    discountPercentage: 10,
    duration: 100,
    isRecommended: true,
    filepath: "/courses/10_math"
  },
  {
    title: "English Communication - Class 10",
    description: "English language and communication skills for class 10",
    subject: "English",
    class: "10",
    stream: "general",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1299,
    discountPercentage: 0,
    duration: 60,
    isRecommended: false,
    filepath: "/courses/10_english"
  },
  {
    title: "Social Studies - Class 10",
    description: "History, geography, civics, and economics for class 10",
    subject: "Social Studies",
    class: "10",
    stream: "arts",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 1599,
    duration: 90,
    isRecommended: true,
    filepath: "/courses/10_social"
  },
  {
    title: "Commerce Basics - Class 10",
    description: "Introduction to commerce subjects for class 10",
    subject: "Commerce",
    class: "10",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1699,
    duration: 70,
    isRecommended: true,
    filepath: "/courses/10_commerce"
  },

  // ========== CLASS 11 SCIENCE COURSES ==========
  {
    title: "Physics Class 11 - Comprehensive",
    description: "Complete physics course for class 11 covering mechanics, thermodynamics, and waves",
    subject: "Physics",
    class: "11",
    stream: "science",
    examType: ["BOARDS", "JEE"],
    difficulty: "intermediate",
    price: 2999,
    duration: 120,
    isRecommended: true,
    filepath: "/courses/11_physics"
  },
  {
    title: "Chemistry Class 11 - Full Course",
    description: "Complete chemistry course including organic, inorganic, and physical chemistry",
    subject: "Chemistry",
    class: "11",
    stream: "science",
    examType: ["BOARDS", "JEE", "NEET"],
    difficulty: "intermediate",
    price: 2999,
    duration: 120,
    isRecommended: true,
    filepath: "/courses/11_chemistry"
  },
  {
    title: "Biology Class 11 - NEET Preparation",
    description: "Biology course focused on NEET preparation with emphasis on medical entrance",
    subject: "Biology",
    class: "11",
    stream: "science",
    examType: ["BOARDS", "NEET"],
    difficulty: "intermediate",
    price: 3499,
    duration: 140,
    isRecommended: true,
    filepath: "/courses/11_biology_neet"
  },
  {
    title: "Mathematics Class 11 - JEE Focus",
    description: "Advanced mathematics course for JEE preparation with problem-solving techniques",
    subject: "Mathematics",
    class: "11",
    stream: "science",
    examType: ["BOARDS", "JEE"],
    difficulty: "advanced",
    price: 3299,
    duration: 130,
    isRecommended: true,
    filepath: "/courses/11_math_jee"
  },

  // ========== CLASS 11 COMMERCE COURSES ==========
  {
    title: "Accountancy Class 11",
    description: "Fundamentals of accounting, journal entries, and financial statements",
    subject: "Accountancy",
    class: "11",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 2299,
    duration: 100,
    isRecommended: true,
    filepath: "/courses/11_accounts"
  },
  {
    title: "Business Studies Class 11",
    description: "Business management, entrepreneurship, and organizational studies",
    subject: "Business Studies",
    class: "11",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1999,
    duration: 80,
    isRecommended: true,
    filepath: "/courses/11_business"
  },
  {
    title: "Economics Class 11",
    description: "Microeconomics and macroeconomics fundamentals",
    subject: "Economics",
    class: "11",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 2199,
    duration: 90,
    isRecommended: false,
    filepath: "/courses/11_economics"
  },

  // ========== CLASS 11 ARTS COURSES ==========
  {
    title: "History Class 11",
    description: "World history and Indian history comprehensive course",
    subject: "History",
    class: "11",
    stream: "arts",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 1899,
    duration: 85,
    isRecommended: true,
    filepath: "/courses/11_history"
  },
  {
    title: "Geography Class 11",
    description: "Physical and human geography with map work skills",
    subject: "Geography",
    class: "11",
    stream: "arts",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1799,
    duration: 80,
    isRecommended: false,
    filepath: "/courses/11_geography"
  },
  {
    title: "Political Science Class 11",
    description: "Indian constitution, political systems, and governance",
    subject: "Political Science",
    class: "11",
    stream: "arts",
    examType: ["BOARDS", "UPSC"],
    difficulty: "intermediate",
    price: 2099,
    duration: 95,
    isRecommended: true,
    filepath: "/courses/11_polsci"
  },

  // ========== CLASS 12 SCIENCE COURSES ==========
  {
    title: "Advanced Physics for JEE",
    description: "Advanced physics for JEE Main and Advanced with deep concept clarity",
    subject: "Physics",
    class: "12",
    stream: "science",
    examType: ["JEE"],
    difficulty: "advanced",
    price: 5999,
    duration: 150,
    isRecommended: true,
    filepath: "/courses/12_physics_jee"
  },
  {
    title: "Physics for NEET",
    description: "Physics course focused on medical entrance exams (NEET)",
    subject: "Physics",
    class: "12",
    stream: "science",
    examType: ["NEET"],
    difficulty: "advanced",
    price: 4999,
    duration: 130,
    isRecommended: true,
    filepath: "/courses/12_physics_neet"
  },
  {
    title: "Chemistry Class 12 - Complete",
    description: "Organic, inorganic, and physical chemistry for competitive exams",
    subject: "Chemistry",
    class: "12",
    stream: "science",
    examType: ["JEE", "NEET", "BOARDS"],
    difficulty: "advanced",
    price: 5499,
    duration: 140,
    isRecommended: true,
    filepath: "/courses/12_chemistry"
  },
  {
    title: "Biology for NEET - Masterclass",
    description: "Comprehensive biology course with emphasis on medical concepts",
    subject: "Biology",
    class: "12",
    stream: "science",
    examType: ["NEET"],
    difficulty: "advanced",
    price: 6999,
    duration: 160,
    isRecommended: true,
    filepath: "/courses/12_biology_neet"
  },
  {
    title: "Mathematics for JEE - Advanced",
    description: "Advanced mathematics with JEE-level problem solving",
    subject: "Mathematics",
    class: "12",
    stream: "science",
    examType: ["JEE"],
    difficulty: "advanced",
    price: 5899,
    duration: 150,
    isRecommended: true,
    filepath: "/courses/12_math_jee"
  },

  // ========== CLASS 12 COMMERCE COURSES ==========
  {
    title: "Accountancy Class 12 - Advanced",
    description: "Advanced accounting, company accounts, and partnership accounts",
    subject: "Accountancy",
    class: "12",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "advanced",
    price: 3499,
    duration: 120,
    isRecommended: true,
    filepath: "/courses/12_accounts"
  },
  {
    title: "Business Studies Class 12",
    description: "Business organization, finance, and marketing strategies",
    subject: "Business Studies",
    class: "12",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 2999,
    duration: 100,
    isRecommended: true,
    filepath: "/courses/12_business"
  },
  {
    title: "Economics Class 12 - Macro & Micro",
    description: "Advanced microeconomics and macroeconomics for commerce students",
    subject: "Economics",
    class: "12",
    stream: "commerce",
    examType: ["BOARDS"],
    difficulty: "advanced",
    price: 3299,
    duration: 110,
    isRecommended: false,
    filepath: "/courses/12_economics"
  },

  // ========== CLASS 12 ARTS COURSES ==========
  {
    title: "History Class 12 - Comprehensive",
    description: "World history and modern Indian history comprehensive course",
    subject: "History",
    class: "12",
    stream: "arts",
    examType: ["BOARDS", "UPSC"],
    difficulty: "intermediate",
    price: 2899,
    duration: 105,
    isRecommended: true,
    filepath: "/courses/12_history"
  },
  {
    title: "Political Science (Class 12) - UPSC",
    description: "Indian constitution and political systems for UPSC preparation",
    subject: "Political Science",
    class: "12",
    stream: "arts",
    examType: ["BOARDS", "UPSC"],
    difficulty: "advanced",
    price: 4999,
    duration: 140,
    isRecommended: true,
    filepath: "/courses/12_polsci_upsc"
  },
  {
    title: "Geography Class 12",
    description: "Human and physical geography with detailed case studies",
    subject: "Geography",
    class: "12",
    stream: "arts",
    examType: ["BOARDS"],
    difficulty: "intermediate",
    price: 2299,
    duration: 95,
    isRecommended: false,
    filepath: "/courses/12_geography"
  },
  {
    title: "Sociology Class 12",
    description: "Social structures, institutions, and society analysis",
    subject: "Sociology",
    class: "12",
    stream: "arts",
    examType: ["BOARDS"],
    difficulty: "beginner",
    price: 1999,
    duration: 85,
    isRecommended: false,
    filepath: "/courses/12_sociology"
  },

  // ========== COMPETITIVE EXAMS ==========
  {
    title: "GATE Preparation Course",
    description: "Comprehensive GATE preparation for engineering graduates",
    subject: "Engineering",
    class: "12",
    stream: "science",
    examType: ["GATE"],
    difficulty: "advanced",
    price: 7999,
    duration: 200,
    isRecommended: true,
    filepath: "/courses/gate_prep"
  },
  {
    title: "CAT Preparation Course",
    description: "Complete CAT (MBA entrance) preparation with mock tests",
    subject: "Quantitative & Reasoning",
    class: "12",
    stream: "commerce",
    examType: ["CAT"],
    difficulty: "advanced",
    price: 9999,
    duration: 180,
    isRecommended: true,
    filepath: "/courses/cat_prep"
  },
  {
    title: "UPSC IAS Preparation - Part 1",
    description: "First part of UPSC IAS preparation covering Indian polity and history",
    subject: "Political Science",
    class: "12",
    stream: "arts",
    examType: ["UPSC"],
    difficulty: "advanced",
    price: 12999,
    duration: 250,
    isRecommended: true,
    filepath: "/courses/upsc_part1"
  },
  {
    title: "UPSC IAS Preparation - Geography",
    description: "Comprehensive geography course for UPSC IAS preparation",
    subject: "Geography",
    class: "12",
    stream: "arts",
    examType: ["UPSC"],
    difficulty: "advanced",
    price: 8999,
    duration: 180,
    isRecommended: true,
    filepath: "/courses/upsc_geography"
  }
];

// PRICING GUIDE:
// Class 10: ₹1,299 - ₹1,999
// Class 11: ₹1,899 - ₹3,499
// Class 12: ₹2,299 - ₹6,999
// Competitive Exams (GATE, CAT, UPSC): ₹7,999 - ₹12,999

export default coursesWithPrices;

// ====== TO INSERT INTO DATABASE ======
// Option 1: Use this in a script and import
// Option 2: Copy individual course objects and POST to /api/courses endpoint
// Option 3: Use bulk insert if available

// EXAMPLE: Creating a course via API
/*
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Advanced Physics for JEE",
    "description": "Advanced physics for JEE Main and Advanced with deep concept clarity",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "duration": 150,
    "isRecommended": true,
    "filepath": "/courses/12_physics_jee"
  }'
*/
