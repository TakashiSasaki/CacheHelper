.PHONY: test clean push pull publish MyAssert

all: test

test:  test.js 
	node $<

MyAssert:
	make -C $@ 

clean:
	@rm -f HashWrapper.js empty.js assert.js

push: assert.js
	clasp push

pull:
	clasp pull

publish:
	npm publish

prepare:
	@sudo apt-get update; sudo apt-get upgrade -y; sudo apt-get autoremove; \
	sudo n stable ;\
	sudo npm -g update ;\
	sudo npm -g install npm @google/clasp;

assert.js: MyAssert/assert.js MyAssert
	cp $< $@

