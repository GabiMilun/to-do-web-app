FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
# Use npm install here so the build is resilient if package-lock.json is absent or incompatible
RUN npm install --no-audit --no-progress

# Copy project
COPY . .

# Recommended for file watching inside containers
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 5173

# Start Vite dev server. vite.config.js already sets host to true.
CMD ["npm", "run", "dev"]
