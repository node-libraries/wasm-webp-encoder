#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "src/webp/encode.h"

using namespace emscripten;

val encode(std::string img_in, int width, int height, float quality) {
  uint8_t* img_out;
  size_t size = WebPEncodeRGBA((uint8_t*)img_in.c_str(), width, height, width * 4, quality, &img_out);
  val result = size ? val::global("Uint8Array").new_(typed_memory_view(size, img_out)) : val::null();
  WebPFree(img_out);
  return result;
}

EMSCRIPTEN_BINDINGS(my_module) {
  function("encode", &encode);
}