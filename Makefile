.ONESHELL:
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

# Docusaurus v3 requires Node.js >= 18.0
all: install-site build

.PHONY: assets
assets:
	docker run --rm -it -v $(PWD):/data rlespinasse/drawio-export:4.1.0 -s 3 -b 10 -f jpg --remove-page-suffix -o /data/static/img/assets/xks/operator-guide/ /data/assets/xks/operator-guide/
	docker run --rm -it -v $(PWD):/data rlespinasse/drawio-export:4.1.0 -s 3 -b 10 -f jpg --remove-page-suffix -o /data/static/img/assets/xks/developer-guide/ /data/assets/xks/developer-guide/
	docker run --rm -it -v $(PWD):/data rlespinasse/drawio-export:4.1.0 -s 3 -b 10 -f jpg --remove-page-suffix -o /data/static/img/assets/xenit-style-guide/ /data/assets/xenit-style-guide/

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
