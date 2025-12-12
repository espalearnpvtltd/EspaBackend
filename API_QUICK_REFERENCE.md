# 🎯 EspaBackend API - Quick Reference Card

## 📍 Base URL
```
http://localhost:5001/api
```

---

## 🔐 Authentication Endpoints

| Method | Endpoint | Purpose | Body |
|--------|----------|---------|------|
| POST | `/auth/register` | Create new student account | `{name, email, password, class}` |
| POST | `/auth/login` | Login with credentials | `{email, password}` |

**Classes Available:**
`Nursery, LKG, UKG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12`

**Response includes:** `tokens.access` (save this for other endpoints)

---

## 📚 Course Endpoints

| Method | Endpoint | Auth | Query Params |
|--------|----------|------|--------------|
| GET | `/courses` | No | - |
| GET | `/courses/search/courses` | No | `?query=physics` |
| GET | `/courses/recommended/by-class` | **Yes** | `?search=math` |

**Search Examples:**
- `/courses/search/courses?query=physics` → Find physics courses
- `/courses/search/courses?query=class 5` → Find Class 5 courses
- `/courses/recommended/by-class?search=mathematics` → Recommended + search

---

## 💳 Payment Flow (2 Steps)

### Step 1: Create Order
```
POST /payments/order
Headers: Authorization: Bearer TOKEN
Body: {courseId: "ID_FROM_COURSES"}
Response: orderId, amount
```

### Step 2: Verify & Enroll
```
POST /payments/verify
Headers: Authorization: Bearer TOKEN
Body: {
  orderId: "ID_FROM_STEP1",
  transactionId: "TXN_1234567890",
  paymentMethod: "upi"
}
Response: enrollmentId
```

**Payment Methods:**
`upi, credit_card, debit_card, net_banking, wallet, other`

---

## 🎓 Enrollment Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/enrollments` | List all your courses |
| GET | `/enrollments/:id` | Get course details |
| PUT | `/enrollments/:id/progress` | Update progress (0-100) |
| POST | `/enrollments/:id/rate` | Rate course (1-5 stars) |
| PUT | `/enrollments/:id/pause` | Pause course |
| PUT | `/enrollments/:id/resume` | Resume paused course |
| PUT | `/enrollments/:id/cancel` | Cancel enrollment |

---

## 💰 Payment History

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/payments/history` | View all your payments |
| POST | `/payments/:orderId/refund` | Refund payment |

---

## 🔑 Headers

### Public Endpoints (No Auth)
```
Content-Type: application/json
```

### Protected Endpoints (Need Token)
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

### Admin Endpoints (Create Courses)
```
Content-Type: application/json
x-secret-key: espa_admin_secret_key_2025_secure
```

---

## 📊 Request/Response Examples

### Register Student
**Request:**
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Pass123",
  "class": "5"
}
```

**Response:**
```json
{
  "tokens": {
    "access": "eyJhbGc...",
    "refresh": "eyJhbGc..."
  },
  "user": {
    "id": "693bc5d77...",
    "name": "John Doe",
    "class": "5"
  }
}
```

---

### Create Payment Order
**Request:**
```json
POST /payments/order
Authorization: Bearer TOKEN
{
  "courseId": "693ab05e31318b0db26d7147"
}
```

**Response:**
```json
{
  "payment": {
    "orderId": "ORD_1765524953945_f985b83a",
    "amount": 2999,
    "courseName": "Physics Course",
    "discount": 1000
  }
}
```

---

### Verify Payment
**Request:**
```json
POST /payments/verify
Authorization: Bearer TOKEN
{
  "orderId": "ORD_1765524953945_f985b83a",
  "transactionId": "TXN_1765524960123",
  "paymentMethod": "upi"
}
```

**Response:**
```json
{
  "enrollment": {
    "enrollmentId": "693bc5db7bce...",
    "courseName": "Physics Course",
    "status": "active",
    "progress": 0
  }
}
```

---

### Update Progress
**Request:**
```json
PUT /enrollments/ENROLLMENT_ID/progress
Authorization: Bearer TOKEN
{
  "progress": 50
}
```

---

### Rate Course
**Request:**
```json
POST /enrollments/ENROLLMENT_ID/rate
Authorization: Bearer TOKEN
{
  "rating": 5,
  "feedback": "Excellent!"
}
```

---

## ⚡ Quick Test Sequence

1. **Register**
   ```
   POST /auth/register
   ```
   → Save `tokens.access`

2. **Get Courses**
   ```
   GET /courses
   ```
   → Save first `._id`

3. **Create Payment**
   ```
   POST /payments/order
   Body: {courseId: SAVED_ID}
   ```
   → Save `orderId`

4. **Verify & Enroll**
   ```
   POST /payments/verify
   Body: {orderId: SAVED_ID, transactionId: TXN_123, paymentMethod: upi}
   ```
   → Save `enrollmentId`

5. **View Enrollments**
   ```
   GET /enrollments
   ```
   → See your new course!

6. **Update Progress**
   ```
   PUT /enrollments/ENROLL_ID/progress
   Body: {progress: 100}
   ```

7. **Rate Course**
   ```
   POST /enrollments/ENROLL_ID/rate
   Body: {rating: 5, feedback: "Great!"}
   ```

---

## ✅ Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success (GET/PUT) | Course retrieved |
| 201 | Created (POST) | User registered |
| 400 | Bad request | Missing field |
| 401 | Unauthorized | Invalid token |
| 403 | Forbidden | Wrong API key |
| 404 | Not found | Course doesn't exist |
| 500 | Server error | Database issue |

---

## 🎯 Enrollment Status

| Status | Meaning |
|--------|---------|
| `active` | Currently enrolled |
| `paused` | Temporarily paused |
| `completed` | 100% progress reached |
| `cancelled` | Enrollment cancelled |

---

## 💡 Variables to Replace

In Postman, replace these with actual values:

| Variable | Example | Where to Get |
|----------|---------|--------------|
| `YOUR_TOKEN_HERE` | `eyJhbGc...` | From `/auth/register` response |
| `COURSE_ID` | `693ab05e31...` | From `/courses` GET response |
| `ORDER_ID` | `ORD_1765524...` | From `/payments/order` response |
| `ENROLLMENT_ID` | `693bc5db7b...` | From `/payments/verify` response |

---

## 🚀 You're Ready!

**Next Steps:**
1. Open **Postman**
2. Import **POSTMAN_COLLECTION.json**
3. Follow the sequences above
4. Test all endpoints

**Need Help?**
- Check **API_TESTING_GUIDE.md** for detailed walkthrough
- Check **ENROLLMENT_PAYMENT_GUIDE.md** for workflow details
- Server running on port **5001**

**Happy Testing!** 🎉
