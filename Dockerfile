# =====================
# Base image
# =====================
FROM node:20-alpine
WORKDIR /app

# Install necessary system libraries
RUN apk add --no-cache libc6-compat bash

# Copy project files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY . .

# Copy env file for build
COPY .env.build .env

# Build-time args for Docker
ARG PORT=3000
ARG APPINSIGHTS_CONNECTION_STRING

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=$PORT
ENV APPINSIGHTS_CONNECTION_STRING=$APPINSIGHTS_CONNECTION_STRING

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Build Next.js app (force Webpack to avoid Turbopack dynamic require issues)
RUN NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_TURBOPACK=0 \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Set ownership for all files
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE ${PORT}

# Use entrypoint to ensure PORT env is expanded at runtime
ENTRYPOINT ["sh", "-c"]
CMD ["npm run start -- -p $PORT"]
