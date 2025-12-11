# Course Pricing & Discount API Documentation

## Overview
Courses now support original pricing with discounts. When you set a `discountPercentage`, the system automatically calculates the `discountedPrice`.

---

## Course Pricing Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `price` | Number | Original price in INR | 5999 |
| `discountPercentage` | Number | Discount percentage (0-100) | 20 |
| `discountedPrice` | Number | Auto-calculated final price | 4799.20 |

---

## Create Course with Pricing

**Endpoint**: `POST /api/courses`

**Authentication**: Admin Secret Key (`x-admin-secret-key` header)

### Without Discount
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Physics for JEE",
    "description": "Advanced physics course",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "duration": 150,
    "isRecommended": true,
    "filepath": "/courses/physics_jee"
  }'
```

### With Discount (20% off)
```bash
curl -X POST 'http://localhost:5001/api/courses' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "title": "Physics for JEE - Limited Offer",
    "description": "Advanced physics course with 20% discount",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "discountPercentage": 20,
    "duration": 150,
    "isRecommended": true,
    "filepath": "/courses/physics_jee"
  }'
```

**Response** (201 Created):
```json
{
  "message": "Course created",
  "course": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Physics for JEE - Limited Offer",
    "description": "Advanced physics course with 20% discount",
    "subject": "Physics",
    "class": "12",
    "stream": "science",
    "examType": ["JEE"],
    "difficulty": "advanced",
    "price": 5999,
    "discountPercentage": 20,
    "discountedPrice": 4799.20,
    "duration": 150,
    "isRecommended": true,
    "filepath": "/courses/physics_jee",
    "ratings": {
      "average": 0,
      "count": 0,
      "reviews": []
    },
    "createdAt": "2025-12-11T10:00:00.000Z",
    "updatedAt": "2025-12-11T10:00:00.000Z"
  }
}
```

---

## Update Course Pricing

**Endpoint**: `PUT /api/courses/:id`

**Authentication**: Admin Secret Key

### Update with New Discount
```bash
curl -X PUT 'http://localhost:5001/api/courses/507f1f77bcf86cd799439011' \
  -H 'Content-Type: application/json' \
  -H 'x-admin-secret-key: espa_admin_secret_key_2025_secure' \
  -d '{
    "price": 5999,
    "discountPercentage": 30
  }'
```

The system automatically recalculates:
- **Original Price**: ₹5,999
- **Discount**: 30%
- **Final Price**: ₹4,199.30

---

## Discount Calculation Formula

```
discountedPrice = price - (price × discountPercentage / 100)
discountedPrice = Math.round(discountedPrice × 100) / 100 // Rounded to 2 decimals
```

### Examples:

| Original Price | Discount | Final Price | Savings |
|---|---|---|---|
| ₹1,999 | 10% | ₹1,799.10 | ₹199.90 |
| ₹2,999 | 15% | ₹2,549.15 | ₹449.85 |
| ₹5,999 | 20% | ₹4,799.20 | ₹1,199.80 |
| ₹9,999 | 25% | ₹7,499.25 | ₹2,499.75 |
| ₹12,999 | 30% | ₹9,099.30 | ₹3,899.70 |

---

## Common Discount Tiers

### Seasonal Promotions
- **Summer Sale**: 15-20% off
- **Festival Offer**: 25-30% off
- **Launch Discount**: 20% off new courses
- **Bulk Purchase**: 10-15% off bundle courses

### Pricing Strategy by Course Level
```
Class 10 Courses:  ₹1,299 - ₹1,999 (10-15% discount)
Class 11 Courses:  ₹1,899 - ₹3,499 (15-20% discount)
Class 12 Courses:  ₹2,299 - ₹6,999 (20-30% discount)
Competitive Exams: ₹7,999 - ₹12,999 (15-25% discount)
```

---

## Frontend Display Examples

### React Component
```jsx
function CourseCard({ course }) {
  const showDiscount = course.discountPercentage > 0;

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.subject}</p>
      
      <div className="pricing">
        {showDiscount ? (
          <>
            <span className="original-price">₹{course.price}</span>
            <span className="discount-badge">-{course.discountPercentage}%</span>
            <span className="final-price">₹{course.discountedPrice}</span>
            <span className="savings">
              Save ₹{(course.price - course.discountedPrice).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="price">₹{course.price}</span>
        )}
      </div>

      <button className="btn-enroll">Enroll Now</button>
    </div>
  );
}
```

### Vue.js Component
```vue
<template>
  <div class="course-card">
    <h3>{{ course.title }}</h3>
    <p>{{ course.subject }}</p>
    
    <div class="pricing">
      <div v-if="course.discountPercentage > 0" class="discounted">
        <span class="original-price">
          <s>₹{{ course.price }}</s>
        </span>
        <span class="discount-badge">-{{ course.discountPercentage }}%</span>
        <span class="final-price">₹{{ course.discountedPrice }}</span>
        <span class="savings">
          Save ₹{{ (course.price - course.discountedPrice).toFixed(2) }}
        </span>
      </div>
      <div v-else class="regular">
        <span class="price">₹{{ course.price }}</span>
      </div>
    </div>

    <button class="btn-enroll" @click="enrollCourse">Enroll Now</button>
  </div>
</template>

<script>
export default {
  props: ['course'],
  methods: {
    enrollCourse() {
      const finalPrice = this.course.discountedPrice || this.course.price;
      console.log(`Enrolling for ₹${finalPrice}`);
    }
  }
};
</script>

<style scoped>
.original-price {
  color: #999;
  font-size: 14px;
  margin-right: 10px;
}

.discount-badge {
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 10px;
}

.final-price {
  font-size: 24px;
  color: #27ae60;
  font-weight: bold;
}

.savings {
  display: block;
  color: #27ae60;
  font-size: 12px;
  margin-top: 5px;
}
</style>
```

---

## API Endpoints Summary

### Create Course (with discount)
```
POST /api/courses
Headers: x-admin-secret-key
Body: { title, subject, class, price, discountPercentage, ... }
Returns: discountedPrice (auto-calculated)
```

### Update Course Pricing
```
PUT /api/courses/:id
Headers: x-admin-secret-key
Body: { price, discountPercentage }
Returns: Updated course with new discountedPrice
```

### Get Course Details
```
GET /api/courses/:id
Headers: Authorization: Bearer TOKEN
Returns: Full course with price, discountPercentage, discountedPrice
```

### Search Courses
```
GET /api/courses/search/courses?query=physics
Returns: All matching courses with pricing
```

---

## Response Example with Pricing

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Advanced Physics for JEE",
  "subject": "Physics",
  "class": "12",
  "stream": "science",
  "examType": ["JEE"],
  "difficulty": "advanced",
  "price": 5999,
  "discountPercentage": 20,
  "discountedPrice": 4799.20,
  "duration": 150,
  "pictures": ["https://example.com/physics.jpg"],
  "ratings": {
    "average": 4.8,
    "count": 45
  },
  "isRecommended": true
}
```

---

## Data Validation

- `price`: Must be ≥ 0
- `discountPercentage`: Must be 0-100
- `discountedPrice`: Auto-calculated, always ≤ original price
- Decimals: Rounded to 2 places for currency

---

## Notes

✅ Discounts are optional - courses can exist without discount
✅ Discounted price automatically updates when discount changes
✅ Display both original and discounted prices to show savings
✅ Use discount badges to highlight promotional offers
✅ Always show savings amount to increase perceived value
