FROM public.ecr.aws/docker/library/node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Create a non-root user
RUN addgroup -S appuser && adduser -S -G appuser appuser
USER appuser

EXPOSE 3002

CMD ["node", "dist/index.js"]