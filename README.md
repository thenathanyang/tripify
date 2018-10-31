# tripify

Steps to get dev environment running:

1. Install yarn: https://yarnpkg.com/en/
2. Install Docker: https://docs.docker.com/install/
3. `cd` to this repo
4. run `make -j4`
5. Once you see "Compiled successfully" you can access the frontend at `http://localhost:8888`
6. As you update files in the backend and frontend, both will automatically recompile, restart, and update in the browser.

Steps to deploy:

1. Install the heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Run `heroku login`
3. Run `make deploy`
4. Check `http://tripify-188.herokuapp.com`
