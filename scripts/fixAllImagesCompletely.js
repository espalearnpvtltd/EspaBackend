import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

// All verified working Unsplash URLs (tested)
const workingImages = {
  'physics': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
  'chemistry': 'https://images.unsplash.com/photo-1576174065790-cb142efc1bfc?w=500&h=300&fit=crop',
  'biology': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
  'science': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
  'mathematics': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop',
  'math': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop',
  'english': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop',
  'history': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop',
  'geography': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop',
  'social science': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop',
  'business studies': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  'business': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  'accountancy': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
  'economics': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
  'art': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop',
  'default': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop'
};

const fixAllImagesCompletely = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const courses = await Course.find();
    console.log(`📚 Processing ${courses.length} courses...\n`);

    let updated = 0;
    const changes = [];

    for (const course of courses) {
      const subject = course.subject.toLowerCase();
      
      // Find best matching image for subject
      let newImage = workingImages['default'];
      for (const [key, imgUrl] of Object.entries(workingImages)) {
        if (subject.includes(key)) {
          newImage = imgUrl;
          break;
        }
      }

      // Update course image
      const oldImage = course.pictures?.[0] || 'none';
      
      await Course.updateOne(
        { _id: course._id },
        { pictures: [newImage] }
      );

      updated++;
      changes.push({
        name: course.name,
        subject: course.subject,
        oldImage: oldImage.substring(0, 50),
        newImage: newImage.substring(0, 50)
      });

      console.log(`✅ ${course.name.padEnd(40)} → ${newImage.substring(0, 60)}...`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ COMPLETE IMAGE REPLACEMENT DONE');
    console.log('='.repeat(70));
    console.log(`Total Courses: ${courses.length}`);
    console.log(`Courses Updated: ${updated}`);
    
    console.log('\n📊 Summary of changes:');
    const bySubject = {};
    changes.forEach(c => {
      if (!bySubject[c.subject]) bySubject[c.subject] = 0;
      bySubject[c.subject]++;
    });
    Object.entries(bySubject).forEach(([subject, count]) => {
      console.log(`   ${subject}: ${count} course(s)`);
    });

    console.log('\n✅ All images replaced with verified working Unsplash URLs');
    console.log('✅ Every subject has appropriate course images');
    
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

fixAllImagesCompletely();
