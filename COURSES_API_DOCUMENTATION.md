# EspaBackend - Courses API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication
- **Bearer Token**: Required for student endpoints
- **Admin Secret Key**: Required for admin operations
- Token obtained from: `POST /students/login` or `POST /users/login`

---

## 1. COURSE MANAGEMENT

### Create Course
**Endpoint**: `POST /courses`

**Authentication**: Admin Secret Key (x-admin-secret-key header)

**Headers**:
```
Content-Type: application/json
x-admin-secret-key: espa_admin_secret_key_2025_secure
```

**Request Body**:
```json
{
  "title": "Advanced Physics for JEE",
  "description": "Complete physics course for JEE preparation",
  "subject": "Physics",
  "class": "12",
  "stream": "science",
  "examType": ["JEE"],
  "difficulty": "advanced",
  "price": 5999,
  "duration": 120,
  "teacherId": "teacher_123",
  "pictures": ["https://example.com/physics1.jpg", "https://example.com/physics2.jpg"],
  "filepath": "/courses/physics12/",
  "isRecommended": true
}
```

**Field Descriptions**:
- `title` (String, Required): Course name
- `description` (String): Course details
- `subject` (String, Required): Subject name (Physics, Chemistry, Biology, etc.)
- `class` (String, Required): Class level (10, 11, 12)
- `stream` (String, Enum): `science`, `commerce`, `arts`, or `general`
- `examType` (Array, Required): `JEE`, `NEET`, `UPSC`, `BOARDS`, `GATE`, `CAT`
- `difficulty` (String, Enum): `beginner`, `intermediate`, `advanced`
- `price` (Number): Course price in INR
- `duration` (Number): Duration in hours
- `teacherId` (String): ID of the teacher
- `pictures` (Array): Array of image URLs
- `filepath` (String): File storage path
- `isRecommended` (Boolean): Flag for recommended courses

**Response** (201 Created):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Advanced Physics for JEE",
  "description": "Complete physics course for JEE preparation",
  "subject": "Physics",
  "class": "12",
  "stream": "science",
  "examType": ["JEE"],
  "difficulty": "advanced",
  "price": 5999,
  "duration": 120,
  "teacherId": "teacher_123",
  "pictures": ["https://example.com/physics1.jpg"],
  "filepath": "/courses/physics12/",
  "isRecommended": true,
  "ratings": {
    "average": 0,
    "count": 0,
    "reviews": []
  },
  "createdAt": "2025-12-11T10:00:00.000Z",
  "updatedAt": "2025-12-11T10:00:00.000Z"
}
```

**cURL Example**:
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Advanced Physics for JEE",
    "description": "Complete physics course for JEE preparation",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "duration": 120,
    "teacherId": "teacher_123",
    "pictures": ["https://example.com/physics1.jpg"],
    "filepath": "/courses/physics12/",
    "isRecommended": true
  }'
```

---

### Get All Courses
**Endpoint**: `GET /courses`

**Authentication**: None (Public)

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Advanced Physics for JEE",
    "description": "Complete physics course for JEE preparation",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "duration": 120,
    "teacherId": "teacher_123",
    "pictures": ["https://example.com/physics1.jpg"],
    "filepath": "/courses/physics12/",
    "isRecommended": true,
    "ratings": {
      "average": 4.5,
      "count": 10,
      "reviews": []
    }
  }
]
```

**cURL Example**:
```bash
curl -X GET 'http://localhost:5001/api/courses'
```

---

### Get Course by ID
**Endpoint**: `GET /courses/:id`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**URL Parameters**:
- `id` (String): Course ID

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Advanced Physics for JEE",
  "description": "Complete physics course for JEE preparation",
  "subject": "Physics",
  "class": "12",
  "stream": "science",
  "examType": ["JEE"],
  "difficulty": "advanced",
  "price": 5999,
  "duration": 120,
  "teacherId": "teacher_123",
  "pictures": ["https://example.com/physics1.jpg"],
  "filepath": "/courses/physics12/",
  "isRecommended": true,
  "ratings": {
    "average": 4.5,
    "count": 10,
    "reviews": []
  }
}
```

**cURL Example**:
```bash
curl -X GET 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

### Update Course
**Endpoint**: `PUT /courses/:id`

**Authentication**: Admin Secret Key

**Headers**:
```
Content-Type: application/json
x-admin-secret-key: espa_admin_secret_key_2025_secure
```

**Request Body** (Partial update):
```json
{
  "title": "Updated Course Title",
  "price": 6999,
  "duration": 150
}
```

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Course Title",
  "price": 6999,
  "duration": 150
}
```

**cURL Example**:
```bash
curl -X PUT 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Updated Course Title",
    "price": 6999,
    "duration": 150
  }'
```

---

### Delete Course
**Endpoint**: `DELETE /courses/:id`

**Authentication**: Admin Secret Key

**Headers**:
```
x-admin-secret-key: espa_admin_secret_key_2025_secure
```

**URL Parameters**:
- `id` (String): Course ID

**Response** (200 OK):
```json
{
  "message": "Course deleted successfully"
}
```

**cURL Example**:
```bash
curl -X DELETE 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure'
```

---

## 2. RECOMMENDED COURSES

### Get Recommended Courses by Class
**Endpoint**: `GET /courses/recommended/by-class`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Description**: 
Automatically extracts the student's class from the JWT token and returns all recommended courses (`isRecommended: true`) for that class.

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Advanced Physics for JEE",
    "description": "Complete physics course for JEE preparation",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "duration": 120,
    "teacherId": "teacher_123",
    "pictures": ["https://example.com/physics1.jpg"],
    "filepath": "/courses/physics12/",
    "isRecommended": true,
    "ratings": {
      "average": 4.8,
      "count": 25,
      "reviews": []
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "NEET Biology Masterclass",
    "class": "12",
    "stream": "science",
    "examType": ["NEET"],
    "difficulty": "advanced",
    "isRecommended": true,
    "ratings": {
      "average": 4.6,
      "count": 18,
      "reviews": []
    }
  }
]
```

**cURL Example**:
```bash
curl -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

**Note**: The class is automatically extracted from the JWT token. No query parameters needed.

---

### Get Courses by Stream
**Endpoint**: `GET /courses/stream/:stream`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**URL Parameters**:
- `stream` (String): `science`, `commerce`, `arts`, or `general`

**Query Parameters** (Optional):
- `class` (String): Filter by class (10, 11, 12)

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Physics for Science Stream",
    "stream": "science",
    "class": "12",
    "ratings": {
      "average": 4.5,
      "count": 10
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Chemistry for Science Stream",
    "stream": "science",
    "class": "12",
    "ratings": {
      "average": 4.7,
      "count": 15
    }
  }
]
```

**cURL Examples**:
```bash
# Get all science stream courses
curl -X GET 'http://localhost:5001/api/courses/stream/science' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'

# Get science stream courses for class 12
curl -X GET 'http://localhost:5001/api/courses/stream/science?class=12' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

### Get Courses by Exam Type
**Endpoint**: `GET /courses/exam/:exam`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**URL Parameters**:
- `exam` (String): `JEE`, `NEET`, `UPSC`, `BOARDS`, `GATE`, or `CAT`

**Query Parameters** (Optional):
- `class` (String): Filter by class (10, 11, 12)

**Response** (200 OK):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Advanced Physics for JEE",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "ratings": {
      "average": 4.8,
      "count": 25
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "JEE Chemistry Masterclass",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 6499,
    "ratings": {
      "average": 4.6,
      "count": 18
    }
  }
]
```

**cURL Examples**:
```bash
# Get all JEE courses
curl -X GET 'http://localhost:5001/api/courses/exam/JEE' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'

# Get NEET courses for class 12
curl -X GET 'http://localhost:5001/api/courses/exam/NEET?class=12' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

### Filter Courses (Advanced)
**Endpoint**: `GET /courses/filter/all`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Query Parameters** (All Optional):
- `class` (String): `10`, `11`, `12`
- `stream` (String): `science`, `commerce`, `arts`, `general`
- `exam` (String): `JEE`, `NEET`, `UPSC`, `BOARDS`, `GATE`, `CAT`
- `difficulty` (String): `beginner`, `intermediate`, `advanced`

**Response** (200 OK - Sorted by Rating):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Advanced Physics for JEE",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "ratings": {
      "average": 4.8,
      "count": 25
    }
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "JEE Chemistry Masterclass",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 6499,
    "ratings": {
      "average": 4.6,
      "count": 18
    }
  }
]
```

**cURL Examples**:
```bash
# Get class 12 science stream JEE courses
curl -X GET 'http://localhost:5001/api/courses/filter/all?class=12&stream=science&exam=JEE' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'

# Get all advanced difficulty courses
curl -X GET 'http://localhost:5001/api/courses/filter/all?difficulty=advanced' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'

# Complex filter: class 11, commerce, beginner level
curl -X GET 'http://localhost:5001/api/courses/filter/all?class=11&stream=commerce&difficulty=beginner' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## 3. COURSE RATINGS

### Add Course Rating
**Endpoint**: `POST /courses/:id/rating`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**URL Parameters**:
- `id` (String): Course ID

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Excellent course, very well explained!"
}
```

**Field Descriptions**:
- `rating` (Number, Required): Rating from 1 to 5
- `comment` (String): Optional review comment

**Response** (201 Created):
```json
{
  "message": "Rating added successfully",
  "course": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Advanced Physics for JEE",
    "ratings": {
      "average": 4.7,
      "count": 11,
      "reviews": [
        {
          "_id": "507f1f77bcf86cd799439099",
          "studentId": "507f1f77bcf86cd799439050",
          "rating": 5,
          "comment": "Excellent course, very well explained!",
          "createdAt": "2025-12-11T10:30:00.000Z"
        }
      ]
    }
  }
}
```

**cURL Example**:
```bash
curl -X POST 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011/rating' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -d '{
    "rating": 5,
    "comment": "Excellent course, very well explained!"
  }'
```

---

### Get Course with Ratings Details
**Endpoint**: `GET /courses/:id/details`

**Authentication**: Bearer Token (Student)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**URL Parameters**:
- `id` (String): Course ID

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Advanced Physics for JEE",
  "description": "Complete physics course for JEE preparation",
  "subject": "Physics",
  "class": "12",
  "stream": "science",
  "examType": ["JEE"],
  "difficulty": "advanced",
  "price": 5999,
  "duration": 120,
  "teacher": {
    "_id": "teacher_123",
    "name": "Dr. Rajesh Kumar"
  },
  "pictures": ["https://example.com/physics1.jpg"],
  "filepath": "/courses/physics12/",
  "isRecommended": true,
  "ratings": {
    "average": 4.7,
    "count": 11,
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439099",
        "studentId": "507f1f77bcf86cd799439050",
        "rating": 5,
        "comment": "Excellent course, very well explained!",
        "createdAt": "2025-12-11T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439098",
        "studentId": "507f1f77bcf86cd799439051",
        "rating": 4,
        "comment": "Good content, could have more examples",
        "createdAt": "2025-12-11T09:45:00.000Z"
      }
    ]
  },
  "createdAt": "2025-12-11T10:00:00.000Z",
  "updatedAt": "2025-12-11T10:30:00.000Z"
}
```

**cURL Example**:
```bash
curl -X GET 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011/details' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Bad request",
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "error": "Invalid or missing token"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden",
  "error": "Invalid admin secret key"
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Quick Start

### 1. Login Student
```bash
curl -X POST 'http://localhost:5001/api/students/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "student@example.com",
    "password": "Password@123"
  }'
```
Copy the `tokens.access` value from response.

### 2. Get Recommended Courses
```bash
curl -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### 3. Rate a Course
```bash
curl -X POST 'http://localhost:5001/api/courses/COURSE_ID/rating' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -d '{
    "rating": 5,
    "comment": "Great course!"
  }'
```

### 4. Filter Courses
```bash
curl -X GET 'http://localhost:5001/api/courses/filter/all?class=12&stream=science&exam=JEE' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## Summary

| Operation | Endpoint | Method | Auth | Description |
|-----------|----------|--------|------|-------------|
| Create Course | `/courses` | POST | Admin Secret | Create new course |
| Get All Courses | `/courses` | GET | None | List all courses |
| Get Course by ID | `/courses/:id` | GET | Bearer | Get single course |
| Update Course | `/courses/:id` | PUT | Admin Secret | Update course details |
| Delete Course | `/courses/:id` | DELETE | Admin Secret | Delete course |
| Recommended Courses | `/courses/recommended/by-class` | GET | Bearer | Get recommended for student's class |
| By Stream | `/courses/stream/:stream` | GET | Bearer | Filter by stream |
| By Exam Type | `/courses/exam/:exam` | GET | Bearer | Filter by exam |
| Filter Advanced | `/courses/filter/all` | GET | Bearer | Complex filtering |
| Add Rating | `/courses/:id/rating` | POST | Bearer | Add student review |
| Get with Ratings | `/courses/:id/details` | GET | Bearer | Get course with all reviews |
