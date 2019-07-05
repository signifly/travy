# Travy

Dynamic CMS, WIP

## Install

```
$ npm install @signifly/travy
```

## Usage

```js
import {Vue, app, utils, components} from "@signifly/travy";
import "@signifly/travy/dist/lib.css";

const instance = app({
	api: "https://domain", // required
	routes: [],
	fields: {}
});
```

## Development

```bash
# create .env to change environment variables

# development
$ docker-compose up

# build
$ docker-compose run --rm app yarn build-{app/lib}

# test
$ docker-compose run --rm app yarn test

# release
$ npm run release

# documentation on localhost:3000/meta
```
