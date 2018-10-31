# build the frontend in its own container so we can throw away
# the useless dependencies and just use the build assets
FROM alpine:3.8 AS build-ui

# install build deps
RUN apk add -U nodejs yarn g++ make python

# create a workdir and install yarn dependencies
WORKDIR /ui
COPY ui/yarn.lock ui/package.json /ui/
RUN yarn --pure-lockfile

# copy the frontend source and build it
COPY ui/src /ui/src
COPY ui/static /ui/static
COPY ui/.babelrc /ui/.babelrc
COPY ui/webpack.config.js /ui/webpack.config.js
RUN ls -l && yarn build

# create a new build stage to build the backend and serve the
# static files
FROM alpine:3.8

# install node and yarn
RUN apk add -U nodejs yarn

# create a workdir and install yarn dependencies
WORKDIR /tripify
COPY backend/yarn.lock backend/package.json /tripify/
RUN yarn --pure-lockfile

# copy the source code and built static files from previous stage
COPY backend/ /tripify/
COPY --from=build-ui /ui/build/ /tripify/public/

# start the backend
CMD ["yarn", "start"]
