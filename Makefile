all: start-example-node

start: start-example-html

build: build-bind-nanovg build-nanovg build-example

clean: clean-bind-nanovg clean-nanovg clean-example

# bind-nanovg

NANOVG_PATH = nanovg
NANOVG_SOURCE_HXX += $(NANOVG_PATH)/src/nanovg.h
NANOVG_SOURCE_HXX += $(NANOVG_PATH)/src/fontstash.h
NANOVG_SOURCE_HXX += $(NANOVG_PATH)/src/stb_image.h
NANOVG_SOURCE_HXX += $(NANOVG_PATH)/src/stb_truetype.h
NANOVG_SOURCE_CXX += $(NANOVG_PATH)/src/nanovg.c
NANOVG_OUTPUT_BC = $(NANOVG_SOURCE_CXX:%.c=%.bc)

BIND_NANOVG_SOURCE_D_TS = bind-nanovg.d.ts
BIND_NANOVG_SOURCE_CXX = bind-nanovg.cpp
BIND_NANOVG_OUTPUT_BC = bind-nanovg.bc
BIND_NANOVG_OUTPUT_JS = bind-nanovg.js

# debug flags
# FLAGS += -g4
# FLAGS += -O0
# FLAGS += --source-map-base http://127.0.0.1:8080/
# FLAGS += -s ASSERTIONS=1
# FLAGS += -s DEMANGLE_SUPPORT=1
# FLAGS += -s SAFE_HEAP=1

FLAGS += -Os
FLAGS += -s NO_FILESYSTEM=1
# FLAGS += -s WASM=1
FLAGS += -s MODULARIZE=1
# FLAGS += -s EXPORT_NAME=\"NVG\"
FLAGS += -s EXPORT_BINDINGS=1
# FLAGS += -s EXPORT_ALL=1
# FLAGS += -s MEM_INIT_METHOD=0
# FLAGS += --memory-init-file 0
FLAGS += -s SINGLE_FILE=1
# FLAGS += -s BINARYEN_ASYNC_COMPILATION=0
# FLAGS += -s BINARYEN_METHOD=\"native-wasm,asmjs\"
# FLAGS += -s BINARYEN_METHOD=\"interpret-asm2wasm,asmjs\"
# FLAGS += -s TOTAL_MEMORY=4194304
# FLAGS += -s ALLOW_MEMORY_GROWTH=1

build-bind-nanovg: bind-nanovg.js

clean-bind-nanovg:
	rm -f $(NANOVG_OUTPUT_BC)
	rm -f $(BIND_NANOVG_OUTPUT_BC)
	rm -f bind-nanovg.js bind-nanovg.js.*
	rm -f bind-nanovg.wasm bind-nanovg.wasm.*

%.bc: %.c $(NANOVG_SOURCE_HXX)
	emcc $(FLAGS) -I $(NANOVG_PATH)/src $< -o $@

%.bc: %.cpp $(NANOVG_SOURCE_HXX)
	emcc $(FLAGS) -I $(NANOVG_PATH)/src $< -o $@

bind-nanovg.bc: bind-nanovg.cpp $(NANOVG_SOURCE_HXX)
	emcc $(FLAGS) -I $(NANOVG_PATH)/src --bind $< -o $@

bind-nanovg.js: $(NANOVG_OUTPUT_BC) $(BIND_NANOVG_OUTPUT_BC)
	emcc $(FLAGS) -I $(NANOVG_PATH)/src --bind $^ -o $@

# nanovg

build-nanovg:
	npm run build-nanovg

clean-nanovg:
	npm run clean-nanovg

# example

build-example:
	npm run build-example

clean-example:
	npm run clean-example

start-example: start-example-node

start-example-node:
	npm run start-example-node

start-example-html:
	npm run start-example-html

# native-example

build-native-example:
	(cd nanovg && ~/Downloads/premake5 gmake && make -C build)

clean-native-example:
	(cd nanovg && rm -rf build)

start-native-example:
	(cd nanovg/build && ./example_gles2)
