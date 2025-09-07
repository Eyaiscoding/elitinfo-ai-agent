# =====================
# Base image
# =====================
FROM node:20-alpine
WORKDIR /app

# Install system libraries for CSS/PostCSS + building native modules
RUN apk add --no-cache libc6-compat bash python3 g++ make git

# Copy only package files first for dependency caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
      echo "Lockfile not found." && exit 1; \
    fi

# Copy the rest of the project files
COPY . ./

# Copy env file for build
COPY .env.build .env

# Build-time args
ARG PORT=3000
ARG APPINSIGHTS_CONNECTION_STRING

# Runtime env variables
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV APPINSIGHTS_CONNECTION_STRING=${APPINSIGHTS_CONNECTION_STRING}

# Force Next.js to use Webpack (disable Turbopack)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_TURBOPACK=0

# Build Next.js app
RUN if [ -f yarn.lock ]; then \
      yarn build; \
    elif [ -f package-lock.json ]; then \
      npm run build; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm run build; \
    else \
      echo "Lockfile not found." && exit 1; \
    fi

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE ${PORT}

ENTRYPOINT ["sh", "-c"]
CMD ["npm run start -- -p $PORT"]
