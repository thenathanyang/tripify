build-dev:
	docker-compose build
	touch build-dev

backend-deps:
	pushd backend; yarn; popd

ui-deps:
	pushd ui; yarn; popd

dev: backend-deps ui-deps build-dev
	docker-compose up

build:
	docker build -t tripify:latest .

start:
	docker run -p "3000:3000" -e "PORT=3000" --rm -it tripify:latest

deploy:
	heroku container:login
	heroku container:push web -a tripify-188
	heroku container:release web -a tripify-188
