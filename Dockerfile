# =====================
# Base image
# =====================
FROM node:20-alpine
WORKDIR /app

# Install necessary system libraries
RUN apk add --no-cache libc6-compat bash

# Copy project files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY . ./

# Copy env file for build
COPY .env.build .env

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Build Next.js app
RUN if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Set production environment
ENV NODE_ENV=production
ENV PORT=${PORT:-3000}
ENV APPINSIGHTS_CONNECTION_STRING=${APPINSIGHTS_CONNECTION_STRING}

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Set ownership for all files
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE ${PORT}

# Use entrypoint to ensure PORT env is expanded
ENTRYPOINT ["sh", "-c"]
CMD ["npm run start -- -p $PORT"]
