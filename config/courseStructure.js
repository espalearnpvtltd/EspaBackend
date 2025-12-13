/**
 * 📚 ESPA Learning - Complete Course Structure
 * 
 * This file defines the complete hierarchy of educational streams,
 * classes, and subjects available on the platform.
 * 
 * Structure:
 * - Stream (Medical, Non-Medical, Arts, Commerce, UPSC, etc.)
 *   - Class (10, 11, 12, etc.)
 *     - Subjects (Physics, Chemistry, Biology, etc.)
 */

export const courseStructure = {
  medical: {
    name: "🔬 Medical Stream",
    description: "Complete preparation for NEET & Medical Exams",
    classes: {
      "10": {
        name: "Class 10",
        subjects: [
          { id: "science", name: "Science" },
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "mathematics", name: "Mathematics" },
          { id: "socialScience", name: "Social Science" }
        ]
      },
      "11": {
        name: "Class 11",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "biology", name: "Biology" },
          { id: "english", name: "English" },
          { id: "mathematics", name: "Mathematics" }
        ]
      },
      "12": {
        name: "Class 12",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "biology", name: "Biology" },
          { id: "english", name: "English" },
          { id: "mathematics", name: "Mathematics" }
        ]
      }
    },
    competitiveExams: {
      "neet": {
        name: "NEET Preparation",
        duration: "Complete 1 Year Course",
        subjects: [
          { id: "physics", name: "Physics (180 marks)" },
          { id: "chemistry", name: "Chemistry (180 marks)" },
          { id: "biology", name: "Biology (360 marks)" }
        ]
      },
      "aiims": {
        name: "AIIMS Entrance Exam",
        duration: "Complete Course",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "biology", name: "Biology" }
        ]
      }
    }
  },

  nonMedical: {
    name: "📊 Non-Medical Stream",
    description: "Science with Mathematics focus - for JEE, BITSAT, and other engineering exams",
    classes: {
      "10": {
        name: "Class 10",
        subjects: [
          { id: "science", name: "Science" },
          { id: "mathematics", name: "Mathematics" },
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "socialScience", name: "Social Science" }
        ]
      },
      "11": {
        name: "Class 11",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "mathematics", name: "Mathematics" },
          { id: "english", name: "English" },
          { id: "computerScience", name: "Computer Science" }
        ]
      },
      "12": {
        name: "Class 12",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "mathematics", name: "Mathematics" },
          { id: "english", name: "English" },
          { id: "computerScience", name: "Computer Science" }
        ]
      }
    },
    competitiveExams: {
      "jeeMain": {
        name: "JEE Main",
        duration: "Complete 2 Year Course",
        subjects: [
          { id: "physics", name: "Physics (100 marks)" },
          { id: "chemistry", name: "Chemistry (100 marks)" },
          { id: "mathematics", name: "Mathematics (100 marks)" }
        ]
      },
      "jeeAdvanced": {
        name: "JEE Advanced",
        duration: "Complete Course",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "mathematics", name: "Mathematics" }
        ]
      },
      "bitsat": {
        name: "BITSAT",
        duration: "Complete Course",
        subjects: [
          { id: "physics", name: "Physics" },
          { id: "chemistry", name: "Chemistry" },
          { id: "mathematics", name: "Mathematics" },
          { id: "english", name: "English & Logical Reasoning" }
        ]
      }
    }
  },

  arts: {
    name: "📖 Arts Stream",
    description: "Humanities and Social Sciences - for UPSC, State PCS, and competitive exams",
    classes: {
      "10": {
        name: "Class 10",
        subjects: [
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "socialScience", name: "Social Science" },
          { id: "history", name: "History" },
          { id: "geography", name: "Geography" },
          { id: "civics", name: "Civics" }
        ]
      },
      "11": {
        name: "Class 11",
        subjects: [
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "history", name: "History" },
          { id: "geography", name: "Geography" },
          { id: "economics", name: "Economics" },
          { id: "politicalScience", name: "Political Science" }
        ]
      },
      "12": {
        name: "Class 12",
        subjects: [
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "history", name: "History" },
          { id: "geography", name: "Geography" },
          { id: "economics", name: "Economics" },
          { id: "politicalScience", name: "Political Science" }
        ]
      }
    },
    competitiveExams: {
      "upsc": {
        name: "UPSC Civil Services",
        duration: "Complete 2 Year Course",
        subjects: [
          { id: "generalStudies", name: "General Studies (4 Papers)" },
          { id: "essayWriting", name: "Essay Writing" },
          { id: "indianPolity", name: "Indian Polity & Constitution" },
          { id: "indianHistory", name: "Indian History" },
          { id: "geography", name: "Geography" },
          { id: "economics", name: "Economics" },
          { id: "currentAffairs", name: "Current Affairs" }
        ]
      },
      "statePCS": {
        name: "State PCS Exams",
        duration: "Complete Course",
        subjects: [
          { id: "generalStudies", name: "General Studies" },
          { id: "stateHistory", name: "State History & Culture" },
          { id: "indianPolity", name: "Indian Polity" },
          { id: "geography", name: "Geography" },
          { id: "economics", name: "Economics" }
        ]
      },
      "ugc": {
        name: "UGC NET / SLET",
        duration: "Complete Course",
        subjects: [
          { id: "research", name: "Research Aptitude" },
          { id: "comprehension", name: "Reading Comprehension" },
          { id: "communication", name: "Communication" },
          { id: "reasoning", name: "Logical Reasoning" },
          { id: "subjectSpecific", name: "Subject Specific" }
        ]
      }
    }
  },

  commerce: {
    name: "💼 Commerce Stream",
    description: "Business & Finance focused - for CA, CS, CMA, and corporate careers",
    classes: {
      "10": {
        name: "Class 10",
        subjects: [
          { id: "english", name: "English" },
          { id: "hindi", name: "Hindi" },
          { id: "mathematics", name: "Mathematics" },
          { id: "socialScience", name: "Social Science" },
          { id: "economics", name: "Economics" }
        ]
      },
      "11": {
        name: "Class 11",
        subjects: [
          { id: "accountancy", name: "Accountancy" },
          { id: "economics", name: "Economics" },
          { id: "businessStudies", name: "Business Studies" },
          { id: "english", name: "English" },
          { id: "mathematics", name: "Mathematics" }
        ]
      },
      "12": {
        name: "Class 12",
        subjects: [
          { id: "accountancy", name: "Accountancy" },
          { id: "economics", name: "Economics" },
          { id: "businessStudies", name: "Business Studies" },
          { id: "english", name: "English" },
          { id: "mathematics", name: "Mathematics" }
        ]
      }
    },
    competitiveExams: {
      "ca": {
        name: "CA (Chartered Accountant)",
        duration: "Complete 5 Year Course",
        subjects: [
          { id: "accountancy", name: "Accountancy" },
          { id: "taxation", name: "Income Tax & Indirect Tax" },
          { id: "auditing", name: "Auditing & Assurance" },
          { id: "financialAccounting", name: "Financial Accounting" },
          { id: "corporateLaws", name: "Corporate Laws" },
          { id: "economics", name: "Economics" }
        ]
      },
      "cs": {
        name: "CS (Company Secretary)",
        duration: "Complete Course",
        subjects: [
          { id: "companyLaws", name: "Company Laws" },
          { id: "capitalMarkets", name: "Capital Markets & Securities" },
          { id: "compliance", name: "Compliance Management" },
          { id: "corporateGovernance", name: "Corporate Governance" },
          { id: "secretarial", name: "Secretarial Practice" }
        ]
      },
      "cma": {
        name: "CMA (Cost & Management Accountant)",
        duration: "Complete Course",
        subjects: [
          { id: "costAccounting", name: "Cost Accounting" },
          { id: "managementAccounting", name: "Management Accounting" },
          { id: "financialManagement", name: "Financial Management" },
          { id: "internalAudit", name: "Internal Audit & Control" }
        ]
      }
    }
  },

  upsc: {
    name: "🏛️ UPSC Competitive Exams",
    description: "Comprehensive preparation for all UPSC exams - Civil Services, IFS, IPS, etc.",
    classes: {
      "generalCompetition": {
        name: "General Competition",
        subjects: [
          { id: "generalStudies", name: "General Studies" },
          { id: "essay", name: "Essay" },
          { id: "indianHistory", name: "Indian History" },
          { id: "geography", name: "Geography" },
          { id: "indianPolity", name: "Indian Polity" },
          { id: "economics", name: "Economics" },
          { id: "science", name: "Science & Technology" }
        ]
      }
    },
    competitiveExams: {
      "civilServices": {
        name: "IAS / IPS / IFS",
        duration: "Complete 2 Year Course",
        subjects: [
          { id: "preliminaryExam", name: "Preliminary Exam (CSAT)" },
          { id: "mainExam", name: "Main Exam (General Studies)" },
          { id: "essay", name: "Essay Paper" },
          { id: "interview", name: "Interview Preparation" }
        ]
      },
      "defence": {
        name: "CDS / AFCAT / NDA",
        duration: "Complete Course",
        subjects: [
          { id: "generalKnowledge", name: "General Knowledge" },
          { id: "reasoning", name: "Reasoning & Aptitude" },
          { id: "elementaryMathematics", name: "Elementary Mathematics" },
          { id: "english", name: "English" }
        ]
      },
      "banking": {
        name: "Banking & Insurance",
        duration: "Complete Course",
        subjects: [
          { id: "reasoning", name: "Reasoning" },
          { id: "quantitative", name: "Quantitative Aptitude" },
          { id: "english", name: "English Language" },
          { id: "generalAwareness", name: "General Awareness" }
        ]
      }
    }
  },

  professional: {
    name: "🎓 Professional Courses",
    description: "Specialized courses for professional development and certifications",
    classes: {
      "graduateLevel": {
        name: "Post Graduate Level",
        subjects: [
          { id: "management", name: "Management & Leadership" },
          { id: "finance", name: "Finance & Investment" },
          { id: "dataScience", name: "Data Science & Analytics" },
          { id: "digitialMarketing", name: "Digital Marketing" },
          { id: "projectManagement", name: "Project Management" }
        ]
      }
    },
    competitiveExams: {
      "gmatchoices": {
        name: "CAT / XAT / GMAT",
        duration: "Complete Course",
        subjects: [
          { id: "quantitative", name: "Quantitative Aptitude" },
          { id: "verbalAbility", name: "Verbal Ability & Reading" },
          { id: "logicalReasoning", name: "Logical Reasoning" },
          { id: "dataInterpretation", name: "Data Interpretation" }
        ]
      }
    }
  },

  competitiveExams: {
    name: "🎯 All Competitive Exams",
    description: "Curated courses for various competitive exams across all domains",
    categories: {
      government: {
        name: "Government Exams",
        exams: [
          { id: "upsc", name: "UPSC Civil Services", difficulty: "advanced" },
          { id: "statePcs", name: "State PCS", difficulty: "advanced" },
          { id: "ssc", name: "SSC (CGL, CHSL, MTS)", difficulty: "intermediate" },
          { id: "railwayExam", name: "Railway Exams (RRB)", difficulty: "intermediate" },
          { id: "banking", name: "Banking (IBPS, SBI)", difficulty: "intermediate" },
          { id: "insurance", name: "Insurance (LIC, NIACL)", difficulty: "beginner" }
        ]
      },
      medical: {
        name: "Medical Exams",
        exams: [
          { id: "neet", name: "NEET-UG", difficulty: "advanced" },
          { id: "aiims", name: "AIIMS", difficulty: "advanced" },
          { id: "jipmer", name: "JIPMER", difficulty: "advanced" },
          { id: "neetPG", name: "NEET-PG", difficulty: "advanced" }
        ]
      },
      engineering: {
        name: "Engineering Exams",
        exams: [
          { id: "jeeMain", name: "JEE Main", difficulty: "advanced" },
          { id: "jeeAdvanced", name: "JEE Advanced", difficulty: "advanced" },
          { id: "bitsat", name: "BITSAT", difficulty: "advanced" },
          { id: "viteee", name: "VITEEE", difficulty: "intermediate" }
        ]
      },
      professional: {
        name: "Professional Certifications",
        exams: [
          { id: "ca", name: "CA (Chartered Accountant)", difficulty: "advanced" },
          { id: "cs", name: "CS (Company Secretary)", difficulty: "advanced" },
          { id: "cma", name: "CMA (Cost Accountant)", difficulty: "advanced" },
          { id: "cat", name: "CAT (MBA Entrance)", difficulty: "advanced" }
        ]
      }
    }
  }
};

/**
 * Helper function to get all subjects for a specific stream and class
 * @param {string} stream - Stream name (medical, nonMedical, arts, etc.)
 * @param {string} classLevel - Class level (10, 11, 12, etc.)
 * @returns {Array} - Array of subjects
 */
export const getSubjectsByStreamAndClass = (stream, classLevel) => {
  const streamData = courseStructure[stream];
  if (!streamData || !streamData.classes) return [];
  
  const classData = streamData.classes[classLevel];
  return classData ? classData.subjects : [];
};

/**
 * Helper function to get all subjects for a specific competitive exam
 * @param {string} stream - Stream name
 * @param {string} exam - Exam ID
 * @returns {Array} - Array of subjects for that exam
 */
export const getSubjectsByExam = (stream, exam) => {
  const streamData = courseStructure[stream];
  if (!streamData || !streamData.competitiveExams) return [];
  
  const examData = streamData.competitiveExams[exam];
  return examData ? examData.subjects : [];
};

/**
 * Helper function to get all streams available
 * @returns {Array} - Array of all streams with their metadata
 */
export const getAllStreams = () => {
  return Object.entries(courseStructure).map(([key, value]) => ({
    id: key,
    name: value.name,
    description: value.description
  }));
};

/**
 * Helper function to get all competitive exams for a stream
 * @param {string} stream - Stream name
 * @returns {Array} - Array of competitive exams with their details
 */
export const getCompetitiveExamsByStream = (stream) => {
  const streamData = courseStructure[stream];
  if (!streamData || !streamData.competitiveExams) return [];
  
  return Object.entries(streamData.competitiveExams).map(([key, value]) => ({
    id: key,
    name: value.name,
    duration: value.duration,
    subjects: value.subjects
  }));
};

export default courseStructure;
