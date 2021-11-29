SHELL=/bin/bash
webp: src/webp.cpp
	emcc -O3 --bind -msimd128 \
    -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s ENVIRONMENT=web,worker -s EXPORT_ES6=1 -s DYNAMIC_EXECUTION=0 -s MODULARIZE=1 \
    -I libwebp src/webp.cpp -o dist/webp.js \
    libwebp/src/{dsp,enc,utils}/*.c
