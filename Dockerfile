FROM node:20-slim

ENV NODE_ENV=development
WORKDIR /usr/src/app

RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000
