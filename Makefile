.PHONY: test clean push pull publish

test:  test.js
	node $<

clean:
	rm -f HashWrapper.js empty.js

push: assert.js
	clasp push

pull:
	clasp pull

publish:
	npm publish

prepare:
	sudo apt-get update; \
	sudo apt-get upgrade -y; \
	sudo npm update -g ;\
	sudo n stable ;\
	sudo npm install -g npm ;\
	sudo npm install -g clasp

assert.js: myassert.js
	browserify -s assert -r assert -o $@ myassert.js 

empty.js:
	touch empty.js

