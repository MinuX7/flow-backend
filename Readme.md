## Deploy flow backend
* `docker build -t flow-backend .`
* `docker tag flow-backend 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-backend:v1.0`
* `docker push 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-backend:v1.0`