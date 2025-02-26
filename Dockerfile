FROM node:20 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# stage 2: production
FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/main.js"]
