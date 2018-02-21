.PHONY: test

test: test-array
	node test.js

test-array:
	node array.gs

push:
	clasp push

pull:
	clasp pull

