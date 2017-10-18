#!/bin/bash

JAR_FILE=cheetah-run-swarm.jar
IMAGE_TAG=gepardec/cheetah-run


cp ../target/$JAR_FILE .
docker build -t $IMAGE_TAG .
rm $JAR_FILE

#oc cluster up
#oc login -u developer -p anypassword

#docker tag docker tag $IMAGE_TAG 172.30.1.1:5000/$IMAGE_TAG
#docker login 172.30.1.1:5000 -u `oc whoami` -p `oc whoami -t`
#docker push 172.30.1.1:5000/$IMAGE_TAG

#oc new-app $IMAGE_TAG

