FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npx ng build --base-href "/${APP_BASE_HREF}/"

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
