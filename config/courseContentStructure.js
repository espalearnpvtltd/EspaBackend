/**
 * 📚 ESPA Learning - Complete Course Content Structure
 * 
 * This file defines the detailed content hierarchy for all courses.
 * Each course contains topics/chapters which contain subtopics/lessons.
 */

export const courseContentStructure = {
  // ============================================================
  // 🔬 PHYSICS COURSES
  // ============================================================
  "modern-physics-course": {
    name: "Modern Physics Course",
    class: "12",
    subject: "Physics",
    chapters: [
      {
        id: 1,
        title: "Introduction to Modern Physics",
        lessons: [
          { id: 1, title: "What is Modern Physics?", duration: "15 min" },
          { id: 2, title: "History and Evolution", duration: "20 min" },
          { id: 3, title: "Key Concepts Overview", duration: "25 min" }
        ]
      },
      {
        id: 2,
        title: "Photoelectric Effect",
        lessons: [
          { id: 1, title: "Einstein's Photoelectric Equation", duration: "30 min" },
          { id: 2, title: "Work Function and Threshold Frequency", duration: "25 min" },
          { id: 3, title: "Applications and Experiments", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Bohr's Model of Atom",
        lessons: [
          { id: 1, title: "Rutherford's Nuclear Model", duration: "25 min" },
          { id: 2, title: "Postulates of Bohr's Model", duration: "30 min" },
          { id: 3, title: "Energy Levels and Transitions", duration: "25 min" },
          { id: 4, title: "Atomic Spectra", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Dual Nature of Matter",
        lessons: [
          { id: 1, title: "De Broglie Wavelength", duration: "20 min" },
          { id: 2, title: "Wave-Particle Duality", duration: "25 min" },
          { id: 3, title: "Davisson-Germer Experiment", duration: "15 min" }
        ]
      },
      {
        id: 5,
        title: "Nuclear Physics",
        lessons: [
          { id: 1, title: "Nuclear Structure and Properties", duration: "25 min" },
          { id: 2, title: "Radioactivity and Decay", duration: "30 min" },
          { id: 3, title: "Nuclear Reactions and Fission", duration: "25 min" },
          { id: 4, title: "Nuclear Energy", duration: "20 min" }
        ]
      }
    ]
  },

  "physics-basics-class-11": {
    name: "Physics Basics Class 11",
    class: "11",
    subject: "Physics",
    chapters: [
      {
        id: 1,
        title: "Motion in One Dimension",
        lessons: [
          { id: 1, title: "Displacement and Velocity", duration: "20 min" },
          { id: 2, title: "Acceleration", duration: "25 min" },
          { id: 3, title: "Kinematic Equations", duration: "30 min" },
          { id: 4, title: "Graphs of Motion", duration: "20 min" }
        ]
      },
      {
        id: 2,
        title: "Laws of Motion",
        lessons: [
          { id: 1, title: "Newton's First Law", duration: "15 min" },
          { id: 2, title: "Newton's Second Law", duration: "25 min" },
          { id: 3, title: "Newton's Third Law", duration: "15 min" },
          { id: 4, title: "Application of Newton's Laws", duration: "30 min" }
        ]
      },
      {
        id: 3,
        title: "Work, Energy, and Power",
        lessons: [
          { id: 1, title: "Work Done by a Force", duration: "20 min" },
          { id: 2, title: "Kinetic and Potential Energy", duration: "25 min" },
          { id: 3, title: "Conservation of Energy", duration: "25 min" },
          { id: 4, title: "Power and Efficiency", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Oscillations and Waves",
        lessons: [
          { id: 1, title: "Simple Harmonic Motion", duration: "30 min" },
          { id: 2, title: "Wave Properties", duration: "25 min" },
          { id: 3, title: "Sound Waves", duration: "25 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 🧪 CHEMISTRY COURSES
  // ============================================================
  "chemistry-fundamentals": {
    name: "Chemistry Fundamentals",
    class: "12",
    subject: "Chemistry",
    chapters: [
      {
        id: 1,
        title: "Basic Concepts of Chemistry",
        lessons: [
          { id: 1, title: "Atoms, Molecules, and Ions", duration: "20 min" },
          { id: 2, title: "Molar Mass and Mole", duration: "25 min" },
          { id: 3, title: "Chemical Equations and Stoichiometry", duration: "30 min" },
          { id: 4, title: "Percentage Composition", duration: "15 min" }
        ]
      },
      {
        id: 2,
        title: "States of Matter",
        lessons: [
          { id: 1, title: "Solid State", duration: "20 min" },
          { id: 2, title: "Liquid State", duration: "20 min" },
          { id: 3, title: "Gaseous State and Gas Laws", duration: "30 min" },
          { id: 4, title: "Plasma and Phase Transitions", duration: "15 min" }
        ]
      },
      {
        id: 3,
        title: "Atomic Structure",
        lessons: [
          { id: 1, title: "Discovery of Subatomic Particles", duration: "20 min" },
          { id: 2, title: "Bohr's Atomic Model", duration: "25 min" },
          { id: 3, title: "Quantum Mechanical Model", duration: "30 min" },
          { id: 4, title: "Electron Configuration", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Chemical Bonding",
        lessons: [
          { id: 1, title: "Ionic Bonding", duration: "20 min" },
          { id: 2, title: "Covalent Bonding", duration: "25 min" },
          { id: 3, title: "Metallic Bonding", duration: "15 min" },
          { id: 4, title: "Intermolecular Forces", duration: "20 min" }
        ]
      },
      {
        id: 5,
        title: "Thermodynamics and Equilibrium",
        lessons: [
          { id: 1, title: "First Law of Thermodynamics", duration: "25 min" },
          { id: 2, title: "Enthalpy and Entropy", duration: "30 min" },
          { id: 3, title: "Gibbs Free Energy", duration: "20 min" },
          { id: 4, title: "Chemical Equilibrium", duration: "25 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 🧬 BIOLOGY COURSES
  // ============================================================
  "biology-neet-preparation": {
    name: "Biology for NEET Preparation",
    class: "12",
    subject: "Biology",
    chapters: [
      {
        id: 1,
        title: "Cell: Structure and Function",
        lessons: [
          { id: 1, title: "Prokaryotic vs Eukaryotic Cells", duration: "20 min" },
          { id: 2, title: "Cell Membrane and Transport", duration: "25 min" },
          { id: 3, title: "Nucleus and Genetic Material", duration: "25 min" },
          { id: 4, title: "Organelles and Their Functions", duration: "30 min" }
        ]
      },
      {
        id: 2,
        title: "Molecular Biology",
        lessons: [
          { id: 1, title: "DNA Structure and Replication", duration: "30 min" },
          { id: 2, title: "Protein Synthesis", duration: "25 min" },
          { id: 3, title: "Gene Expression and Regulation", duration: "25 min" },
          { id: 4, title: "Mutations and DNA Repair", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Human Physiology",
        lessons: [
          { id: 1, title: "Digestive System", duration: "25 min" },
          { id: 2, title: "Respiratory System", duration: "25 min" },
          { id: 3, title: "Circulatory System", duration: "30 min" },
          { id: 4, title: "Nervous System", duration: "25 min" },
          { id: 5, title: "Endocrine System", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Reproduction and Development",
        lessons: [
          { id: 1, title: "Human Reproductive Systems", duration: "20 min" },
          { id: 2, title: "Gametogenesis", duration: "25 min" },
          { id: 3, title: "Fertilization and Embryonic Development", duration: "30 min" },
          { id: 4, title: "Birth and Growth", duration: "15 min" }
        ]
      },
      {
        id: 5,
        title: "Genetics and Evolution",
        lessons: [
          { id: 1, title: "Mendelian Inheritance", duration: "25 min" },
          { id: 2, title: "Non-Mendelian Inheritance", duration: "20 min" },
          { id: 3, title: "Evolution: Theory and Evidence", duration: "30 min" },
          { id: 4, title: "Natural Selection and Adaptation", duration: "20 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 📐 MATHEMATICS COURSES
  // ============================================================
  "mathematics-fundamentals-class-10": {
    name: "Mathematics Fundamentals Class 10",
    class: "10",
    subject: "Mathematics",
    chapters: [
      {
        id: 1,
        title: "Number Systems",
        lessons: [
          { id: 1, title: "Real Numbers", duration: "20 min" },
          { id: 2, title: "Rational and Irrational Numbers", duration: "20 min" },
          { id: 3, title: "Powers and Exponents", duration: "20 min" }
        ]
      },
      {
        id: 2,
        title: "Polynomials",
        lessons: [
          { id: 1, title: "Polynomial Basics", duration: "20 min" },
          { id: 2, title: "Factorization", duration: "25 min" },
          { id: 3, title: "Division Algorithm", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Linear Equations",
        lessons: [
          { id: 1, title: "Linear Equations in One Variable", duration: "20 min" },
          { id: 2, title: "Linear Equations in Two Variables", duration: "25 min" },
          { id: 3, title: "Graphing Linear Equations", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Quadratic Equations",
        lessons: [
          { id: 1, title: "Solving Quadratic Equations", duration: "25 min" },
          { id: 2, title: "Nature of Roots", duration: "20 min" },
          { id: 3, title: "Word Problems", duration: "25 min" }
        ]
      },
      {
        id: 5,
        title: "Triangles and Geometry",
        lessons: [
          { id: 1, title: "Properties of Triangles", duration: "20 min" },
          { id: 2, title: "Congruence and Similarity", duration: "25 min" },
          { id: 3, title: "Pythagoras Theorem", duration: "20 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 📚 HISTORY & SOCIAL SCIENCE COURSES
  // ============================================================
  "world-history-class": {
    name: "World History Class",
    class: "12",
    subject: "History",
    chapters: [
      {
        id: 1,
        title: "Ancient World Civilizations",
        lessons: [
          { id: 1, title: "Mesopotamian Civilization", duration: "25 min" },
          { id: 2, title: "Egyptian Civilization", duration: "25 min" },
          { id: 3, title: "Indus Valley Civilization", duration: "20 min" },
          { id: 4, title: "Chinese Ancient Civilization", duration: "20 min" }
        ]
      },
      {
        id: 2,
        title: "Medieval Period",
        lessons: [
          { id: 1, title: "Fall of Roman Empire", duration: "20 min" },
          { id: 2, title: "Islamic Golden Age", duration: "25 min" },
          { id: 3, title: "European Middle Ages", duration: "30 min" },
          { id: 4, title: "Medieval India", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Age of Exploration and Renaissance",
        lessons: [
          { id: 1, title: "European Renaissance", duration: "25 min" },
          { id: 2, title: "Age of Exploration", duration: "25 min" },
          { id: 3, title: "Discovery of Americas", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Industrial and French Revolutions",
        lessons: [
          { id: 1, title: "Industrial Revolution", duration: "30 min" },
          { id: 2, title: "French Revolution", duration: "30 min" },
          { id: 3, title: "Napoleonic Wars", duration: "20 min" }
        ]
      },
      {
        id: 5,
        title: "Modern World History",
        lessons: [
          { id: 1, title: "19th Century Nationalism", duration: "25 min" },
          { id: 2, title: "World War I", duration: "30 min" },
          { id: 3, title: "World War II", duration: "35 min" },
          { id: 4, title: "Cold War Era", duration: "25 min" },
          { id: 5, title: "Contemporary World", duration: "20 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 💼 ACCOUNTING & BUSINESS COURSES
  // ============================================================
  "accounting-fundamentals": {
    name: "Accounting Fundamentals",
    class: "12",
    subject: "Accountancy",
    chapters: [
      {
        id: 1,
        title: "Basics of Accounting",
        lessons: [
          { id: 1, title: "What is Accounting?", duration: "15 min" },
          { id: 2, title: "Accounting Principles", duration: "20 min" },
          { id: 3, title: "Accounting Equation", duration: "20 min" },
          { id: 4, title: "Assets, Liabilities, and Equity", duration: "20 min" }
        ]
      },
      {
        id: 2,
        title: "Journal and Ledger",
        lessons: [
          { id: 1, title: "Double Entry System", duration: "25 min" },
          { id: 2, title: "Journal Entries", duration: "25 min" },
          { id: 3, title: "Ledger Accounts", duration: "20 min" },
          { id: 4, title: "Trial Balance", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Financial Statements",
        lessons: [
          { id: 1, title: "Income Statement", duration: "25 min" },
          { id: 2, title: "Balance Sheet", duration: "25 min" },
          { id: 3, title: "Cash Flow Statement", duration: "20 min" },
          { id: 4, title: "Financial Analysis", duration: "25 min" }
        ]
      },
      {
        id: 4,
        title: "Accounting Standards",
        lessons: [
          { id: 1, title: "Indian GAAP", duration: "20 min" },
          { id: 2, title: "IFRS Standards", duration: "20 min" },
          { id: 3, title: "Accounting Policy", duration: "15 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 🎨 CREATIVE & LANGUAGES COURSES
  // ============================================================
  "letters-and-numbers": {
    name: "Letters and Numbers",
    class: "10",
    subject: "English",
    chapters: [
      {
        id: 1,
        title: "Grammar Fundamentals",
        lessons: [
          { id: 1, title: "Parts of Speech", duration: "25 min" },
          { id: 2, title: "Sentence Structure", duration: "20 min" },
          { id: 3, title: "Verb Tenses", duration: "25 min" },
          { id: 4, title: "Articles and Prepositions", duration: "20 min" }
        ]
      },
      {
        id: 2,
        title: "Reading Comprehension",
        lessons: [
          { id: 1, title: "Strategies for Comprehension", duration: "20 min" },
          { id: 2, title: "Inference and Analysis", duration: "25 min" },
          { id: 3, title: "Vocabulary Building", duration: "20 min" }
        ]
      },
      {
        id: 3,
        title: "Writing Skills",
        lessons: [
          { id: 1, title: "Paragraph Writing", duration: "25 min" },
          { id: 2, title: "Essay Writing", duration: "30 min" },
          { id: 3, title: "Letter Writing", duration: "20 min" },
          { id: 4, title: "Creative Writing", duration: "25 min" }
        ]
      },
      {
        id: 4,
        title: "Literature",
        lessons: [
          { id: 1, title: "Poetry Analysis", duration: "25 min" },
          { id: 2, title: "Drama and Plays", duration: "25 min" },
          { id: 3, title: "Prose and Novels", duration: "25 min" }
        ]
      }
    ]
  },

  "creative-arts-for-kids": {
    name: "Creative Arts for Kids",
    class: "10",
    subject: "Arts",
    chapters: [
      {
        id: 1,
        title: "Drawing Fundamentals",
        lessons: [
          { id: 1, title: "Basic Shapes and Lines", duration: "20 min" },
          { id: 2, title: "Perspective Drawing", duration: "25 min" },
          { id: 3, title: "Shading and Texture", duration: "25 min" }
        ]
      },
      {
        id: 2,
        title: "Painting Techniques",
        lessons: [
          { id: 1, title: "Watercolor Basics", duration: "25 min" },
          { id: 2, title: "Acrylic Painting", duration: "30 min" },
          { id: 3, title: "Oil Painting Introduction", duration: "25 min" }
        ]
      },
      {
        id: 3,
        title: "Color Theory",
        lessons: [
          { id: 1, title: "Color Wheel and Harmony", duration: "20 min" },
          { id: 2, title: "Warm and Cool Colors", duration: "20 min" },
          { id: 3, title: "Color Psychology", duration: "20 min" }
        ]
      },
      {
        id: 4,
        title: "Art Composition",
        lessons: [
          { id: 1, title: "Rule of Thirds", duration: "20 min" },
          { id: 2, title: "Balance and Symmetry", duration: "20 min" },
          { id: 3, title: "Emphasis and Focal Points", duration: "20 min" }
        ]
      }
    ]
  },

  // ============================================================
  // 🧮 TEST COURSES
  // ============================================================
  "test-course-class-12": {
    name: "Test Course Class 12",
    class: "12",
    subject: "General",
    chapters: [
      {
        id: 1,
        title: "Module 1: Introduction",
        lessons: [
          { id: 1, title: "Getting Started", duration: "10 min" },
          { id: 2, title: "Course Overview", duration: "15 min" }
        ]
      },
      {
        id: 2,
        title: "Module 2: Main Content",
        lessons: [
          { id: 1, title: "Core Concepts", duration: "20 min" },
          { id: 2, title: "Practical Applications", duration: "25 min" }
        ]
      }
    ]
  }
};

/**
 * Helper function to get chapters for a specific course
 * @param {string} courseId - Course identifier
 * @returns {Array} - Array of chapters
 */
export const getChaptersByCourse = (courseId) => {
  const course = courseContentStructure[courseId];
  return course ? course.chapters : [];
};

/**
 * Helper function to get lessons for a specific chapter
 * @param {string} courseId - Course identifier
 * @param {number} chapterId - Chapter ID
 * @returns {Array} - Array of lessons
 */
export const getLessonsByChapter = (courseId, chapterId) => {
  const course = courseContentStructure[courseId];
  if (!course) return [];
  
  const chapter = course.chapters.find(ch => ch.id === chapterId);
  return chapter ? chapter.lessons : [];
};

/**
 * Helper function to get all courses
 * @returns {Array} - Array of all courses
 */
export const getAllCourses = () => {
  return Object.entries(courseContentStructure).map(([id, course]) => ({
    id,
    name: course.name,
    class: course.class,
    subject: course.subject,
    chapterCount: course.chapters.length,
    totalLessons: course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
  }));
};

/**
 * Helper function to get a specific course details
 * @param {string} courseId - Course identifier
 * @returns {Object} - Complete course details
 */
export const getCourseDetails = (courseId) => {
  return courseContentStructure[courseId] || null;
};

export default courseContentStructure;
