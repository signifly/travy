from node:12-alpine as build

WORKDIR /app

# install dependencies
COPY package.json yarn.lock ./
RUN yarn

# install app
COPY . .

ARG API
ENV API=${API}

RUN yarn build-app

from node:12-alpine as dist

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/netlify.toml .
