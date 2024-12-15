# Base image with Node.js
FROM node:18-alpine as base

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy the rest of the application files
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:18-alpine as production

# Set working directory in the production container
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy necessary files from the base image (production build)
COPY --from=base /app/.next /app/.next
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/package.json /app/package.json
COPY --from=base /app/public /app/public

# Run the app in production mode
CMD ["npm", "start"]
