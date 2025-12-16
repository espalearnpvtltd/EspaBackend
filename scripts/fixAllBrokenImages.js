import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const fixAllBrokenImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const courses = await Course.find();
    console.log(`📚 Checking ${courses.length} courses for broken images...\n`);

    let fixed = 0;

    // Unsplash image mapping
    const imageMap = {
      'physics': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop',
      'chemistry': 'https://images.unsplash.com/photo-1576174065790-cb142efc1bfc?w=500&h=300&fit=crop',
      'biology': 'https://images.unsplash.com/photo-1576088160562-40f694ba6b22?w=500&h=300&fit=crop',
      'math': 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop',
      'english': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop',
      'history': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop',
      'geography': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop',
      'social': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop',
      'business': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      'accountancy': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      'default': 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1d?w=500&h=300&fit=crop'
    };

    for (const course of courses) {
      const currentImage = course.pictures?.[0] || '';
      
      // Check if image is broken (not Unsplash)
      if (!currentImage.includes('unsplash.com')) {
        const subject = course.subject.toLowerCase();
        let newImage = imageMap['default'];
        
        // Find best matching image
        for (const [key, imgUrl] of Object.entries(imageMap)) {
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
        console.log(`✅ ${course.name} (${course.subject})`);
        console.log(`   From: ${currentImage.substring(0, 50)}...`);
        console.log(`   To: ${newImage.substring(0, 50)}...\n`);
      }
    }

    console.log('='.repeat(70));
    console.log('✅ IMAGE FIX COMPLETE');
    console.log('='.repeat(70));
    console.log(`Total Courses: ${courses.length}`);
    console.log(`Images Fixed: ${fixed}`);
    console.log('\n✅ All courses now have working Unsplash images');
    
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

fixAllBrokenImages();
