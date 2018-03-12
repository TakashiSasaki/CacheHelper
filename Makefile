.PHONY: test clean push pull

test:  test.js
	node $<

clean:
	rm -f HashWrapper.js empty.js

push:
	clasp push

pull:
	clasp pull

prepare:
	sudo apt-get update; \
	sudo apt-get upgrade -y; \
	sudo npm update -g ;\
	sudo n stable ;\
	sudo npm install -g npm ;\
	sudo npm install -g clasp

assert.js: 
	touch empty.js ;\
	browserify -s assert -r assert -o $@ empty.js ;\
	rm empty.js

empty.js:
	touch empty.js

