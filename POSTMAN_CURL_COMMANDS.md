# Postman CURL Commands - Your Courses Complete Flow

## 1️⃣ REGISTER STUDENT (Get Token)
```bash
curl --location 'http://localhost:5001/api/auth/register' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Demo User",
  "email": "demo'$(date +%s)'@example.com",
  "password": "Demo@123",
  "class": "12"
}'
```

**Response includes:**
- `user.id` - Student ID
- `user.email` - Student email
- `tokens.access` - Bearer token (use in next requests)

---

## 2️⃣ BROWSE COURSES (Public - No Token Needed)
```bash
curl --location 'http://localhost:5001/api/courses'
```

**Response includes:**
- `courses[0]._id` - Course ID (save for enrollment)
- `courses[0].name` - Course name

---

## 3️⃣ QUICK ENROLL IN COURSE (With Token)
```bash
curl --location --request POST 'http://localhost:5001/api/payments/enroll' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN_HERE' \
--data '{
  "courseId": "COURSE_ID_HERE"
}'
```

**Replace:**
- `YOUR_TOKEN_HERE` - Token from step 1
- `COURSE_ID_HERE` - Course ID from step 2

**Response:**
- `enrollmentId` - Enrollment ID
- `status` - "active"
- `message` - "Enrollment successful!"

---

## 4️⃣ VIEW YOUR COURSES (With Token)
```bash
curl --location 'http://localhost:5001/api/enrollments/my-courses' \
--header 'Authorization: Bearer YOUR_TOKEN_HERE'
```

**Replace:**
- `YOUR_TOKEN_HERE` - Token from step 1

**Response shows:**
- `count` - Number of enrolled courses
- `courses[]` - Array of enrolled courses with:
  - `courseName`
  - `subject`
  - `class`
  - `enrollmentStatus` (active/paused/completed)
  - `progress` (0-100)
  - Rating & feedback

---

## Complete Flow Example (All in One)

```bash
#!/bin/bash

# Step 1: Register and get token
echo "🔐 Step 1: Registering Student..."
REGISTER=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Student",
    "email": "student'$(date +%s)'@example.com",
    "password": "Test@123",
    "class": "12"
  }')

TOKEN=$(echo "$REGISTER" | jq -r '.tokens.access')
EMAIL=$(echo "$REGISTER" | jq -r '.user.email')
echo "✅ Registered: $EMAIL"
echo "Token: ${TOKEN:0:30}..."
echo ""

# Step 2: Get all courses
echo "📚 Step 2: Browsing Courses..."
COURSES=$(curl -s 'http://localhost:5001/api/courses')
COURSE_ID=$(echo "$COURSES" | jq -r '.courses[0]._id')
COURSE_NAME=$(echo "$COURSES" | jq -r '.courses[0].name')
echo "✅ Found: $COURSE_NAME"
echo ""

# Step 3: Enroll in course
echo "✅ Step 3: Quick Enrolling..."
ENROLL=$(curl -s -X POST 'http://localhost:5001/api/payments/enroll' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"courseId\": \"$COURSE_ID\"}")
echo "$(echo "$ENROLL" | jq -r '.message')"
echo ""

# Step 4: View Your Courses
echo "🎯 Step 4: Your Courses:"
curl -s 'http://localhost:5001/api/enrollments/my-courses' \
  -H "Authorization: Bearer $TOKEN" | jq '.courses[] | {name: .courseName, subject: .subject, status: .enrollmentStatus, progress}'
```

---

## Additional Operations

### Update Progress
```bash
curl --location --request PUT 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/progress' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--data '{
  "progress": 50
}'
```

### Rate Course
```bash
curl --location --request POST 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/rate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--data '{
  "rating": 5,
  "feedback": "Great course!"
}'
```

### Pause Course
```bash
curl --location --request PUT 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/pause' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

### Resume Course
```bash
curl --location --request PUT 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/resume' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

### Cancel Enrollment
```bash
curl --location --request PUT 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/cancel' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

---

## Testing in Postman

1. **Import as cURL:**
   - Open Postman → Paste → Select "Raw text" → Paste curl command

2. **Or create manually:**
   - Method: POST/GET/PUT
   - URL: http://localhost:5001/api/...
   - Headers: Add `Authorization: Bearer YOUR_TOKEN`
   - Body: Raw JSON

3. **Save in Collection:**
   - Organize into folders: Auth, Courses, Enrollment, Your Courses
   - Use environment variables for token and IDs

---

## Key Points

✅ Token is Bearer authentication
✅ Use the full token, not truncated version
✅ Token expires in 15 minutes
✅ Enrollment is instant (no payment required)
✅ Courses appear immediately in "Your Courses"
✅ All endpoints return proper JSON responses

Happy Testing! 🚀
