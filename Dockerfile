# Set the base image to Ubuntu
FROM ubuntu:14.04

MAINTAINER Adrien Desbiaux

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install git && \
    apt-get -y install wget && \
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
    apt-get install --yes nodejs

# Install PM2
RUN npm install -g pm2

RUN mkdir -p /var/www/app

# Define working directory
WORKDIR /var/www/app

ADD . /var/www/app

RUN npm install

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker/nginx/docker-entrypoint.sh"]

# Expose port
EXPOSE 3000

# Run app
CMD pm2 start --no-daemon  processes.json