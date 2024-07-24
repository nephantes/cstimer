# Use an official Java runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the local source code to the container
COPY . .

# Install required packages
RUN apt-get update && apt-get install -y \
    php \
    git \
    make \
    && rm -rf /var/lib/apt/lists/*

# Build the application
RUN make all

RUN mkdir -p dist && cp -r src/* dist/

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["php", "-S", "0.0.0.0:80", "-t", "dist"]
