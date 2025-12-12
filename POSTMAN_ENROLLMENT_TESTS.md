# 📌 Postman Testing Guide - One-Click Enrollment System (With studentId)

## 🔄 SYSTEM STATUS
✅ **Code Updated**: All references changed from `userId` to `studentId`  
⚠️ **Database Migration**: Old `userId_1_courseId_1` index needs to be dropped  
📝 **Indexes Updated**: Model uses `studentId_1_courseId_1` unique index

---

## 🎯 Test Scenarios

### **Test 1: Register New Student**

**Request:**
```
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "Raj Kumar",
  "email": "raj_new_@example.com",
  "password": "password123",
  "class": "12"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "693bea6b6e27e3abfdc4e718",
    "name": "Raj Kumar",
    "email": "raj_new_@example.com",
    "class": "12",
    "role": "student"
  },
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the `tokens.access` value for next tests!**

---

### **Test 2: One-Click Enrollment - Physics Course**

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>

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
    "studentEmail": "raj_new_@example.com",
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

**Database Record Created:**
- Field: `studentId` (NOT `userId`)
- Field: `courseId`
- Field: `status`: "active"
- Field: `progress`: 0

---

### **Test 3: Enroll in Another Course - Chemistry**

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>

{
  "courseId": "693ab3cd31318b0db26d714f"
}
```

**Expected Response (201):**
```json
{
  "message": "Enrollment successful! You are now enrolled in this course.",
  "enrollment": {
    "enrollmentId": "693bea7c6e27e3abfdc4e72b",
    "studentName": "Raj Kumar",
    "studentEmail": "raj_new_@example.com",
    "courseName": "Chemistry Fundamentals",
    "courseClass": "12",
    "subject": "Chemistry",
    "price": 4499,
    "discountedPrice": 3499,
    "status": "active",
    "progress": 0,
    "enrollmentDate": "2025-12-12T10:12:12.075Z",
    "startDate": "2025-12-12T10:12:12.143Z"
  }
}
```

---

### **Test 4: Duplicate Enrollment Prevention**

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>

{
  "courseId": "693ab05e31318b0db26d7147"
}
```

**Expected Response (400):**
```json
{
  "message": "Already enrolled in this course"
}
```

---

### **Test 5: Get All Student Enrollments**

**Request:**
```
GET http://localhost:5001/api/enrollments
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>
```

**Expected Response (200):**
```json
{
  "message": "Enrollments retrieved",
  "count": 2,
  "enrollments": [
    {
      "enrollmentId": "693bea7c6e27e3abfdc4e72b",
      "courseName": "Chemistry Fundamentals",
      "subject": "Chemistry",
      "class": "12",
      "difficulty": "advanced",
      "duration": 80,
      "status": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:12:12.075Z",
      "completionDate": null,
      "certificateIssued": false,
      "rating": null
    },
    {
      "enrollmentId": "693bea6c6e27e3abfdc4e720",
      "courseName": "Modern Physics Course",
      "subject": "Physics",
      "class": "12",
      "difficulty": "advanced",
      "duration": 100,
      "status": "active",
      "progress": 0,
      "enrollmentDate": "2025-12-12T10:11:56.221Z",
      "completionDate": null,
      "certificateIssued": false,
      "rating": null
    }
  ]
}
```

---

### **Test 6: Update Progress**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/progress
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>

{
  "progress": 45
}
```

**Expected Response (200):**
```json
{
  "message": "Progress updated",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "progress": 45,
    "status": "active",
    "completionDate": null
  }
}
```

---

### **Test 7: Rate Course**

**Request:**
```
POST http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/rate
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>

{
  "rating": 5,
  "feedback": "Excellent course! Very comprehensive."
}
```

**Expected Response (200):**
```json
{
  "message": "Rating added successfully",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "rating": 5,
    "feedback": "Excellent course! Very comprehensive."
  }
}
```

---

### **Test 8: Pause Enrollment**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/pause
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>
```

**Expected Response (200):**
```json
{
  "message": "Enrollment paused",
  "enrollment": {
    "enrollmentId": "693bea6c6e27e3abfdc4e720",
    "status": "paused"
  }
}
```

---

### **Test 9: Resume Enrollment**

**Request:**
```
PUT http://localhost:5001/api/enrollments/693bea6c6e27e3abfdc4e720/resume
Content-Type: application/json
Authorization: Bearer <YOUR_ACCESS_TOKEN_HERE>
```

**Expected Response (200):**
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

### **Test 10: Test Non-Student Cannot Enroll**

First, register a teacher account:

**Request:**
```
POST http://localhost:5001/api/auth/register-teacher
Content-Type: application/json
X-Admin-Secret-Key: espa_admin_secret_key_2025_secure

{
  "name": "Mr. Smith",
  "email": "teacher@example.com",
  "password": "password123",
  "subject": "Physics",
  "qualification": "M.Sc Physics",
  "experience": "5"
}
```

Then try to enroll:

**Request:**
```
POST http://localhost:5001/api/payments/enroll
Content-Type: application/json
Authorization: Bearer <TEACHER_TOKEN_HERE>

{
  "courseId": "693ab05e31318b0db26d7147"
}
```

**Expected Response (403):**
```json
{
  "message": "Only students can enroll in courses"
}
```

---

## 🔍 Key Field Changes

| Field Name | Old Value | New Value | Impact |
|-----------|-----------|-----------|--------|
| Enrollment Model | `userId` | `studentId` | Only students can enroll |
| Payment Model | `userId` | `studentId` | Payment linked to student |
| Unique Index | `userId_1_courseId_1` | `studentId_1_courseId_1` | Prevents duplicate enrollments |
| Query Filter | `.find({ userId })` | `.find({ studentId })` | Correct student lookup |

---

## ⚠️ Known Issues & Workarounds

### Issue: E11000 duplicate key error with userId_1_courseId_1

**Cause:** Old database index still exists from before migration

**Solution:** Drop the old index in MongoDB:

```javascript
// In mongosh or MongoDB Compass
use espa_learning;
db.enrollments.dropIndex("userId_1_courseId_1");
db.enrollments.dropIndex("userId_1");
db.enrollments.dropIndex("userId_1_status_1");
```

Then restart the server to let Mongoose recreate the correct indexes.

---

## 📊 Success Criteria

✅ New enrollments have `studentId` field (not `userId`)  
✅ Only students (role='student') can enroll  
✅ Duplicate enrollments are prevented  
✅ Each enrollment stores student name and email  
✅ Progress tracking works correctly  
✅ All CRUD operations use `studentId`

---

## 🚀 Production Checklist

- [ ] Drop old `userId` indexes from MongoDB
- [ ] Verify new `studentId` indexes are created
- [ ] Test all 10 scenarios above
- [ ] Verify database records use `studentId`
- [ ] Check student name/email in responses
- [ ] Test non-student rejection
- [ ] Commit and push changes

---

**Last Updated:** December 12, 2025  
**Migration Status:** Code Complete, Database Index Pending
