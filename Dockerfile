# Use official Node.js image with a version >= 18
FROM node:19


# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) from the root directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code from src/app into the container
COPY src/app ./

# Expose port 3000 (default port for Next.js)
EXPOSE 3000

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
