/**
 * 📚 ESPA Learning - Complete Course Structure by Classes
 * 
 * This file defines the complete hierarchy of courses organized by class levels.
 * From Nursery to Class 12, with detailed chapters and lessons for each course.
 * 
 * Structure:
 * - Class (Nursery, LKG, UKG, 1-12)
 *   - Subjects/Courses
 *     - Chapters
 *       - Lessons
 */

export const coursesByClass = {
  // ============================================================
  // 👶 NURSERY
  // ============================================================
  "nursery": {
    name: "Nursery",
    ageGroup: "3-4 years",
    description: "Foundation learning for early childhood development",
    courses: [
      {
        id: "nursery-english",
        name: "English (Nursery)",
        subject: "English",
        chapters: [
          {
            id: 1,
            title: "Alphabet A-Z",
            lessons: [
              { id: 1, title: "Letter A", duration: "10 min", type: "video" },
              { id: 2, title: "Letter B", duration: "10 min", type: "video" },
              { id: 3, title: "Letter C", duration: "10 min", type: "video" },
              { id: 4, title: "Letters A-Z Song", duration: "15 min", type: "song" }
            ]
          },
          {
            id: 2,
            title: "Numbers 1-10",
            lessons: [
              { id: 1, title: "Counting 1-10", duration: "15 min", type: "video" },
              { id: 2, title: "Number Song", duration: "10 min", type: "song" },
              { id: 3, title: "Tracing Numbers", duration: "20 min", type: "activity" }
            ]
          },
          {
            id: 3,
            title: "Basic Words",
            lessons: [
              { id: 1, title: "Mom, Dad, Baby", duration: "10 min", type: "video" },
              { id: 2, title: "Color Words", duration: "15 min", type: "video" },
              { id: 3, title: "Animal Sounds", duration: "15 min", type: "activity" }
            ]
          }
        ]
      },
      {
        id: "nursery-math",
        name: "Math (Nursery)",
        subject: "Mathematics",
        chapters: [
          {
            id: 1,
            title: "Numbers & Counting",
            lessons: [
              { id: 1, title: "Counting Objects", duration: "15 min", type: "activity" },
              { id: 2, title: "1-10 Pattern", duration: "10 min", type: "video" },
              { id: 3, title: "More and Less", duration: "15 min", type: "game" }
            ]
          },
          {
            id: 2,
            title: "Basic Shapes",
            lessons: [
              { id: 1, title: "Circle, Square, Triangle", duration: "15 min", type: "video" },
              { id: 2, title: "Shape Recognition", duration: "20 min", type: "activity" }
            ]
          }
        ]
      }
    ]
  },

  // ============================================================
  // 🎓 LKG (Lower Kindergarten)
  // ============================================================
  "lkg": {
    name: "LKG",
    ageGroup: "4-5 years",
    description: "Lower Kindergarten - Pre-reading and pre-math concepts",
    courses: [
      {
        id: "lkg-english",
        name: "English (LKG)",
        subject: "English",
        chapters: [
          {
            id: 1,
            title: "Phonics & Sounds",
            lessons: [
              { id: 1, title: "Vowels (A, E, I, O, U)", duration: "15 min", type: "video" },
              { id: 2, title: "Consonant Sounds", duration: "20 min", type: "lesson" },
              { id: 3, title: "Sound Recognition", duration: "15 min", type: "activity" }
            ]
          },
          {
            id: 2,
            title: "Simple Words",
            lessons: [
              { id: 1, title: "Two Letter Words", duration: "20 min", type: "lesson" },
              { id: 2, title: "Three Letter Words", duration: "20 min", type: "lesson" },
              { id: 3, title: "Word Tracing", duration: "20 min", type: "activity" }
            ]
          }
        ]
      },
      {
        id: "lkg-math",
        name: "Math (LKG)",
        subject: "Mathematics",
        chapters: [
          {
            id: 1,
            title: "Numbers 1-20",
            lessons: [
              { id: 1, title: "Counting & Writing", duration: "20 min", type: "activity" },
              { id: 2, title: "Skip Counting", duration: "15 min", type: "lesson" },
              { id: 3, title: "Number Games", duration: "20 min", type: "game" }
            ]
          },
          {
            id: 2,
            title: "Addition Basics",
            lessons: [
              { id: 1, title: "Adding with Objects", duration: "20 min", type: "activity" },
              { id: 2, title: "Simple Addition (1+1)", duration: "15 min", type: "lesson" }
            ]
          }
        ]
      }
    ]
  },

  // ============================================================
  // 🎨 UKG (Upper Kindergarten)
  // ============================================================
  "ukg": {
    name: "UKG",
    ageGroup: "5-6 years",
    description: "Upper Kindergarten - Introduction to reading and basic math",
    courses: [
      {
        id: "ukg-english",
        name: "English (UKG)",
        subject: "English",
        chapters: [
          {
            id: 1,
            title: "Reading & Writing",
            lessons: [
              { id: 1, title: "CVC Words", duration: "20 min", type: "lesson" },
              { id: 2, title: "Reading Simple Sentences", duration: "25 min", type: "lesson" },
              { id: 3, title: "Writing Practice", duration: "30 min", type: "activity" }
            ]
          },
          {
            id: 2,
            title: "Sight Words",
            lessons: [
              { id: 1, title: "The, A, Is, And", duration: "20 min", type: "lesson" },
              { id: 2, title: "Common Words Practice", duration: "20 min", type: "activity" }
            ]
          }
        ]
      },
      {
        id: "ukg-math",
        name: "Math (UKG)",
        subject: "Mathematics",
        chapters: [
          {
            id: 1,
            title: "Addition & Subtraction",
            lessons: [
              { id: 1, title: "Simple Addition (up to 10)", duration: "20 min", type: "lesson" },
              { id: 2, title: "Simple Subtraction (up to 10)", duration: "20 min", type: "lesson" },
              { id: 3, title: "Word Problems", duration: "20 min", type: "activity" }
            ]
          },
          {
            id: 2,
            title: "Shapes & Patterns",
            lessons: [
              { id: 1, title: "2D Shapes", duration: "20 min", type: "lesson" },
              { id: 2, title: "Pattern Recognition", duration: "20 min", type: "activity" }
            ]
          }
        ]
      }
    ]
  },

  // ============================================================
  // 📖 CLASS 1
  // ============================================================
  "1": {
    name: "Class 1",
    ageGroup: "6-7 years",
    description: "Class 1 - Foundational academics with reading, writing, and basic math",
    courses: [
      {
        id: "class1-english",
        name: "English (Class 1)",
        subject: "English",
        chapters: [
          {
            id: 1,
            title: "Reading Skills",
            lessons: [
              { id: 1, title: "Short Vowels", duration: "20 min", type: "lesson" },
              { id: 2, title: "Word Families", duration: "20 min", type: "lesson" },
              { id: 3, title: "Fluency Practice", duration: "20 min", type: "activity" }
            ]
          },
          {
            id: 2,
            title: "Writing Basics",
            lessons: [
              { id: 1, title: "Sentence Structure", duration: "20 min", type: "lesson" },
              { id: 2, title: "Handwriting Practice", duration: "30 min", type: "activity" }
            ]
          },
          {
            id: 3,
            title: "Grammar Foundations",
            lessons: [
              { id: 1, title: "Nouns and Verbs", duration: "20 min", type: "lesson" },
              { id: 2, title: "Plural Words", duration: "15 min", type: "lesson" }
            ]
          }
        ]
      },
      {
        id: "class1-math",
        name: "Math (Class 1)",
        subject: "Mathematics",
        chapters: [
          {
            id: 1,
            title: "Numbers 1-100",
            lessons: [
              { id: 1, title: "Counting and Sequencing", duration: "20 min", type: "lesson" },
              { id: 2, title: "Place Value (Tens and Ones)", duration: "25 min", type: "lesson" }
            ]
          },
          {
            id: 2,
            title: "Addition & Subtraction",
            lessons: [
              { id: 1, title: "Addition up to 20", duration: "20 min", type: "lesson" },
              { id: 2, title: "Subtraction up to 20", duration: "20 min", type: "lesson" },
              { id: 3, title: "Word Problems", duration: "20 min", type: "activity" }
            ]
          },
          {
            id: 3,
            title: "Measurement & Geometry",
            lessons: [
              { id: 1, title: "Length and Distance", duration: "20 min", type: "lesson" },
              { id: 2, title: "Shapes and Patterns", duration: "20 min", type: "lesson" }
            ]
          }
        ]
      },
      {
        id: "class1-science",
        name: "Science (Class 1)",
        subject: "Science",
        chapters: [
          {
            id: 1,
            title: "Living Things",
            lessons: [
              { id: 1, title: "Animals Around Us", duration: "20 min", type: "lesson" },
              { id: 2, title: "Plants in Nature", duration: "20 min", type: "lesson" }
            ]
          }
        ]
      }
    ]
  },

  // ============================================================
  // 📚 CLASS 2-5 (Primary)
  // ============================================================
  "2": {
    name: "Class 2",
    ageGroup: "7-8 years",
    description: "Class 2 - Building reading comprehension and math concepts",
    courses: [
      {
        id: "class2-english",
        name: "English (Class 2)",
        subject: "English",
        chapters: [
          { id: 1, title: "Reading Comprehension", lessons: [
            { id: 1, title: "Story Understanding", duration: "25 min", type: "lesson" },
            { id: 2, title: "Questions and Answers", duration: "20 min", type: "activity" }
          ]},
          { id: 2, title: "Grammar & Vocabulary", lessons: [
            { id: 1, title: "Verbs and Tenses", duration: "20 min", type: "lesson" },
            { id: 2, title: "Adjectives", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Writing Stories", lessons: [
            { id: 1, title: "Story Writing Basics", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class2-math",
        name: "Math (Class 2)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Numbers and Arithmetic", lessons: [
            { id: 1, title: "Addition and Subtraction", duration: "20 min", type: "lesson" },
            { id: 2, title: "Multiplication Basics", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Fractions", lessons: [
            { id: 1, title: "Half and Whole", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Money and Time", lessons: [
            { id: 1, title: "Reading Clock", duration: "20 min", type: "lesson" },
            { id: 2, title: "Coins and Money", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class2-science",
        name: "Science (Class 2)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Nature and Environment", lessons: [
            { id: 1, title: "Weather and Seasons", duration: "20 min", type: "lesson" },
            { id: 2, title: "Water and Air", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Human Body", lessons: [
            { id: 1, title: "Body Parts and Senses", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "3": {
    name: "Class 3",
    ageGroup: "8-9 years",
    description: "Class 3 - Intermediate academics with expanded concepts",
    courses: [
      {
        id: "class3-english",
        name: "English (Class 3)",
        subject: "English",
        chapters: [
          { id: 1, title: "Reading & Literature", lessons: [
            { id: 1, title: "Prose and Poetry", duration: "25 min", type: "lesson" },
            { id: 2, title: "Reading Comprehension", duration: "25 min", type: "activity" }
          ]},
          { id: 2, title: "Grammar", lessons: [
            { id: 1, title: "Parts of Speech", duration: "20 min", type: "lesson" },
            { id: 2, title: "Sentence Types", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Creative Writing", lessons: [
            { id: 1, title: "Paragraph Writing", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class3-math",
        name: "Math (Class 3)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Arithmetic", lessons: [
            { id: 1, title: "Multiplication Tables", duration: "30 min", type: "lesson" },
            { id: 2, title: "Division Basics", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Fractions", lessons: [
            { id: 1, title: "Parts of a Whole", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Geometry", lessons: [
            { id: 1, title: "Shapes and Area", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class3-science",
        name: "Science (Class 3)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Life Science", lessons: [
            { id: 1, title: "Plants and Animals", duration: "20 min", type: "lesson" },
            { id: 2, title: "Human Nutrition", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Physical Science", lessons: [
            { id: 1, title: "Light and Shadow", duration: "20 min", type: "lesson" },
            { id: 2, title: "Heat and Temperature", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "4": {
    name: "Class 4",
    ageGroup: "9-10 years",
    description: "Class 4 - Advanced primary concepts",
    courses: [
      {
        id: "class4-english",
        name: "English (Class 4)",
        subject: "English",
        chapters: [
          { id: 1, title: "Literature", lessons: [
            { id: 1, title: "Stories and Fables", duration: "25 min", type: "lesson" },
            { id: 2, title: "Poetry Analysis", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Grammar & Composition", lessons: [
            { id: 1, title: "Tenses", duration: "25 min", type: "lesson" },
            { id: 2, title: "Essay Writing", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Communication", lessons: [
            { id: 1, title: "Dialogues and Conversations", duration: "20 min", type: "activity" }
          ]}
        ]
      },
      {
        id: "class4-math",
        name: "Math (Class 4)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Numbers and Operations", lessons: [
            { id: 1, title: "Large Numbers", duration: "25 min", type: "lesson" },
            { id: 2, title: "Factors and Multiples", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Decimals and Fractions", lessons: [
            { id: 1, title: "Decimal Numbers", duration: "20 min", type: "lesson" },
            { id: 2, title: "Fraction Operations", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Geometry", lessons: [
            { id: 1, title: "Perimeter and Area", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class4-science",
        name: "Science (Class 4)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Biology", lessons: [
            { id: 1, title: "Cells and Life Processes", duration: "20 min", type: "lesson" },
            { id: 2, title: "Human Body Systems", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Physics", lessons: [
            { id: 1, title: "Force and Motion", duration: "20 min", type: "lesson" },
            { id: 2, title: "Simple Machines", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Chemistry", lessons: [
            { id: 1, title: "Matter and Properties", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "5": {
    name: "Class 5",
    ageGroup: "10-11 years",
    description: "Class 5 - Final primary year with comprehensive learning",
    courses: [
      {
        id: "class5-english",
        name: "English (Class 5)",
        subject: "English",
        chapters: [
          { id: 1, title: "Reading & Comprehension", lessons: [
            { id: 1, title: "Story Analysis", duration: "25 min", type: "lesson" },
            { id: 2, title: "Non-Fiction Reading", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Grammar & Language", lessons: [
            { id: 1, title: "Complex Sentences", duration: "25 min", type: "lesson" },
            { id: 2, title: "Active and Passive Voice", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Creative & Formal Writing", lessons: [
            { id: 1, title: "Letter Writing", duration: "20 min", type: "lesson" },
            { id: 2, title: "Report Writing", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class5-math",
        name: "Math (Class 5)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Arithmetic & Algebra", lessons: [
            { id: 1, title: "Integers and Operations", duration: "25 min", type: "lesson" },
            { id: 2, title: "Exponents and Powers", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Fractions & Decimals", lessons: [
            { id: 1, title: "Comparing and Ordering", duration: "20 min", type: "lesson" },
            { id: 2, title: "Percentage", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Geometry & Measurement", lessons: [
            { id: 1, title: "3D Shapes", duration: "20 min", type: "lesson" },
            { id: 2, title: "Surface Area and Volume", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class5-science",
        name: "Science (Class 5)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Life Science", lessons: [
            { id: 1, title: "Ecosystems", duration: "25 min", type: "lesson" },
            { id: 2, title: "Food Chains and Webs", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Physical Science", lessons: [
            { id: 1, title: "Energy and Work", duration: "20 min", type: "lesson" },
            { id: 2, title: "Waves and Sound", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Earth Science", lessons: [
            { id: 1, title: "Earth and Space", duration: "20 min", type: "lesson" },
            { id: 2, title: "Natural Disasters", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  // ============================================================
  // 📖 CLASS 6-10 (Secondary)
  // ============================================================
  "6": {
    name: "Class 6",
    ageGroup: "11-12 years",
    description: "Class 6 - Introduction to secondary education",
    courses: [
      {
        id: "class6-english",
        name: "English (Class 6)",
        subject: "English",
        chapters: [
          { id: 1, title: "Literature", lessons: [
            { id: 1, title: "Short Stories", duration: "30 min", type: "lesson" },
            { id: 2, title: "Poetry and Verse", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Grammar & Writing", lessons: [
            { id: 1, title: "Sentence Structure", duration: "25 min", type: "lesson" },
            { id: 2, title: "Descriptive Writing", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Speaking & Listening", lessons: [
            { id: 1, title: "Presentation Skills", duration: "25 min", type: "activity" }
          ]}
        ]
      },
      {
        id: "class6-math",
        name: "Mathematics (Class 6)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Number Systems", lessons: [
            { id: 1, title: "Natural and Whole Numbers", duration: "25 min", type: "lesson" },
            { id: 2, title: "Integers", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Algebra Basics", lessons: [
            { id: 1, title: "Variables and Expressions", duration: "25 min", type: "lesson" },
            { id: 2, title: "Simple Equations", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Geometry", lessons: [
            { id: 1, title: "Angles and Lines", duration: "20 min", type: "lesson" },
            { id: 2, title: "Triangles and Polygons", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class6-science",
        name: "Science (Class 6)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Biology", lessons: [
            { id: 1, title: "Cell Structure and Function", duration: "25 min", type: "lesson" },
            { id: 2, title: "Classification of Organisms", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Chemistry", lessons: [
            { id: 1, title: "Matter and Its Properties", duration: "20 min", type: "lesson" },
            { id: 2, title: "Elements and Compounds", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Physics", lessons: [
            { id: 1, title: "Motion and Force", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class6-socialscience",
        name: "Social Science (Class 6)",
        subject: "Social Science",
        chapters: [
          { id: 1, title: "History", lessons: [
            { id: 1, title: "Early Human Societies", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Geography", lessons: [
            { id: 1, title: "Earth and Maps", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Civics", lessons: [
            { id: 1, title: "Government and Society", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "7": {
    name: "Class 7",
    ageGroup: "12-13 years",
    description: "Class 7 - Secondary education with advanced concepts",
    courses: [
      {
        id: "class7-english",
        name: "English (Class 7)",
        subject: "English",
        chapters: [
          { id: 1, title: "Literature", lessons: [
            { id: 1, title: "Novel Reading", duration: "30 min", type: "lesson" },
            { id: 2, title: "Drama and Scripts", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Grammar & Composition", lessons: [
            { id: 1, title: "Tenses and Aspects", duration: "30 min", type: "lesson" },
            { id: 2, title: "Essay Writing", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Vocabulary & Usage", lessons: [
            { id: 1, title: "Synonyms and Antonyms", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class7-math",
        name: "Mathematics (Class 7)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Algebra", lessons: [
            { id: 1, title: "Linear Equations", duration: "30 min", type: "lesson" },
            { id: 2, title: "Systems of Equations", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Geometry", lessons: [
            { id: 1, title: "Congruence and Similarity", duration: "25 min", type: "lesson" },
            { id: 2, title: "Area and Perimeter", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Statistics", lessons: [
            { id: 1, title: "Data Handling", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class7-science",
        name: "Science (Class 7)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Biology", lessons: [
            { id: 1, title: "Plant and Animal Tissues", duration: "25 min", type: "lesson" },
            { id: 2, title: "Nutrition and Digestion", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Chemistry", lessons: [
            { id: 1, title: "Acids, Bases and Salts", duration: "25 min", type: "lesson" },
            { id: 2, title: "Chemical Reactions", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Physics", lessons: [
            { id: 1, title: "Light and Reflection", duration: "25 min", type: "lesson" },
            { id: 2, title: "Electricity and Circuits", duration: "25 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "8": {
    name: "Class 8",
    ageGroup: "13-14 years",
    description: "Class 8 - Intermediate secondary with specialized subjects",
    courses: [
      {
        id: "class8-english",
        name: "English (Class 8)",
        subject: "English",
        chapters: [
          { id: 1, title: "Literature Analysis", lessons: [
            { id: 1, title: "Character Development", duration: "30 min", type: "lesson" },
            { id: 2, title: "Plot and Theme", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Advanced Grammar", lessons: [
            { id: 1, title: "Complex Sentences", duration: "30 min", type: "lesson" },
            { id: 2, title: "Modifiers and Phrases", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Writing Skills", lessons: [
            { id: 1, title: "Formal and Informal Writing", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class8-math",
        name: "Mathematics (Class 8)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Algebra", lessons: [
            { id: 1, title: "Quadratic Equations", duration: "30 min", type: "lesson" },
            { id: 2, title: "Polynomials", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Geometry", lessons: [
            { id: 1, title: "Circles and Properties", duration: "25 min", type: "lesson" },
            { id: 2, title: "Coordinate Geometry", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Trigonometry Intro", lessons: [
            { id: 1, title: "Trigonometric Ratios", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class8-science",
        name: "Science (Class 8)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Biology", lessons: [
            { id: 1, title: "Cell Division", duration: "25 min", type: "lesson" },
            { id: 2, title: "Reproduction", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Chemistry", lessons: [
            { id: 1, title: "Periodic Table", duration: "25 min", type: "lesson" },
            { id: 2, title: "States of Matter", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Physics", lessons: [
            { id: 1, title: "Sound and Light", duration: "25 min", type: "lesson" },
            { id: 2, title: "Heat and Temperature", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "9": {
    name: "Class 9",
    ageGroup: "14-15 years",
    description: "Class 9 - Pre-board secondary education",
    courses: [
      {
        id: "class9-english",
        name: "English (Class 9)",
        subject: "English",
        chapters: [
          { id: 1, title: "Literature", lessons: [
            { id: 1, title: "Poetry Analysis", duration: "30 min", type: "lesson" },
            { id: 2, title: "Prose Comprehension", duration: "30 min", type: "lesson" }
          ]},
          { id: 2, title: "Grammar & Language", lessons: [
            { id: 1, title: "Clauses and Conjunctions", duration: "30 min", type: "lesson" },
            { id: 2, title: "Reported Speech", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Writing & Communication", lessons: [
            { id: 1, title: "Article Writing", duration: "30 min", type: "lesson" },
            { id: 2, title: "Formal Letters", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class9-math",
        name: "Mathematics (Class 9)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Number Systems", lessons: [
            { id: 1, title: "Irrational Numbers", duration: "25 min", type: "lesson" },
            { id: 2, title: "Laws of Exponents", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Algebra", lessons: [
            { id: 1, title: "Polynomials and Factorization", duration: "30 min", type: "lesson" },
            { id: 2, title: "Linear Equations in Two Variables", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Geometry", lessons: [
            { id: 1, title: "Triangles and Properties", duration: "30 min", type: "lesson" },
            { id: 2, title: "Circle and Chord", duration: "25 min", type: "lesson" }
          ]},
          { id: 4, title: "Statistics", lessons: [
            { id: 1, title: "Mean, Median, Mode", duration: "20 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class9-science",
        name: "Science (Class 9)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Biology", lessons: [
            { id: 1, title: "Matter in Life", duration: "25 min", type: "lesson" },
            { id: 2, title: "Organization of Life", duration: "25 min", type: "lesson" },
            { id: 3, title: "Diversity of Life", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Chemistry", lessons: [
            { id: 1, title: "Atomic Structure", duration: "30 min", type: "lesson" },
            { id: 2, title: "Chemical Bonding", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Physics", lessons: [
            { id: 1, title: "Motion and Forces", duration: "30 min", type: "lesson" },
            { id: 2, title: "Gravitation", duration: "25 min", type: "lesson" },
            { id: 3, title: "Work, Energy, Power", duration: "25 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "10": {
    name: "Class 10",
    ageGroup: "15-16 years",
    description: "Class 10 - Board exams preparation",
    courses: [
      {
        id: "class10-english",
        name: "English (Class 10)",
        subject: "English",
        chapters: [
          { id: 1, title: "Reading Skills", lessons: [
            { id: 1, title: "Unseen Passages", duration: "35 min", type: "lesson" },
            { id: 2, title: "Comprehension Questions", duration: "30 min", type: "activity" }
          ]},
          { id: 2, title: "Writing", lessons: [
            { id: 1, title: "Letter Writing", duration: "30 min", type: "lesson" },
            { id: 2, title: "Application Writing", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Literature", lessons: [
            { id: 1, title: "Prose and Stories", duration: "30 min", type: "lesson" },
            { id: 2, title: "Poetry", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class10-math",
        name: "Mathematics (Class 10)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Real Numbers", lessons: [
            { id: 1, title: "Euclid's Division Lemma", duration: "25 min", type: "lesson" },
            { id: 2, title: "Prime Factorization", duration: "20 min", type: "lesson" }
          ]},
          { id: 2, title: "Polynomials", lessons: [
            { id: 1, title: "Zeros and Coefficients", duration: "25 min", type: "lesson" },
            { id: 2, title: "Division Algorithm", duration: "20 min", type: "lesson" }
          ]},
          { id: 3, title: "Linear Equations", lessons: [
            { id: 1, title: "Pair of Linear Equations", duration: "30 min", type: "lesson" }
          ]},
          { id: 4, title: "Quadratic Equations", lessons: [
            { id: 1, title: "Solving Quadratic Equations", duration: "30 min", type: "lesson" },
            { id: 2, title: "Nature of Roots", duration: "20 min", type: "lesson" }
          ]},
          { id: 5, title: "Triangles", lessons: [
            { id: 1, title: "Similarity of Triangles", duration: "30 min", type: "lesson" },
            { id: 2, title: "Pythagoras Theorem", duration: "25 min", type: "lesson" }
          ]},
          { id: 6, title: "Circles", lessons: [
            { id: 1, title: "Tangent and Secant", duration: "25 min", type: "lesson" }
          ]},
          { id: 7, title: "Statistics", lessons: [
            { id: 1, title: "Grouped Data", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class10-science",
        name: "Science (Class 10)",
        subject: "Science",
        chapters: [
          { id: 1, title: "Chemistry", lessons: [
            { id: 1, title: "Chemical Reactions", duration: "25 min", type: "lesson" },
            { id: 2, title: "Acids and Bases", duration: "25 min", type: "lesson" },
            { id: 3, title: "Metals and Non-Metals", duration: "20 min", type: "lesson" },
            { id: 4, title: "Carbon Compounds", duration: "25 min", type: "lesson" }
          ]},
          { id: 2, title: "Physics", lessons: [
            { id: 1, title: "Electricity", duration: "30 min", type: "lesson" },
            { id: 2, title: "Magnetism", duration: "25 min", type: "lesson" },
            { id: 3, title: "Light Refraction", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "Biology", lessons: [
            { id: 1, title: "Life Processes", duration: "30 min", type: "lesson" },
            { id: 2, title: "Control and Coordination", duration: "25 min", type: "lesson" },
            { id: 3, title: "Reproduction", duration: "25 min", type: "lesson" },
            { id: 4, title: "Heredity and Variation", duration: "20 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  // ============================================================
  // 📚 CLASS 11-12 (Senior Secondary)
  // ============================================================
  "11": {
    name: "Class 11",
    ageGroup: "16-17 years",
    description: "Class 11 - Senior secondary with stream specialization (Science/Commerce/Arts)",
    courses: [
      {
        id: "class11-english",
        name: "English (Class 11)",
        subject: "English",
        chapters: [
          { id: 1, title: "Reading & Comprehension", lessons: [
            { id: 1, title: "Non-Fiction and Essays", duration: "35 min", type: "lesson" },
            { id: 2, title: "Critical Analysis", duration: "30 min", type: "lesson" }
          ]},
          { id: 2, title: "Literature", lessons: [
            { id: 1, title: "Novel Study", duration: "40 min", type: "lesson" },
            { id: 2, title: "Poetry Appreciation", duration: "35 min", type: "lesson" },
            { id: 3, title: "Drama", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Advanced Grammar", lessons: [
            { id: 1, title: "Sentence Patterns", duration: "30 min", type: "lesson" },
            { id: 2, title: "Error Correction", duration: "25 min", type: "lesson" }
          ]},
          { id: 4, title: "Writing Skills", lessons: [
            { id: 1, title: "Essay Writing", duration: "35 min", type: "lesson" },
            { id: 2, title: "Report Writing", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class11-physics",
        name: "Physics (Class 11)",
        subject: "Physics",
        chapters: [
          { id: 1, title: "Mechanics", lessons: [
            { id: 1, title: "Motion in One Dimension", duration: "35 min", type: "lesson" },
            { id: 2, title: "Laws of Motion", duration: "40 min", type: "lesson" },
            { id: 3, title: "Work, Energy, Power", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Waves and Oscillations", lessons: [
            { id: 1, title: "Simple Harmonic Motion", duration: "35 min", type: "lesson" },
            { id: 2, title: "Waves and Sound", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Thermodynamics", lessons: [
            { id: 1, title: "Heat and Temperature", duration: "30 min", type: "lesson" },
            { id: 2, title: "Laws of Thermodynamics", duration: "35 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class11-chemistry",
        name: "Chemistry (Class 11)",
        subject: "Chemistry",
        chapters: [
          { id: 1, title: "Basic Concepts", lessons: [
            { id: 1, title: "Atomic Structure", duration: "35 min", type: "lesson" },
            { id: 2, title: "Classification of Elements", duration: "30 min", type: "lesson" }
          ]},
          { id: 2, title: "Bonding", lessons: [
            { id: 1, title: "Ionic and Covalent Bonding", duration: "35 min", type: "lesson" },
            { id: 2, title: "Metallic Bonding", duration: "25 min", type: "lesson" }
          ]},
          { id: 3, title: "States of Matter", lessons: [
            { id: 1, title: "Gases", duration: "30 min", type: "lesson" },
            { id: 2, title: "Liquids and Solids", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class11-biology",
        name: "Biology (Class 11)",
        subject: "Biology",
        chapters: [
          { id: 1, title: "Cell Biology", lessons: [
            { id: 1, title: "Cell Structure and Function", duration: "35 min", type: "lesson" },
            { id: 2, title: "Cell Division", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Plant Physiology", lessons: [
            { id: 1, title: "Photosynthesis", duration: "35 min", type: "lesson" },
            { id: 2, title: "Respiration", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Animal Physiology", lessons: [
            { id: 1, title: "Nervous System", duration: "35 min", type: "lesson" },
            { id: 2, title: "Endocrine System", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class11-math",
        name: "Mathematics (Class 11)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Functions", lessons: [
            { id: 1, title: "Relations and Functions", duration: "35 min", type: "lesson" },
            { id: 2, title: "Inverse Functions", duration: "30 min", type: "lesson" }
          ]},
          { id: 2, title: "Trigonometry", lessons: [
            { id: 1, title: "Trigonometric Functions", duration: "35 min", type: "lesson" },
            { id: 2, title: "Trigonometric Equations", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Calculus Introduction", lessons: [
            { id: 1, title: "Limits and Continuity", duration: "35 min", type: "lesson" },
            { id: 2, title: "Derivatives", duration: "40 min", type: "lesson" }
          ]}
        ]
      }
    ]
  },

  "12": {
    name: "Class 12",
    ageGroup: "17-18 years",
    description: "Class 12 - Final board exams and competitive exams preparation",
    courses: [
      {
        id: "class12-english",
        name: "English (Class 12)",
        subject: "English",
        chapters: [
          { id: 1, title: "Advanced Literature", lessons: [
            { id: 1, title: "Novel Analysis", duration: "40 min", type: "lesson" },
            { id: 2, title: "Poetry Appreciation", duration: "35 min", type: "lesson" },
            { id: 3, title: "Drama Study", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Composition", lessons: [
            { id: 1, title: "Academic Writing", duration: "35 min", type: "lesson" },
            { id: 2, title: "Creative Writing", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Grammar & Usage", lessons: [
            { id: 1, title: "Advanced Grammar", duration: "30 min", type: "lesson" },
            { id: 2, title: "Stylistics", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-physics",
        name: "Physics (Class 12)",
        subject: "Physics",
        chapters: [
          { id: 1, title: "Electrostatics", lessons: [
            { id: 1, title: "Electric Field and Potential", duration: "40 min", type: "lesson" },
            { id: 2, title: "Capacitance", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Current Electricity", lessons: [
            { id: 1, title: "Electric Current", duration: "35 min", type: "lesson" },
            { id: 2, title: "EMF and Internal Resistance", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Magnetism", lessons: [
            { id: 1, title: "Magnetic Field", duration: "35 min", type: "lesson" },
            { id: 2, title: "Electromagnetic Induction", duration: "35 min", type: "lesson" }
          ]},
          { id: 4, title: "Modern Physics", lessons: [
            { id: 1, title: "Photoelectric Effect", duration: "30 min", type: "lesson" },
            { id: 2, title: "Atomic Physics", duration: "35 min", type: "lesson" },
            { id: 3, title: "Nuclear Physics", duration: "35 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-chemistry",
        name: "Chemistry (Class 12)",
        subject: "Chemistry",
        chapters: [
          { id: 1, title: "Solutions", lessons: [
            { id: 1, title: "Solubility and Concentration", duration: "30 min", type: "lesson" },
            { id: 2, title: "Colligative Properties", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Equilibrium", lessons: [
            { id: 1, title: "Chemical Equilibrium", duration: "35 min", type: "lesson" },
            { id: 2, title: "Ionic Equilibrium", duration: "35 min", type: "lesson" }
          ]},
          { id: 3, title: "Redox Reactions", lessons: [
            { id: 1, title: "Oxidation and Reduction", duration: "30 min", type: "lesson" },
            { id: 2, title: "Electrochemistry", duration: "35 min", type: "lesson" }
          ]},
          { id: 4, title: "Organic Chemistry", lessons: [
            { id: 1, title: "Organic Compounds", duration: "35 min", type: "lesson" },
            { id: 2, title: "Reactions and Mechanisms", duration: "40 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-biology",
        name: "Biology (Class 12)",
        subject: "Biology",
        chapters: [
          { id: 1, title: "Genetics", lessons: [
            { id: 1, title: "Mendelian Inheritance", duration: "35 min", type: "lesson" },
            { id: 2, title: "Molecular Genetics", duration: "40 min", type: "lesson" }
          ]},
          { id: 2, title: "Evolution", lessons: [
            { id: 1, title: "Theory of Evolution", duration: "35 min", type: "lesson" },
            { id: 2, title: "Natural Selection", duration: "30 min", type: "lesson" }
          ]},
          { id: 3, title: "Ecology", lessons: [
            { id: 1, title: "Ecosystems", duration: "35 min", type: "lesson" },
            { id: 2, title: "Biodiversity", duration: "30 min", type: "lesson" }
          ]},
          { id: 4, title: "Human Physiology", lessons: [
            { id: 1, title: "Digestion and Nutrition", duration: "35 min", type: "lesson" },
            { id: 2, title: "Circulation", duration: "30 min", type: "lesson" },
            { id: 3, title: "Excretion", duration: "25 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-math",
        name: "Mathematics (Class 12)",
        subject: "Mathematics",
        chapters: [
          { id: 1, title: "Relations and Functions", lessons: [
            { id: 1, title: "Inverse Functions", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Calculus", lessons: [
            { id: 1, title: "Continuity and Differentiability", duration: "35 min", type: "lesson" },
            { id: 2, title: "Derivatives Application", duration: "40 min", type: "lesson" },
            { id: 3, title: "Integration", duration: "40 min", type: "lesson" }
          ]},
          { id: 3, title: "Linear Programming", lessons: [
            { id: 1, title: "Linear Inequalities", duration: "30 min", type: "lesson" },
            { id: 2, title: "Optimization", duration: "35 min", type: "lesson" }
          ]},
          { id: 4, title: "Probability", lessons: [
            { id: 1, title: "Conditional Probability", duration: "30 min", type: "lesson" },
            { id: 2, title: "Bayes Theorem", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-accountancy",
        name: "Accountancy (Class 12)",
        subject: "Accountancy",
        chapters: [
          { id: 1, title: "Financial Accounting", lessons: [
            { id: 1, title: "Accounting Principles", duration: "30 min", type: "lesson" },
            { id: 2, title: "Financial Statements", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Advanced Ledger", lessons: [
            { id: 1, title: "Adjustment Entries", duration: "35 min", type: "lesson" },
            { id: 2, title: "Depreciation", duration: "30 min", type: "lesson" }
          ]}
        ]
      },
      {
        id: "class12-businessstudies",
        name: "Business Studies (Class 12)",
        subject: "Business Studies",
        chapters: [
          { id: 1, title: "Organization", lessons: [
            { id: 1, title: "Business Structures", duration: "30 min", type: "lesson" },
            { id: 2, title: "Management", duration: "35 min", type: "lesson" }
          ]},
          { id: 2, title: "Marketing", lessons: [
            { id: 1, title: "Marketing Mix", duration: "30 min", type: "lesson" }
          ]}
        ]
      }
    ]
  }
};

/**
 * Helper function to get all courses for a specific class
 * @param {string} classLevel - Class level (nursery, lkg, ukg, 1, 2, ..., 12)
 * @returns {Array} - Array of courses for that class
 */
export const getCoursesByClass = (classLevel) => {
  const classData = coursesByClass[classLevel.toString()];
  return classData ? classData.courses : [];
};

/**
 * Helper function to get chapters for a specific course
 * @param {string} classLevel - Class level
 * @param {string} courseId - Course ID
 * @returns {Array} - Array of chapters
 */
export const getChaptersByCourseAndClass = (classLevel, courseId) => {
  const classData = coursesByClass[classLevel.toString()];
  if (!classData) return [];
  
  const course = classData.courses.find(c => c.id === courseId);
  return course ? course.chapters : [];
};

/**
 * Helper function to get lessons for a specific chapter
 * @param {string} classLevel - Class level
 * @param {string} courseId - Course ID
 * @param {number} chapterId - Chapter ID
 * @returns {Array} - Array of lessons
 */
export const getLessonsByChapterAndClass = (classLevel, courseId, chapterId) => {
  const classData = coursesByClass[classLevel.toString()];
  if (!classData) return [];
  
  const course = classData.courses.find(c => c.id === courseId);
  if (!course) return [];
  
  const chapter = course.chapters.find(ch => ch.id === chapterId);
  return chapter ? chapter.lessons : [];
};

/**
 * Helper function to get all classes available
 * @returns {Array} - Array of all classes
 */
export const getAllClasses = () => {
  return Object.entries(coursesByClass).map(([key, value]) => ({
    id: key,
    name: value.name,
    ageGroup: value.ageGroup,
    description: value.description,
    courseCount: value.courses.length
  }));
};

/**
 * Helper function to get a specific class details
 * @param {string} classLevel - Class level
 * @returns {Object} - Complete class details with all courses
 */
export const getClassDetails = (classLevel) => {
  return coursesByClass[classLevel.toString()] || null;
};

export default coursesByClass;
