PACKAGE   = gramene
MOCHA     = ./node_modules/mocha/bin/mocha
MOCHAOPTS = --require should
NPM      ?= npm

all: deps test

deps: deps-npm deps-submodules
	
deps-submodules: .gitmodules
	@ git submodule update --init

deps-npm: package.json
	@ $(NPM) install

test: deps
	@ $(MOCHA) $(MOCHAOPTS)

.PHONY: test deps all
