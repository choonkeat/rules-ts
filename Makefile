# export PATH := $(PATH):./node_modules/.bin

build:
	npx tsc --build

serve:
	npx ts-node ./src

start:
	node ./dist
