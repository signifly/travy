## Setup

### Docker development

``` bash
# create .env to change api endpoint
# start container(s) and open localhost:3000
$ docker-compose up
```

### Docker production

``` bash
# pull latest images
$ docker-compose -f docker-compose.prod.yml pull

# start
$ docker-compose -f docker-compose.prod.yml up -d --remove-orphans
```
