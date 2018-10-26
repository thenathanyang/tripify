# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.8

# Download and install packages
RUN apk add -U nodejs yarn npm g++ make python

# Work in the ui directory
WORKDIR /var/www/ui

# Start the development server
CMD ["/bin/sh", "-c", "(node -e 'require(\"node-sass\")' || npm rebuild node-sass) && yarn dev"]
