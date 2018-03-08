.PHONY: test clean push pull

test: test.js HashWrapper.js
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
	sudo npm install -g clasp

assert.js: 
	touch empty.js ;\
	browserify -s assert -r assert -o $@ empty.js ;\
	rm empty.js

empty.js:
	touch empty.js

HashWrapper.js: getArray.js putArray.js append.js \
	getJson.js putJson.js getObject.js putObject.js  \
	getString.js putString.js class.js storage.js
	cat $^ >$@

