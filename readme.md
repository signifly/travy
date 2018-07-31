## Setup

### Docker development

``` bash
# create .env to change api endpoint

# start app in development mode
$ docker-compose up

# build app locally
$ docker-compose run --rm app yarn build

# documentation on localhost:3000/meta
```

### Docker production

``` bash
# pull latest images
$ docker-compose -f docker-compose.prod.yml pull

# start
$ docker-compose -f docker-compose.prod.yml up -d --remove-orphans
```
