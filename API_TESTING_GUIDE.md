# 🚀 EspaBackend API - Quick Testing Guide

## 📥 Import Postman Collection

1. Open **Postman**
2. Click **Import** → Select **POSTMAN_COLLECTION.json**
3. All endpoints will be ready to test!

---

## 🔄 Complete Testing Workflow

### Step 1: Register a Student
**Endpoint:** `POST /api/auth/register`

Use one of these requests:
- **Register Student (Nursery)** - For Nursery class students
- **Register Student (Class 5)** - For Class 5 students  
- **Register Student (Class 12)** - For Class 12 students

**Save the response:**
- Copy `user.id` 
- Copy `tokens.access` (this is your JWT token)

---

### Step 2: Explore Courses
**Endpoints:**
- `GET /api/courses` - View all courses (public)
- `GET /api/courses/search/courses?query=physics` - Search courses
- `GET /api/courses/recommended/by-class` - Your class's recommended courses (needs token)

**Add your token to Authorization header:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Step 3: Purchase & Enroll
**Step 3a: Create Payment Order**
- Endpoint: `POST /api/payments/order`
- Get a course ID from the courses endpoint
- Send courseId in body
- **Save the response:** Copy `payment.orderId`

**Step 3b: Verify Payment & Get Enrolled**
- Endpoint: `POST /api/payments/verify`
- Use the `orderId` from previous step
- Generate any `transactionId` (like TXN_1234567890)
- Choose a `paymentMethod` (upi, card, etc.)
- **Response:** You get `enrollment.enrollmentId` - **You're now enrolled!** 🎉

---

### Step 4: Manage Your Enrollment
- `GET /api/enrollments` - View all your courses
- `PUT /api/enrollments/:id/progress` - Update progress (0-100)
- `POST /api/enrollments/:id/rate` - Rate the course (1-5 stars)
- `PUT /api/enrollments/:id/pause` - Pause course
- `PUT /api/enrollments/:id/resume` - Resume course
- `PUT /api/enrollments/:id/cancel` - Cancel enrollment

---

## 📋 API Quick Reference

| Feature | Method | Endpoint | Auth | Notes |
|---------|--------|----------|------|-------|
| **Register** | POST | `/auth/register` | No | Save token from response |
| **Login** | POST | `/auth/login` | No | Get new token |
| **Get Courses** | GET | `/courses` | No | Public, everyone can access |
| **Search Courses** | GET | `/courses/search/courses?query=X` | No | Search by name, subject, class |
| **Recommended** | GET | `/courses/recommended/by-class` | Yes | Token-based, your class |
| **Create Order** | POST | `/payments/order` | Yes | Get orderId |
| **Verify Payment** | POST | `/payments/verify` | Yes | Creates enrollment |
| **View Enrollments** | GET | `/enrollments` | Yes | See all your courses |
| **Update Progress** | PUT | `/enrollments/:id/progress` | Yes | 0-100% |
| **Rate Course** | POST | `/enrollments/:id/rate` | Yes | 1-5 stars |
| **Pause/Resume** | PUT | `/enrollments/:id/pause` | Yes | Pause/resume course |
| **Cancel** | PUT | `/enrollments/:id/cancel` | Yes | Cancel enrollment |

---

## 🎯 Testing Scenarios

### Scenario 1: Nursery Student Enrollment
```
1. Register (Nursery) → Get token
2. Get All Courses → Pick a course
3. Create Payment Order (with courseId)
4. Verify Payment (with orderId)
5. Get Enrollments → See your new course!
6. Update Progress → Try 25%, 50%, 100%
7. Rate Course → Give 5 stars!
```

### Scenario 2: Search & Enroll
```
1. Search "Class 5" courses (public, no token needed)
2. Register as Class 5 student
3. Get Recommended courses (uses your class from token)
4. Enroll in one
5. Track progress
```

### Scenario 3: Multiple Courses
```
1. Register student
2. Create payment orders for 3 different courses
3. Verify all 3 payments
4. View all enrollments
5. Update progress for each
6. Rate each course
```

---

## 🔑 Important Notes

### Authentication
- **Every student-specific endpoint needs Authorization header**
- Format: `Authorization: Bearer YOUR_TOKEN_HERE`
- Copy token from registration or login response

### Payment Methods
- `upi` (recommended for testing)
- `credit_card`
- `debit_card`
- `net_banking`
- `wallet`
- `other`

### Class Levels
- Nursery, LKG, UKG (Pre-primary)
- 1, 2, 3, 4, 5 (Primary)
- 6, 7, 8, 9 (Middle)
- 10, 11, 12 (Secondary & Senior)

### Progress Tracking
- 0-100% (integer values)
- When you reach 100%, status auto-changes to "completed"
- Can pause/resume to temporarily stop access

### Ratings
- 1-5 stars (only integers)
- Optional feedback text
- Can add feedback after rating

---

## 💡 Pro Tips for Testing

1. **Use {{$timestamp}} in email** - Postman automatically generates unique emails
   ```
   nursery{{$timestamp}}@example.com
   ```

2. **Save responses** - Use response values for next requests
   - Save `tokens.access` for authorization
   - Save `payment.orderId` for payment verification
   - Save `enrollment.enrollmentId` for enrollment management

3. **Copy/Paste IDs** - Replace placeholders in URLs:
   - `YOUR_TOKEN_HERE` → Paste your token
   - `ENROLLMENT_ID_HERE` → Paste enrollment ID
   - `ORD_ID_HERE` → Paste order ID

4. **Test All Classes** - Register students from different classes to see:
   - Different recommended courses
   - Different course availability
   - Class-based filtering working

5. **Test Complete Flow** - From registration to course completion:
   - Register → Search → Order → Pay → Enroll → Progress → Rate → Complete

---

## ❌ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid token" | Missing/wrong bearer token | Copy fresh token from registration |
| "Already enrolled" | Already have this course | Pick a different course |
| "Course not found" | Invalid courseId | Copy ID from GET /courses response |
| "Order not found" | Invalid orderId | Use orderId from create order response |
| "Enrollment not found" | Invalid enrollmentId | Use enrollmentId from verify payment response |

---

## 📚 Example Flow (Copy-Paste Ready)

### 1. Register
```
POST /api/auth/register
{
  "name": "Test Student",
  "email": "test{{$timestamp}}@example.com",
  "password": "TestPass123",
  "class": "5"
}
```
**SAVE:** `user.id` and `tokens.access`

### 2. Get Courses
```
GET /api/courses
(No auth needed)
```
**SAVE:** First course's `._id` value

### 3. Create Payment
```
POST /api/payments/order
Headers: Authorization: Bearer YOUR_SAVED_TOKEN
{
  "courseId": "YOUR_SAVED_COURSE_ID"
}
```
**SAVE:** `payment.orderId`

### 4. Verify & Enroll
```
POST /api/payments/verify
Headers: Authorization: Bearer YOUR_SAVED_TOKEN
{
  "orderId": "YOUR_SAVED_ORDER_ID",
  "transactionId": "TXN_{{$timestamp}}",
  "paymentMethod": "upi"
}
```
**RESULT:** You're enrolled! Check `enrollment.enrollmentId`

### 5. View Enrollments
```
GET /api/enrollments
Headers: Authorization: Bearer YOUR_SAVED_TOKEN
```
**RESULT:** See all your courses!

---

## 🎓 Success Indicators

✅ Registration returns `tokens.access`
✅ Payment order returns `orderId`
✅ Payment verification returns `enrollmentId`
✅ Enrollments endpoint shows your course
✅ Progress updates show new percentage
✅ Rating saves feedback successfully

---

## 🚀 You're Ready!

### Option 1: Use Postman (for API testing)
Import the Postman collection and start testing:
1. Register → Get token
2. Search courses
3. Enroll with payment
4. Manage your courses

### Option 2: Use Your Courses Page (for student interface)
Access the dedicated student portal:
- **URL:** `http://localhost:5001/my-courses.html`
- Features:
  - 🔐 Login / Register directly
  - 📚 View all your enrolled courses
  - 📊 Track progress with visual bars
  - ⭐ Rate and review courses
  - 📈 See course stats (enrolled, active, completed)
  - 🎯 Beautiful responsive design

Happy Learning! 🎉
