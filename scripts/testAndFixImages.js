import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import https from 'https';

dotenv.config();

// Tested working Unsplash images
const verifiedWorkingImages = {
  'physics': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
  'chemistry': 'https://images.unsplash.com/photo-1576174065790-cb142efc1bfc?w=500&h=300&fit=crop',
  'biology': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
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
  'default': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop'
};

// Test if URL returns 200 (working)
const testImageURL = (url) => {
  return new Promise((resolve) => {
    https.head(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
};

const fixBrokenImagesInDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const courses = await Course.find();
    console.log(`📚 Scanning ${courses.length} courses for broken images...\n`);

    let fixed = 0;
    const brokenImages = new Map();

    for (const course of courses) {
      const currentImage = course.pictures?.[0] || '';
      const subject = course.subject.toLowerCase();

      // Test if current image is working
      console.log(`⏳ Testing: ${course.name}...`);
      const isWorking = await testImageURL(currentImage);

      if (!isWorking) {
        console.log(`   ❌ BROKEN: ${currentImage.substring(0, 80)}...`);
        
        // Find correct replacement
        let newImage = verifiedWorkingImages['default'];
        for (const [key, imgUrl] of Object.entries(verifiedWorkingImages)) {
          if (subject.includes(key)) {
            newImage = imgUrl;
            break;
          }
        }

        await Course.updateOne(
          { _id: course._id },
          { pictures: [newImage] }
        );

        fixed++;
        console.log(`   ✅ FIXED: ${newImage.substring(0, 80)}...\n`);
        
        brokenImages.set(course.name, currentImage);
      } else {
        console.log(`   ✅ WORKING\n`);
      }
    }

    console.log('='.repeat(70));
    console.log('✅ IMAGE SCAN COMPLETE');
    console.log('='.repeat(70));
    console.log(`Total Courses: ${courses.length}`);
    console.log(`Broken Images Fixed: ${fixed}`);
    
    if (brokenImages.size > 0) {
      console.log('\n❌ Broken images that were fixed:');
      brokenImages.forEach((url, name) => {
        console.log(`   • ${name}`);
        console.log(`     ${url}\n`);
      });
    } else {
      console.log('\n✅ All images are working!');
    }
    
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

fixBrokenImagesInDB();
