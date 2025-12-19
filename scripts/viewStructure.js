const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  const courseSchema = new mongoose.Schema({}, { strict: false });
  const Course = mongoose.model('Course', courseSchema, 'courses');
  
  return Course.find().select('name class subject').lean().then(courses => {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 CURRENT STRUCTURE - MongoDB Courses');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    // Group by class
    const byClass = {};
    courses.forEach(c => {
      if (!byClass[c.class]) byClass[c.class] = [];
      byClass[c.class].push(c);
    });
    
    // Sort classes
    const classOrder = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
    
    classOrder.forEach(cls => {
      if (byClass[cls]) {
        console.log(`📚 ${cls.toUpperCase()} - ${byClass[cls].length} course(s)`);
        byClass[cls].forEach(c => console.log(`   • ${c.name} (${c.subject})`));
        console.log('');
      }
    });
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Total: ${courses.length} courses`);
    console.log('═══════════════════════════════════════════════════════════');
    
    mongoose.disconnect();
  });
}).catch(err => console.error('Error:', err.message));
