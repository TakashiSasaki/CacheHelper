.PHONY: test

test: test-array
	node test.js

test-array:
	node array.gs

push:
	clasp push

pull:
	clasp pull

prepare:
	sudo apt-get update; \
	sudo apt-get upgrade -y; \
	sudo npm update -g ;\
	sudo n stable ;\
	sudo npm install -g clasp


