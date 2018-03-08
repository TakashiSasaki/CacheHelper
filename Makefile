.PHONY: test

test: HashWrapper.js test.js
	node test.js

test-array:
	node array.js

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

assert.js: 
	touch empty.js ;\
	browserify -s assert -r assert -o $@ empty.js ;\
	rm empty.js

empty.js:
	touch empty.js

HashWrapper.js: class.js empty.js
	browserify -s HashWrapper -o $@ -r assert -r ./class empty.js ;\
	rm empty.js

