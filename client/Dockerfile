# client/Dockerfile
FROM node:18-alpine AS base

# Install Bun globally
RUN npm install -g bun

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
# If using npm instead of Bun, copy package-lock.json instead of bun.lockb

# Install dependencies with Bun
RUN bun install
# For npm: RUN npm install

# Copy the rest of the client code
COPY . .

# Build the Next.js app
RUN bun run build
# For npm: RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["bun", "run", "dev"]
