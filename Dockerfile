# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Adding debugging steps
RUN echo "Node version: $(node -v)" && \
    echo "NPM version: $(npm -v)" && \
    npm install || cat /root/.npm/_logs/*-debug-*.log

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3100

# Define the command to run the app
CMD ["node", "app.js"]
