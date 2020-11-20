.ONESHELL:
SHELL := /bin/bash

all: clean home terraform-modules azure-devops-templates

.SILENT:
clean:
	rm -rf generated
	rm -rf output
	mkdir generated
	mkdir output

.SILENT:
home:
	cp -r docs/* generated/

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
azure-devops-templates:
	rm -rf output/azure-devops-templates
	git clone https://github.com/XenitAB/azure-devops-templates.git output/azure-devops-templates
	DOCS=$$(find output/azure-devops-templates -name *.md -mindepth 2)
	for doc in $$DOCS; do
		GENERATED_FILE=$$(echo $$doc | sed "s|output/|generated/docs/|g" | sed "s|/README||g")
		mkdir -p $${GENERATED_FILE%/*}
		cp $$doc $$GENERATED_FILE
	done
	cp output/azure-devops-templates/README.md generated/docs/azure-devops-templates/README.md
	cp -r output/azure-devops-templates/assets generated/docs/azure-devops-templates/

.SILENT:
serve: all
	mkdocs serve -f generated/mkdocs.yml

.SILENT:
build: all
	mkdocs build -f generated/mkdocs.yml

.SILENT:
install-mkdocs:
	python3 -m pip install --upgrade pip
	python3 -m pip install mkdocs
	python3 -m pip install mkdocs-material
