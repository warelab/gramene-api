PACKAGE   = gramene-api
NPM      ?= npm
NPMBIN    = ./node_modules/.bin
MOCHA     = $(NPMBIN)/mocha
MOCHAOPTS = --require should

all: submodules deps test

submodules: .gitmodules
	@ git submodule update --init

sage/node_modules:

node_modules:
	@ $(NPM) install
	@ $(NPM) install sage

deps-npm: node_modules sage/node_modules

deps: deps-npm

test: deps
	@ $(MOCHA) $(MOCHAOPTS)

dist-clean:
	rm -rf node_modules

.PHONY: all