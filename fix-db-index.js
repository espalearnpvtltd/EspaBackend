import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dropOldIndex = async () => {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    
    const db = mongoose.connection;
    const enrollmentsCollection = db.collection('enrollments');
    
    console.log('📋 Checking existing indexes...');
    const indexes = await enrollmentsCollection.listIndexes().toArray();
    console.log('Current indexes:');
    indexes.forEach(idx => console.log(`   - ${Object.keys(idx.key).join('_')}`));
    
    // Drop the old userId index
    const hasOldIndex = indexes.some(idx => idx.key.userId && idx.key.courseId);
    if (hasOldIndex) {
      console.log('\n🗑️  Dropping old index: userId_1_courseId_1');
      try {
        await enrollmentsCollection.dropIndex('userId_1_courseId_1');
        console.log('✅ Old index dropped successfully!');
      } catch (err) {
        console.log('⚠️  Could not drop index:', err.message);
      }
    } else {
      console.log('\n⚠️  Old index not found (might already be deleted)');
    }
    
    // Check remaining indexes
    console.log('\n📋 Remaining indexes:');
    const newIndexes = await enrollmentsCollection.listIndexes().toArray();
    newIndexes.forEach(idx => {
      const keys = Object.keys(idx.key).join('_');
      console.log(`   - ${keys}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

dropOldIndex();
