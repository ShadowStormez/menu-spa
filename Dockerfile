# Base image with Node.js
FROM node:18-alpine as base

# Set working directory
WORKDIR /app

# Copy only package.json files first to leverage Docker caching
COPY package*.json ./

# Install dependencies in the container
RUN npm ci --production

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:18-alpine as production
WORKDIR /app
ENV NODE_ENV=production

# Copy over the production build
COPY --from=base /app/.next /app/.next
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/package.json /app/package.json
COPY --from=base /app/public /app/public

# Run the app in production mode
CMD ["npm", "start"]
