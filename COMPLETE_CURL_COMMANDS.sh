#!/bin/bash

# ============================================================================
# EspaBackend - Complete cURL Commands for API Testing
# ============================================================================
# Base URL
BASE_URL="http://localhost:5001/api"
ADMIN_KEY="espa_admin_secret_key_2025_secure"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}EspaBackend API Testing Guide${NC}"
echo -e "${BLUE}================================${NC}"

# ============================================================================
# SECTION 1: AUTHENTICATION
# ============================================================================

echo -e "\n${YELLOW}1. AUTHENTICATION ENDPOINTS${NC}"

echo -e "\n${GREEN}1.1 Register a New User${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/auth/register' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"John Doe\","
echo "    \"email\": \"john@example.com\","
echo "    \"password\": \"securePassword123\","
echo "    \"userType\": \"student\","
echo "    \"class\": \"12\""
echo "  }'"

echo -e "\n${GREEN}1.2 Login User${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/auth/login' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"email\": \"john@example.com\","
echo "    \"password\": \"securePassword123\""
echo "  }'"
echo -e "Response includes: ${YELLOW}accessToken${NC} (use in subsequent requests)"

echo -e "\n${GREEN}1.3 Refresh Token${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/auth/refresh' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"refreshToken\": \"your-refresh-token-here\""
echo "  }'"

# ============================================================================
# SECTION 2: COURSES - PUBLIC ENDPOINTS
# ============================================================================

echo -e "\n${YELLOW}2. COURSES - PUBLIC ENDPOINTS${NC}"

echo -e "\n${GREEN}2.1 Get All Courses${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses' | jq ."
echo -e "Or with pagination:"
echo "curl -s '$BASE_URL/courses?limit=10&offset=0' | jq ."

echo -e "\n${GREEN}2.2 Search Courses (NEW!)${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses/search/courses?query=physics' | jq ."
echo -e "Examples:"
echo "  - Search Physics: curl -s '$BASE_URL/courses/search/courses?query=physics' | jq ."
echo "  - Search Chemistry: curl -s '$BASE_URL/courses/search/courses?query=chemistry' | jq ."
echo "  - Search JEE: curl -s '$BASE_URL/courses/search/courses?query=jee' | jq ."
echo "  - Search NEET: curl -s '$BASE_URL/courses/search/courses?query=neet' | jq ."
echo "  - Search UPSC: curl -s '$BASE_URL/courses/search/courses?query=upsc' | jq ."

echo -e "\n${GREEN}2.3 Get Single Course${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses/COURSE_ID' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."

# ============================================================================
# SECTION 3: COURSES - USER ENDPOINTS (JWT Required)
# ============================================================================

echo -e "\n${YELLOW}3. COURSES - USER ENDPOINTS (JWT Required)${NC}"

echo -e "\n${GREEN}3.1 Get Recommended Categories by Class (NEW!)${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses/recommended/categories' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."
echo -e "Example Response:"
echo "{"
echo "  \"class\": \"12\","
echo "  \"categories\": {"
echo "    \"Science\": [courses...],"
echo "    \"Commerce\": [courses...],"
echo "    \"Arts\": [courses...],"
echo "    \"Medical (NEET)\": [courses...],"
echo "    \"Non-Medical\": [courses...],"
echo "    \"UPSC Preparation\": [courses...],"
echo "    \"Engineering (JEE)\": [courses...]"
echo "  }"
echo "}"

echo -e "\n${GREEN}3.2 Filter Courses by Stream${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses/stream/STREAM' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."
echo -e "Stream options: science, commerce, arts, general"

echo -e "\n${GREEN}3.3 Filter Courses by Exam Type${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/courses/exam/EXAM_TYPE' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."
echo -e "Exam types: JEE, NEET, UPSC, BOARDS, GATE, CAT"

echo -e "\n${GREEN}3.4 Rate a Course${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/courses/COURSE_ID/rate' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"rating\": 5,"
echo "    \"review\": \"Excellent course! Highly recommended.\""
echo "  }'"

# ============================================================================
# SECTION 4: COURSES - ADMIN ENDPOINTS
# ============================================================================

echo -e "\n${YELLOW}4. COURSES - ADMIN ENDPOINTS (Admin Key Required)${NC}"

echo -e "\n${GREEN}4.1 Create Course with Pricing (NEW!)${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/courses' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"Physics for JEE\","
echo "    \"description\": \"Complete JEE physics preparation\","
echo "    \"subject\": \"Physics\","
echo "    \"class\": \"12\","
echo "    \"stream\": \"science\","
echo "    \"examType\": [\"JEE\"],"
echo "    \"difficulty\": \"advanced\","
echo "    \"price\": 5999,"
echo "    \"discountPercentage\": 15,"
echo "    \"duration\": 120,"
echo "    \"pictures\": ["
echo "      \"https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop\","
echo "      \"https://images.unsplash.com/photo-543269865-cbdf26effbbb?w=500&h=300&fit=crop\""
echo "    ],"
echo "    \"isRecommended\": true"
echo "  }'"
echo -e "\n${YELLOW}Note: discountedPrice is calculated automatically!${NC}"
echo "Formula: discountedPrice = price - (price × discountPercentage / 100)"

echo -e "\n${GREEN}4.2 Update Course (with Pricing)${NC}"
echo "Command:"
echo "curl -X PUT '$BASE_URL/courses/COURSE_ID' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"Physics for JEE - Updated\","
echo "    \"price\": 6999,"
echo "    \"discountPercentage\": 20,"
echo "    \"duration\": 150"
echo "  }'"

echo -e "\n${GREEN}4.3 Delete Course${NC}"
echo "Command:"
echo "curl -X DELETE '$BASE_URL/courses/COURSE_ID' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY'"

# ============================================================================
# SECTION 5: USERS
# ============================================================================

echo -e "\n${YELLOW}5. USERS ENDPOINTS${NC}"

echo -e "\n${GREEN}5.1 Get User Profile${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/users/USER_ID' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."

echo -e "\n${GREEN}5.2 Update User Profile${NC}"
echo "Command:"
echo "curl -X PUT '$BASE_URL/users/USER_ID' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"John Doe Updated\","
echo "    \"class\": \"12\","
echo "    \"stream\": \"science\""
echo "  }'"

# ============================================================================
# SECTION 6: PAYMENTS
# ============================================================================

echo -e "\n${YELLOW}6. PAYMENTS ENDPOINTS${NC}"

echo -e "\n${GREEN}6.1 Create Payment Intent${NC}"
echo "Command:"
echo "curl -X POST '$BASE_URL/payments/create-intent' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"courseId\": \"COURSE_ID\","
echo "    \"amount\": 5999"
echo "  }'"

# ============================================================================
# SECTION 7: CLASSES
# ============================================================================

echo -e "\n${YELLOW}7. CLASSES ENDPOINTS${NC}"

echo -e "\n${GREEN}7.1 Get All Classes${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/classes' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."

# ============================================================================
# SECTION 8: TEACHERS
# ============================================================================

echo -e "\n${YELLOW}8. TEACHERS ENDPOINTS${NC}"

echo -e "\n${GREEN}8.1 Get All Teachers${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/teachers' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."

# ============================================================================
# SECTION 9: STUDENTS
# ============================================================================

echo -e "\n${YELLOW}9. STUDENTS ENDPOINTS${NC}"

echo -e "\n${GREEN}9.1 Get All Students${NC}"
echo "Command:"
echo "curl -s '$BASE_URL/students' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq ."

# ============================================================================
# SECTION 10: QUICK START WORKFLOW
# ============================================================================

echo -e "\n${YELLOW}10. QUICK START WORKFLOW${NC}"

echo -e "\n${GREEN}Step 1: Register a User${NC}"
echo "curl -X POST '$BASE_URL/auth/register' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"Test User\","
echo "    \"email\": \"test@example.com\","
echo "    \"password\": \"TestPassword123\","
echo "    \"userType\": \"student\","
echo "    \"class\": \"12\""
echo "  }' | jq ."

echo -e "\n${GREEN}Step 2: Login to Get Token${NC}"
echo "curl -X POST '$BASE_URL/auth/login' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"email\": \"test@example.com\","
echo "    \"password\": \"TestPassword123\""
echo "  }' | jq ."
echo -e "${YELLOW}Copy the accessToken from response${NC}"

echo -e "\n${GREEN}Step 3: Get Recommended Categories${NC}"
echo "curl -s '$BASE_URL/courses/recommended/categories' \\"
echo "  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' | jq ."

echo -e "\n${GREEN}Step 4: Search for Courses${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=physics' | jq ."

echo -e "\n${GREEN}Step 5: Rate a Course${NC}"
echo "curl -X POST '$BASE_URL/courses/COURSE_ID/rate' \\"
echo "  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"rating\": 5,"
echo "    \"review\": \"Great course!\""
echo "  }' | jq ."

# ============================================================================
# SECTION 11: PRICING EXAMPLES
# ============================================================================

echo -e "\n${YELLOW}11. PRICING & DISCOUNT EXAMPLES${NC}"

echo -e "\n${GREEN}Example 1: Basic Course (No Discount)${NC}"
echo "curl -X POST '$BASE_URL/courses' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"Basic Math\","
echo "    \"price\": 2999,"
echo "    \"discountPercentage\": 0"
echo "  }'"
echo -e "Result: discountedPrice = 2999 (no discount)"

echo -e "\n${GREEN}Example 2: Course with 15% Discount${NC}"
echo "curl -X POST '$BASE_URL/courses' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"Advanced Physics\","
echo "    \"price\": 5999,"
echo "    \"discountPercentage\": 15"
echo "  }'"
echo -e "Result: discountedPrice = 5099.15 (₹900 saved)"

echo -e "\n${GREEN}Example 3: Course with 25% Discount${NC}"
echo "curl -X POST '$BASE_URL/courses' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"UPSC Preparation\","
echo "    \"price\": 9999,"
echo "    \"discountPercentage\": 25"
echo "  }'"
echo -e "Result: discountedPrice = 7499.25 (₹2,500 saved)"

# ============================================================================
# SECTION 12: SEARCH EXAMPLES
# ============================================================================

echo -e "\n${YELLOW}12. SEARCH API EXAMPLES${NC}"

echo -e "\n${GREEN}Search by Subject${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=physics' | jq '.[] | {title, subject, price, discountedPrice}'"

echo -e "\n${GREEN}Search by Exam Type${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=jee' | jq '.[] | {title, examType, difficulty}'"

echo -e "\n${GREEN}Search by Class${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=class%2012' | jq '.[] | {title, class}'"

echo -e "\n${GREEN}Get Top Results with Ratings${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=math' | jq '.[] | {title, ratings: .ratings.average, price, discountedPrice}' | head -20"

# ============================================================================
# SECTION 13: COURSE IMAGE EXAMPLES
# ============================================================================

echo -e "\n${YELLOW}13. COURSE IMAGE EXAMPLES${NC}"

echo -e "\n${GREEN}Create Course with Multiple Images${NC}"
echo "curl -X POST '$BASE_URL/courses' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'x-admin-secret-key: $ADMIN_KEY' \\"
echo "  -d '{"
echo "    \"title\": \"Physics for JEE\","
echo "    \"price\": 5999,"
echo "    \"discountPercentage\": 15,"
echo "    \"pictures\": ["
echo "      \"https://images.unsplash.com/photo-532012197267-da84d127e765?w=500&h=300&fit=crop\","
echo "      \"https://images.unsplash.com/photo-543269865-cbdf26effbbb?w=500&h=300&fit=crop\","
echo "      \"https://images.unsplash.com/photo-516321318423-f06a6b1ef94b?w=500&h=300&fit=crop\","
echo "      \"https://images.unsplash.com/photo-507842217343-583f20270319?w=500&h=300&fit=crop\""
echo "    ]"
echo "  }'"

echo -e "\n${GREEN}Get Course with Images${NC}"
echo "curl -s '$BASE_URL/courses/COURSE_ID' \\"
echo "  -H 'Authorization: Bearer ACCESS_TOKEN' | jq '.pictures[]'"

# ============================================================================
# SECTION 14: HELPFUL TIPS
# ============================================================================

echo -e "\n${YELLOW}14. HELPFUL TIPS${NC}"

echo -e "\n${GREEN}Tip 1: Pretty Print JSON${NC}"
echo "Add '| jq .' to any curl command to format JSON nicely"
echo "Example: curl -s '$BASE_URL/courses' | jq ."

echo -e "\n${GREEN}Tip 2: Filter Specific Fields${NC}"
echo "curl -s '$BASE_URL/courses' | jq '.[] | {title, price, discountedPrice}'"

echo -e "\n${GREEN}Tip 3: Count Results${NC}"
echo "curl -s '$BASE_URL/courses/search/courses?query=physics' | jq 'length'"

echo -e "\n${GREEN}Tip 4: Get First N Results${NC}"
echo "curl -s '$BASE_URL/courses' | jq '.[0:5]'"

echo -e "\n${GREEN}Tip 5: Extract Specific Value${NC}"
echo "curl -s '$BASE_URL/auth/login' -d '{...}' | jq '.accessToken' -r"

echo -e "\n${GREEN}Tip 6: Save Token to Variable${NC}"
echo "TOKEN=\$(curl -s '$BASE_URL/auth/login' -d '{...}' | jq '.accessToken' -r)"
echo "curl -s '$BASE_URL/courses/recommended/categories' -H \"Authorization: Bearer \$TOKEN\" | jq ."

# ============================================================================
# SECTION 15: COMPLETE TEST SCENARIO
# ============================================================================

echo -e "\n${YELLOW}15. COMPLETE TEST SCENARIO${NC}"

echo -e "\n${GREEN}Full Testing Workflow:${NC}"
echo "
# 1. Register
curl -X POST '$BASE_URL/auth/register' \\
  -H 'Content-Type: application/json' \\
  -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"Test123\",\"userType\":\"student\",\"class\":\"12\"}'

# 2. Login (save the token)
TOKEN=\$(curl -s -X POST '$BASE_URL/auth/login' \\
  -H 'Content-Type: application/json' \\
  -d '{\"email\":\"test@example.com\",\"password\":\"Test123\"}' | jq -r '.accessToken')

# 3. Get recommended categories
curl -s '$BASE_URL/courses/recommended/categories' \\
  -H \"Authorization: Bearer \$TOKEN\" | jq .

# 4. Search courses
curl -s '$BASE_URL/courses/search/courses?query=physics' | jq '.[0:5]'

# 5. Get single course
COURSE_ID=\$(curl -s '$BASE_URL/courses' | jq -r '.[0]._id')
curl -s '$BASE_URL/courses/\$COURSE_ID' -H \"Authorization: Bearer \$TOKEN\" | jq .

# 6. Rate a course
curl -X POST '$BASE_URL/courses/\$COURSE_ID/rate' \\
  -H \"Authorization: Bearer \$TOKEN\" \\
  -H 'Content-Type: application/json' \\
  -d '{\"rating\":5,\"review\":\"Great!\"}'
"

echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}Ready to Test!${NC}"
echo -e "${BLUE}================================${NC}\n"
