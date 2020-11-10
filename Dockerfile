# Official lightweight Node.js 12 image
FROM node:12-slim

# Set app directory
WORKDIR /app

# Copy application dependencies
# use wildcard (*) to include both package.json and package-lock.json
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code into container image
COPY . ./

# Run webhook
CMD ["node" , "app/index.js"]