## Deploy flow backend
* `docker build -t flow-backend .`
* `docker tag flow-backend 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-backend:v1.0`
* `docker push 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-backend:v1.0`
* `ECS create Task Definition`
        `Crate new revision. Task role=none, TAsk memory=256, Add container. `
            `Post mapping 5050:5000`
        `Stop backend task `
        `Run new task. Choose task definition.`