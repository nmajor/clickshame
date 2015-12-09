NODE_ENV=development DEBUG=express:* ./bin/www
NODE_ENV=test mocha --recursive
NODE_ENV=production pm2 start ./bin/www

NODE_ENV=test mocha --grep BUG --recursive

ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10

GET paths
/strikes/recent
/referenes/top
/references/find
/domains/top
/domains/find

POST paths
/strikes
/identities
/references/find
/domains/find


This app has been dockerized

### Docker usage notes

To build image:

    docker build -t clickshame .

To run in development:

    docker run -i --name clickshame -d -p 3000:80 -e NODE_ENV=development clickshame
    docker run -i --name clickshame -d -p 3000:80 -v /Users/nmajor/dev/clickshame_api:/var/www/clickshame -e PASSENGER_APP_ENV=development clickshame

Open bash session inside container

    docker exec -t -i clickshame bash -l

Adding ENV variables to the docker image: https://github.com/phusion/passenger-docker#setting-environment-variables-in-nginx


Build and reload container
    docker kill clickshame
    docker rm clickshame
    docker build -t clickshame .
    docker run -i --name clickshame -d -p 3000:80 -e PASSENGER_APP_ENV=development clickshame


### Tagging and pushing docker image

    docker tag [IMAGE_ID] nmajor/clickshame:latest

    docker login

    docker push nmajor/clickshame