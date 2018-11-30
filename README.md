# Tripify

Team 200 OK's project for CS 188: Human Computer Interaction, Fall 2018

## Repository Overview

- We used Docker to run the development environment and build the image that gets deployed to Heroku.
- The `backend` folder contains a minimal implementation of a RESTful Node.js server that the frontend talks to in order to store user and trip information.
  - `controllers` contains the logic for storing trips and users
  - `routes` exposes the controller logic as an API and validates requests
  - `index.js` is the entrypoint to the server
- The `ui` folder contains the React source code for the entire frontend application.
  - We used `webpack` to build the React source code
  - `src/components` contains reusable components, such as input fields, title, subheading, date picker, tiles, etc. so that we have a consistent UI
  - `src/models` contains data models used to reliably interchange data between views and with the backend
  - `src/pages` implements the main structure and functionality of each of the screens of out application
  - `src/reducers` contains all of the state-management logic and communication with the backend
  - `src/main.jsx` is the entrypoint to the React application and contains all of the routing logic
  - `src/main.scss` contains basic SCSS variables used to make fonts, colors, and sizes consistent throughout the UI

## Development Environment

1. Install yarn: https://yarnpkg.com/en/
2. Install Docker: https://docs.docker.com/install/
3. `cd` to this repo
4. run `make dev -j4`
5. Once you see "Compiled successfully" you can access the frontend at `http://localhost:8888`
6. As you update files in the backend and frontend, both will automatically recompile, restart, and update in the browser.

## Deploy Instructions

1. Install the heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Run `heroku login`
3. Run `make deploy`
4. Check [http://tripify-188.herokuapp.com](http://tripify-188.herokuapp.com)
