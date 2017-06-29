#!/usr/bin/env sh

docker build -f build/Dockerfile -t jzaefferer/bangen .
docker push jzaefferer/bangen
