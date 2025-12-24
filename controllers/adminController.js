import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import Payment from '../models/Payment.js';

// ✅ Admin Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalCourses,
      totalEnrollments,
      activeStudents,
      pendingPayments
    ] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      Course.countDocuments({ status: 'active' }),
      Enrollment.countDocuments(),
      User.countDocuments({ role: 'student', status: 'active' }),
      Payment.countDocuments({ status: 'pending' })
    ]);

    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get revenue stats
    const revenueStats = await Payment.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          thisMonth: {
            $sum: {
              $cond: [
                {
                  $gte: [
                    '$createdAt',
                    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                  ]
                },
                '$amount',
                0
              ]
            }
          }
        }
      }
    ]);

    res.status(200).json({
      stats: {
        totalStudents,
        totalTeachers,
        totalCourses,
        totalEnrollments,
        activeStudents,
        pendingPayments,
        revenue: revenueStats[0] || { totalRevenue: 0, thisMonth: 0 }
      },
      recentEnrollments
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get All Users with Filters
export const getAllUsers = async (req, res) => {
  try {
    const { role, class: userClass, status, search, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (userClass) filter.class = userClass;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password -refreshToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter)
    ]);

    res.status(200).json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update User Role (Superadmin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Only superadmin can change roles
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can change user roles' });
    }

    const validRoles = ['student', 'teacher', 'admin', 'superadmin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Prevent changing own role
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update User Status
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User status updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Delete User (Superadmin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only superadmin can delete users
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can delete users' });
    }

    // Prevent self-deletion
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Also delete related data
    await Promise.all([
      Enrollment.deleteMany({ student: userId }),
      Attendance.deleteMany({ student: userId }),
      Grade.deleteMany({ student: userId })
    ]);

    res.status(200).json({ message: 'User and related data deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get Students by Class
export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const students = await User.find({ 
      class: classId, 
      role: 'student' 
    })
      .select('-password -refreshToken')
      .sort({ name: 1 });

    res.status(200).json({ students });
  } catch (error) {
    console.error('Get students by class error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Create Admin User (Superadmin only)
export const createAdminUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Only superadmin can create admin/superadmin users
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can create admin users' });
    }

    if (!['admin', 'superadmin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role for admin creation' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role,
      status: 'active'
    });

    await user.save();

    res.status(201).json({
      message: `${role} user created successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Create admin user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Get System Activity Log
export const getActivityLog = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    // Get recent activities from various collections
    const [recentUsers, recentEnrollments, recentPayments] = await Promise.all([
      User.find()
        .select('name email role createdAt')
        .sort({ createdAt: -1 })
        .limit(20),
      Enrollment.find()
        .populate('student', 'name')
        .populate('course', 'title')
        .sort({ createdAt: -1 })
        .limit(20),
      Payment.find()
        .populate('student', 'name')
        .sort({ createdAt: -1 })
        .limit(20)
    ]);

    res.status(200).json({
      activities: {
        recentUsers,
        recentEnrollments,
        recentPayments
      }
    });
  } catch (error) {
    console.error('Get activity log error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
