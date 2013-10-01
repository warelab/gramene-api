PACKAGE   = gramene-api
NPM      ?= npm
NPMBIN    = ./node_modules/.bin
MOCHA     = $(NPMBIN)/mocha
MOCHAOPTS = --require should

all: deps test

.gitmodules:
	@ git submodule update --init

deps-npm: package.json
	@ $(NPM) install

deps: deps-npm .gitmodules

test: deps
	@ $(MOCHA) $(MOCHAOPTS)

dist-clean:
	rm -rf node_modules

.PHONY: all