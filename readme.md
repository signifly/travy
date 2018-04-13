## Setup

### Docker development

``` bash
# api defaults to api.sikane.signifly.com
# create .env to change api endpoint

# start container(s) and open localhost:3000
$ docker-compose up
```

### Docker production

``` bash
# pull latest images
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

# start
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans
```
