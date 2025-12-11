# Dynamic Recommended Categories API

## Overview
When a student logs in, their JWT token contains their class (e.g., "11", "12"). Based on this class, the frontend automatically shows different course categories tailored to their educational level and exam preferences.

---

## Endpoint: Get Recommended Categories

**Endpoint**: `GET /courses/recommended/categories`

**Authentication**: Bearer Token (Student JWT)

**Headers**:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Description**: 
Returns dynamic course categories based on the student's class extracted from the JWT token. No query parameters needed - it's fully automatic!

---

## Response Format by Class

### Class 10 Response
```json
{
  "message": "Recommended courses for class 10",
  "studentClass": "10",
  "categories": {
    "Science": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Basic Physics",
        "subject": "Physics",
        "stream": "science",
        "class": "10",
        "ratings": { "average": 4.5, "count": 20 }
      }
    ],
    "Commerce": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Business Studies",
        "subject": "Business",
        "stream": "commerce",
        "class": "10",
        "ratings": { "average": 4.3, "count": 15 }
      }
    ],
    "Arts": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Indian History",
        "subject": "History",
        "stream": "arts",
        "class": "10",
        "ratings": { "average": 4.6, "count": 25 }
      }
    ]
  }
}
```

### Class 11 Response
```json
{
  "message": "Recommended courses for class 11",
  "studentClass": "11",
  "categories": {
    "Science": [
      { /* General science courses */ }
    ],
    "Medical": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "title": "NEET Biology Masterclass",
        "subject": "Biology",
        "stream": "science",
        "examType": ["NEET"],
        "class": "11",
        "ratings": { "average": 4.7, "count": 30 }
      }
    ],
    "Non-Medical": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "title": "JEE Physics Preparation",
        "subject": "Physics",
        "stream": "science",
        "examType": ["JEE"],
        "difficulty": "advanced",
        "class": "11",
        "ratings": { "average": 4.8, "count": 45 }
      }
    ],
    "Commerce": [
      { /* Commerce courses */ }
    ],
    "Arts": [
      { /* Arts courses */ }
    ]
  }
}
```

### Class 12 Response (Full Categories)
```json
{
  "message": "Recommended courses for class 12",
  "studentClass": "12",
  "categories": {
    "Science": [
      {
        "_id": "507f1f77bcf86cd799439016",
        "title": "Advanced Physics",
        "subject": "Physics",
        "stream": "science",
        "class": "12",
        "ratings": { "average": 4.6, "count": 50 }
      }
    ],
    "Medical": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "title": "Complete NEET Preparation",
        "subject": "Biology",
        "stream": "science",
        "examType": ["NEET"],
        "difficulty": "advanced",
        "class": "12",
        "ratings": { "average": 4.9, "count": 80 }
      }
    ],
    "Non-Medical": [
      {
        "_id": "507f1f77bcf86cd799439018",
        "title": "JEE Advanced Mathematics",
        "subject": "Mathematics",
        "stream": "science",
        "examType": ["JEE"],
        "difficulty": "advanced",
        "class": "12",
        "ratings": { "average": 4.8, "count": 70 }
      }
    ],
    "Commerce": [
      {
        "_id": "507f1f77bcf86cd799439019",
        "title": "Accounts & Finance",
        "subject": "Accounting",
        "stream": "commerce",
        "class": "12",
        "ratings": { "average": 4.4, "count": 35 }
      }
    ],
    "Arts": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "title": "Political Science",
        "subject": "Political Science",
        "stream": "arts",
        "class": "12",
        "ratings": { "average": 4.5, "count": 40 }
      }
    ],
    "UPSC/Polity": [
      {
        "_id": "507f1f77bcf86cd799439021",
        "title": "Indian Polity Masterclass",
        "subject": "Political Science",
        "stream": "arts",
        "examType": ["UPSC"],
        "difficulty": "advanced",
        "class": "12",
        "ratings": { "average": 4.9, "count": 100 }
      }
    ],
    "Engineering": [
      {
        "_id": "507f1f77bcf86cd799439022",
        "title": "GATE Preparation Course",
        "subject": "Engineering",
        "examType": ["GATE"],
        "difficulty": "advanced",
        "class": "12",
        "ratings": { "average": 4.7, "count": 60 }
      }
    ]
  }
}
```

---

## Category Mapping

### Class 10
| Category | Filter | Description |
|----------|--------|-------------|
| Science | stream: science | General science courses |
| Commerce | stream: commerce | Commerce stream courses |
| Arts | stream: arts | Arts stream courses |

### Class 11
| Category | Filter | Description |
|----------|--------|-------------|
| Science | stream: science | General science courses |
| Medical | stream: science + examType: NEET | NEET-focused medical courses |
| Non-Medical | stream: science + examType: JEE | JEE-focused engineering courses |
| Commerce | stream: commerce | Commerce stream courses |
| Arts | stream: arts | Arts stream courses |

### Class 12
| Category | Filter | Description |
|----------|--------|-------------|
| Science | stream: science | General science courses |
| Medical | stream: science + examType: NEET | NEET-focused medical courses |
| Non-Medical | stream: science + examType: JEE | JEE-focused engineering courses |
| Commerce | stream: commerce | Commerce stream courses |
| Arts | stream: arts | Arts stream courses |
| UPSC/Polity | stream: arts + examType: UPSC | UPSC Civil services prep |
| Engineering | examType: GATE | GATE preparation courses |

---

## cURL Examples

### Get Recommended Categories (Class 12)
```bash
curl -X GET 'http://localhost:5001/api/courses/recommended/categories' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### Example with Real Token
```bash
# First, login to get token
curl -X POST 'http://localhost:5001/api/students/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "student@example.com",
    "password": "Password@123"
  }'

# Copy the access token from response, then use it:
curl -X GET 'http://localhost:5001/api/courses/recommended/categories' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

---

## Frontend Implementation

### React Example
```javascript
import { useEffect, useState } from 'react';

export default function RecommendedCourses() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken'); // Get from login response

  useEffect(() => {
    fetch('http://localhost:5001/api/courses/recommended/categories', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Recommended Courses</h1>
      {Object.entries(categories).map(([categoryName, courses]) => (
        <div key={categoryName}>
          <h2>{categoryName}</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.subject}</p>
                <p>⭐ {course.ratings.average} ({course.ratings.count} reviews)</p>
                <button>View Course</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Vue.js Example
```vue
<template>
  <div>
    <h1>Recommended Courses</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(courses, categoryName) in categories" :key="categoryName">
        <h2>{{ categoryName }}</h2>
        <div class="courses-grid">
          <div v-for="course in courses" :key="course._id" class="course-card">
            <h3>{{ course.title }}</h3>
            <p>{{ course.subject }}</p>
            <p>⭐ {{ course.ratings.average }} ({{ course.ratings.count }} reviews)</p>
            <button @click="viewCourse(course._id)">View Course</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: {},
      loading: true
    };
  },
  mounted() {
    const token = localStorage.getItem('accessToken');
    fetch('http://localhost:5001/api/courses/recommended/categories', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        this.categories = data.categories;
        this.loading = false;
      });
  },
  methods: {
    viewCourse(courseId) {
      this.$router.push(`/course/${courseId}`);
    }
  }
};
</script>
```

---

## Features

✅ **Automatic Class Detection** - No query parameters needed  
✅ **Dynamic Categories** - Different categories for each class level  
✅ **Personalized** - Based on student's JWT token class  
✅ **Sorted by Rating** - Top courses appear first  
✅ **Exam-Aware** - Distinguishes Medical (NEET) from Non-Medical (JEE)  
✅ **Comprehensive** - Includes Civil services, Engineering, and more for class 12  

---

## Error Responses

### Missing Token
```json
{
  "message": "Unauthorized",
  "error": "Invalid or missing token"
}
```

### No Class in Token
```json
{
  "message": "Student class not found in token"
}
```

### Server Error
```json
{
  "message": "Server Error"
}
```

---

## Summary

| Item | Details |
|------|---------|
| **Endpoint** | `GET /courses/recommended/categories` |
| **Authentication** | Bearer Token (JWT) |
| **Parameters** | None (auto from token) |
| **Response** | Dynamic categories by class |
| **Class 10** | Science, Commerce, Arts |
| **Class 11** | +Medical, +Non-Medical |
| **Class 12** | +UPSC/Polity, +Engineering |
| **Sorting** | By average rating (descending) |
| **Limit** | 10 courses per category |
