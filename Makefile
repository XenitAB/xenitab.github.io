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

drawio:
	draw.io -s 3 -x -f jpeg -o static/img/diagrams assets/
