# server/Dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files (npm-specific)
COPY package.json package-lock.json ./

# Install dependencies with npm
RUN npm install

# Copy the rest of the server code
COPY . .

# Build the Nest.js app (if using TypeScript)
RUN npm run build

# Expose port
EXPOSE 8000

# Start the app with npm
CMD ["npm", "run", "start"]
