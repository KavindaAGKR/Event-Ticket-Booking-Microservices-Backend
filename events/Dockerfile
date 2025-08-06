FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

# Create a non-root user
RUN addgroup -S appuser && adduser -S -G appuser appuser
USER appuser

EXPOSE 3002

CMD ["node", "dist/index.js"]