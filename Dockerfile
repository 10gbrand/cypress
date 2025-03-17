# Use the Cypress included image as the base
FROM cypress/included:14.1.0

# Set the working directory inside the container
WORKDIR /e2e

# Copy your project files into the container
# COPY . /e2e

# Install any additional dependencies (if needed)
# RUN npm install

# Default command to run Cypress tests
CMD ["cypress", "run"]
