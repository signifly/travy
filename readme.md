## Setup

### Docker development

``` bash
# start container(s)
$ docker-compose up

# login to container
$ docker exec -it sikane-app bash

# run developement on localhost:3000
$ npm run dev

# run developement on localhost:3000 and use the staging api
$ npm run dev-staging

# build project
$ npm run prod
```

### Docker production

``` bash
# pull latest images
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

# start
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans
```
