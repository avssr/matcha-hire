#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up MatchaHire development environment...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env
    echo "Please update .env with your credentials"
fi

# Initialize Supabase
echo -e "${BLUE}Setting up Supabase...${NC}"
npx supabase init

# Run database migrations
echo -e "${BLUE}Running database migrations...${NC}"
npm run db:migrate

# Build the project
echo -e "${BLUE}Building the project...${NC}"
npm run build

echo -e "${GREEN}Setup complete! Run 'npm run dev' to start the development server.${NC}" 