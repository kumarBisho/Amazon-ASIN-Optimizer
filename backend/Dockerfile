# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript (if you use a build step)
RUN npm run build || true

# Expose backend port
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "dev"]