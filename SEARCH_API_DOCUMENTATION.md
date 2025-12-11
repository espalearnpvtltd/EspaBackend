# Course Search API Documentation

## Overview
The search API allows users to search for courses by title, subject, or description. Results are sorted by rating in descending order and returned with pagination limits.

---

## Endpoint: Search Courses

**Endpoint**: `GET /courses/search/courses`

**Authentication**: None (Public)

**Query Parameters**:
- `query` (String, Required): Search term (title, subject, or description)

**Response**: Returns matching courses sorted by average rating

---

## Request Examples

### Basic Search
```bash
curl 'http://localhost:5001/api/courses/search/courses?query=physics'
```

### Search by Subject
```bash
curl 'http://localhost:5001/api/courses/search/courses?query=mathematics'
```

### Search by Course Title
```bash
curl 'http://localhost:5001/api/courses/search/courses?query=JEE'
```

### Search by Description
```bash
curl 'http://localhost:5001/api/courses/search/courses?query=preparation'
```

---

## Response Format

### Success Response (200 OK)
```json
{
  "message": "Search results for \"physics\"",
  "count": 5,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Advanced Physics for JEE",
      "name": "Advanced Physics for JEE",
      "subject": "Physics",
      "description": "Complete physics course for JEE preparation with detailed explanations",
      "class": "12",
      "stream": "science",
      "examType": ["JEE"],
      "difficulty": "advanced",
      "price": 5999,
      "duration": 120,
      "filepath": "/courses/physics12/",
      "pictures": ["https://example.com/physics1.jpg"],
      "isRecommended": true,
      "ratings": {
        "average": 4.8,
        "count": 25,
        "reviews": []
      },
      "teacher": {
        "_id": "teacher_123",
        "name": "Dr. Rajesh Kumar",
        "email": "rajesh@example.com"
      },
      "createdAt": "2025-12-11T10:00:00.000Z",
      "updatedAt": "2025-12-11T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Physics Basics",
      "name": "Physics Basics",
      "subject": "Physics",
      "description": "Fundamental physics concepts for class 11",
      "class": "11",
      "stream": "science",
      "examType": ["BOARDS"],
      "difficulty": "beginner",
      "price": 2999,
      "duration": 60,
      "ratings": {
        "average": 4.5,
        "count": 15,
        "reviews": []
      },
      "teacher": {
        "_id": "teacher_456",
        "name": "Ms. Priya Singh",
        "email": "priya@example.com"
      }
    }
  ]
}
```

### No Results
```json
{
  "message": "Search results for \"xyz\"",
  "count": 0,
  "courses": []
}
```

### Error - Missing Query Parameter
```json
{
  "message": "Search query is required"
}
```

---

## Search Behavior

### Case-Insensitive
Searches are case-insensitive:
- `physics` = `Physics` = `PHYSICS`

### Partial Match
Searches match partial strings:
- Query: `phys` → Returns "Physics", "Physics Basics", etc.
- Query: `JEE` → Returns "JEE Advanced", "JEE Preparation", etc.

### Multi-Field Search
Searches across multiple fields:
1. **Title** - Course title/name
2. **Subject** - Subject field (Physics, Chemistry, etc.)
3. **Description** - Course description

### Sorting
Results are sorted by:
1. **Average Rating** (descending) - Highest rated courses first
2. Limited to **20 courses** per search

---

## cURL Examples

### Search for Physics Courses
```bash
curl -X GET 'http://localhost:5001/api/courses/search/courses?query=physics' \
  -H 'Content-Type: application/json'
```

### Search for NEET Courses
```bash
curl -X GET 'http://localhost:5001/api/courses/search/courses?query=NEET'
```

### Search for Biology Courses
```bash
curl -X GET 'http://localhost:5001/api/courses/search/courses?query=biology'
```

### Search for Exam Prep
```bash
curl -X GET 'http://localhost:5001/api/courses/search/courses?query=exam+preparation'
```

---

## Frontend Implementation

### React Hook Example
```javascript
import { useState } from 'react';

export function CourseSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/search/courses?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setResults(data.courses);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}
      <div className="search-results">
        {results.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.subject}</p>
            <p>⭐ {course.ratings.average} ({course.ratings.count} reviews)</p>
            <p className="price">₹{course.price}</p>
            <button onClick={() => navigateToCourse(course._id)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Vue.js Example
```vue
<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search courses..."
      v-model="searchQuery"
      @input="performSearch"
      class="search-input"
    />
    
    <div v-if="loading" class="loading">Searching...</div>
    
    <div v-else class="results-count">
      Found {{ results.length }} course(s)
    </div>

    <div class="search-results">
      <div v-for="course in results" :key="course._id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p class="subject">{{ course.subject }}</p>
        <p class="rating">⭐ {{ course.ratings.average }} ({{ course.ratings.count }} reviews)</p>
        <p class="price">₹{{ course.price }}</p>
        <button @click="viewCourse(course._id)" class="btn-view">View Course</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      results: [],
      loading: false
    };
  },
  methods: {
    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.results = [];
        return;
      }

      this.loading = true;
      try {
        const response = await fetch(
          `http://localhost:5001/api/courses/search/courses?query=${encodeURIComponent(this.searchQuery)}`
        );
        const data = await response.json();
        this.results = data.courses;
      } catch (error) {
        console.error('Search error:', error);
        this.results = [];
      } finally {
        this.loading = false;
      }
    },
    viewCourse(courseId) {
      this.$router.push(`/course/${courseId}`);
    }
  }
};
</script>

<style scoped>
.search-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.results-count {
  color: #666;
  margin-bottom: 20px;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.course-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
}

.course-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.subject {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.rating {
  color: #f39c12;
  margin: 5px 0;
}

.price {
  font-weight: bold;
  color: #27ae60;
  font-size: 18px;
  margin: 10px 0;
}

.btn-view {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-view:hover {
  background: #0056b3;
}
</style>
```

---

## Real-Time Search Tips

For best user experience with real-time search:

### Debounce Searches
```javascript
// Use lodash debounce or implement custom
const debouncedSearch = debounce(performSearch, 300);
```

### Add Minimum Query Length
```javascript
if (searchQuery.length < 2) {
  setResults([]);
  return;
}
```

### Show Loading State
```javascript
{loading && <Spinner />}
```

### Display Result Count
```javascript
<p>Found {results.length} courses</p>
```

---

## Performance Notes

- Searches are limited to **20 results** per query
- Results are sorted by rating for relevance
- Works on title, subject, and description fields
- Case-insensitive regex matching
- Indexed fields for faster performance

---

## API Summary

| Property | Value |
|----------|-------|
| **Endpoint** | `GET /courses/search/courses` |
| **Authentication** | None (Public) |
| **Query Parameter** | `query` (required) |
| **Response Limit** | 20 courses |
| **Sorting** | By average rating (descending) |
| **Search Fields** | title, subject, description |
| **Case Sensitivity** | Case-insensitive |
| **Status Code** | 200 (success), 400 (missing query) |

---

## Usage Workflow

1. **User types** in search input field
2. **Frontend sends** query parameter
3. **Backend searches** across multiple fields
4. **Results displayed** sorted by rating
5. **User clicks** on course card to view details
