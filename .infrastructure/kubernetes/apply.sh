#!/bin/sh

kubectl apply -f ./frontend-namespace.yaml
kubectl apply -f ./frontend-deployment.yaml
