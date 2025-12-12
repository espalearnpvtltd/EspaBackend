# 🎓 Course Enrollment & Payment System - Postman Examples

## Base URL
```
http://localhost:5001/api
```

---

## 📋 Complete Enrollment Workflow

### 1️⃣ Register Student (Pick a Class)

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "Nursery Student",
  "email": "student@example.com",
  "password": "SecurePass123",
  "class": "Nursery"
}
```

**Available Classes:**
- `Nursery`, `LKG`, `UKG`
- `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`

**Response:** Save the `tokens.access` token for next requests

---

### 2️⃣ View Available Courses for Your Class

**Endpoint:** `GET /courses`

**Headers:** None required (Public)

**Response:** Shows all courses. Filter by your class in the UI

---

### 3️⃣ Create Payment Order (Initiate Purchase)

**Endpoint:** `POST /payments/order`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "courseId": "693ab05e31318b0db26d7147"
}
```

**Response:** Returns `orderId` and amount to pay

---

### 4️⃣ Verify Payment & Get Enrolled

**Endpoint:** `POST /payments/verify`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "orderId": "ORD_1765524953945_f985b83a",
  "transactionId": "TXN_1765524960123",
  "paymentMethod": "upi"
}
```

**Payment Methods:**
- `upi`, `credit_card`, `debit_card`, `net_banking`, `wallet`, `other`

**Response:** Returns `enrollmentId` - **You are now enrolled!** 🎉

---

### 5️⃣ View Your Enrollments

**Endpoint:** `GET /enrollments`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:** Lists all your active courses with progress

---

## 📝 Full cURL Examples

### Example 1: Register & Enroll in Nursery Course

```bash
# Step 1: Register
REGISTER=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Nursery Learner",
    "email": "nursery'$(date +%s)'@example.com",
    "password": "test123",
    "class": "Nursery"
  }')

USER_ID=$(echo "$REGISTER" | jq -r '.user.id')
TOKEN=$(echo "$REGISTER" | jq -r '.tokens.access')

echo "✅ Registered: User $USER_ID"

# Step 2: Get course ID
COURSE_ID=$(curl -s 'http://localhost:5001/api/courses' | jq -r '.courses[0]._id')

echo "✅ Selected Course: $COURSE_ID"

# Step 3: Create payment order
ORDER=$(curl -s -X POST 'http://localhost:5001/api/payments/order' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"courseId\": \"$COURSE_ID\"}")

ORDER_ID=$(echo "$ORDER" | jq -r '.payment.orderId')

echo "✅ Order Created: $ORDER_ID"

# Step 4: Verify payment & enroll
ENROLL=$(curl -s -X POST 'http://localhost:5001/api/payments/verify' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"orderId\": \"$ORDER_ID\",
    \"transactionId\": \"TXN_$(date +%s)\",
    \"paymentMethod\": \"upi\"
  }")

echo "✅ Enrollment Created!"
echo "$ENROLL" | jq '.enrollment'

# Step 5: View enrollments
curl -s -X GET 'http://localhost:5001/api/enrollments' \
  -H "Authorization: Bearer $TOKEN" | jq '.enrollments'
```

---

## 📊 Additional Enrollment Features

### Update Course Progress

**Endpoint:** `PUT /enrollments/:enrollmentId/progress`

**Request Body:**
```json
{
  "progress": 50
}
```

---

### Rate Course

**Endpoint:** `POST /enrollments/:enrollmentId/rate`

**Request Body:**
```json
{
  "rating": 5,
  "feedback": "Excellent course, very helpful!"
}
```

---

### Pause Enrollment

**Endpoint:** `PUT /enrollments/:enrollmentId/pause`

**No body required**

---

### Resume Paused Course

**Endpoint:** `PUT /enrollments/:enrollmentId/resume`

**No body required**

---

### Cancel Enrollment

**Endpoint:** `PUT /enrollments/:enrollmentId/cancel`

**No body required**

---

## 💳 Payment History

### Get All Your Payments

**Endpoint:** `GET /payments/history`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:** List of all your payments with status

---

### Get Payment Details

**Endpoint:** `GET /payments/:orderId/details`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### Refund Payment

**Endpoint:** `POST /payments/:orderId/refund`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Note:** Only `completed` payments can be refunded. Enrollment will be cancelled.

---

## 🎯 Example Postman Requests

### Class-wise Registration Examples

#### LKG Student Registration
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "LKG Student",
    "email": "lkg'$(date +%s)'@example.com",
    "password": "test123",
    "class": "LKG"
  }'
```

#### Class 5 Student Registration
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 5 Student",
    "email": "class5'$(date +%s)'@example.com",
    "password": "test123",
    "class": "5"
  }'
```

#### Class 12 Student Registration
```bash
curl -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Class 12 Student",
    "email": "class12'$(date +%s)'@example.com",
    "password": "test123",
    "class": "12"
  }'
```

---

## 🔄 Complete End-to-End Workflow

```bash
#!/bin/bash

echo "=== ENROLLMENT WORKFLOW ==="

# 1. Register
USER=$(curl -s -X POST 'http://localhost:5001/api/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "New Student",
    "email": "new'$(date +%s)'@example.com",
    "password": "password123",
    "class": "5"
  }')

TOKEN=$(echo "$USER" | jq -r '.tokens.access')
echo "1️⃣ User registered. Token: ${TOKEN:0:20}..."

# 2. Select course
COURSE=$(curl -s 'http://localhost:5001/api/courses' | jq '.courses[1]')
COURSE_ID=$(echo "$COURSE" | jq -r '._id')
COURSE_NAME=$(echo "$COURSE" | jq -r '.name')

echo "2️⃣ Selected course: $COURSE_NAME"

# 3. Create payment order
ORDER=$(curl -s -X POST 'http://localhost:5001/api/payments/order' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"courseId\": \"$COURSE_ID\"}")

ORDER_ID=$(echo "$ORDER" | jq -r '.payment.orderId')
AMOUNT=$(echo "$ORDER" | jq -r '.payment.amount')

echo "3️⃣ Payment order created. Amount: ₹$AMOUNT"

# 4. Verify payment & enroll
ENROLL=$(curl -s -X POST 'http://localhost:5001/api/payments/verify' \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"orderId\": \"$ORDER_ID\",
    \"transactionId\": \"TXN_$(date +%s)\",
    \"paymentMethod\": \"upi\"
  }")

ENROLL_ID=$(echo "$ENROLL" | jq -r '.enrollment.enrollmentId')
STATUS=$(echo "$ENROLL" | jq -r '.enrollment.status')

echo "4️⃣ Enrollment created! Status: $STATUS"

# 5. View enrollments
echo "5️⃣ Your enrollments:"
curl -s -X GET 'http://localhost:5001/api/enrollments' \
  -H "Authorization: Bearer $TOKEN" | jq '.enrollments[] | {courseName, status, progress}'

# 6. Update progress
echo "6️⃣ Updating progress to 25%..."
curl -s -X PUT "http://localhost:5001/api/enrollments/$ENROLL_ID/progress" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"progress": 25}' | jq '.enrollment'

# 7. Rate course
echo "7️⃣ Rating course 5 stars..."
curl -s -X POST "http://localhost:5001/api/enrollments/$ENROLL_ID/rate" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "rating": 5,
    "feedback": "Amazing course!"
  }' | jq '.enrollment'

echo "✅ Workflow complete!"
```

---

## 🔐 Security Notes

✅ **All payment endpoints require JWT token authentication**
✅ **Orders can only be verified by the user who created them**
✅ **Payments have transaction IDs for tracking**
✅ **Refunds automatically cancel enrollments**
✅ **One enrollment per user-course pair**

---

## 📱 API Response Examples

### Payment Order Response
```json
{
  "message": "Payment order created",
  "payment": {
    "orderId": "ORD_1765524953945_f985b83a",
    "amount": 2999,
    "currency": "INR",
    "courseId": "693ab05e31318b0db26d7147",
    "courseName": "Modern Physics Course",
    "coursePrice": 3999,
    "discountedPrice": 2999,
    "discount": 1000
  }
}
```

### Enrollment Response
```json
{
  "message": "Payment verified and enrollment created successfully",
  "enrollment": {
    "enrollmentId": "693bc5db7bce05389784b7cf",
    "courseName": "Modern Physics Course",
    "courseSubject": "Physics",
    "courseClass": "12",
    "status": "active",
    "enrollmentDate": "2025-12-12T07:35:55.250Z",
    "progress": 0
  }
}
```

---

## ✨ Key Features

✅ **Multiple Payment Methods** - UPI, Cards, Net Banking, Wallet
✅ **Automatic Enrollment** - Enrolled immediately after payment verification
✅ **Progress Tracking** - Track course progress (0-100%)
✅ **Course Ratings** - Rate courses and leave feedback
✅ **Pause/Resume** - Pause and resume courses anytime
✅ **Payment History** - Track all payments and transactions
✅ **Refund Support** - Refund payments and cancel enrollments
✅ **Class-based Courses** - Courses for all class levels (Nursery to 12)

---

## 🚀 Testing Tips

1. **Use different class levels** to see class-appropriate courses
2. **Use the same email** in subsequent tests to reuse enrollments
3. **Update progress** to simulate course completion
4. **Rate courses** to provide feedback
5. **Check payment history** to track all transactions
6. **Try pausing** to temporarily stop course access
7. **Use refund** to test cancellation workflow

Happy Learning! 🎓
