.PHONY: test clean push pull publish MyAssert

NODE=NODE_PATH=$(NODE_PATH):MyAssert:. node

all: testHashWrapper testSimpleCache

testHashWrapper:  testHashWrapper.js 
	$(NODE) $<

testSimpleCache: testSimpleCache.js
	$(NODE) $<

MyAssert:
	make -C $@ 

clean:
	@rm -f HashWrapper.js empty.js assert.js

push: myassert-browserified.js
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

myassert-browserified.js: MyAssert/myassert-browserified.js MyAssert
	cp $< $@

merge:
	git pull ;\
	git merge github/SurfaePro5 ;\
	git merge github/sasaki64 ;\
	git push
