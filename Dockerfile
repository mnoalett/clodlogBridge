FROM node:lts as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-slim
ENV NODE_ENV production
USER node

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist
EXPOSE 9876
CMD [ "node", "dist/app.js" ]