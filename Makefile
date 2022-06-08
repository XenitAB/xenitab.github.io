.ONESHELL:
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

all: install-site build

.PHONY: assets
assets:
	docker run --rm -it -v $(PWD):/data rlespinasse/drawio-export:4.1.0 -s 3 -b 10 -f jpg --remove-page-suffix -o /data/static/img/assets/xkf/operator-guide/ /data/assets/xkf/operator-guide/
	docker run --rm -it -v $(PWD):/data rlespinasse/drawio-export:4.1.0 -s 3 -b 10 -f jpg --remove-page-suffix -o /data/static/img/assets/xkf/developer-guide/ /data/assets/xkf/developer-guide/

.SILENT:
serve: all
	yarn start

.SILENT:
build:
	yarn build

.SILENT:
install-site:
	yarn

# markdownlint-cli
# Assumes that you have npm installed
.PHONY: markdownlint-install
markdownlint-install:
	npm install markdownlint-cli

.PHONY: markdownlint
markdownlint:
	node_modules/.bin/markdownlint -c .markdown-lint.yml docs/
