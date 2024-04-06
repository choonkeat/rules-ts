run: src/rules_engine.ts
	npx ts-node -O '{ "noImplicitAny": false, "noUnusedParameters": false, "noImplicitReturns": false }' src/index.ts

src/rules_engine.ts: src/generator.ts
	@npx ts-node ./src/generator.ts > src/rules_engine.ts

build:
	npx tsc --build

start: build
	node ./dist
