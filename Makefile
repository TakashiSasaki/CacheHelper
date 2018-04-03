.PHONY: test clean push pull MyAssert

test: test.js HashWrapper.js
	node $<

MyAssert:
	make -C $@ 

clean:
	@rm -f HashWrapper.js empty.js assert.js

push:
	clasp push

pull:
	clasp pull

prepare:
	sudo apt-get update; \
	sudo apt-get upgrade -y; \
	sudo npm -g update ;\
	sudo n stable ;\
	sudo npm -g install clasp

assert.js: MyAssert/assert.js MyAssert
	cp $< $@

HashWrapper.js: getArray.js putArray.js append.js \
	getJson.js putJson.js getObject.js putObject.js  \
	getString.js putString.js class.js storage.js
	cat $^ >$@

