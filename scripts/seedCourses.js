import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import { coursesByClass } from '../config/coursesByClass.js';

dotenv.config();

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
  science: ["https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop"],
  social: ["https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop"],
  default: ["https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop"]
};

// Pricing strategy
const getPricing = (subject, difficulty, classLevel) => {
  const basePrices = {
    'Physics': 4499,
    'Chemistry': 4299,
    'Biology': 4199,
    'Mathematics': 3999,
    'English': 2999,
    'History': 2499,
    'Geography': 2499,
    'Social Science': 2399,
    'Accountancy': 4499,
    'Business Studies': 4299,
    'Economics': 3499
  };

  let basePrice = basePrices[subject] || 2999;
  
  // Adjust for difficulty
  if (difficulty === 'advanced') basePrice *= 1.3;
  else if (difficulty === 'beginner') basePrice *= 0.7;

  // Adjust for class level
  const classNum = parseInt(classLevel);
  if (!isNaN(classNum)) {
    if (classNum >= 11) basePrice *= 1.2;
    else if (classNum <= 3) basePrice *= 0.6;
  }

  const price = Math.round(basePrice);
  const discount = Math.round(price * 0.2); // 20% discount
  const discountedPrice = price - discount;

  return { price, discountedPrice };
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if courses already exist
    const existingCount = await Course.countDocuments();
    if (existingCount > 100) {
      console.log(`⚠️  Database already has ${existingCount} courses. Skipping seed to avoid duplicates.`);
      console.log('💡 If you want to reseed, delete existing courses first.');
      await mongoose.disconnect();
      return;
    }

    let totalCourses = 0;
    let createdCourses = 0;

    // Iterate through all classes
    for (const [classId, classData] of Object.entries(coursesByClass)) {
      console.log(`\n📚 Processing ${classData.name} (${classData.ageGroup})...`);

      // Iterate through all courses in the class
      for (const course of classData.courses) {
        totalCourses++;

        // Check if course already exists
        const existingCourse = await Course.findOne({
          name: course.name,
          class: classData.name
        });

        if (existingCourse) {
          console.log(`  ⏭️  Skipped: ${course.name} (already exists)`);
          continue;
        }

        // Get image for course
        const subjectLower = course.subject.toLowerCase();
        const coursePictures = defaultImages[subjectLower] || defaultImages.default;

        // Get pricing
        const { price, discountedPrice } = getPricing(course.subject, 'intermediate', classId);

        // Calculate duration from chapters
        const duration = course.chapters.length * 45; // ~45 mins per chapter

        // Create course
        const newCourse = await Course.create({
          name: course.name,
          title: course.name,
          description: `Complete ${course.name} course for ${classData.name} (${classData.ageGroup})`,
          subject: course.subject,
          class: classData.name,
          pictures: coursePictures,
          price,
          discountedPrice,
          duration,
          difficulty: 'intermediate',
          isRecommended: true,
          ratings: {
            average: 0,
            count: 0,
            reviews: []
          }
        });

        console.log(`  ✅ Created: ${course.name} (₹${price} → ₹${discountedPrice})`);
        createdCourses++;
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log(`📊 SEED COMPLETE`);
    console.log('='.repeat(70));
    console.log(`Total Courses in Structure: ${totalCourses}`);
    console.log(`New Courses Created: ${createdCourses}`);
    console.log(`Total Courses in DB: ${await Course.countDocuments()}`);
    console.log('='.repeat(70));

    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed
seedDatabase();
