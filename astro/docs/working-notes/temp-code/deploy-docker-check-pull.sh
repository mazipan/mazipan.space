# if pull and if id1 !== id2

ssh $REMOTE_HOST "cd $REMOTE_PATH && \

    # Try to pull the new image, exit early if it fails
    docker pull $IMAGE_NAME_WITH_TAG || { echo 'Docker pull failed, aborting.'; exit 1; } && \

    # Get the image ID of the current image
    OLD_IMAGE_ID=\$(docker images -q $IMAGE_NAME_WITH_TAG) && \

    # Get the newly pulled image ID
    NEW_IMAGE_ID=\$(docker images -q $IMAGE_NAME_WITH_TAG) && \

    # Compare old and new image IDs, exit if they are the same
    if [ \"\$OLD_IMAGE_ID\" = \"\$NEW_IMAGE_ID\" ]; then \
        echo 'Image is already up to date. Exiting.'; \
        exit 0; \
    fi && \

    # Stop the running containers
    docker compose down && \

    # Remove the old image if it exists
    [ -n \"\$OLD_IMAGE_ID\" ] && docker image rm \$OLD_IMAGE_ID || true && \

    # Bring up the containers with the new image
    docker compose up -d"
