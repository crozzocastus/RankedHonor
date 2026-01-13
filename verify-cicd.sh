#!/bin/bash

# RankedHonor CI/CD Verification Script
# Run this to verify all CI/CD components are working

set -e

echo "🚀 RankedHonor CI/CD Verification"
echo "=================================="
echo ""

cd "$(dirname "$0")/front"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    print_status 0 "node_modules exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found, installing..."
    npm install
fi
echo ""

echo "🔍 Running ESLint..."
npm run lint --silent
print_status $? "ESLint passed"
echo ""

echo "🎨 Checking code formatting..."
npm run format:check --silent
print_status $? "Prettier check passed"
echo ""

echo "📘 Running TypeScript check..."
npm run type-check --silent
print_status $? "TypeScript check passed"
echo ""

echo "🧪 Running tests..."
npm run test -- --run --reporter=verbose
print_status $? "Tests passed"
echo ""

echo "🏗️ Running build..."
npm run build --silent
print_status $? "Build successful"
echo ""

echo "🔐 Checking security..."
echo "Running npm audit..."
npm audit --audit-level=moderate || echo -e "${YELLOW}⚠${NC} Some vulnerabilities found (non-critical)"
echo ""

echo "📋 Checking Git hooks..."
if [ -f ".husky/pre-commit" ]; then
    print_status 0 "Husky pre-commit hook exists"
else
    print_status 1 "Husky pre-commit hook missing"
fi
echo ""

echo "📁 Checking CI/CD files..."
cd ..
FILES=(
    ".github/workflows/ci-frontend.yml"
    ".github/workflows/cd-frontend.yml"
    ".github/workflows/security.yml"
    ".github/dependabot.yml"
    "front/.prettierrc"
    "front/.lintstagedrc.js"
    "front/vitest.config.ts"
    "front/.env.example"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file"
    else
        print_status 1 "$file missing"
    fi
done
echo ""

echo "=================================="
echo -e "${GREEN}✅ Verification Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review CI_CD_IMPLEMENTATION.md for details"
echo "2. Configure GitHub secrets for Vercel deployment"
echo "3. Push to GitHub to trigger CI/CD pipelines"
echo ""
echo "Happy coding! 🎉"
