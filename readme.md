# Travy

Dynamic CMS, WIP

## Install

```
$ npm install @signifly/travy
```

## Usage

```js
import {components, setup, utils} from "@signifly/travy";
import "@signifly/travy/dist/lib.css";

const vm = setup({
	api: "https://domain", // required
	init({router, store}) {},
	fields: {}
});
```

## Development

```sh
# create .env to change environment variables

# development
$ docker-compose up

# build
$ docker-compose run --rm app yarn build-app|lib

# test
$ docker-compose run --rm app yarn test

# release
$ npm run release

# documentation on localhost:3000/meta
```
