import Course from '../models/Course.js';

// Default course images mapping
const defaultImages = {
  physics: ["https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop"],
  chemistry: ["https://images.unsplash.com/photo-576175192918-06d5d39f0e38?w=500&h=300&fit=crop"],
  biology: ["https://images.unsplash.com/photo-576088160562-40f694ba6b22?w=500&h=300&fit=crop"],
  mathematics: ["https://images.unsplash.com/photo-596524496916-bc4ee5541481?w=500&h=300&fit=crop"],
  history: ["https://images.unsplash.com/photo-507842217343-583f20270319?w=500&h=300&fit=crop"],
  geography: ["https://images.unsplash.com/photo-526778548025-fa2f459cd5c1?w=500&h=300&fit=crop"],
  accountancy: ["https://images.unsplash.com/photo-552664730-d307ca884978?w=500&h=300&fit=crop"],
  business: ["https://images.unsplash.com/photo-552664730-d307ca884978?w=500&h=300&fit=crop"],
  economics: ["https://images.unsplash.com/photo-577720643272-265f434b3b55?w=500&h=300&fit=crop"],
  english: ["https://images.unsplash.com/photo-507842217343-583f20270319?w=500&h=300&fit=crop"],
  default: ["https://images.unsplash.com/photo-1533288714400-b4c3b5b11384?w=500&h=300&fit=crop"]
};

// ✅ Create Course
export const createCourse = async (req, res) => {
  try {
    const { name, title, description, classId, subject, teacherId, filepath, class: className, pictures, examType, difficulty, isRecommended, price, discountPercentage, duration } = req.body;
    
    // Accept either name or title, use name as primary
    const courseName = name || title;
    if (!courseName) return res.status(400).json({ message: 'Course name is required' });

    // Get default image based on subject if no pictures provided
    let coursePictures = pictures;
    if (!coursePictures || coursePictures.length === 0) {
      const subjectLower = subject ? subject.toLowerCase() : 'default';
      coursePictures = defaultImages[subjectLower] || defaultImages.default;
    }

    // Calculate discounted price if discount percentage is provided
    let discountedPrice = undefined;
    if (discountPercentage && price) {
      discountedPrice = price - (price * discountPercentage / 100);
      discountedPrice = Math.round(discountedPrice * 100) / 100; // Round to 2 decimal places
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
      examType: examType || [],
      difficulty: difficulty || 'intermediate',
      isRecommended: isRecommended || false,
      price,
      discountPercentage: discountPercentage || 0,
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
    const { price, discountPercentage } = req.body;
    const updateData = { ...req.body };

    // Recalculate discounted price if price or discount percentage is being updated
    if (price && discountPercentage) {
      updateData.discountedPrice = price - (price * discountPercentage / 100);
      updateData.discountedPrice = Math.round(updateData.discountedPrice * 100) / 100;
    }

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

// ✅ Get Recommended Courses by Class (from JWT token)
export const getRecommendedByClass = async (req, res) => {
  try {
    // Get student class from authenticated user
    const student = req.student;
    if (!student || !student.class) {
      return res.status(400).json({ message: 'Student class not found in token' });
    }

    const studentClass = student.class;
    
    const courses = await Course.find({ 
      class: studentClass,
      isRecommended: true 
    }).populate('teacherId', 'name email');

    res.status(200).json({ 
      message: `Recommended courses for class ${studentClass}`,
      studentClass,
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

// ✅ Get Courses by Exam Type (JEE, NEET, UPSC)
export const getCoursesByExam = async (req, res) => {
  try {
    const { exam, class: studentClass } = req.query;
    if (!exam) {
      return res.status(400).json({ message: 'Exam parameter required' });
    }

    let query = { examType: exam };
    if (studentClass) query.class = studentClass;

    const courses = await Course.find(query).populate('teacherId', 'name email');

    res.status(200).json({ 
      message: `Courses for ${exam} exam preparation`,
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Filtered Courses (Class + Stream + Exam)
export const getFilteredCourses = async (req, res) => {
  try {
    const { class: studentClass, stream, exam } = req.query;
    let query = {};

    if (studentClass) query.class = studentClass;
    if (stream) query.stream = stream;
    if (exam) query.examType = exam;

    const courses = await Course.find(query)
      .populate('teacherId', 'name email')
      .sort({ 'ratings.average': -1 });

    res.status(200).json({ 
      message: 'Filtered courses',
      courses 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get Dynamic Recommended Categories Based on Student Class
// This returns different categories based on student's class from JWT
export const getRecommendedCategories = async (req, res) => {
  try {
    const student = req.student;
    if (!student || !student.class) {
      return res.status(400).json({ message: 'Student class not found in token' });
    }

    const studentClass = student.class;
    let categories = {};

    // Define categories based on class
    const classCategoryMap = {
      '10': {
        'Science': { stream: 'science', examType: null },
        'Commerce': { stream: 'commerce', examType: null },
        'Arts': { stream: 'arts', examType: null }
      },
      '11': {
        'Science': { stream: 'science', examType: null },
        'Medical': { stream: 'science', examType: 'NEET' },
        'Non-Medical': { stream: 'science', examType: 'JEE' },
        'Commerce': { stream: 'commerce', examType: null },
        'Arts': { stream: 'arts', examType: null }
      },
      '12': {
        'Science': { stream: 'science', examType: null },
        'Medical': { stream: 'science', examType: 'NEET' },
        'Non-Medical': { stream: 'science', examType: 'JEE' },
        'Commerce': { stream: 'commerce', examType: null },
        'Arts': { stream: 'arts', examType: null },
        'UPSC/Polity': { stream: 'arts', examType: 'UPSC' },
        'Engineering': { examType: 'GATE' }
      }
    };

    const categoryMap = classCategoryMap[studentClass] || classCategoryMap['12'];

    // Fetch courses for each category
    for (const [categoryName, categoryFilter] of Object.entries(categoryMap)) {
      let query = { class: studentClass, isRecommended: true };

      if (categoryFilter.stream) {
        query.stream = categoryFilter.stream;
      }
      if (categoryFilter.examType) {
        query.examType = categoryFilter.examType;
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

// ✅ Search Courses by Title, Subject, or Description
export const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Create regex for case-insensitive search
    const searchRegex = new RegExp(query, 'i');

    // Search in title, name, subject, and description
    const courses = await Course.find({
      $or: [
        { title: { $regex: searchRegex } },
        { name: { $regex: searchRegex } },
        { subject: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ]
    })
      .populate('teacherId', 'name email')
      .sort({ 'ratings.average': -1 })
      .limit(20);

    res.status(200).json({
      message: `Search results for "${query}"`,
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
