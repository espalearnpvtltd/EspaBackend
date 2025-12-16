import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const removeAgeGroupFromDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all courses
    const courses = await Course.find();
    console.log(`\n📋 Processing ${courses.length} courses...`);

    let updated = 0;

    // Iterate through each course and update description
    for (const course of courses) {
      if (course.description && course.description.includes('years')) {
        // Remove age pattern like "(9-10 years)" or "(17-18 years)"
        const newDescription = course.description.replace(/\s*\(\d+-\d+\s+years?\)/g, '');
        
        await Course.updateOne(
          { _id: course._id },
          { description: newDescription }
        );
        
        updated++;
        console.log(`  ✅ Updated: ${course.name}`);
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ DATABASE UPDATE COMPLETE');
    console.log('='.repeat(70));
    console.log(`Total Courses: ${courses.length}`);
    console.log(`Courses Updated: ${updated}`);

    // Show sample after update
    const updatedCourses = await Course.find().limit(3);
    console.log('\n📋 Sample courses after update:');
    updatedCourses.forEach(course => {
      console.log(`  • ${course.name} (${course.class})`);
      console.log(`    "${course.description}"`);
    });

    console.log('\n='.repeat(70));
    await mongoose.disconnect();
    console.log('✅ Done! Age information removed from MongoDB cluster');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

removeAgeGroupFromDB();
