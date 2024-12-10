#!/bin/bash

# REMOTE_PATH="~/traefik-proxy/apps/nmc-docker"
# REMOTE_HOST="arm1"

REMOTE_HOST=$1
REMOTE_PATH=$2
IMAGE_NAME_WITH_TAG=$3

# Check if all arguments are provided
if [[ -z "$REMOTE_PATH" || -z "$REMOTE_HOST" || -z "$IMAGE_NAME_WITH_TAG" ]]; then
  echo "Incorrect args, usage: $0 <remote_path> <remote_host> <image_name>"
  exit 1
fi

# Navigate to the docker-compose.yml folder
ssh $REMOTE_HOST "cd $REMOTE_PATH && \

            echo 'Old image id:' && \
            \$(docker image ls --format='{{.Repository}}:{{.ID}}' | grep '$IMAGE_NAME_WITH_TAG')

            docker compose down && \
            docker image rm '$IMAGE_NAME_WITH_TAG' && \

            docker compose up -d && \
            
            echo 'New image id:' && \
            \$(docker image ls --format='{{.Repository}}:{{.ID}}' | grep '$IMAGE_NAME_WITH_TAG')"
            
