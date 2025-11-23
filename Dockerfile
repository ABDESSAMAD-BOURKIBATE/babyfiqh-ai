# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy built frontend and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev --silent

EXPOSE 3000 3001

# Default env: serve static and run server on LIVE_PROXY_PORT (default 3001)
ENV LIVE_PROXY_PORT=3001
ENV PORT=3000

CMD ["node", "server/server.js"]
