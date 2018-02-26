from node:8-alpine

# upgrade packages
RUN apk update && apk upgrade

# install packages
RUN apk add bash git

# install global npm packages
RUN yarn global add npm-check-updates

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN npm run prod

CMD npm run start
