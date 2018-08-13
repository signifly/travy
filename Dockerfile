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

ARG API
ENV API=${API}

RUN yarn build

CMD yarn start
