FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build 

FROM node:alpine AS runner

WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

EXPOSE 9000

CMD ["node", "dist/server.js"]