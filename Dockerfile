# Using an official nodejs runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm &&  pnpm install

# Installing the ESLint plugin for react-hooks
RUN pnpm add eslint-plugin-react-hooks @next/eslint-plugin-next --save-dev

# Copy the rest of the application files
COPY . .

# Run lint and build before starting the development server
RUN pnpm run lint && pnpm run build

# Expose the port Nextjs runs on
EXPOSE 3000

# Start the development server
CMD ["pnpm", "run", "dev"]