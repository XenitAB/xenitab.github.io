.ONESHELL:
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

all: install-site build

.SILENT:
serve: all
	yarn start

.SILENT:
build:
	yarn build

.SILENT:
install-site:
	yarn
