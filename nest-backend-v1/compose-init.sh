#!/bin/bash

set -xe

INFRA_COMPOSE_PATH=./docker-compose-infra.yaml
MAIN_COMPOSE_PATH=./docker-compose.yaml

if [ "$1" = "up" ]; then
  docker compose -f $INFRA_COMPOSE_PATH $@
  docker compose -f $MAIN_COMPOSE_PATH $@
elif [ "$1" = "down" ]; then
  docker compose -f $MAIN_COMPOSE_PATH $@
  docker compose -f $INFRA_COMPOSE_PATH $@
else
  # exec
  docker compose -f $MAIN_COMPOSE_PATH $@
fi

# 1. 최초에 이 파일로 프로젝트를 켭니다
# 2. 작업중인 환경을 재시작 하고 싶은 경우 `docker compose down -v` 를 사용합니다
# 3. 인프라만 재시작하고 싶은 경우 `docker compose -f ./docker-compose-infra.yaml down -v` 를 사용합니다
