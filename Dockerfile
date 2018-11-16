from node:10-alpine

RUN apk update && apk add bash

# install global npm packages
RUN yarn global add npm-check-updates @vue/cli netlify-cli

WORKDIR /app

# install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# install app
COPY . .

ARG API
ENV API=${API}

RUN yarn build
