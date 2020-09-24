#!/bin/bash
set -eu

export PORT=${PORT:-8080}

echo "$PORT"

envsubst '${PORT} ${CONTAINER_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
