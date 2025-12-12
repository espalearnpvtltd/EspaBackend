# 🧪 Your Courses - Postman Testing Guide

## 📥 Import Collection

1. Open **Postman**
2. Click **File** → **Import**
3. Select **YOUR_COURSES_POSTMAN.json** from the root directory
4. All endpoints and variables will be ready!

---

## 🎯 Complete Testing Workflow

### Step 1: Register & Get Token
**Request:** `POST /api/auth/register`

1. Click on **"1. Authentication" → "Register Student (Class 12)"**
2. Click **Send**
3. ✅ Response will show `tokens.access` (automatically saved to `authToken` variable)
4. The student email is automatically saved to `studentEmail`

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "xxx",
    "email": "studentxxx@example.com",
    "name": "Test Student xxx",
    "role": "student",
    "class": "12"
  },
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Step 2: Browse Courses
**Request:** `GET /api/courses`

1. Click on **"2. Browse Courses" → "Get All Courses (Public)"**
2. Click **Send**
3. ✅ Response will show all courses
4. The first course ID is automatically saved to `courseId`

**Expected Response:**
```json
{
  "message": "Courses retrieved successfully",
  "courses": [
    {
      "_id": "693ab05e31318b0db26d7147",
      "name": "Physics Class 12",
      "subject": "Physics",
      "class": "12",
      "description": "Complete Physics preparation",
      "price": 3999,
      "discountedPrice": 3399,
      "duration": 120,
      "pictures": ["https://..."],
      "instructor": "Mr. Kumar",
      "isRecommended": true
    },
    ...
  ]
}
```

---

### Step 3: Quick Enroll (One-Click)
**Request:** `POST /api/payments/enroll`

1. Click on **"4. Quick Enrollment" → "Quick Enroll in Course"**
2. Click **Send**
3. ✅ You're instantly enrolled!
4. The enrollment ID is automatically saved to `enrollmentId`

**Expected Response:**
```json
{
  "enrollmentId": "xyz123",
  "studentName": "Test Student",
  "studentEmail": "test@example.com",
  "courseName": "Physics Class 12",
  "courseClass": "12",
  "subject": "Physics",
  "price": 3999,
  "discountedPrice": 3399,
  "status": "active",
  "progress": 0,
  "enrollmentDate": "2025-12-12T10:30:00Z",
  "startDate": "2025-12-12T10:30:00Z"
}
```

---

### Step 4: View Your Courses
**Request:** `GET /api/enrollments/my-courses`

1. Click on **"5. Your Courses" → "Get My Courses"**
2. Click **Send**
3. ✅ See all your enrolled courses with full details!

**Expected Response:**
```json
{
  "message": "My courses retrieved successfully",
  "count": 1,
  "courses": [
    {
      "enrollmentId": "xyz123",
      "courseId": "693ab05e31318b0db26d7147",
      "courseName": "Physics Class 12",
      "description": "Complete Physics preparation",
      "subject": "Physics",
      "class": "12",
      "difficulty": "advanced",
      "price": 3999,
      "discountedPrice": 3399,
      "duration": 120,
      "pictures": ["https://..."],
      "instructor": "Mr. Kumar",
      "enrollmentStatus": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:30:00Z",
      "completionDate": null,
      "certificateIssued": false,
      "rating": null,
      "feedback": null
    }
  ]
}
```

---

### Step 5: Update Progress
**Request:** `PUT /api/enrollments/:id/progress`

1. Click on **"6. Manage Enrollment" → "Update Progress (25%)"**
2. Click **Send**
3. ✅ Progress updated to 25%

4. **Try these in order:**
   - "Update Progress (50%)"
   - "Update Progress (100% - Complete)" ← Auto-marks course as completed!

**Expected Response:**
```json
{
  "message": "Progress updated successfully",
  "enrollment": {
    "enrollmentId": "xyz123",
    "progress": 25,
    "status": "active"
  }
}
```

---

### Step 6: Rate the Course
**Request:** `POST /api/enrollments/:id/rate`

1. Click on **"6. Manage Enrollment" → "Rate Course (5 Stars)"**
2. Click **Send**
3. ✅ Course rated with feedback!

**Expected Response:**
```json
{
  "message": "Course rated successfully",
  "enrollment": {
    "enrollmentId": "xyz123",
    "rating": 5,
    "feedback": "Great course! Very informative and well-structured."
  }
}
```

---

### Step 7: Pause/Resume/Cancel
**Request:** `PUT /api/enrollments/:id/pause` (or resume/cancel)

1. Click on **"6. Manage Enrollment" → "Pause Course"**
2. Click **Send**
3. ✅ Course paused!

4. **Try:**
   - "Resume Course" - Resumes paused course
   - "Cancel Course" - Cancels enrollment (can't undo)

**Expected Response:**
```json
{
  "message": "Enrollment paused successfully",
  "enrollment": {
    "enrollmentId": "xyz123",
    "status": "paused"
  }
}
```

---

## 📊 Complete Flow (In Order)

Follow this sequence to test everything:

```
1. Register Student (Class 12)
   ↓
2. Get All Courses (Public)
   ↓
3. Quick Enroll in Course
   ↓
4. Get My Courses ✨ (See your enrollment!)
   ↓
5. Update Progress (25%)
   ↓
6. Update Progress (50%)
   ↓
7. Update Progress (100%) ← Status becomes "completed"
   ↓
8. Rate Course (5 Stars)
   ↓
9. Get My Courses again ✨ (See updated progress & rating!)
```

---

## 🔑 Environment Variables

Postman automatically saves these after each request:

| Variable | Source | Used For |
|----------|--------|----------|
| `authToken` | Register/Login | Authorization header |
| `studentId` | Register | Enrollment queries |
| `studentEmail` | Register | Reference |
| `courseId` | Get All Courses | Enrollment |
| `enrollmentId` | Enroll/Get My Courses | Progress/Rating updates |
| `orderId` | Create Payment | Payment verification (old flow) |

---

## 📱 Testing on Frontend

After using Postman to enroll:

1. Open browser: `http://localhost:5001/my-courses.html`
2. Use the same email/password to login
3. ✅ See your enrolled course displayed with:
   - Course name, subject, class, duration
   - Enrollment status (active/paused/completed)
   - Progress bar (updated in real-time)
   - Rating & feedback (if rated)
   - Enrollment date

---

## ❌ Common Issues & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Unauthorized" | Missing/invalid token | Copy fresh token from registration |
| "Course not found" | Invalid courseId | Use courseId from Get Courses response |
| "Already enrolled" | Already have this course | Pick a different course |
| "Invalid enrollment ID" | Invalid enrollmentId | Use ID from enroll or get-my-courses |
| "Only students can enroll" | Non-student account | Register as student (role auto-set) |

---

## 🎓 What You're Testing

✅ **Backend APIs:**
- User registration & authentication
- Course browsing & search
- One-click enrollment
- My Courses retrieval
- Progress tracking
- Course rating & feedback
- Pause/resume/cancel functionality

✅ **Frontend Features:**
- Login/Register form
- Course cards with full details
- Progress visualization
- Status badges (active/paused/completed)
- Rating display
- Empty state handling

✅ **Database:**
- Student enrollment creation
- Progress updates
- Rating storage
- Status management

---

## 🚀 Success Indicators

✅ Register returns `tokens.access`
✅ Quick Enroll returns `enrollmentId`
✅ My Courses shows enrolled course
✅ Progress updates show new percentage
✅ Rating stores feedback successfully
✅ Frontend displays course with progress bar
✅ Status updates work (pause/resume/cancel)

---

## 💡 Pro Tips

1. **Use multiple students:** Register different students to test parallel enrollments
2. **Test all statuses:** Try active → paused → resumed → completed → cancelled
3. **Rate before/after:** Rate at different progress levels
4. **Check console logs:** Postman tests print helpful messages to console
5. **Monitor frontend:** Keep your-courses.html open while making changes in Postman

---

Happy Testing! 🎉
