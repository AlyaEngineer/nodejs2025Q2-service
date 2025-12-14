# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl bash libc6-compat

COPY package*.json ./

RUN npm ci

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Runtime
FROM node:24-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache openssl bash libc6-compat

COPY package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/doc ./doc
COPY prisma.config.ts ./

RUN rm -rf ./dist/**/*.ts ./dist/**/*.map

EXPOSE 4000

COPY entrypoint.sh .
RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh
ENTRYPOINT ["sh", "./entrypoint.sh"]
