# Postman CURL Examples - EspaBackend Course Management API

## Base URL
```
http://localhost:5001/api
```

---

## 1. USER REGISTRATION - All Classes (Nursery to 12)

### Register Nursery Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Nursery Student",
    "email": "nursery'$(date +%s)'@example.com",
    "password": "password123",
    "class": "Nursery"
  }' | jq .
```

### Register LKG Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "LKG Student",
    "email": "lkg'$(date +%s)'@example.com",
    "password": "password123",
    "class": "LKG"
  }' | jq .
```

### Register UKG Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "UKG Student",
    "email": "ukg'$(date +%s)'@example.com",
    "password": "password123",
    "class": "UKG"
  }' | jq .
```

### Register Class 1 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 1 Student",
    "email": "class1'$(date +%s)'@example.com",
    "password": "password123",
    "class": "1"
  }' | jq .
```

### Register Class 2 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 2 Student",
    "email": "class2'$(date +%s)'@example.com",
    "password": "password123",
    "class": "2"
  }' | jq .
```

### Register Class 3 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 3 Student",
    "email": "class3'$(date +%s)'@example.com",
    "password": "password123",
    "class": "3"
  }' | jq .
```

### Register Class 4 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 4 Student",
    "email": "class4'$(date +%s)'@example.com",
    "password": "password123",
    "class": "4"
  }' | jq .
```

### Register Class 5 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 5 Student",
    "email": "class5'$(date +%s)'@example.com",
    "password": "password123",
    "class": "5"
  }' | jq .
```

### Register Class 6 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 6 Student",
    "email": "class6'$(date +%s)'@example.com",
    "password": "password123",
    "class": "6"
  }' | jq .
```

### Register Class 7 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 7 Student",
    "email": "class7'$(date +%s)'@example.com",
    "password": "password123",
    "class": "7"
  }' | jq .
```

### Register Class 8 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 8 Student",
    "email": "class8'$(date +%s)'@example.com",
    "password": "password123",
    "class": "8"
  }' | jq .
```

### Register Class 9 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 9 Student",
    "email": "class9'$(date +%s)'@example.com",
    "password": "password123",
    "class": "9"
  }' | jq .
```

### Register Class 10 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 10 Student",
    "email": "class10'$(date +%s)'@example.com",
    "password": "password123",
    "class": "10"
  }' | jq .
```

### Register Class 11 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 11 Student",
    "email": "class11'$(date +%s)'@example.com",
    "password": "password123",
    "class": "11"
  }' | jq .
```

### Register Class 12 Student
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 12 Student",
    "email": "class12'$(date +%s)'@example.com",
    "password": "password123",
    "class": "12"
  }' | jq .
```

---

## 2. GET RECOMMENDED COURSES BY CLASS (Token-Based)

### Nursery Student - Get All Courses
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Nursery Test",
    "email": "nursery'$(date +%s)'@example.com",
    "password": "password123",
    "class": "Nursery"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### LKG Student - Get All Courses
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "LKG Test",
    "email": "lkg'$(date +%s)'@example.com",
    "password": "password123",
    "class": "LKG"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Class 1 Student - Get All Courses
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 1 Test",
    "email": "class1test'$(date +%s)'@example.com",
    "password": "password123",
    "class": "1"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Class 5 Student - Get All Courses
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 5 Test",
    "email": "class5test'$(date +%s)'@example.com",
    "password": "password123",
    "class": "5"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Class 10 Student - Get All Courses
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 10 Test",
    "email": "class10test'$(date +%s)'@example.com",
    "password": "password123",
    "class": "10"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

---

## 3. SEARCH COURSES BY CLASS (Public API)

### Search Nursery Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=Nursery' | jq .
```

### Search LKG Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=LKG' | jq .
```

### Search Class 1 Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=1' | jq .
```

### Search Class 5 Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=5' | jq .
```

### Search Class 9 Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=9' | jq .
```

---

## 4. CREATE COURSES FOR DIFFERENT CLASSES

### Create Nursery Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Alphabets and Counting",
    "description": "Learn A-Z and numbers 1-10",
    "subject": "Basic Learning",
    "class": "Nursery",
    "difficulty": "beginner",
    "price": 999,
    "discountedPrice": 799,
    "duration": 30,
    "isRecommended": true
  }' | jq .
```

### Create LKG Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Phonics and Word Building",
    "description": "Learn phonics and build simple words",
    "subject": "English",
    "class": "LKG",
    "difficulty": "beginner",
    "price": 1299,
    "discountedPrice": 999,
    "duration": 40,
    "isRecommended": true
  }' | jq .
```

### Create UKG Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Basic Mathematics",
    "description": "Numbers, addition, and subtraction basics",
    "subject": "Mathematics",
    "class": "UKG",
    "difficulty": "beginner",
    "price": 1499,
    "discountedPrice": 1199,
    "duration": 50,
    "isRecommended": true
  }' | jq .
```

### Create Class 1 Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Reading and Writing",
    "description": "Reading comprehension and handwriting",
    "subject": "English",
    "class": "1",
    "difficulty": "beginner",
    "price": 1999,
    "discountedPrice": 1599,
    "duration": 60,
    "isRecommended": true
  }' | jq .
```

### Create Class 3 Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Multiplication Tables",
    "description": "Learn multiplication tables 1-10",
    "subject": "Mathematics",
    "class": "3",
    "difficulty": "intermediate",
    "price": 1799,
    "discountedPrice": 1399,
    "duration": 45,
    "isRecommended": true
  }' | jq .
```

### Create Class 5 Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Fractions and Decimals",
    "description": "Understanding fractions and decimal numbers",
    "subject": "Mathematics",
    "class": "5",
    "difficulty": "intermediate",
    "price": 2299,
    "discountedPrice": 1899,
    "duration": 75,
    "isRecommended": true
  }' | jq .
```

### Create Class 7 Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Algebra Basics",
    "description": "Introduction to algebraic equations",
    "subject": "Mathematics",
    "class": "7",
    "difficulty": "intermediate",
    "price": 2699,
    "discountedPrice": 2099,
    "duration": 90,
    "isRecommended": true
  }' | jq .
```

### Create Class 9 Course
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "name": "Science Fundamentals",
    "description": "Physics, Chemistry, and Biology basics",
    "subject": "Science",
    "class": "9",
    "difficulty": "intermediate",
    "price": 3299,
    "discountedPrice": 2599,
    "duration": 120,
    "isRecommended": true
  }' | jq .
```

---

## 5. PUBLIC SEARCH COURSES API

### Search All Physics Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=physics' | jq .
```

### Search All Mathematics Courses
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=mathematics' | jq .
```

### Search Courses with "Fundamentals" in Name
```bash
curl -s 'http://localhost:5001/api/courses/search/courses?query=fundamentals' | jq .
```

---

## 6. COMBINED SEARCH - CLASS + QUERY (Token-Based)

### Class 5 Student Search "Mathematics"
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 5 Math",
    "email": "class5math'$(date +%s)'@example.com",
    "password": "password123",
    "class": "5"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class?search=mathematics' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Class 9 Student Search "Science"
```bash
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 9 Science",
    "email": "class9science'$(date +%s)'@example.com",
    "password": "password123",
    "class": "9"
  }') && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class?search=science' \
  -H "Authorization: Bearer $TOKEN" | jq .
```

---

## 7. COMPLETE TEST FLOW FOR ANY CLASS

### Full Test: Register → Get Courses → Search
```bash
echo "=== Step 1: Register Class 6 Student ===" && \
RESPONSE=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 6 Complete Test",
    "email": "class6complete'$(date +%s)'@example.com",
    "password": "password123",
    "class": "6"
  }') && \
echo "$RESPONSE" | jq '{message: .message, class: .user.class, token: .tokens.access}' && \
TOKEN=$(echo "$RESPONSE" | jq -r '.tokens.access') && \
echo "" && \
echo "=== Step 2: Get All Class 6 Courses ===" && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class' \
  -H "Authorization: Bearer $TOKEN" | jq '{count: .count, studentClass: .studentClass, courses: [.courses[] | {name, subject}]}' && \
echo "" && \
echo "=== Step 3: Search for Mathematics in Class 6 ===" && \
curl -s -X GET 'http://localhost:5001/api/courses/recommended/by-class?search=mathematics' \
  -H "Authorization: Bearer $TOKEN" | jq '{count: .count, courses: [.courses[] | {name, subject}]}'
```

---

## NOTES FOR POSTMAN

1. **Replace `$(date +%s)` with current timestamp** if not using bash
2. **Base URL:** http://localhost:5001/api
3. **Admin Secret Key:** x-admin-secret-key: espa_admin_secret_key_2025_secure
4. **Auth Header:** Authorization: Bearer {TOKEN}
5. **Content-Type:** application/json

## AVAILABLE CLASSES
- Nursery, LKG, UKG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
