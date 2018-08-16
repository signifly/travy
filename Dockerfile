from node:9-alpine

# install packages
RUN apk update && apk add bash ca-certificates wget

# install netlifyctl
RUN wget -qO- "https://cli.netlify.com/download/latest/linux" | tar xz -C /usr/local/bin

# install global npm packages
RUN yarn global add npm-check-updates

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
