## Setup

### Docker setup
``` bash
# create docker network
$ docker network create sikane

# start container(s)
$ docker-compose up

# login to container
$ docker exec -it sikane-app bash

# run developement on localhost:3000
$ cd /app && npm run dev

# run developement on localhost:3000 and use the staging api
$ cd /app && npm run dev-staging

# build project
$ cd /app && npm run build
```


### Or manual setup
- install node 8+

``` bash
$ npm install
$ npm run dev
$ npm run build
```
