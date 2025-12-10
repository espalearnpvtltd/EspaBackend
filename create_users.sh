#!/bin/bash

API_URL="http://localhost:5001/api/auth/register"
SECRET_KEY="admin_secret_key_12345"

for i in {1..5}
do
  echo "Creating User $i..."

  curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $SECRET_KEY" \
  -d "{
    \"name\": \"User$i\",
    \"email\": \"user$i@example.com\",
    \"password\": \"password$i\",
    \"role\": \"teacher\"
  }"

  echo ""
  echo "-----------------------------"
done
