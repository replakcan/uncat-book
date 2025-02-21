FROM node:alpine

WORKDIR /app
RUN apk add python3 make g++
ADD package.json package-lock.json ./
RUN npm install

ADD vite.config.js .

VOLUME [ "/app/src" ]
VOLUME [ "/app/public" ]

CMD ["npm", "run", "dev"]