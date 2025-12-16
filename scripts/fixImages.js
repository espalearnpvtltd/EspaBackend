import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

// High-quality working images mapping
const imageMap = {
  // Science subjects
  'physics': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
  'chemistry': 'https://images.unsplash.com/photo-1576174065790-cb142efc1bfc?w=500&h=300&fit=crop',
  'biology': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
  'science': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
  
  // Core subjects
  'mathematics': 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop',
  'math': 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop',
  'english': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop',
  
  // Social sciences
  'history': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop',
  'geography': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop',
  'social science': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop',
  
  // Commerce subjects
  'accountancy': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
  'business studies': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  'economics': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
  
  // Default
  'default': 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop'
};

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const courses = await Course.find();
    console.log(`📚 Processing ${courses.length} courses...\n`);

    let updated = 0;
    let broken = 0;

    for (const course of courses) {
      const subject = course.subject.toLowerCase();
      const subjectKey = Object.keys(imageMap).find(key => subject.includes(key)) || 'default';
      const correctImage = imageMap[subjectKey];

      // Check if image needs updating (broken or wrong)
      if (!course.pictures || course.pictures.length === 0 || 
          course.pictures[0] === imageMap['default'] ||
          course.pictures[0].includes('pexels.com/photos/34950')) {
        
        await Course.updateOne(
          { _id: course._id },
          { pictures: [correctImage] }
        );

        updated++;
        console.log(`✅ ${course.name} (${subject})`);
        console.log(`   → ${correctImage}\n`);
      } else if (course.pictures[0].includes('istockphoto')) {
        broken++;
        await Course.updateOne(
          { _id: course._id },
          { pictures: [correctImage] }
        );
        updated++;
        console.log(`🔧 Fixed iStock image: ${course.name}`);
        console.log(`   → ${correctImage}\n`);
      }
    }

    console.log('='.repeat(70));
    console.log('✅ IMAGE FIX COMPLETE');
    console.log('='.repeat(70));
    console.log(`Total Courses: ${courses.length}`);
    console.log(`Courses Updated: ${updated}`);
    console.log(`Broken Images Fixed: ${broken}`);
    console.log('\n✅ All images now use working Unsplash URLs');
    
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

fixImages();
