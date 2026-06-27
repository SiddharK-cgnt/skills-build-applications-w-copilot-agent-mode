#!/bin/bash

# Test script to verify API endpoints with seeded data
# This script makes curl requests to verify the API responses

API_URL="http://localhost:8000"

echo "======================================"
echo "🧪 Testing OctoFit Tracker API Endpoints"
echo "======================================"
echo ""

# Health check
echo "📋 Health Check:"
curl -s "${API_URL}/api/health" | jq .
echo ""

# Get all users
echo "👥 Get All Users:"
curl -s "${API_URL}/api/users" | jq '.data | length'
echo "   Documents: $(curl -s "${API_URL}/api/users" | jq '.data | length') users"
echo ""

# Get all teams
echo "🏆 Get All Teams:"
curl -s "${API_URL}/api/teams" | jq '.data | length'
echo "   Documents: $(curl -s "${API_URL}/api/teams" | jq '.data | length') teams"
echo ""

# Get all activities
echo "🏃 Get All Activities:"
curl -s "${API_URL}/api/activities" | jq '.data | length'
echo "   Documents: $(curl -s "${API_URL}/api/activities" | jq '.data | length') activities"
echo ""

# Get all workouts
echo "💪 Get All Workouts:"
curl -s "${API_URL}/api/workouts" | jq '.data | length'
echo "   Documents: $(curl -s "${API_URL}/api/workouts" | jq '.data | length') workouts"
echo ""

# Get leaderboard
echo "📊 Get Weekly Leaderboard:"
curl -s "${API_URL}/api/leaderboard/weekly" | jq '.data | length'
echo "   Documents: $(curl -s "${API_URL}/api/leaderboard/weekly" | jq '.data | length') entries"
echo ""

echo "======================================"
echo "✅ API Verification Complete!"
echo "======================================"
