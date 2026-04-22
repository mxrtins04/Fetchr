#!/bin/bash

echo "Testing Fetchr API endpoints..."

# Start the application in background
cd fetchr
./mvnw spring-boot:run > /dev/null 2>&1 &
APP_PID=$!

# Wait for application to start
echo "Waiting for application to start..."
sleep 15

# Test search endpoint
echo "Testing search endpoint..."
curl -X POST http://localhost:8080/api/search \
  -H "Content-Type: application/json" \
  -d '{"keyword":"Naruto","page":1,"perPage":5,"subjectType":0}' \
  | jq '.' || echo "Search test failed"

echo ""
echo "Testing detail endpoint..."
curl -X GET "http://localhost:8080/api/detail?detailPath=gachiakuta-uXYvvDsxDC9" \
  | jq '.' || echo "Detail test failed"

echo ""
echo "Testing downloads list endpoint..."
curl -X GET http://localhost:8080/api/downloads/list \
  | jq '.' || echo "Downloads list test failed"

# Clean up
kill $APP_PID 2>/dev/null
echo "Tests completed."
