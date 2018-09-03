#!/bin/bash -e
sed -i s/localhost/localhost/g /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf
exec "$@"