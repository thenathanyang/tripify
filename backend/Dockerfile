# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.8

# Download and install packages
RUN apk add -U nodejs yarn

# Work in the backend directory
WORKDIR /var/www/backend

# Start the development server
CMD ["/bin/sh", "-c", "yarn dev"]
