import * as Bind from "./bind-nanovg";
export { Bind };

let bind: Bind.Module;
export default async function (value?: Partial<Bind.Module>): Promise<void> {
  return new Promise<void>((resolve: () => void) => {
    Bind.default(value).then((value: Bind.Module): void => {
      bind = value;
      resolve();
    });
  });
}
export { bind };

export const NVG_PI = 3.14159265358979323846264338327;

// typedef struct NVGcontext NVGcontext;
export type NVGcontext = Bind.NVGcontext;

// static float nvg__sqrtf(float a) { return sqrtf(a); }
function nvg__modf(a: number, b: number): number { return a % b; }
// static float nvg__sinf(float a) { return sinf(a); }
// static float nvg__cosf(float a) { return cosf(a); }
// static float nvg__tanf(float a) { return tanf(a); }
// static float nvg__atan2f(float a,float b) { return atan2f(a, b); }
// static float nvg__acosf(float a) { return acosf(a); }

// static int nvg__mini(int a, int b) { return a < b ? a : b; }
// static int nvg__maxi(int a, int b) { return a > b ? a : b; }
// static int nvg__clampi(int a, int mn, int mx) { return a < mn ? mn : (a > mx ? mx : a); }
// static float nvg__minf(float a, float b) { return a < b ? a : b; }
// static float nvg__maxf(float a, float b) { return a > b ? a : b; }
// static float nvg__absf(float a) { return a >= 0.0f ? a : -a; }
// static float nvg__signf(float a) { return a >= 0.0f ? 1.0f : -1.0f; }
function nvg__clampf(a: number, mn: number, mx: number): number { return a < mn ? mn : mx < a ? mx : a; }
// static float nvg__cross(float dx0, float dy0, float dx1, float dy1) { return dx1*dy0 - dx0*dy1; }

// struct NVGcolor {
//   union {
//     float rgba[4];
//     struct {
//       float r,g,b,a;
//     };
//   };
// };
// typedef struct NVGcolor NVGcolor;
export class NVGcolor implements Bind.NVGcolor {
  constructor(public rgba: Float32Array = new Float32Array(4)) {
  }
  get r(): number { return this.rgba[0]; } set r(value: number) { this.rgba[0] = value; }
  get g(): number { return this.rgba[1]; } set g(value: number) { this.rgba[1] = value; }
  get b(): number { return this.rgba[2]; } set b(value: number) { this.rgba[2] = value; }
  get a(): number { return this.rgba[3]; } set a(value: number) { this.rgba[3] = value; }
}

// struct NVGpaint {
//   float xform[6];
//   float extent[2];
//   float radius;
//   float feather;
//   NVGcolor innerColor;
//   NVGcolor outerColor;
//   int image;
// };
// typedef struct NVGpaint NVGpaint;
export class NVGpaint implements Bind.NVGpaint {
  readonly xform: Float32Array;
  readonly extent: Float32Array;
  readonly _radius: Float32Array;
  readonly _feather: Float32Array;
  readonly innerColor: NVGcolor;
  readonly outerColor: NVGcolor;
  image: number = 0;
  constructor(_array = new Float32Array(18)) {
    this.xform = new Float32Array(_array.subarray(0, 6));
    this.extent = new Float32Array(_array.subarray(6, 8));
    this._radius = new Float32Array(_array.subarray(8, 9));
    this._feather = new Float32Array(_array.subarray(9, 10));
    this.innerColor = new NVGcolor(new Float32Array(_array.subarray(10, 14)));
    this.outerColor = new NVGcolor(new Float32Array(_array.subarray(14, 18)));
  }
  get radius(): number { return this._radius[0]; }
  set radius(value: number) { this._radius[0] = value; }
  get feather(): number { return this._feather[0]; }
  set feather(value: number) { this._feather[0] = value; }
}

export enum NVGwinding {
  CCW = 1,  // Winding for solid shapes
  CW = 2,   // Winding for holes
}

export enum NVGsolidity {
  SOLID = 1,  // CCW
  HOLE = 2,   // CW
}

export enum NVGlineCap {
  BUTT,
  ROUND,
  NVG_SQUARE,
  BEVEL,
  MITER,
}

export enum NVGalign {
  // Horizontal align
  LEFT = 1 << 0,      // Default, align text horizontally to left.
  CENTER = 1 << 1,    // Align text horizontally to center.
  RIGHT = 1 << 2,     // Align text horizontally to right.
  // Vertical align
  TOP = 1 << 3,       // Align text vertically to top.
  MIDDLE = 1 << 4,    // Align text vertically to middle.
  BOTTOM = 1 << 5,    // Align text vertically to bottom.
  BASELINE = 1 << 6,  // Default, align text vertically to baseline.
}

export enum NVGblendFactor {
  ZERO = 1 << 0,
  ONE = 1 << 1,
  SRC_COLOR = 1 << 2,
  ONE_MINUS_SRC_COLOR = 1 << 3,
  DST_COLOR = 1 << 4,
  ONE_MINUS_DST_COLOR = 1 << 5,
  SRC_ALPHA = 1 << 6,
  ONE_MINUS_SRC_ALPHA = 1 << 7,
  DST_ALPHA = 1 << 8,
  ONE_MINUS_DST_ALPHA = 1 << 9,
  SRC_ALPHA_SATURATE = 1 << 10,
}

export enum NVGcompositeOperation {
  SOURCE_OVER,
  SOURCE_IN,
  SOURCE_OUT,
  ATOP,
  DESTINATION_OVER,
  DESTINATION_IN,
  DESTINATION_OUT,
  DESTINATION_ATOP,
  LIGHTER,
  COPY,
  XOR,
}

// struct NVGcompositeOperationState {
//   int srcRGB;
//   int dstRGB;
//   int srcAlpha;
//   int dstAlpha;
// };
// typedef struct NVGcompositeOperationState NVGcompositeOperationState;
export class NVGcompositeOperationState implements Bind.NVGcompositeOperationState {
  srcRGB: NVGblendFactor = NVGblendFactor.ONE;
  dstRGB: NVGblendFactor = NVGblendFactor.ZERO;
  srcAlpha: NVGblendFactor = NVGblendFactor.ONE;
  dstAlpha: NVGblendFactor = NVGblendFactor.ZERO;
}

// struct NVGglyphPosition {
//   const char* str;  // Position of the glyph in the input string.
//   float x;      // The x-coordinate of the logical glyph position.
//   float minx, maxx;  // The bounds of the glyph shape.
// };
// typedef struct NVGglyphPosition NVGglyphPosition;
export class NVGglyphPosition implements Bind.NVGglyphPosition {
  str: number = 0;
  x: number = 0.0;
  minx: number = 0.0;
  maxx: number = 0.0;
}

// struct NVGtextRow {
//   const char* start;  // Pointer to the input text where the row starts.
//   const char* end;  // Pointer to the input text where the row ends (one past the last character).
//   const char* next;  // Pointer to the beginning of the next row.
//   float width;    // Logical width of the row.
//   float minx, maxx;  // Actual bounds of the row. Logical with and bounds can differ because of kerning and some parts over extending.
// };
// typedef struct NVGtextRow NVGtextRow;
export class NVGtextRow implements Bind.NVGtextRow {
  start: number = 0;
  end: number = 0;
  next: number = 0;
  width: number = 0.0;
  minx: number = 0.0;
  maxx: number = 0.0;
}

export enum NVGimageFlags {
  NONE = 0,
  GENERATE_MIPMAPS = 1 << 0,  // Generate mipmaps during creation of the image.
  REPEATX = 1 << 1,           // Repeat image in X direction.
  REPEATY = 1 << 2,           // Repeat image in Y direction.
  FLIPY = 1 << 3,             // Flips (inverses) image in Y direction when rendered.
  PREMULTIPLIED = 1 << 4,     // Image data has premultiplied alpha.
  NEAREST = 1 << 5,           // Image interpolation is Nearest instead Linear
};

// Begin drawing a new frame
// Calls to nanovg drawing API should be wrapped in nvgBeginFrame() & nvgEndFrame()
// nvgBeginFrame() defines the size of the window to render to in relation currently
// set viewport (i.e. glViewport on GL backends). Device pixel ration allows to
// control the rendering on Hi-DPI devices.
// For example, GLFW returns two dimension for an opened window: window size and
// frame buffer size. In that case you would set windowWidth/Height to the window size
// devicePixelRatio to: frameBufferWidth / windowWidth.
// void nvgBeginFrame(NVGcontext* ctx, float windowWidth, float windowHeight, float devicePixelRatio);
export function nvgBeginFrame(ctx: NVGcontext, windowWidth: number, windowHeight: number, devicePixelRatio: number): void {
  bind.nvgBeginFrame(ctx, windowWidth, windowHeight, devicePixelRatio);
}

// Cancels drawing the current frame.
// void nvgCancelFrame(NVGcontext* ctx);
export function nvgCancelFrame(ctx: NVGcontext): void {
  bind.nvgCancelFrame(ctx);
}

// Ends drawing flushing remaining render state.
// void nvgEndFrame(NVGcontext* ctx);
export function nvgEndFrame(ctx: NVGcontext): void {
  bind.nvgEndFrame(ctx);
}

//
// Composite operation
//
// The composite operations in NanoVG are modeled after HTML Canvas API, and
// the blend func is based on OpenGL (see corresponding manuals for more info).
// The colors in the blending state have premultiplied alpha.

// Sets the composite operation. The op parameter should be one of NVGcompositeOperation.
// void nvgGlobalCompositeOperation(NVGcontext* ctx, int op);
export function nvgGlobalCompositeOperation(ctx: NVGcontext, op: NVGcompositeOperation): void {
  bind.nvgGlobalCompositeOperation(ctx, op);
}

// Sets the composite operation with custom pixel arithmetic. The parameters should be one of NVGblendFactor.
// void nvgGlobalCompositeBlendFunc(NVGcontext* ctx, int sfactor, int dfactor);
export function nvgGlobalCompositeBlendFunc(ctx: NVGcontext, sfactor: NVGblendFactor, dfactor: NVGblendFactor): void {
  bind.nvgGlobalCompositeBlendFunc(ctx, sfactor, dfactor);
}

// Sets the composite operation with custom pixel arithmetic for RGB and alpha components separately. The parameters should be one of NVGblendFactor.
// void nvgGlobalCompositeBlendFuncSeparate(NVGcontext* ctx, int srcRGB, int dstRGB, int srcAlpha, int dstAlpha);
export function nvgGlobalCompositeBlendFuncSeparate(ctx: NVGcontext, srcRGB: NVGblendFactor, dstRGB: NVGblendFactor, srcAlpha: NVGblendFactor, dstAlpha: NVGblendFactor): void {
  bind.nvgGlobalCompositeBlendFuncSeparate(ctx, srcRGB, dstRGB, srcAlpha, dstAlpha);
}

//
// Color utils
//
// Colors in NanoVG are stored as unsigned ints in ABGR format.

// Returns a color value from red, green, blue values. Alpha will be set to 255 (1.0f).
// NVGcolor nvgRGB(unsigned char r, unsigned char g, unsigned char b);
export function nvgRGB(r: number, g: number, b: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  return nvgRGBA(r, g, b, 255, out);
}

// Returns a color value from red, green, blue values. Alpha will be set to 1.0f.
// NVGcolor nvgRGBf(float r, float g, float b);
export function nvgRGBf(r: number, g: number, b: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  return nvgRGBAf(r, g, b, 1.0, out);
}

// Returns a color value from red, green, blue and alpha values.
// NVGcolor nvgRGBA(unsigned char r, unsigned char g, unsigned char b, unsigned char a);
export function nvgRGBA(r: number, g: number, b: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  out.r = r / 255.0;
  out.g = g / 255.0;
  out.b = b / 255.0;
  out.a = a / 255.0;
  return out;
}

// Returns a color value from red, green, blue and alpha values.
// NVGcolor nvgRGBAf(float r, float g, float b, float a);
export function nvgRGBAf(r: number, g: number, b: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  out.r = r;
  out.g = g;
  out.b = b;
  out.a = a;
  return out;
}


// Linearly interpolates from color c0 to c1, and returns resulting color value.
// NVGcolor nvgLerpRGBA(NVGcolor c0, NVGcolor c1, float u);
export function nvgLerpRGBA(c0: NVGcolor, c1: NVGcolor, u: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  u = nvg__clampf(u, 0.0, 1.0);
  const oneminu = 1.0 - u;
  for (let i = 0; i < 4; ++i) {
    out.rgba[i] = c0.rgba[i] * oneminu + c1.rgba[i] * u;
  }
  return out;
}

// Sets transparency of a color value.
// NVGcolor nvgTransRGBA(NVGcolor c0, unsigned char a);
export function nvgTransRGBA(c: NVGcolor, a: number): NVGcolor {
  c.a = a / 255.0;
  return c;
}

// Sets transparency of a color value.
// NVGcolor nvgTransRGBAf(NVGcolor c0, float a);
export function nvgTransRGBAf(c: NVGcolor, a: number): NVGcolor {
  c.a = a;
  return c;
}

// Returns color value specified by hue, saturation and lightness.
// HSL values are all in range [0..1], alpha will be set to 255.
// NVGcolor nvgHSL(float h, float s, float l);
export function nvgHSL(h: number, s: number, l: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  return nvgHSLA(h, s, l, 255, out);
}

// static float nvg__hue(float h, float m1, float m2)
function nvg__hue(h: number, m1: number, m2: number): number {
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (h < 1.0 / 6.0)
    return m1 + (m2 - m1) * h * 6.0;
  else if (h < 3.0 / 6.0)
    return m2;
  else if (h < 4.0 / 6.0)
    return m1 + (m2 - m1) * (2.0 / 3.0 - h) * 6.0;
  return m1;
}

// Returns color value specified by hue, saturation and lightness and alpha.
// HSL values are all in range [0..1], alpha in range [0..255]
// NVGcolor nvgHSLA(float h, float s, float l, unsigned char a);
export function nvgHSLA(h: number, s: number, l: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor {
  h = nvg__modf(h, 1.0);
  if (h < 0.0) h += 1.0;
  s = nvg__clampf(s, 0.0, 1.0);
  l = nvg__clampf(l, 0.0, 1.0);
  const m2 = l <= 0.5 ? (l * (1 + s)) : (l + s - l * s);
  const m1 = 2 * l - m2;
  out.r = nvg__clampf(nvg__hue(h + 1.0 / 3.0, m1, m2), 0.0, 1.0);
  out.g = nvg__clampf(nvg__hue(h, m1, m2), 0.0, 1.0);
  out.b = nvg__clampf(nvg__hue(h - 1.0 / 3.0, m1, m2), 0.0, 1.0);
  out.a = a / 255.0;
  return out;
}

//
// State Handling
//
// NanoVG contains state which represents how paths will be rendered.
// The state contains transform, fill and stroke styles, text and font styles,
// and scissor clipping.

// Pushes and saves the current render state into a state stack.
// A matching nvgRestore() must be used to restore the state.
// void nvgSave(NVGcontext* ctx);
export function nvgSave(ctx: NVGcontext): void {
  bind.nvgSave(ctx);
}

// Pops and restores current render state.
// void nvgRestore(NVGcontext* ctx);
export function nvgRestore(ctx: NVGcontext): void {
  bind.nvgRestore(ctx);
}

// Resets current render state to default values. Does not affect the render state stack.
// void nvgReset(NVGcontext* ctx);
export function nvgReset(ctx: NVGcontext): void {
  bind.nvgReset(ctx);
}

//
// Render styles
//
// Fill and stroke render style can be either a solid color or a paint which is a gradient or a pattern.
// Solid color is simply defined as a color value, different kinds of paints can be created
// using nvgLinearGradient(), nvgBoxGradient(), nvgRadialGradient() and nvgImagePattern().
//
// Current render style can be saved and restored using nvgSave() and nvgRestore().

// Sets whether to draw antialias for nvgStroke() and nvgFill(). It's enabled by default.
// void nvgShapeAntiAlias(NVGcontext* ctx, int enabled);
export function nvgShapeAntiAlias(ctx: NVGcontext, enabled: boolean = true): void {
  bind.nvgShapeAntiAlias(ctx, enabled ? 1 : 0);
}

// Sets current stroke style to a solid color.
// void nvgStrokeColor(NVGcontext* ctx, NVGcolor color);
export function nvgStrokeColor(ctx: NVGcontext, color: NVGcolor): void {
  bind.nvgStrokeColor(ctx, color);
}

// Sets current stroke style to a paint, which can be a one of the gradients or a pattern.
// void nvgStrokePaint(NVGcontext* ctx, NVGpaint paint);
export function nvgStrokePaint(ctx: NVGcontext, paint: NVGpaint): void {
  bind.nvgStrokePaint(ctx, paint);
}

// Sets current fill style to a solid color.
// void nvgFillColor(NVGcontext* ctx, NVGcolor color);
export function nvgFillColor(ctx: NVGcontext, color: NVGcolor): void {
  bind.nvgFillColor(ctx, color);
}

// Sets current fill style to a paint, which can be a one of the gradients or a pattern.
// void nvgFillPaint(NVGcontext* ctx, NVGpaint paint);
export function nvgFillPaint(ctx: NVGcontext, paint: NVGpaint): void {
  bind.nvgFillPaint(ctx, paint);
}

// Sets the miter limit of the stroke style.
// Miter limit controls when a sharp corner is beveled.
// void nvgMiterLimit(NVGcontext* ctx, float limit);
export function nvgMiterLimit(ctx: NVGcontext, limit: number): void {
  bind.nvgMiterLimit(ctx, limit);
}

// Sets the stroke width of the stroke style.
// void nvgStrokeWidth(NVGcontext* ctx, float size);
export function nvgStrokeWidth(ctx: NVGcontext, size: number): void {
  bind.nvgStrokeWidth(ctx, size);
}

// Sets how the end of the line (cap) is drawn,
// Can be one of: NVG_BUTT (default), NVG_ROUND, NVG_SQUARE.
// void nvgLineCap(NVGcontext* ctx, int cap);
export function nvgLineCap(ctx: NVGcontext, cap: NVGlineCap.BUTT | NVGlineCap.ROUND | NVGlineCap.NVG_SQUARE): void {
  bind.nvgLineCap(ctx, cap);
}

// Sets how sharp path corners are drawn.
// Can be one of NVG_MITER (default), NVG_ROUND, NVG_BEVEL.
// void nvgLineJoin(NVGcontext* ctx, int join);
export function nvgLineJoin(ctx: NVGcontext, join: NVGlineCap.MITER | NVGlineCap.ROUND | NVGlineCap.BEVEL): void {
  bind.nvgLineJoin(ctx, join);
}

// Sets the transparency applied to all rendered shapes.
// Already transparent paths will get proportionally more transparent as well.
// void nvgGlobalAlpha(NVGcontext* ctx, float alpha);
export function nvgGlobalAlpha(ctx: NVGcontext, alpha: number): void {
  bind.nvgGlobalAlpha(ctx, alpha);
}

//
// Transforms
//
// The paths, gradients, patterns and scissor region are transformed by an transformation
// matrix at the time when they are passed to the API.
// The current transformation matrix is a affine matrix:
//   [sx kx tx]
//   [ky sy ty]
//   [ 0  0  1]
// Where: sx,sy define scaling, kx,ky skewing, and tx,ty translation.
// The last row is assumed to be 0,0,1 and is not stored.
//
// Apart from nvgResetTransform(), each transformation function first creates
// specific transformation matrix and pre-multiplies the current transformation by it.
//
// Current coordinate system (transformation) can be saved and restored using nvgSave() and nvgRestore().

// Resets current transform to a identity matrix.
// void nvgResetTransform(NVGcontext* ctx);
export function nvgResetTransform(ctx: NVGcontext): void {
  bind.nvgResetTransform(ctx);
}

// Premultiplies current coordinate system by specified matrix.
// The parameters are interpreted as matrix as follows:
//   [a c e]
//   [b d f]
//   [0 0 1]
// void nvgTransform(NVGcontext* ctx, float a, float b, float c, float d, float e, float f);
export function nvgTransform(ctx: NVGcontext, a: number, b: number, c: number, d: number, e: number, f: number): void {
  bind.nvgTransform(ctx, a, b, c, d, e, f);
}

// Translates current coordinate system.
// void nvgTranslate(NVGcontext* ctx, float x, float y);
export function nvgTranslate(ctx: NVGcontext, x: number, y: number): void {
  bind.nvgTranslate(ctx, x, y);
}

// Rotates current coordinate system. Angle is specified in radians.
// void nvgRotate(NVGcontext* ctx, float angle);
export function nvgRotate(ctx: NVGcontext, angle: number): void {
  bind.nvgRotate(ctx, angle);
}

// Skews the current coordinate system along X axis. Angle is specified in radians.
// void nvgSkewX(NVGcontext* ctx, float angle);
export function nvgSkewX(ctx: NVGcontext, angle: number): void {
  bind.nvgSkewX(ctx, angle);
}

// Skews the current coordinate system along Y axis. Angle is specified in radians.
// void nvgSkewY(NVGcontext* ctx, float angle);
export function nvgSkewY(ctx: NVGcontext, angle: number): void {
  bind.nvgSkewY(ctx, angle);
}

// Scales the current coordinate system.
// void nvgScale(NVGcontext* ctx, float x, float y);
export function nvgScale(ctx: NVGcontext, x: number, y: number): void {
  bind.nvgScale(ctx, x, y);
}

// Stores the top part (a-f) of the current transformation matrix in to the specified buffer.
//   [a c e]
//   [b d f]
//   [0 0 1]
// There should be space for 6 floats in the return buffer for the values a-f.
// void nvgCurrentTransform(NVGcontext* ctx, float* xform);
export function nvgCurrentTransform(ctx: NVGcontext, xform: Float32Array): void {
  bind.nvgCurrentTransform(ctx, xform);
}


// The following functions can be used to make calculations on 2x3 transformation matrices.
// A 2x3 matrix is represented as float[6].

// Sets the transform to identity matrix.
// void nvgTransformIdentity(float* dst);
export function nvgTransformIdentity(dst: Float32Array): void {
  dst[0] = 1.0; dst[1] = 0.0;
  dst[2] = 0.0; dst[3] = 1.0;
  dst[4] = 0.0; dst[5] = 0.0;
}

// Sets the transform to translation matrix matrix.
// void nvgTransformTranslate(float* dst, float tx, float ty);
export function nvgTransformTranslate(dst: Float32Array, tx: number, ty: number): void {
  dst[0] = 1.0; dst[1] = 0.0;
  dst[2] = 0.0; dst[3] = 1.0;
  dst[4] = tx; dst[5] = ty;
}

// Sets the transform to scale matrix.
// void nvgTransformScale(float* dst, float sx, float sy);
export function nvgTransformScale(dst: Float32Array, sx: number, sy: number): void {
  dst[0] = sx; dst[1] = 0.0;
  dst[2] = 0.0; dst[3] = sy;
  dst[4] = 0.0; dst[5] = 0.0;
}

// Sets the transform to rotate matrix. Angle is specified in radians.
// void nvgTransformRotate(float* dst, float a);
export function nvgTransformRotate(dst: Float32Array, a: number): void {
  const cs = Math.cos(a), sn = Math.sin(a);
  dst[0] = cs; dst[1] = sn;
  dst[2] = -sn; dst[3] = cs;
  dst[4] = 0.0; dst[5] = 0.0;
}

// Sets the transform to skew-x matrix. Angle is specified in radians.
// void nvgTransformSkewX(float* dst, float a);
export function nvgTransformSkewX(dst: Float32Array, a: number): void {
  dst[0] = 1.0; dst[1] = 0.0;
  dst[2] = Math.tan(a); dst[3] = 1.0;
  dst[4] = 0.0; dst[5] = 0.0;
}

// Sets the transform to skew-y matrix. Angle is specified in radians.
// void nvgTransformSkewY(float* dst, float a);
export function nvgTransformSkewY(dst: Float32Array, a: number): void {
  dst[0] = 1.0; dst[1] = Math.tan(a);
  dst[2] = 0.0; dst[3] = 1.0;
  dst[4] = 0.0; dst[5] = 0.0;
}

// Sets the transform to the result of multiplication of two transforms, of A = A*B.
// void nvgTransformMultiply(float* dst, const float* src);
export function nvgTransformMultiply(dst: Float32Array, src: Float32Array): void {
  const t0 = dst[0] * src[0] + dst[1] * src[2];
  const t2 = dst[2] * src[0] + dst[3] * src[2];
  const t4 = dst[4] * src[0] + dst[5] * src[2] + src[4];
  dst[1] = dst[0] * src[1] + dst[1] * src[3];
  dst[3] = dst[2] * src[1] + dst[3] * src[3];
  dst[5] = dst[4] * src[1] + dst[5] * src[3] + src[5];
  dst[0] = t0;
  dst[2] = t2;
  dst[4] = t4;
}

// Sets the transform to the result of multiplication of two transforms, of A = B*A.
// void nvgTransformPremultiply(float* dst, const float* src);
const s2 = new Float32Array(6); // float s2[6];
export function nvgTransformPremultiply(dst: Float32Array, src: Float32Array): void {
  s2.set(src); // memcpy(s2, src, sizeof(float)*6);
  nvgTransformMultiply(s2, dst);
  dst.set(s2); // memcpy(dst, s2, sizeof(float)*6);
}

// Sets the destination to inverse of specified transform.
// Returns 1 if the inverse could be calculated, else 0.
// int nvgTransformInverse(float* dst, const float* src);
export function nvgTransformInverse(dst: Float32Array, src: Float32Array): number {
  const det = src[0] * src[3] - src[2] * src[1];
  if (det > -1e-6 && det < 1e-6) {
    nvgTransformIdentity(dst);
    return 0;
  }
  const invdet = 1.0 / det;
  dst[0] = src[3] * invdet;
  dst[2] = -src[2] * invdet;
  dst[4] = (src[2] * src[5] - src[3] * src[4]) * invdet;
  dst[1] = -src[1] * invdet;
  dst[3] = src[0] * invdet;
  dst[5] = (src[1] * src[4] - src[0] * src[5]) * invdet;
  return 1;
}

// Transform a point by given transform.
// void nvgTransformPoint(float* dstx, float* dsty, const float* xform, float srcx, float srcy);
export function nvgTransformPoint(dst: Float32Array, xform: Float32Array, src: Float32Array): void {
  const srcx = src[0], srcy = src[1];
  dst[0] = srcx * xform[0] + srcy * xform[2] + xform[4];
  dst[1] = srcx * xform[1] + srcy * xform[3] + xform[5];
}

// Converts degrees to radians and vice versa.
// float nvgDegToRad(float deg);
export function nvgDegToRad(deg: number): number {
  return deg / 180.0 * NVG_PI;
}
// float nvgRadToDeg(float rad);
export function nvgRadToDeg(rad: number): number {
  return rad / NVG_PI * 180.0;
}

//
// Images
//
// NanoVG allows you to load jpg, png, psd, tga, pic and gif files to be used for rendering.
// In addition you can upload your own image. The image loading is provided by stb_image.
// The parameter imageFlags is combination of flags defined in NVGimageFlags.

// Creates image by loading it from the disk from specified file name.
// Returns handle to the image.
// int nvgCreateImage(NVGcontext* ctx, const char* filename, int imageFlags);
export function nvgCreateImage(ctx: NVGcontext, filename: string, imageFlags: NVGimageFlags): number {
  return nvgCreateImage(ctx, filename, imageFlags);
}

// Creates image by loading it from the specified chunk of memory.
// Returns handle to the image.
// int nvgCreateImageMem(NVGcontext* ctx, int imageFlags, unsigned char* data, int ndata);
export function nvgCreateImageMem(ctx: NVGcontext, imageFlags: NVGimageFlags, data: Uint8Array): number {
  return bind.nvgCreateImageMem(ctx, imageFlags, data);
}

// Creates image from specified image data.
// Returns handle to the image.
// int nvgCreateImageRGBA(NVGcontext* ctx, int w, int h, int imageFlags, const unsigned char* data);
export function nvgCreateImageRGBA(ctx: NVGcontext, w: number, h: number, imageFlags: NVGimageFlags, data: Uint8Array): number {
  return bind.nvgCreateImageRGBA(ctx, w, h, imageFlags, data);
}

// Updates image data specified by image handle.
// void nvgUpdateImage(NVGcontext* ctx, int image, const unsigned char* data);
export function nvgUpdateImage(ctx: NVGcontext, image: number, data: Uint8Array): void {
  bind.nvgUpdateImage(ctx, image, data);
}

// Returns the dimensions of a created image.
// void nvgImageSize(NVGcontext* ctx, int image, int* w, int* h);
export function nvgImageSize(ctx: NVGcontext, image: number, w: [number], h: [number]): void {
  bind.nvgImageSize(ctx, image, w, h);
}

// Deletes created image.
// void nvgDeleteImage(NVGcontext* ctx, int image);
export function nvgDeleteImage(ctx: NVGcontext, image: number): void {
  bind.nvgDeleteImage(ctx, image);
}

//
// Paints
//
// NanoVG supports four types of paints: linear gradient, box gradient, radial gradient and image pattern.
// These can be used as paints for strokes and fills.

// Creates and returns a linear gradient. Parameters (sx,sy)-(ex,ey) specify the start and end coordinates
// of the linear gradient, icol specifies the start color and ocol the end color.
// The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
// NVGpaint nvgLinearGradient(NVGcontext* ctx, float sx, float sy, float ex, float ey, NVGcolor icol, NVGcolor ocol);
export function nvgLinearGradient(ctx: NVGcontext, sx: number, sy: number, ex: number, ey: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint {
  bind.nvgLinearGradient(ctx, sx, sy, ex, ey, icol, ocol, out);
  return out;
}

// Creates and returns a box gradient. Box gradient is a feathered rounded rectangle, it is useful for rendering
// drop shadows or highlights for boxes. Parameters (x,y) define the top-left corner of the rectangle,
// (w,h) define the size of the rectangle, r defines the corner radius, and f feather. Feather defines how blurry
// the border of the rectangle is. Parameter icol specifies the inner color and ocol the outer color of the gradient.
// The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
// NVGpaint nvgBoxGradient(NVGcontext* ctx, float x, float y, float w, float h, float r, float f, NVGcolor icol, NVGcolor ocol);
export function nvgBoxGradient(ctx: NVGcontext, x: number, y: number, w: number, h: number, r: number, f: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint {
  bind.nvgBoxGradient(ctx, x, y, w, h, r, f, icol, ocol, out);
  return out;
}

// Creates and returns a radial gradient. Parameters (cx,cy) specify the center, inr and outr specify
// the inner and outer radius of the gradient, icol specifies the start color and ocol the end color.
// The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
// NVGpaint nvgRadialGradient(NVGcontext* ctx, float cx, float cy, float inr, float outr, NVGcolor icol, NVGcolor ocol);
export function nvgRadialGradient(ctx: NVGcontext, cx: number, cy: number, inr: number, outr: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint {
  bind.nvgRadialGradient(ctx, cx, cy, inr, outr, icol, ocol, out);
  return out;
}

// Creates and returns an image patter. Parameters (ox,oy) specify the left-top location of the image pattern,
// (ex,ey) the size of one image, angle rotation around the top-left corner, image is handle to the image to render.
// The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
// NVGpaint nvgImagePattern(NVGcontext* ctx, float ox, float oy, float ex, float ey, float angle, int image, float alpha);
export function nvgImagePattern(ctx: NVGcontext, ox: number, oy: number, ex: number, ey: number, angle: number, image: number, alpha: number, out: NVGpaint = new NVGpaint()): NVGpaint {
  bind.nvgImagePattern(ctx, ox, oy, ex, ey, angle, image, alpha, out);
  return out;
}

//
// Scissoring
//
// Scissoring allows you to clip the rendering into a rectangle. This is useful for various
// user interface cases like rendering a text edit or a timeline.

// Sets the current scissor rectangle.
// The scissor rectangle is transformed by the current transform.
// void nvgScissor(NVGcontext* ctx, float x, float y, float w, float h);
export function nvgScissor(ctx: NVGcontext, x: number, y: number, w: number, h: number): void {
  bind.nvgScissor(ctx, x, y, w, h);
}

// Intersects current scissor rectangle with the specified rectangle.
// The scissor rectangle is transformed by the current transform.
// Note: in case the rotation of previous scissor rect differs from
// the current one, the intersection will be done between the specified
// rectangle and the previous scissor rectangle transformed in the current
// transform space. The resulting shape is always rectangle.
// void nvgIntersectScissor(NVGcontext* ctx, float x, float y, float w, float h);
export function nvgIntersectScissor(ctx: NVGcontext, x: number, y: number, w: number, h: number): void {
  bind.nvgIntersectScissor(ctx, x, y, w, h);
}

// Reset and disables scissoring.
// void nvgResetScissor(NVGcontext* ctx);
export function nvgResetScissor(ctx: NVGcontext): void {
  bind.nvgResetScissor(ctx);
}

//
// Paths
//
// Drawing a new shape starts with nvgBeginPath(), it clears all the currently defined paths.
// Then you define one or more paths and sub-paths which describe the shape. The are functions
// to draw common shapes like rectangles and circles, and lower level step-by-step functions,
// which allow to define a path curve by curve.
//
// NanoVG uses even-odd fill rule to draw the shapes. Solid shapes should have counter clockwise
// winding and holes should have counter clockwise order. To specify winding of a path you can
// call nvgPathWinding(). This is useful especially for the common shapes, which are drawn CCW.
//
// Finally you can fill the path using current fill style by calling nvgFill(), and stroke it
// with current stroke style by calling nvgStroke().
//
// The curve segments and sub-paths are transformed by the current transform.

// Clears the current path and sub-paths.
// void nvgBeginPath(NVGcontext* ctx);
export function nvgBeginPath(ctx: NVGcontext): void {
  bind.nvgBeginPath(ctx);
}

// Starts new sub-path with specified point as first point.
// void nvgMoveTo(NVGcontext* ctx, float x, float y);
export function nvgMoveTo(ctx: NVGcontext, x: number, y: number): void {
  bind.nvgMoveTo(ctx, x, y);
}

// Adds line segment from the last point in the path to the specified point.
// void nvgLineTo(NVGcontext* ctx, float x, float y);
export function nvgLineTo(ctx: NVGcontext, x: number, y: number): void {
  bind.nvgLineTo(ctx, x, y);
}

// Adds cubic bezier segment from last point in the path via two control points to the specified point.
// void nvgBezierTo(NVGcontext* ctx, float c1x, float c1y, float c2x, float c2y, float x, float y);
export function nvgBezierTo(ctx: NVGcontext, c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void {
  bind.nvgBezierTo(ctx, c1x, c1y, c2x, c2y, x, y);
}

// Adds quadratic bezier segment from last point in the path via a control point to the specified point.
// void nvgQuadTo(NVGcontext* ctx, float cx, float cy, float x, float y);
export function nvgQuadTo(ctx: NVGcontext, cx: number, cy: number, x: number, y: number): void {
  bind.nvgQuadTo(ctx, cx, cy, x, y);
}

// Adds an arc segment at the corner defined by the last path point, and two specified points.
// void nvgArcTo(NVGcontext* ctx, float x1, float y1, float x2, float y2, float radius);
export function nvgArcTo(ctx: NVGcontext, x1: number, y1: number, x2: number, y2: number, radius: number): void {
  bind.nvgArcTo(ctx, x1, y1, x2, y2, radius);
}

// Closes current sub-path with a line segment.
// void nvgClosePath(NVGcontext* ctx);
export function nvgClosePath(ctx: NVGcontext): void {
  bind.nvgClosePath(ctx);
}

// Sets the current sub-path winding, see NVGwinding and NVGsolidity.
// void nvgPathWinding(NVGcontext* ctx, int dir);
export function nvgPathWinding(ctx: NVGcontext, dir: NVGwinding | NVGsolidity): void {
  bind.nvgPathWinding(ctx, dir);
}

// Creates new circle arc shaped sub-path. The arc center is at cx,cy, the arc radius is r,
// and the arc is drawn from angle a0 to a1, and swept in direction dir (NVG_CCW, or NVG_CW).
// Angles are specified in radians.
// void nvgArc(NVGcontext* ctx, float cx, float cy, float r, float a0, float a1, int dir);
export function nvgArc(ctx: NVGcontext, cx: number, cy: number, r: number, a0: number, a1: number, dir: NVGwinding | NVGsolidity): void {
  bind.nvgArc(ctx, cx, cy, r, a0, a1, dir);
}

// Creates new rectangle shaped sub-path.
// void nvgRect(NVGcontext* ctx, float x, float y, float w, float h);
export function nvgRect(ctx: NVGcontext, x: number, y: number, w: number, h: number): void {
  bind.nvgRect(ctx, x, y, w, h);
}

// Creates new rounded rectangle shaped sub-path.
// void nvgRoundedRect(NVGcontext* ctx, float x, float y, float w, float h, float r);
export function nvgRoundedRect(ctx: NVGcontext, x: number, y: number, w: number, h: number, r: number): void {
  bind.nvgRoundedRect(ctx, x, y, w, h, r);
}

// Creates new rounded rectangle shaped sub-path with varying radii for each corner.
// void nvgRoundedRectVarying(NVGcontext* ctx, float x, float y, float w, float h, float radTopLeft, float radTopRight, float radBottomRight, float radBottomLeft);
export function nvgRoundedRectVarying(ctx: NVGcontext, x: number, y: number, w: number, h: number, radTopLeft: number, radTopRight: number, radBottomRight: number, radBottomLeft: number): void {
  bind.nvgRoundedRectVarying(ctx, x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft);
}

// Creates new ellipse shaped sub-path.
// void nvgEllipse(NVGcontext* ctx, float cx, float cy, float rx, float ry);
export function nvgEllipse(ctx: NVGcontext, cx: number, cy: number, rx: number, ry: number): void {
  bind.nvgEllipse(ctx, cx, cy, rx, ry);
}

// Creates new circle shaped sub-path.
// void nvgCircle(NVGcontext* ctx, float cx, float cy, float r);
export function nvgCircle(ctx: NVGcontext, cx: number, cy: number, r: number): void {
  bind.nvgCircle(ctx, cx, cy, r);
}

// Fills the current path with current fill style.
// void nvgFill(NVGcontext* ctx);
export function nvgFill(ctx: NVGcontext): void {
  bind.nvgFill(ctx);
}

// Fills the current path with current stroke style.
// void nvgStroke(NVGcontext* ctx);
export function nvgStroke(ctx: NVGcontext): void {
  bind.nvgStroke(ctx);
}


//
// Text
//
// NanoVG allows you to load .ttf files and use the font to render text.
//
// The appearance of the text can be defined by setting the current text style
// and by specifying the fill color. Common text and font settings such as
// font size, letter spacing and text align are supported. Font blur allows you
// to create simple text effects such as drop shadows.
//
// At render time the font face can be set based on the font handles or name.
//
// Font measure functions return values in local space, the calculations are
// carried in the same resolution as the final rendering. This is done because
// the text glyph positions are snapped to the nearest pixels sharp rendering.
//
// The local space means that values are not rotated or scale as per the current
// transformation. For example if you set font size to 12, which would mean that
// line height is 16, then regardless of the current scaling and rotation, the
// returned line height is always 16. Some measures may vary because of the scaling
// since aforementioned pixel snapping.
//
// While this may sound a little odd, the setup allows you to always render the
// same way regardless of scaling. I.e. following works regardless of scaling:
//
//    const char* txt = "Text me up.";
//    nvgTextBounds(vg, x,y, txt, NULL, bounds);
//    nvgBeginPath(vg);
//    nvgRoundedRect(vg, bounds[0],bounds[1], bounds[2]-bounds[0], bounds[3]-bounds[1]);
//    nvgFill(vg);
//
// Note: currently only solid color fill is supported for text.

// Creates font by loading it from the disk from specified file name.
// Returns handle to the font.
// int nvgCreateFont(NVGcontext* ctx, const char* name, const char* filename);
export function nvgCreateFont(ctx: NVGcontext, name: string, filename: string): number {
  return bind.nvgCreateFont(ctx, name, filename);
}

// Creates font by loading it from the specified memory chunk.
// Returns handle to the font.
// int nvgCreateFontMem(NVGcontext* ctx, const char* name, unsigned char* data, int ndata, int freeData);
export function nvgCreateFontMem(ctx: NVGcontext, name: string, data: Uint8Array): number {
  return bind.nvgCreateFontMem(ctx, name, data);
}

// Finds a loaded font of specified name, and returns handle to it, or -1 if the font is not found.
// int nvgFindFont(NVGcontext* ctx, const char* name);
export function nvgFindFont(ctx: NVGcontext, name: string): number {
  return bind.nvgFindFont(ctx, name);
}

// Adds a fallback font by handle.
// int nvgAddFallbackFontId(NVGcontext* ctx, int baseFont, int fallbackFont);
export function nvgAddFallbackFontId(ctx: NVGcontext, baseFont: number, fallbackFont: number): number {
  return bind.nvgAddFallbackFontId(ctx, baseFont, fallbackFont);
}

// Adds a fallback font by name.
// int nvgAddFallbackFont(NVGcontext* ctx, const char* baseFont, const char* fallbackFont);
export function nvgAddFallbackFont(ctx: NVGcontext, baseFont: string, fallbackFont: string): number {
  return bind.nvgAddFallbackFont(ctx, baseFont, fallbackFont);
}

// Sets the font size of current text style.
// void nvgFontSize(NVGcontext* ctx, float size);
export function nvgFontSize(ctx: NVGcontext, size: number): void {
  bind.nvgFontSize(ctx, size);
}

// Sets the blur of current text style.
// void nvgFontBlur(NVGcontext* ctx, float blur);
export function nvgFontBlur(ctx: NVGcontext, blur: number): void {
  bind.nvgFontBlur(ctx, blur);
}

// Sets the letter spacing of current text style.
// void nvgTextLetterSpacing(NVGcontext* ctx, float spacing);
export function nvgTextLetterSpacing(ctx: NVGcontext, spacing: number): void {
  bind.nvgTextLetterSpacing(ctx, spacing);
}

// Sets the proportional line height of current text style. The line height is specified as multiple of font size.
// void nvgTextLineHeight(NVGcontext* ctx, float lineHeight);
export function nvgTextLineHeight(ctx: NVGcontext, lineHeight: number): void {
  bind.nvgTextLineHeight(ctx, lineHeight);
}

// Sets the text align of current text style, see NVGalign for options.
// void nvgTextAlign(NVGcontext* ctx, int align);
export function nvgTextAlign(ctx: NVGcontext, align: NVGalign): void {
  bind.nvgTextAlign(ctx, align);
}

// Sets the font face based on specified id of current text style.
// void nvgFontFaceId(NVGcontext* ctx, int font);
export function nvgFontFaceId(ctx: NVGcontext, font: number): void {
  bind.nvgFontFaceId(ctx, font);
}

// Sets the font face based on specified name of current text style.
// void nvgFontFace(NVGcontext* ctx, const char* font);
export function nvgFontFace(ctx: NVGcontext, font: string): void {
  bind.nvgFontFace(ctx, font);
}

// Draws text string at specified location. If end is specified only the sub-string up to the end is drawn.
// float nvgText(NVGcontext* ctx, float x, float y, const char* string, const char* end);
export function nvgText(ctx: NVGcontext, x: number, y: number, string: string, end: number | null = null): number {
  return bind.nvgText(ctx, x, y, string, end === null ? 0 : end);
}

// Draws multi-line text string at specified location wrapped at the specified width. If end is specified only the sub-string up to the end is drawn.
// White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
// Words longer than the max width are slit at nearest character (i.e. no hyphenation).
// void nvgTextBox(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end);
export function nvgTextBox(ctx: NVGcontext, x: number, y: number, breakRowWidth: number, string: string, end: number | null = null): void {
  bind.nvgTextBox(ctx, x, y, breakRowWidth, string, end === null ? 0 : end);
}

// Measures the specified text string. Parameter bounds should be a pointer to float[4],
// if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
// Returns the horizontal advance of the measured text (i.e. where the next character should drawn).
// Measured values are returned in local coordinate space.
// float nvgTextBounds(NVGcontext* ctx, float x, float y, const char* string, const char* end, float* bounds);
export function nvgTextBounds(ctx: NVGcontext, x: number, y: number, string: string, end: number | null = null, bounds: Float32Array | null = null): number {
  return bind.nvgTextBounds(ctx, x, y, string, end === null ? 0 : end, bounds);
}

// Measures the specified multi-text string. Parameter bounds should be a pointer to float[4],
// if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
// Measured values are returned in local coordinate space.
// void nvgTextBoxBounds(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end, float* bounds);
export function nvgTextBoxBounds(ctx: NVGcontext, x: number, y: number, breakRowWidth: number, string: string, end: number | null, bounds: Float32Array): void {
  bind.nvgTextBoxBounds(ctx, x, y, breakRowWidth, string, end === null ? 0 : end, bounds);
}

// Calculates the glyph x positions of the specified text. If end is specified only the sub-string will be used.
// Measured values are returned in local coordinate space.
// int nvgTextGlyphPositions(NVGcontext* ctx, float x, float y, const char* string, const char* end, NVGglyphPosition* positions, int maxPositions);
export function nvgTextGlyphPositions(ctx: NVGcontext, x: number, y: number, string: string, end: number | null, positions: NVGglyphPosition[]): number {
  return bind.nvgTextGlyphPositions(ctx, x, y, string, end === null ? 0 : end, positions, positions.length);
}

// Returns the vertical metrics based on the current text style.
// Measured values are returned in local coordinate space.
// void nvgTextMetrics(NVGcontext* ctx, float* ascender, float* descender, float* lineh);
export function nvgTextMetrics(ctx: NVGcontext, ascender: [number] | null, descender: [number] | null, lineh: [number] | null): void {
  bind.nvgTextMetrics(ctx, ascender, descender, lineh);
}

// Breaks the specified text into lines. If end is specified only the sub-string will be used.
// White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
// Words longer than the max width are slit at nearest character (i.e. no hyphenation).
// int nvgTextBreakLines(NVGcontext* ctx, const char* string, const char* end, float breakRowWidth, NVGtextRow* rows, int maxRows);
export function nvgTextBreakLines(ctx: NVGcontext, string: string, end: number | null, breakRowWidth: number, rows: NVGtextRow[]): number {
  return bind.nvgTextBreakLines(ctx, string, end === null ? 0 : end, breakRowWidth, rows, rows.length);
}

//
// Internal Render API
//

// export enum NVGtexture {
//   ALPHA = 0x01,
//   RGBA = 0x02,
// }

// struct NVGscissor {
//   float xform[6];
//   float extent[2];
// };
// typedef struct NVGscissor NVGscissor;
// export class NVGscissor implements Bind.NVGscissor {
//   xform: Float32Array;
//   extent: Float32Array;
//   constructor(public _array = new Float32Array(8)) {
//     this.xform = new Float32Array(this._array.subarray(0, 6));
//     this.extent = new Float32Array(this._array.subarray(6, 8));
//   }
// }

// struct NVGvertex {
//   float x,y,u,v;
// };
// typedef struct NVGvertex NVGvertex;
// export class NVGvertex implements Bind.NVGvertex {
//   constructor(public xyuv = new Float32Array(4)) {

//   }
//   get x(): number { return this.xyuv[0]; } set x(value: number) { this.xyuv[0] = value; }
//   get y(): number { return this.xyuv[1]; } set y(value: number) { this.xyuv[1] = value; }
//   get u(): number { return this.xyuv[2]; } set u(value: number) { this.xyuv[2] = value; }
//   get v(): number { return this.xyuv[3]; } set v(value: number) { this.xyuv[3] = value; }
// }

// struct NVGpath {
//   int first;
//   int count;
//   unsigned char closed;
//   int nbevel;
//   NVGvertex* fill;
//   int nfill;
//   NVGvertex* stroke;
//   int nstroke;
//   int winding;
//   int convex;
// };
// typedef struct NVGpath NVGpath;
// export class NVGpath implements Bind.NVGpath {
//   first: number = 0;
//   count: number = 0;
//   closed: boolean = false;
//   nbevel: number = 0;
//   fill: NVGvertex[] = []; // NVGvertex* fill;
//   nfill: number = 0;
//   stroke: NVGvertex[] = []; // NVGvertex* stroke;
//   nstroke: number = 0;
//   winding: number = 0;
//   convex: number = 0;
// }

// struct NVGparams {
//   void* userPtr;
//   int edgeAntiAlias;
//   int (*renderCreate)(void* uptr);
//   int (*renderCreateTexture)(void* uptr, int type, int w, int h, int imageFlags, const unsigned char* data);
//   int (*renderDeleteTexture)(void* uptr, int image);
//   int (*renderUpdateTexture)(void* uptr, int image, int x, int y, int w, int h, const unsigned char* data);
//   int (*renderGetTextureSize)(void* uptr, int image, int* w, int* h);
//   void (*renderViewport)(void* uptr, float width, float height, float devicePixelRatio);
//   void (*renderCancel)(void* uptr);
//   void (*renderFlush)(void* uptr);
//   void (*renderFill)(void* uptr, NVGpaint* paint, NVGcompositeOperationState compositeOperation, NVGscissor* scissor, float fringe, const float* bounds, const NVGpath* paths, int npaths);
//   void (*renderStroke)(void* uptr, NVGpaint* paint, NVGcompositeOperationState compositeOperation, NVGscissor* scissor, float fringe, float strokeWidth, const NVGpath* paths, int npaths);
//   void (*renderTriangles)(void* uptr, NVGpaint* paint, NVGcompositeOperationState compositeOperation, NVGscissor* scissor, const NVGvertex* verts, int nverts);
//   void (*renderDelete)(void* uptr);
// };
// typedef struct NVGparams NVGparams;
// export class NVGparams implements Bind.NVGparams {
//   userPtr: any = null;
//   edgeAntiAlias: boolean = false;
//   renderCreate!: (uptr: any) => number;
//   renderCreateTexture!: (uptr: any, type: NVGtexture, w: number, h: number, imageFlags: NVGimageFlags, data: ArrayBufferView) => number;
//   renderDeleteTexture!: (uptr: any, image: number) => number;
//   renderUpdateTexture!: (uptr: any, image: number, x: number, y: number, w: number, h: number, data: ArrayBufferView) => number;
//   renderGetTextureSize!: (uptr: any, image: number, w: [number], h: [number]) => number;
//   renderViewport!: (uptr: any, width: number, height: number, devidePixelRatio: number) => void;
//   renderCancel!: (uptr: any) => void;
//   renderFlush!: (uptr: any) => void;
//   renderFill!: (uptr: any, paint: Bind.reference_NVGpaint, compositeOperation: Bind.reference_NVGcompositeOperationState, scissor: Bind.reference_NVGscissor, fringe: number, bounds: Float32Array, paths: Bind.NVGpath[], npaths: number) => void;
//   renderStroke!: (uptr: any, paint: Bind.reference_NVGpaint, compositeOperation: Bind.reference_NVGcompositeOperationState, scissor: Bind.reference_NVGscissor, fringe: number, strokeWidth: number, paths: ArrayBufferView, npaths: number) => void;
//   renderTriangles!: (uptr: any, paint: Bind.reference_NVGpaint, compositeOperation: Bind.reference_NVGcompositeOperationState, scissor: Bind.reference_NVGscissor, verts: Bind.NVGvertex[], nverts: number) => void;
//   renderDelete!: (uptr: any) => void;
// }

// Constructor and destructor, called by the render back-end.
// NVGcontext* nvgCreateInternal(NVGparams* params);
// export function nvgCreateInternal(params: NVGparams): NVGcontext {
//   return bind.nvgCreateInternal(params);
// }
// void nvgDeleteInternal(NVGcontext* ctx);
// export function nvgDeleteInternal(ctx: NVGcontext): void {
//   bind.nvgDeleteInternal(ctx);
// }

// NVGparams* nvgInternalParams(NVGcontext* ctx);
// export function nvgInternalParams(ctx: NVGcontext): NVGparams {
//   return bind.nvgInternalParams(ctx);
// }

// Debug function to dump cached path data.
// void nvgDebugDumpPathCache(NVGcontext* ctx);
export function nvgDebugDumpPathCache(ctx: NVGcontext): void {
  bind.nvgDebugDumpPathCache(ctx);
}

// nanovg_gl.h

export enum NVGcreateFlags {
  // Flag indicating if geometry based anti-aliasing is used (may not be needed when using MSAA).
  ANTIALIAS = 1 << 0,
  // Flag indicating if strokes should be drawn using stencil buffer. The rendering will be a little
  // slower, but path overlaps (i.e. self-intersecting or sharp turns) will be drawn just once.
  STENCIL_STROKES = 1 << 1,
  // Flag indicating that additional debug checks are done.
  DEBUG = 1 << 2,
}

// NVGcontext* nvgCreateGLES2(int flags);
export function nvgCreateWebGL(gl: WebGLRenderingContext | null, flags: NVGcreateFlags): NVGcontext {
  return bind.nvgCreateWebGL(gl, flags);
}

// void nvgDeleteGLES2(NVGcontext* ctx);
export function nvgDeleteWebGL(ctx: NVGcontext): void {
  bind.nvgDeleteWebGL(ctx);
}

// int nvglCreateImageFromHandleGLES2(NVGcontext* ctx, GLuint textureId, int w, int h, int flags);
export function nvglCreateImageFromHandleWebGL(ctx: NVGcontext, textureId: WebGLTexture | null, w: number, h: number, flags: number): number {
  return bind.nvglCreateImageFromHandleWebGL(ctx, textureId, w, h, flags);
}
// GLuint nvglImageHandleGLES2(NVGcontext* ctx, int image);
export function nvglImageHandleWebGL(ctx: NVGcontext, image: number): WebGLTexture | null {
  return bind.nvglImageHandleWebGL(ctx, image);
}

// nanovg_gl_utils.h

// struct NVGLUframebuffer {
// 	NVGcontext* ctx;
// 	GLuint fbo;
// 	GLuint rbo;
// 	GLuint texture;
// 	int image;
// };
// typedef struct NVGLUframebuffer NVGLUframebuffer;
export type NVGLUframebuffer = Bind.NVGLUframebuffer;

// void nvgluBindFramebuffer(NVGLUframebuffer* fb);
export function nvgluBindFramebuffer(fb: NVGLUframebuffer | null): void {
  return bind.nvgluBindFramebuffer(fb);
}
// NVGLUframebuffer* nvgluCreateFramebuffer(NVGcontext* ctx, int w, int h, int imageFlags);
export function nvgluCreateFramebuffer(ctx: NVGcontext, w: number, h: number, imageFlags: NVGimageFlags): NVGLUframebuffer {
  return bind.nvgluCreateFramebuffer(ctx, w, h, imageFlags);
}
// void nvgluDeleteFramebuffer(NVGLUframebuffer* fb);
export function nvgluDeleteFramebuffer(fb: NVGLUframebuffer): void {
  return bind.nvgluDeleteFramebuffer(fb);
}

// 

export { NVG_PI as PI }
export { NVGcolor as Color };
export { NVGpaint as Paint };
export { NVGwinding as Winding };
export { NVGsolidity as Solidity };
export { NVGlineCap as LineCap };
export { NVGalign as Align };
export { NVGblendFactor as BlendFactor };
export { NVGcompositeOperation as CompositeOperation };
export { NVGcompositeOperationState as CompositeOperationState };
export { NVGglyphPosition as GlyphPosition };
export { NVGtextRow as TextRow };
export { NVGimageFlags as ImageFlags };

export { nvgRGB as RGB };
export { nvgRGBf as RGBf };
export { nvgRGBA as RGBA };
export { nvgRGBAf as RGBAf };
export { nvgLerpRGBA as lerpRGBA };
export { nvgTransRGBA as transRGBA };
export { nvgTransRGBAf as transRGBAf };
export { nvgHSL as HSL };
export { nvgHSLA as HSLA };

export { nvgTransformIdentity as transformIdentity };
export { nvgTransformTranslate as transformTranslate };
export { nvgTransformScale as transformScale };
export { nvgTransformRotate as transformRotate };
export { nvgTransformSkewX as transformSkewX };
export { nvgTransformSkewY as transformSkewY };
export { nvgTransformMultiply as transformMultiply };
export { nvgTransformPremultiply as transformPremultiply };
export { nvgTransformInverse as transformInverse };
export { nvgTransformPoint as transformPoint };
export { nvgDegToRad as degToRad };
export { nvgRadToDeg as radToDeg };

export class Context {
  gl: WebGLRenderingContext | null;
  ctx: NVGcontext;

  constructor(gl: WebGLRenderingContext | null, flags: NVGcreateFlags) {
    this.gl = gl;
    this.ctx = nvgCreateWebGL(gl, flags);
  }

  delete(): void {
    nvgDeleteWebGL(this.ctx);
    this.gl = null;
  }

  beginFrame(windowWidth: number, windowHeight: number, devicePixelRatio: number): void { nvgBeginFrame(this.ctx, windowWidth, windowHeight, devicePixelRatio); }
  cancelFrame(): void { nvgCancelFrame(this.ctx); }
  endFrame(): void { nvgEndFrame(this.ctx); }
  globalCompositeOperation(op: NVGcompositeOperation): void { nvgGlobalCompositeOperation(this.ctx, op); }
  globalCompositeBlendFunc(sfactor: NVGblendFactor, dfactor: NVGblendFactor): void { nvgGlobalCompositeBlendFunc(this.ctx, sfactor, dfactor); }
  globalCompositeBlendFuncSeparate(srcRGB: NVGblendFactor, dstRGB: NVGblendFactor, srcAlpha: NVGblendFactor, dstAlpha: NVGblendFactor): void { nvgGlobalCompositeBlendFuncSeparate(this.ctx, srcRGB, dstRGB, srcAlpha, dstAlpha); }
  RGB(r: number, g: number, b: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgRGB(r, g, b, out); }
  RGBf(r: number, g: number, b: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgRGBf(r, g, b, out); }
  RGBA(r: number, g: number, b: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgRGBA(r, g, b, a, out); }
  RGBAf(r: number, g: number, b: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgRGBAf(r, g, b, a, out); }
  lerpRGBA(c0: NVGcolor, c1: NVGcolor, u: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgLerpRGBA(c0, c1, u, out); }
  transRGBA(c: NVGcolor, a: number): NVGcolor { return nvgTransRGBA(c, a); }
  transRGBAf(c: NVGcolor, a: number): NVGcolor { return nvgTransRGBAf(c, a); }
  HSL(h: number, s: number, l: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgHSL(h, s, l, out); }
  HSLA(h: number, s: number, l: number, a: number, out: NVGcolor = new NVGcolor()): NVGcolor { return nvgHSLA(h, s, l, a, out); }
  save(): void { nvgSave(this.ctx); }
  restore(): void { nvgRestore(this.ctx); }
  reset(): void { nvgReset(this.ctx); }
  shapeAntiAlias(enabled: boolean = true): void { nvgShapeAntiAlias(this.ctx, enabled); }
  strokeColor(color: NVGcolor): void { nvgStrokeColor(this.ctx, color); }
  strokePaint(paint: NVGpaint): void { nvgStrokePaint(this.ctx, paint); }
  fillColor(color: NVGcolor): void { nvgFillColor(this.ctx, color); }
  fillPaint(paint: NVGpaint): void { nvgFillPaint(this.ctx, paint); }
  miterLimit(limit: number): void { nvgMiterLimit(this.ctx, limit); }
  strokeWidth(size: number): void { nvgStrokeWidth(this.ctx, size); }
  lineCap(cap: NVGlineCap.BUTT | NVGlineCap.ROUND | NVGlineCap.NVG_SQUARE): void { nvgLineCap(this.ctx, cap); }
  lineJoin(join: NVGlineCap.MITER | NVGlineCap.ROUND | NVGlineCap.BEVEL): void { nvgLineJoin(this.ctx, join); }
  globalAlpha(alpha: number): void { nvgGlobalAlpha(this.ctx, alpha); }
  resetTransform(): void { nvgResetTransform(this.ctx); }
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void { nvgTransform(this.ctx, a, b, c, d, e, f); }
  translate(x: number, y: number): void { nvgTranslate(this.ctx, x, y); }
  rotate(angle: number): void { nvgRotate(this.ctx, angle); }
  skewX(angle: number): void { nvgSkewX(this.ctx, angle); }
  skewY(angle: number): void { nvgSkewY(this.ctx, angle); }
  scale(x: number, y: number): void { nvgScale(this.ctx, x, y); }
  currentTransform(xform: Float32Array): void { nvgCurrentTransform(this.ctx, xform); }
  transformIdentity(dst: Float32Array): void { nvgTransformIdentity(dst); }
  transformTranslate(dst: Float32Array, tx: number, ty: number): void { nvgTransformTranslate(dst, tx, ty); }
  transformScale(dst: Float32Array, sx: number, sy: number): void { nvgTransformScale(dst, sx, sy); }
  transformRotate(dst: Float32Array, a: number): void { nvgTransformRotate(dst, a); }
  transformSkewX(dst: Float32Array, a: number): void { nvgTransformSkewX(dst, a); }
  transformSkewY(dst: Float32Array, a: number): void { nvgTransformSkewY(dst, a); }
  transformMultiply(dst: Float32Array, src: Float32Array): void { nvgTransformMultiply(dst, src); }
  transformPremultiply(dst: Float32Array, src: Float32Array): void { nvgTransformPremultiply(dst, src); }
  transformInverse(dst: Float32Array, src: Float32Array): number { return nvgTransformInverse(dst, src); }
  transformPoint(dst: Float32Array, xform: Float32Array, src: Float32Array): void { nvgTransformPoint(dst, xform, src); }
  degToRad(deg: number): number { return nvgDegToRad(deg); }
  radToDeg(rad: number): number { return nvgRadToDeg(rad); }
  createImage(filename: string, imageFlags: NVGimageFlags): number { return nvgCreateImage(this.ctx, filename, imageFlags); }
  createImageMem(imageFlags: NVGimageFlags, data: Uint8Array): number { return nvgCreateImageMem(this.ctx, imageFlags, data); }
  createImageRGBA(w: number, h: number, imageFlags: NVGimageFlags, data: Uint8Array): number { return nvgCreateImageRGBA(this.ctx, w, h, imageFlags, data); }
  updateImage(image: number, data: Uint8Array): void { nvgUpdateImage(this.ctx, image, data); }
  imageSize(image: number, w: [number], h: [number]): void { nvgImageSize(this.ctx, image, w, h); }
  deleteImage(image: number): void { nvgDeleteImage(this.ctx, image); }
  linearGradient(sx: number, sy: number, ex: number, ey: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint { return nvgLinearGradient(this.ctx, sx, sy, ex, ey, icol, ocol, out); }
  boxGradient(x: number, y: number, w: number, h: number, r: number, f: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint { return nvgBoxGradient(this.ctx, x, y, w, h, r, f, icol, ocol, out); }
  radialGradient(cx: number, cy: number, inr: number, outr: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint = new NVGpaint()): NVGpaint { return nvgRadialGradient(this.ctx, cx, cy, inr, outr, icol, ocol, out); }
  imagePattern(ox: number, oy: number, ex: number, ey: number, angle: number, image: number, alpha: number, out: NVGpaint = new NVGpaint()): NVGpaint { return nvgImagePattern(this.ctx, ox, oy, ex, ey, angle, image, alpha, out); }
  scissor(x: number, y: number, w: number, h: number): void { nvgScissor(this.ctx, x, y, w, h); }
  intersectScissor(x: number, y: number, w: number, h: number): void { nvgIntersectScissor(this.ctx, x, y, w, h); }
  resetScissor(): void { nvgResetScissor(this.ctx); }
  beginPath(): void { nvgBeginPath(this.ctx); }
  moveTo(x: number, y: number): void { nvgMoveTo(this.ctx, x, y); }
  lineTo(x: number, y: number): void { nvgLineTo(this.ctx, x, y); }
  bezierTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void { nvgBezierTo(this.ctx, c1x, c1y, c2x, c2y, x, y); }
  quadTo(cx: number, cy: number, x: number, y: number): void { nvgQuadTo(this.ctx, cx, cy, x, y); }
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void { nvgArcTo(this.ctx, x1, y1, x2, y2, radius); }
  closePath(): void { nvgClosePath(this.ctx); }
  pathWinding(dir: NVGwinding | NVGsolidity): void { nvgPathWinding(this.ctx, dir); }
  arc(cx: number, cy: number, r: number, a0: number, a1: number, dir: NVGwinding | NVGsolidity): void { nvgArc(this.ctx, cx, cy, r, a0, a1, dir); }
  rect(x: number, y: number, w: number, h: number): void { nvgRect(this.ctx, x, y, w, h); }
  roundedRect(x: number, y: number, w: number, h: number, r: number): void { nvgRoundedRect(this.ctx, x, y, w, h, r); }
  roundedRectVarying(x: number, y: number, w: number, h: number, radTopLeft: number, radTopRight: number, radBottomRight: number, radBottomLeft: number): void { nvgRoundedRectVarying(this.ctx, x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft); }
  ellipse(cx: number, cy: number, rx: number, ry: number): void { nvgEllipse(this.ctx, cx, cy, rx, ry); }
  circle(cx: number, cy: number, r: number): void { nvgCircle(this.ctx, cx, cy, r); }
  fill(): void { nvgFill(this.ctx); }
  stroke(): void { nvgStroke(this.ctx); }
  createFont(name: string, filename: string): number { return nvgCreateFont(this.ctx, name, filename); }
  createFontMem(name: string, data: Uint8Array): number { return nvgCreateFontMem(this.ctx, name, data); }
  findFont(name: string): number { return nvgFindFont(this.ctx, name); }
  addFallbackFontId(baseFont: number, fallbackFont: number): number { return nvgAddFallbackFontId(this.ctx, baseFont, fallbackFont); }
  addFallbackFont(baseFont: string, fallbackFont: string): number { return nvgAddFallbackFont(this.ctx, baseFont, fallbackFont); }
  fontSize(size: number): void { nvgFontSize(this.ctx, size); }
  fontBlur(blur: number): void { nvgFontBlur(this.ctx, blur); }
  textLetterSpacing(spacing: number): void { nvgTextLetterSpacing(this.ctx, spacing); }
  textLineHeight(lineHeight: number): void { nvgTextLineHeight(this.ctx, lineHeight); }
  textAlign(align: NVGalign): void { nvgTextAlign(this.ctx, align); }
  fontFaceId(font: number): void { nvgFontFaceId(this.ctx, font); }
  fontFace(font: string): void { nvgFontFace(this.ctx, font); }
  text(x: number, y: number, string: string, end: number | null = null): number { return nvgText(this.ctx, x, y, string, end); }
  textBox(x: number, y: number, breakRowWidth: number, string: string, end: number | null = null): void { nvgTextBox(this.ctx, x, y, breakRowWidth, string, end); }
  textBounds(x: number, y: number, string: string, end: number | null = null, bounds: Float32Array | null = null): number { return nvgTextBounds(this.ctx, x, y, string, end, bounds); }
  textBoxBounds(x: number, y: number, breakRowWidth: number, string: string, end: number | null, bounds: Float32Array): void { nvgTextBoxBounds(this.ctx, x, y, breakRowWidth, string, end, bounds); }
  textGlyphPositions(x: number, y: number, string: string, end: number | null, positions: NVGglyphPosition[]): number { return nvgTextGlyphPositions(this.ctx, x, y, string, end, positions); }
  textMetrics(ascender: [number] | null, descender: [number] | null, lineh: [number] | null): void { nvgTextMetrics(this.ctx, ascender, descender, lineh); }
  textBreakLines(string: string, end: number | null, breakRowWidth: number, rows: NVGtextRow[]): number { return nvgTextBreakLines(this.ctx, string, end, breakRowWidth, rows); }

  strokeRect(x: number, y: number, w: number, h: number): void { this.beginPath(); this.rect(x, y, w, h); this.stroke(); }
  fillRect(x: number, y: number, w: number, h: number): void { this.beginPath(); this.rect(x, y, w, h); this.fill(); }
  drawImage(image: number, sx: number, sy: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number): void {
    const w: [number] = [0];
    const h: [number] = [0];
    this.imageSize(image, w, h);
    sw = sw || w[0];
    sh = sh || h[0];
    this.fillPaint(this.imagePattern(sx, sy, sw, sh, 0, image, 1.0));
    this.fillRect(sx, sy, sw, sh);
  }

  debugDumpPathCache(): void { nvgDebugDumpPathCache(this.ctx); }
}

export { NVGcreateFlags as CreateFlags };

export function createWebGL(gl: WebGLRenderingContext | null, flags: NVGcreateFlags): Context {
  return new Context(gl, flags);
}

export function deleteWebGL(ctx: Context): void {
  ctx.delete();
}
