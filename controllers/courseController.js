import Course from '../models/Course.js';

// Default course images mapping - Using working Unsplash & Pexels URLs
const defaultImages = {
  physics: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop"],
  chemistry: ["https://images.unsplash.com/photo-1576174065790-cb142efc1bfc?w=500&h=300&fit=crop"],
  biology: ["https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop"],
  zoology: ["https://www.pexels.com/photo/close-up-of-green-parakeet-in-natural-habitat-35137868/"],
  mathematics: ["https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop"],
  history: ["https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop"],
  geography: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop"],
  accountancy: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"],
  business: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"],
  economics: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"],
  english: ["https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop"],
  default: ["https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop"]
};

// ✅ Create Course
export const createCourse = async (req, res) => {
  try {
    const { name, title, description, classId, subject, teacherId, filepath, class: className, pictures, difficulty, isRecommended, price, discountedPrice, duration } = req.body;
    
    // Accept either name or title, use name as primary
    const courseName = name || title;
    if (!courseName) return res.status(400).json({ message: 'Course name is required' });

    // Get default image based on subject if no pictures provided
    let coursePictures = pictures;
    if (!coursePictures || coursePictures.length === 0) {
      const subjectLower = subject ? subject.toLowerCase() : 'default';
      coursePictures = defaultImages[subjectLower] || defaultImages.default;
    }

    const course = await Course.create({ 
      name: courseName,
      description, 
      classId,
      subject,
      teacherId,
      filepath,
      class: className,
      pictures: coursePictures,
      difficulty: difficulty || 'intermediate',
      isRecommended: isRecommended || false,
      price,
      discountedPrice,
      duration
    });
    res.status(201).json({ message: 'Course created', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('classId', 'name');
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Single Course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('classId', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Update Course
export const updateCourse = async (req, res) => {
  try {
    const updateData = { ...req.body };

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course updated', course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Add Rating/Review to Course
export const addRating = async (req, res) => {
  try {
    const { courseId, studentId, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Add review
    course.ratings.reviews.push({
      studentId,
      rating,
      comment
    });

    // Calculate average rating
    const totalRating = course.ratings.reviews.reduce((sum, review) => sum + review.rating, 0);
    course.ratings.average = (totalRating / course.ratings.reviews.length).toFixed(1);
    course.ratings.count = course.ratings.reviews.length;

    await course.save();
    res.status(201).json({ message: 'Rating added', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Course with Ratings
export const getCourseWithRatings = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacherId', 'name email')
      .populate('ratings.reviews.studentId', 'name email');
    
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Recommended Courses by Class (from JWT token or query parameter)
export const getRecommendedByClass = async (req, res) => {
  try {
    // Get student class from query parameter OR from authenticated user
    let studentClass = req.query.class;
    const searchQuery = req.query.search; // Optional search by title/description/class
    
    if (!studentClass) {
      const student = req.student;
      if (!student || !student.class) {
        return res.status(400).json({ message: 'Student class not found in token or query parameter' });
      }
      studentClass = student.class;
    }
    
    // Build filter object
    const filter = { class: studentClass };

    // Add search filter if provided (searches in name, title, subject, description, class)
    if (searchQuery && searchQuery.trim().length > 0) {
      const searchRegex = new RegExp(searchQuery, 'i');
      
      // Extract class number if user searches for "class 11", "class 12", "11", "12"
      let extractedClass = null;
      const classMatch = searchQuery.match(/(?:class\s*)?(\d+)/i);
      if (classMatch) {
        extractedClass = classMatch[1]; // Extract just the number (11, 12, etc)
      }

      const orConditions = [
        { title: { $regex: searchRegex } },
        { name: { $regex: searchRegex } },
        { subject: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ];

      // If user searched for class, also match by class field
      if (extractedClass) {
        orConditions.push({ class: extractedClass });
      }

      filter.$or = orConditions;
    }

    // Return ALL courses for the class (optionally filtered by search)
    const courses = await Course.find(filter)
      .populate('teacherId', 'name email')
      .sort({ 'ratings.average': -1 });

    res.status(200).json({ 
      message: `All courses for class ${studentClass}${searchQuery ? ` matching "${searchQuery}"` : ''}`,
      studentClass,
      count: courses.length,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Courses by Stream (Science, Commerce, Arts)
export const getCoursesByStream = async (req, res) => {
  try {
    const { subject, class: studentClass } = req.query;
    if (!subject) {
      return res.status(400).json({ message: 'Subject parameter required' });
    }

    let query = { subject };
    if (studentClass) query.class = studentClass;

    const courses = await Course.find(query).populate('teacherId', 'name email');

    res.status(200).json({ 
      message: `Courses for ${subject}`,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Courses by Subject (Physics, Chemistry, Biology, etc.)
export const getCoursesByExam = async (req, res) => {
  try {
    const { subject, class: studentClass } = req.query;
    if (!subject) {
      return res.status(400).json({ message: 'Subject parameter required' });
    }

    let query = { subject: subject };
    if (studentClass) query.class = studentClass;

    const courses = await Course.find(query).populate('teacherId', 'name email').sort({ 'ratings.average': -1 });

    res.status(200).json({ 
      message: `Courses for ${subject}`,
      subject,
      count: courses.length,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Filtered Courses (Class + Subject + Difficulty)
export const getFilteredCourses = async (req, res) => {
  try {
    const { class: studentClass, subject, difficulty } = req.query;
    let query = {};

    if (studentClass) query.class = studentClass;
    if (subject) query.subject = subject;
    if (difficulty) query.difficulty = difficulty;

    const courses = await Course.find(query)
      .populate('teacherId', 'name email')
      .sort({ 'ratings.average': -1 });

    res.status(200).json({ 
      message: 'Filtered courses',
      filters: { class: studentClass, subject, difficulty },
      count: courses.length,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Dynamic Recommended Categories Based on Student Class
// This returns different categories based on student's class from JWT or query parameter
export const getRecommendedCategories = async (req, res) => {
  try {
    // Get student class from query parameter OR from authenticated user
    let studentClass = req.query.class;
    
    if (!studentClass) {
      const student = req.student;
      if (!student || !student.class) {
        return res.status(400).json({ message: 'Student class not found in token or query parameter' });
      }
      studentClass = student.class;
    }

    let categories = {};

    // Define categories based on class (using subject instead of stream)
    const classCategoryMap = {
      '10': {
        'Science': { subject: 'Science' },
        'Commerce': { subject: 'Commerce' },
        'Arts': { subject: 'Arts' }
      },
      '11': {
        'Science': { subject: 'Science' },
        'Biology': { subject: 'Biology' },
        'Physics': { subject: 'Physics' },
        'Commerce': { subject: 'Commerce' },
        'Arts': { subject: 'Arts' }
      },
      '12': {
        'Science': { subject: 'Science' },
        'Physics': { subject: 'Physics' },
        'Chemistry': { subject: 'Chemistry' },
        'Biology': { subject: 'Biology' },
        'Mathematics': { subject: 'Mathematics' },
        'Commerce': { subject: 'Commerce' },
        'Accountancy': { subject: 'Accountancy' },
        'Economics': { subject: 'Economics' },
        'Arts': { subject: 'Arts' },
        'History': { subject: 'History' },
        'Geography': { subject: 'Geography' },
        'English': { subject: 'English' }
      }
    };

    const categoryMap = classCategoryMap[studentClass] || classCategoryMap['12'];

    // Fetch courses for each category
    for (const [categoryName, categoryFilter] of Object.entries(categoryMap)) {
      let query = { class: studentClass, isRecommended: true };

      if (categoryFilter.subject) {
        query.subject = categoryFilter.subject;
      }

      const courses = await Course.find(query)
        .populate('teacherId', 'name email')
        .sort({ 'ratings.average': -1 })
        .limit(10);

      categories[categoryName] = courses;
    }

    res.status(200).json({
      message: `Recommended courses for class ${studentClass}`,
      studentClass,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Search Courses by Title, Name, Subject, Description, or Class (optionally filter by class)
export const searchCourses = async (req, res) => {
  try {
    const { query, class: courseClass } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Create regex for case-insensitive search
    const searchRegex = new RegExp(query, 'i');

    // Extract class number if user searches for "class 11", "class 12", "11", "12"
    let extractedClass = null;
    const classMatch = query.match(/(?:class\s*)?(\d+)/i);
    if (classMatch) {
      extractedClass = classMatch[1]; // Extract just the number (11, 12, etc)
    }

    // Build filter object - search in title, name, subject, description, and class
    const filter = {
      $and: [
        {
          $or: [
            { title: { $regex: searchRegex } },
            { name: { $regex: searchRegex } },
            { subject: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            { class: { $regex: searchRegex } }
          ]
        }
      ]
    };

    // If user searched for class (e.g., "class 11" or "11"), also match by class directly
    if (extractedClass) {
      filter.$and[0].$or.push({ class: extractedClass });
    }

    // Add class filter if provided (narrows down results to specific class)
    if (courseClass) {
      filter.$and.push({ class: courseClass });
    }

    // Search in title, name, subject, description, and class
    const courses = await Course.find(filter)
      .populate('teacherId', 'name email')
      .sort({ 'ratings.average': -1 })
      .limit(20);

    res.status(200).json({
      message: `Search results for "${query}"${courseClass ? ` in class ${courseClass}` : ''}`,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
