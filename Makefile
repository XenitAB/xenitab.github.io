.ONESHELL:
SHELL := /bin/bash

all: clean home terraform-modules

.SILENT:
clean:
	rm -rf generated
	rm -rf output
	mkdir generated
	mkdir output

.SILENT:
home:
	cp -r docs/ generated/

.SILENT:
terraform-modules:
	rm -rf output/terraform-modules
	git clone https://github.com/XenitAB/terraform-modules.git output/terraform-modules
	DOCS=$$(find output/terraform-modules -name *.md -mindepth 4 -maxdepth 4)
	for doc in $$DOCS; do
		GENERATED_FILE=$$(echo $$doc | sed "s|output/|generated/docs/|g" | sed "s|/README||g")
		mkdir -p $${GENERATED_FILE%/*}
		cp $$doc $$GENERATED_FILE
	done
	cp output/terraform-modules/README.md generated/docs/terraform-modules/README.md

.SILENT:
serve: all
	mkdocs serve -f generated/mkdocs.yml

.SILENT:
gh-actions: all
	set -e
	if [ -n "${GITHUB_TOKEN}" ]; then
		remote_repo="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
		git remote rm origin
		git remote add origin "${remote_repo}"
		mkdocs gh-deploy --config-file generated/mkdocs.yml --force
	else
		echo ERROR: This should only be used with GitHub Actions.
		exit 1
	fi