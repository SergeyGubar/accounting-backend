local-branch=$(shell git branch | grep \* | cut -d ' ' -f2)
local-sha=$(shell git rev-parse --short --verify HEAD)
tag=gubarsergey/accounting-backend:latest

image:
	docker build -f server.Dockerfile --build-arg GIT_COMMIT=$(local-sha) --build-arg GIT_BRANCH=$(local-branch) -t $(tag) .

push:
    docker push $(tag)

run-local:
	docker run -it -p 8080:80 $(repo)

push:
	docker push gubarsergey/accounting-backend

deploy:
	make image
	docker push gubarsergey/accounting-backend
