# Use Node.js 18 (LTS) as the base image for stability and ES module support
FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Install Python, pip, and build tools in one RUN command
RUN apk add --no-cache python3 py3-pip build-base docker-cli ffmpeg

# Copy application files to the container
COPY ./backend /src/backend
COPY ./client /src/client
COPY ./app.js /src/app.js

# Clean up backend/web and client/build directories
RUN rm -rf /src/backend/web /src/client/build

# Install backend dependencies
RUN cd /src/backend && npm install

# Install client dependencies and build the client with legacy OpenSSL support
RUN cd /src/client && npm install && NODE_OPTIONS=--openssl-legacy-provider npm run build

# Copy client build output to backend/web
RUN mkdir -p /src/backend/web && cp -r /src/client/build/* /src/backend/web/

# Expose the application port
EXPOSE 3230

# Run the application
CMD ["node", "/src/app.js"]
