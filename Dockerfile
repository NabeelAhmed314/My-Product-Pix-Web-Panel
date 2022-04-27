FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add python3
RUN apk add build-base

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
