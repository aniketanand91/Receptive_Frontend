# Stage 1: Build the React app
FROM node:14 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React application
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build folder from the first stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 143

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
