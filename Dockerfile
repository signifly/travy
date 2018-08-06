from node:9-alpine

# install packages
RUN apk update && apk add bash

# install global npm packages
RUN yarn global add npm-check-updates firebase-tools

WORKDIR /app

# install dependencies
COPY package.json ./
COPY yarn.lock ./

# install app
RUN yarn

COPY . .

ARG GMAPS_KEY
ARG API=https://api.forhandler-stila.stage71.signifly.com

ENV GMAPS_KEY=${GMAPS_KEY} API=${API}

RUN yarn build

CMD yarn start
