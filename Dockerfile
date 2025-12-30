FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
