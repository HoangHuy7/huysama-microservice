#!/bin/sh

usage() {
	echo "Usage: sh copy.sh"
	exit 1
}

echo "begin copy authentication service"
cp ./authentication-service/target/authentication-service.jar ../microservice-huysama-authentication-service/application.jar
