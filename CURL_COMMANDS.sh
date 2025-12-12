#!/bin/bash

# Your Courses - Complete Test Flow
# Copy and paste these curl commands in your terminal or Postman

echo "🚀 YOUR COURSES - COMPLETE POSTMAN CURL FLOW"
echo "=============================================="
echo ""

# ===== STEP 1: REGISTER STUDENT =====
echo "📋 STEP 1: REGISTER STUDENT (Get Fresh Token)"
echo ""
echo "curl --location 'http://localhost:5001/api/auth/register' \\"
echo "--header 'Content-Type: application/json' \\"
echo "--data '{
  \"name\": \"Demo User\",
  \"email\": \"demo'$(date +%s)'@example.com\",
  \"password\": \"Demo@123\",
  \"class\": \"12\"
}'"
echo ""
echo "✅ Response will include tokens.access (use as YOUR_TOKEN_HERE)"
echo ""
echo "=============================================="
echo ""

# ===== STEP 2: BROWSE COURSES =====
echo "📋 STEP 2: BROWSE COURSES (No Token Needed)"
echo ""
echo "curl --location 'http://localhost:5001/api/courses'"
echo ""
echo "✅ Response will include courses[0]._id (use as COURSE_ID_HERE)"
echo ""
echo "=============================================="
echo ""

# ===== STEP 3: QUICK ENROLL =====
echo "📋 STEP 3: QUICK ENROLL (Replace tokens and IDs)"
echo ""
echo "curl --location --request POST 'http://localhost:5001/api/payments/enroll' \\"
echo "--header 'Content-Type: application/json' \\"
echo "--header 'Authorization: Bearer YOUR_TOKEN_HERE' \\"
echo "--data '{
  \"courseId\": \"COURSE_ID_HERE\"
}'"
echo ""
echo "✅ Replace YOUR_TOKEN_HERE with token from Step 1"
echo "✅ Replace COURSE_ID_HERE with course ID from Step 2"
echo ""
echo "=============================================="
echo ""

# ===== STEP 4: VIEW YOUR COURSES =====
echo "📋 STEP 4: VIEW YOUR COURSES (Replace token)"
echo ""
echo "curl --location 'http://localhost:5001/api/enrollments/my-courses' \\"
echo "--header 'Authorization: Bearer YOUR_TOKEN_HERE'"
echo ""
echo "✅ Replace YOUR_TOKEN_HERE with token from Step 1"
echo "✅ Response shows all enrolled courses with details"
echo ""
echo "=============================================="
echo ""

# ===== BONUS: UPDATE PROGRESS =====
echo "📋 BONUS: UPDATE PROGRESS (Replace token and enrollment ID)"
echo ""
echo "curl --location --request PUT 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/progress' \\"
echo "--header 'Content-Type: application/json' \\"
echo "--header 'Authorization: Bearer YOUR_TOKEN_HERE' \\"
echo "--data '{
  \"progress\": 50
}'"
echo ""
echo "✅ Replace YOUR_TOKEN_HERE with token"
echo "✅ Replace ENROLLMENT_ID with enrollmentId from Step 3 response"
echo ""
echo "=============================================="
echo ""

# ===== BONUS: RATE COURSE =====
echo "📋 BONUS: RATE COURSE (Replace token and enrollment ID)"
echo ""
echo "curl --location --request POST 'http://localhost:5001/api/enrollments/ENROLLMENT_ID/rate' \\"
echo "--header 'Content-Type: application/json' \\"
echo "--header 'Authorization: Bearer YOUR_TOKEN_HERE' \\"
echo "--data '{
  \"rating\": 5,
  \"feedback\": \"Great course!\"
}'"
echo ""
echo "✅ Replace YOUR_TOKEN_HERE with token"
echo "✅ Replace ENROLLMENT_ID with enrollmentId"
echo ""
echo "=============================================="
echo ""

echo "🎯 How to use:"
echo "1. Copy each curl command above"
echo "2. Paste into Terminal or Postman"
echo "3. Replace placeholders (YOUR_TOKEN_HERE, COURSE_ID_HERE, etc)"
echo "4. Press Enter to execute"
echo ""
echo "✅ Complete flow ready! Happy testing! 🚀"
