default: dev

build:
	docker-compose build
	touch build

backend-deps:
	pushd backend; yarn; popd

ui-deps:
	pushd ui; yarn; popd

dev: backend-deps ui-deps build
	docker-compose up
