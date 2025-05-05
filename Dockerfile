FROM node:18

# Set the working directory
WORKDIR /app

# Set a default value for APP_BASE_HREF
ENV APP_BASE_HREF=""

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
