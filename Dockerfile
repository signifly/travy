from node:8-alpine

# upgrade packages
RUN apk update && apk upgrade

# install packages
RUN apk add bash git

# install global npm packages
RUN yarn global add npm-check-updates

WORKDIR /app

# install dependencies
COPY package.json ./
COPY yarn.lock ./

# install app
RUN yarn

COPY . .

ARG api=api.sikane.signifly.com
ENV api=${api}

RUN npm run build

CMD npm run start
