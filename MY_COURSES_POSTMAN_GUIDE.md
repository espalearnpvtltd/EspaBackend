# 📌 Postman Testing Guide - My Courses Feature

## ✅ Feature: View Enrolled Courses with Token

When a student gets a token and is enrolled in courses, those courses should appear in their "My Courses" list.

---

## 🎯 Complete Test Flow

### **Test 1: Register Student**

**Request:**
```
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "password": "password123",
  "class": "12"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "693bea6b6e27e3abfdc4e718",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "class": "12",
    "role": "student"
  },
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Save the access token for next tests!**

---

### **Test 2: View My Courses (Before Enrollment)**

**Endpoint:** `GET /api/enrollments/my-courses`

**Request:**
```
GET http://localhost:5001/api/enrollments/my-courses
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

**Expected Response (200):**
```json
{
  "message": "No enrolled courses yet",
  "count": 0,
  "courses": []
}
```

---

### **Test 3: Enroll in Physics Course**

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>

{
  "courseId": "693ab05e31318b0db26d7147"
}
```

**Expected Response (201):**
```json
{
  "message": "Enrollment successful! You are now enrolled in this course.",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "studentName": "Raj Kumar",
    "studentEmail": "raj@example.com",
    "courseName": "Modern Physics Course",
    "courseClass": "12",
    "subject": "Physics",
    "price": 3999,
    "discountedPrice": 2999,
    "status": "active",
    "progress": 0,
    "enrollmentDate": "2025-12-12T10:11:56.221Z",
    "startDate": "2025-12-12T10:11:56.288Z"
  }
}
```

---

### **Test 4: View My Courses (After Enrollment)**

**Endpoint:** `GET /api/enrollments/my-courses`

**Request:**
```
GET http://localhost:5001/api/enrollments/my-courses
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

**Expected Response (200):**
```json
{
  "message": "My courses retrieved successfully",
  "count": 1,
  "courses": [
    {
      "enrollmentId": "693bea6c6e27e3abfdc4e720",
      "courseId": "693ab05e31318b0db26d7147",
      "courseName": "Modern Physics Course",
      "description": "Comprehensive physics course covering mechanics, electricity, and modern physics",
      "subject": "Physics",
      "class": "12",
      "difficulty": "advanced",
      "price": 3999,
      "discountedPrice": 2999,
      "duration": 100,
      "pictures": [
        "https://images.unsplash.com/photo-..."
      ],
      "instructor": "Dr. Physics",
      "enrollmentStatus": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:11:56.221Z",
      "completionDate": null,
      "certificateIssued": false,
      "rating": null,
      "feedback": null
    }
  ]
}
```

---

### **Test 5: Enroll in Multiple Courses**

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>

{
  "courseId": "693ab3cd31318b0db26d714f"
}
```

**Response (201):**
```json
{
  "message": "Enrollment successful! You are now enrolled in this course.",
  "enrollment": {
    "enrollmentId": "693bea7c6e27e3abfdc4e72b",
    "courseName": "Chemistry Fundamentals",
    "status": "active",
    ...
  }
}
```

---

### **Test 6: View My Courses (Multiple Enrollments)**

**Request:**
```
GET http://localhost:5001/api/enrollments/my-courses
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

**Expected Response (200):**
```json
{
  "message": "My courses retrieved successfully",
  "count": 2,
  "courses": [
    {
      "enrollmentId": "693bea7c6e27e3abfdc4e72b",
      "courseId": "693ab3cd31318b0db26d714f",
      "courseName": "Chemistry Fundamentals",
      "subject": "Chemistry",
      "class": "12",
      "difficulty": "advanced",
      "price": 4499,
      "discountedPrice": 3499,
      "duration": 80,
      "enrollmentStatus": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:12:12.075Z",
      ...
    },
    {
      "enrollmentId": "693bea6c6e27e3abfdc4e720",
      "courseId": "693ab05e31318b0db26d7147",
      "courseName": "Modern Physics Course",
      "subject": "Physics",
      "class": "12",
      "difficulty": "advanced",
      "price": 3999,
      "discountedPrice": 2999,
      "duration": 100,
      "enrollmentStatus": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:11:56.221Z",
      ...
    }
  ]
}
```

**🔍 Note:** Courses are sorted by enrollment date (most recent first)

---

### **Test 7: Update Progress and Check My Courses**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/progress
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>

{
  "progress": 45
}
```

**Response (200):**
```json
{
  "message": "Progress updated",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "progress": 45,
    "status": "active"
  }
}
```

**Then check My Courses again:**
```
GET http://localhost:5001/api/enrollments/my-courses
```

**Response will show:**
```json
{
  "progress": 45  // Updated progress
}
```

---

### **Test 8: Pause Course**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/pause
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

**Response (200):**
```json
{
  "message": "Enrollment paused",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "status": "paused"
  }
}
```

**Check My Courses:**
```json
{
  "enrollmentStatus": "paused",  // Changed from "active"
  "progress": 45
}
```

---

### **Test 9: Resume Course**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/resume
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>
```

**Response (200):**
```json
{
  "message": "Enrollment resumed",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "status": "active"
  }
}
```

---

### **Test 10: Rate Course**

**Request:**
```
POST http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/rate
Content-Type: application/json
Authorization: Bearer <ACCESS_TOKEN>

{
  "rating": 5,
  "feedback": "Excellent course! Very well structured."
}
```

**Response (200):**
```json
{
  "message": "Rating added successfully",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "rating": 5,
    "feedback": "Excellent course! Very well structured."
  }
}
```

**Check My Courses to see rating:**
```json
{
  "rating": 5,
  "feedback": "Excellent course! Very well structured."
}
```

---

## 📊 Response Field Reference

### Enrollment Status Values
- `"active"` - Currently enrolled and active
- `"paused"` - Temporarily paused
- `"completed"` - Course completed (progress = 100)
- `"cancelled"` - Enrollment cancelled

### Course Fields in My Courses Response
| Field | Type | Description |
|-------|------|-------------|
| `enrollmentId` | ObjectId | Unique enrollment ID |
| `courseId` | ObjectId | Course ID |
| `courseName` | String | Course name |
| `subject` | String | Subject (Physics, Chemistry, etc.) |
| `class` | String | Class level (11, 12, etc.) |
| `difficulty` | String | Difficulty level |
| `price` | Number | Original price |
| `discountedPrice` | Number | Price after discount |
| `duration` | Number | Course duration in hours |
| `enrollmentStatus` | String | Status of enrollment |
| `progress` | Number | Progress percentage (0-100) |
| `rating` | Number | Course rating (1-5) |
| `feedback` | String | Student feedback |
| `certificateIssued` | Boolean | Certificate issued flag |

---

## 🔑 Key Features

✅ **Token-based Access** - Use JWT token from registration/login  
✅ **Multiple Enrollments** - Students can enroll in multiple courses  
✅ **Course Details** - Full course information included in response  
✅ **Progress Tracking** - Track student progress for each course  
✅ **Rating & Feedback** - Rate and leave feedback on courses  
✅ **Pause/Resume** - Pause and resume courses anytime  
✅ **Sorted Results** - Courses sorted by enrollment date (newest first)  
✅ **Auto-filter** - Cancelled enrollments excluded from list  

---

## ⚠️ Important Notes

1. **Token Required** - All endpoints require valid student JWT token
2. **Student Only** - Only users with `role: "student"` can enroll
3. **Unique Enrollments** - Cannot enroll twice in same course
4. **Status Tracking** - Enrollment status updates automatically
5. **No Payment Required** - One-click enrollment (direct enrollment)

---

## 🚀 Complete URL Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Register new student |
| `/api/payments/enroll` | POST | Enroll in a course |
| `/api/enrollments/my-courses` | GET | View all my enrolled courses |
| `/api/enrollments` | GET | Get all enrollments (raw format) |
| `/api/enrollments/:id` | GET | Get single enrollment details |
| `/api/enrollments/:id/progress` | PUT | Update progress |
| `/api/enrollments/:id/rate` | POST | Rate course |
| `/api/enrollments/:id/pause` | PUT | Pause enrollment |
| `/api/enrollments/:id/resume` | PUT | Resume enrollment |
| `/api/enrollments/:id/cancel` | PUT | Cancel enrollment |

---

**Last Updated:** December 12, 2025  
**Status:** ✅ Feature Complete - My Courses Endpoint Working
