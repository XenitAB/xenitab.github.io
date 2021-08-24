.ONESHELL:
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

all: install-site build

assets:
	draw.io -s 3 -b 10 -x -f jpeg -o static/img/assets/xks/operator-guide/ assets/xks/operator-guide/
	draw.io -s 3 -b 10 -x -f jpeg -o static/img/assets/xks/developer-guide/ assets/xks/developer-guide/

.SILENT:
serve: all
	yarn start

.SILENT:
build:
	yarn build

.SILENT:
install-site:
	yarn
