import * as Emscripten from "./emscripten";

// emcc -s MODULARIZE=0
// declare const Module: ImGuiModule; export default Module;

// emcc -s MODULARIZE=1
export default function Module(Module?: Partial<Module>): Promise<Module>;

export interface mallinfo {
  arena: number;
  ordblks: number;
  smblks: number;
  hblks: number;
  hblkhd: number;
  usmblks: number;
  fsmblks: number;
  uordblks: number;
  fordblks: number;
  keepcost: number;
}

export type NVGcontext = number;

export interface NVGcolor {
  rgba: Float32Array;
  r: number;
  g: number;
  b: number;
  a: number;
}

// export class reference_NVGcolor extends Emscripten.EmscriptenClassReference implements NVGcolor {
//   rgba: Float32Array;
//   r: number;
//   g: number;
//   b: number;
//   a: number;
// }

export interface NVGpaint {
  readonly xform: Float32Array;
  readonly extent: Float32Array;
  radius: number;
  feather: number;
  readonly innerColor: NVGcolor;
  readonly outerColor: NVGcolor;
  image: number;
}

// export class reference_NVGpaint extends Emscripten.EmscriptenClassReference implements NVGpaint {
//   readonly xform: Float32Array;
//   readonly extent: Float32Array;
//   radius: number;
//   feather: number;
//   readonly innerColor: reference_NVGcolor;
//   readonly outerColor: reference_NVGcolor;
//   image: number;
// }

export type NVGwinding = number;

export type NVGsolidity = number;

export type NVGlineCap = number;

export type NVGalign = number;

export type NVGblendFactor = number;

export type NVGcompositeOperation = number;

export interface NVGcompositeOperationState {
  srcRGB: NVGblendFactor;
  dstRGB: NVGblendFactor;
  srcAlpha: NVGblendFactor;
  dstAlpha: NVGblendFactor;
}

// export class reference_NVGcompositeOperationState extends Emscripten.EmscriptenClassReference implements NVGcompositeOperationState {
//   srcRGB: NVGblendFactor;
//   dstRGB: NVGblendFactor;
//   srcAlpha: NVGblendFactor;
//   dstAlpha: NVGblendFactor;
// }

export interface NVGglyphPosition {
  str: number;
  x: number;
  minx: number;
  maxx: number;
}

export interface NVGtextRow {
  start: number;
  end: number;
  next: number;
  width: number;
  minx: number;
  maxx: number;
}

export type NVGimageFlags = number;

// export type NVGtexture = number;

// export interface NVGscissor {
//   readonly xform: Float32Array;
//   readonly extent: Float32Array;
// }

// export class reference_NVGscissor extends Emscripten.EmscriptenClassReference implements NVGscissor {
//   readonly xform: Float32Array;
//   readonly extent: Float32Array;
// }

// export interface NVGvertex {
//   x: number;
//   y: number;
//   u: number;
//   v: number;
// }

// export interface NVGpath {
//   first: number;
//   count: number;
//   closed: boolean;
//   nbevel: number;
//   fill: NVGvertex[]; // NVGvertex* fill;
//   nfill: number;
//   stroke: NVGvertex[]; // NVGvertex* stroke;
//   nstroke: number;
//   winding: number;
//   convex: number;
// }

// export interface NVGparams {
//   userPtr: any;
//   edgeAntiAlias: boolean;
//   renderCreate: (uptr: any) => number;
//   renderCreateTexture: (uptr: any, type: NVGtexture, w: number, h: number, imageFlags: NVGimageFlags, data: ArrayBufferView) => number;
//   renderDeleteTexture: (uptr: any, image: number) => number;
//   renderUpdateTexture: (uptr: any, image: number, x: number, y: number, w: number, h: number, data: ArrayBufferView) => number;
//   renderGetTextureSize: (uptr: any, image: number, w: [number], h: [number]) => number;
//   renderViewport: (uptr: any, width: number, height: number, devidePixelRatio: number) => void;
//   renderCancel: (uptr: any) => void;
//   renderFlush: (uptr: any) => void;
//   renderFill: (uptr: any, paint: reference_NVGpaint, compositeOperation: reference_NVGcompositeOperationState, scissor: reference_NVGscissor, fringe: number, bounds: Float32Array, paths: NVGpath[], npaths: number) => void;
//   renderStroke: (uptr: any, paint: reference_NVGpaint, compositeOperation: reference_NVGcompositeOperationState, scissor: reference_NVGscissor, fringe: number, strokeWidth: number, paths: ArrayBufferView, npaths: number) => void;
//   renderTriangles: (uptr: any, paint: reference_NVGpaint, compositeOperation: reference_NVGcompositeOperationState, scissor: reference_NVGscissor, verts: NVGvertex[], nverts: number) => void;
//   renderDelete: (uptr: any) => void;
// }

export interface NVGLUframebuffer {
  // ctx: NVGcontext;
  fbo: WebGLFramebuffer;
  rbo: WebGLRenderbuffer;
  texture: WebGLTexture;
  image: number;
}

export interface Module extends Emscripten.EmscriptenModule {

  mallinfo(): mallinfo;

  // Begin drawing a new frame
  // Calls to nanovg drawing API should be wrapped in nvgBeginFrame() & nvgEndFrame()
  // nvgBeginFrame() defines the size of the window to render to in relation currently
  // set viewport (i.e. glViewport on GL backends). Device pixel ration allows to
  // control the rendering on Hi-DPI devices.
  // For example, GLFW returns two dimension for an opened window: window size and
  // frame buffer size. In that case you would set windowWidth/Height to the window size
  // devicePixelRatio to: frameBufferWidth / windowWidth.
  // void nvgBeginFrame(NVGcontext* ctx, float windowWidth, float windowHeight, float devicePixelRatio);
  nvgBeginFrame(ctx: NVGcontext, windowWidth: number, windowHeight: number, devicePixelRatio: number): void;

  // Cancels drawing the current frame.
  // void nvgCancelFrame(NVGcontext* ctx);
  nvgCancelFrame(ctx: NVGcontext): void;

  // Ends drawing flushing remaining render state.
  // void nvgEndFrame(NVGcontext* ctx);
  nvgEndFrame(ctx: NVGcontext): void;

  //
  // Composite operation
  //
  // The composite operations in NanoVG are modeled after HTML Canvas API, and
  // the blend func is based on OpenGL (see corresponding manuals for more info).
  // The colors in the blending state have premultiplied alpha.

  // Sets the composite operation. The op parameter should be one of NVGcompositeOperation.
  // void nvgGlobalCompositeOperation(NVGcontext* ctx, int op);
  nvgGlobalCompositeOperation(ctx: NVGcontext, op: number): void

  // Sets the composite operation with custom pixel arithmetic. The parameters should be one of NVGblendFactor.
  // void nvgGlobalCompositeBlendFunc(NVGcontext* ctx, int sfactor, int dfactor);
  nvgGlobalCompositeBlendFunc(ctx: NVGcontext, sfactor: number, dfactor: number): void

  // Sets the composite operation with custom pixel arithmetic for RGB and alpha components separately. The parameters should be one of NVGblendFactor.
  // void nvgGlobalCompositeBlendFuncSeparate(NVGcontext* ctx, int srcRGB, int dstRGB, int srcAlpha, int dstAlpha);
  nvgGlobalCompositeBlendFuncSeparate(ctx: NVGcontext, srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void

  //
  // Color utils
  //
  // Colors in NanoVG are stored as unsigned ints in ABGR format.

  // Returns a color value from red, green, blue values. Alpha will be set to 255 (1.0f).
  // NVGcolor nvgRGB(unsigned char r, unsigned char g, unsigned char b);

  // Returns a color value from red, green, blue values. Alpha will be set to 1.0f.
  // NVGcolor nvgRGBf(float r, float g, float b);


  // Returns a color value from red, green, blue and alpha values.
  // NVGcolor nvgRGBA(unsigned char r, unsigned char g, unsigned char b, unsigned char a);

  // Returns a color value from red, green, blue and alpha values.
  // NVGcolor nvgRGBAf(float r, float g, float b, float a);


  // Linearly interpolates from color c0 to c1, and returns resulting color value.
  // NVGcolor nvgLerpRGBA(NVGcolor c0, NVGcolor c1, float u);

  // Sets transparency of a color value.
  // NVGcolor nvgTransRGBA(NVGcolor c0, unsigned char a);

  // Sets transparency of a color value.
  // NVGcolor nvgTransRGBAf(NVGcolor c0, float a);

  // Returns color value specified by hue, saturation and lightness.
  // HSL values are all in range [0..1], alpha will be set to 255.
  // NVGcolor nvgHSL(float h, float s, float l);

  // Returns color value specified by hue, saturation and lightness and alpha.
  // HSL values are all in range [0..1], alpha in range [0..255]
  // NVGcolor nvgHSLA(float h, float s, float l, unsigned char a);

  //
  // State Handling
  //
  // NanoVG contains state which represents how paths will be rendered.
  // The state contains transform, fill and stroke styles, text and font styles,
  // and scissor clipping.

  // Pushes and saves the current render state into a state stack.
  // A matching nvgRestore() must be used to restore the state.
  // void nvgSave(NVGcontext* ctx);
  nvgSave(ctx: NVGcontext): void

  // Pops and restores current render state.
  // void nvgRestore(NVGcontext* ctx);
  nvgRestore(ctx: NVGcontext): void

  // Resets current render state to default values. Does not affect the render state stack.
  // void nvgReset(NVGcontext* ctx);
  nvgReset(ctx: NVGcontext): void

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
  nvgShapeAntiAlias(ctx: NVGcontext, enabled: number): void

  // Sets current stroke style to a solid color.
  // void nvgStrokeColor(NVGcontext* ctx, NVGcolor color);
  nvgStrokeColor(ctx: NVGcontext, color: NVGcolor): void;

  // Sets current stroke style to a paint, which can be a one of the gradients or a pattern.
  // void nvgStrokePaint(NVGcontext* ctx, NVGpaint paint);
  nvgStrokePaint(ctx: NVGcontext, paint: NVGpaint): void;

  // Sets current fill style to a solid color.
  // void nvgFillColor(NVGcontext* ctx, NVGcolor color);
  nvgFillColor(ctx: NVGcontext, color: NVGcolor): void;

  // Sets current fill style to a paint, which can be a one of the gradients or a pattern.
  // void nvgFillPaint(NVGcontext* ctx, NVGpaint paint);
  nvgFillPaint(ctx: NVGcontext, paint: NVGpaint): void;

  // Sets the miter limit of the stroke style.
  // Miter limit controls when a sharp corner is beveled.
  // void nvgMiterLimit(NVGcontext* ctx, float limit);
  nvgMiterLimit(ctx: NVGcontext, limit: number): void

  // Sets the stroke width of the stroke style.
  // void nvgStrokeWidth(NVGcontext* ctx, float size);
  nvgStrokeWidth(ctx: NVGcontext, size: number): void

  // Sets how the end of the line (cap) is drawn,
  // Can be one of: NVG_BUTT (default), NVG_ROUND, NVG_SQUARE.
  // void nvgLineCap(NVGcontext* ctx, int cap);
  nvgLineCap(ctx: NVGcontext, cap: number): void

  // Sets how sharp path corners are drawn.
  // Can be one of NVG_MITER (default), NVG_ROUND, NVG_BEVEL.
  // void nvgLineJoin(NVGcontext* ctx, int join);
  nvgLineJoin(ctx: NVGcontext, join: number): void

  // Sets the transparency applied to all rendered shapes.
  // Already transparent paths will get proportionally more transparent as well.
  // void nvgGlobalAlpha(NVGcontext* ctx, float alpha);
  nvgGlobalAlpha(ctx: NVGcontext, alpha: number): void

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
  nvgResetTransform(ctx: NVGcontext): void

  // Premultiplies current coordinate system by specified matrix.
  // The parameters are interpreted as matrix as follows:
  //   [a c e]
  //   [b d f]
  //   [0 0 1]
  // void nvgTransform(NVGcontext* ctx, float a, float b, float c, float d, float e, float f);
  nvgTransform(ctx: NVGcontext, a: number, b: number, c: number, d: number, e: number, f: number): void

  // Translates current coordinate system.
  // void nvgTranslate(NVGcontext* ctx, float x, float y);
  nvgTranslate(ctx: NVGcontext, x: number, y: number): void

  // Rotates current coordinate system. Angle is specified in radians.
  // void nvgRotate(NVGcontext* ctx, float angle);
  nvgRotate(ctx: NVGcontext, angle: number): void

  // Skews the current coordinate system along X axis. Angle is specified in radians.
  // void nvgSkewX(NVGcontext* ctx, float angle);
  nvgSkewX(ctx: NVGcontext, angle: number): void

  // Skews the current coordinate system along Y axis. Angle is specified in radians.
  // void nvgSkewY(NVGcontext* ctx, float angle);
  nvgSkewY(ctx: NVGcontext, angle: number): void

  // Scales the current coordinate system.
  // void nvgScale(NVGcontext* ctx, float x, float y);
  nvgScale(ctx: NVGcontext, x: number, y: number): void

  // Stores the top part (a-f) of the current transformation matrix in to the specified buffer.
  //   [a c e]
  //   [b d f]
  //   [0 0 1]
  // There should be space for 6 floats in the return buffer for the values a-f.
  // void nvgCurrentTransform(NVGcontext* ctx, float* xform);
  nvgCurrentTransform(ctx: NVGcontext, xform: Float32Array): void;


  // The following functions can be used to make calculations on 2x3 transformation matrices.
  // A 2x3 matrix is represented as float[6].

  // Sets the transform to identity matrix.
  // void nvgTransformIdentity(float* dst);

  // Sets the transform to translation matrix matrix.
  // void nvgTransformTranslate(float* dst, float tx, float ty);

  // Sets the transform to scale matrix.
  // void nvgTransformScale(float* dst, float sx, float sy);

  // Sets the transform to rotate matrix. Angle is specified in radians.
  // void nvgTransformRotate(float* dst, float a);

  // Sets the transform to skew-x matrix. Angle is specified in radians.
  // void nvgTransformSkewX(float* dst, float a);

  // Sets the transform to skew-y matrix. Angle is specified in radians.
  // void nvgTransformSkewY(float* dst, float a);

  // Sets the transform to the result of multiplication of two transforms, of A = A*B.
  // void nvgTransformMultiply(float* dst, const float* src);

  // Sets the transform to the result of multiplication of two transforms, of A = B*A.
  // void nvgTransformPremultiply(float* dst, const float* src);

  // Sets the destination to inverse of specified transform.
  // Returns 1 if the inverse could be calculated, else 0.
  // int nvgTransformInverse(float* dst, const float* src);

  // Transform a point by given transform.
  // void nvgTransformPoint(float* dstx, float* dsty, const float* xform, float srcx, float srcy);

  // Converts degrees to radians and vice versa.
  // float nvgDegToRad(float deg);
  // float nvgRadToDeg(float rad);

  //
  // Images
  //
  // NanoVG allows you to load jpg, png, psd, tga, pic and gif files to be used for rendering.
  // In addition you can upload your own image. The image loading is provided by stb_image.
  // The parameter imageFlags is combination of flags defined in NVGimageFlags.

  // Creates image by loading it from the disk from specified file name.
  // Returns handle to the image.
  // int nvgCreateImage(NVGcontext* ctx, const char* filename, int imageFlags);
  nvgCreateImage(ctx: NVGcontext, filename: string, imageFlags: number): number

  // Creates image by loading it from the specified chunk of memory.
  // Returns handle to the image.
  // int nvgCreateImageMem(NVGcontext* ctx, int imageFlags, unsigned char* data, int ndata);
  nvgCreateImageMem(ctx: NVGcontext, imageFlags: NVGimageFlags, data: Uint8Array): number;

  // Creates image from specified image data.
  // Returns handle to the image.
  // int nvgCreateImageRGBA(NVGcontext* ctx, int w, int h, int imageFlags, const unsigned char* data);
  nvgCreateImageRGBA(ctx: NVGcontext, w: number, h: number, imageFlags: NVGimageFlags, data: Uint8Array): number;

  // Updates image data specified by image handle.
  // void nvgUpdateImage(NVGcontext* ctx, int image, const unsigned char* data);
  nvgUpdateImage(ctx: NVGcontext, image: number, data: Uint8Array): number;

  // Returns the dimensions of a created image.
  // void nvgImageSize(NVGcontext* ctx, int image, int* w, int* h);
  nvgImageSize(ctx: NVGcontext, image: number, w: [number], h:[number]): void;

  // Deletes created image.
  // void nvgDeleteImage(NVGcontext* ctx, int image);
  nvgDeleteImage(ctx: NVGcontext, image: number): void;

  //
  // Paints
  //
  // NanoVG supports four types of paints: linear gradient, box gradient, radial gradient and image pattern.
  // These can be used as paints for strokes and fills.

  // Creates and returns a linear gradient. Parameters (sx,sy)-(ex,ey) specify the start and end coordinates
  // of the linear gradient, icol specifies the start color and ocol the end color.
  // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
  // NVGpaint nvgLinearGradient(NVGcontext* ctx, float sx, float sy, float ex, float ey, NVGcolor icol, NVGcolor ocol);
  nvgLinearGradient(ctx: NVGcontext, sx: number, sy: number, ex: number, ey: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint): NVGpaint;

  // Creates and returns a box gradient. Box gradient is a feathered rounded rectangle, it is useful for rendering
  // drop shadows or highlights for boxes. Parameters (x,y) define the top-left corner of the rectangle,
  // (w,h) define the size of the rectangle, r defines the corner radius, and f feather. Feather defines how blurry
  // the border of the rectangle is. Parameter icol specifies the inner color and ocol the outer color of the gradient.
  // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
  // NVGpaint nvgBoxGradient(NVGcontext* ctx, float x, float y, float w, float h, float r, float f, NVGcolor icol, NVGcolor ocol);
  nvgBoxGradient(ctx: NVGcontext, x: number, y: number, w: number, h: number, r: number, f: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint): NVGpaint;

  // Creates and returns a radial gradient. Parameters (cx,cy) specify the center, inr and outr specify
  // the inner and outer radius of the gradient, icol specifies the start color and ocol the end color.
  // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
  // NVGpaint nvgRadialGradient(NVGcontext* ctx, float cx, float cy, float inr, float outr, NVGcolor icol, NVGcolor ocol);
  nvgRadialGradient(ctx: NVGcontext, cx: number, cy: number, inr: number, outr: number, icol: NVGcolor, ocol: NVGcolor, out: NVGpaint): NVGpaint;

  // Creates and returns an image patter. Parameters (ox,oy) specify the left-top location of the image pattern,
  // (ex,ey) the size of one image, angle rotation around the top-left corner, image is handle to the image to render.
  // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
  // NVGpaint nvgImagePattern(NVGcontext* ctx, float ox, float oy, float ex, float ey, float angle, int image, float alpha);
  nvgImagePattern(ctx: NVGcontext, ox: number, oy: number, ex: number, ey: number, angle: number, image: number, alpha: number, out: NVGpaint): NVGpaint;

  //
  // Scissoring
  //
  // Scissoring allows you to clip the rendering into a rectangle. This is useful for various
  // user interface cases like rendering a text edit or a timeline.

  // Sets the current scissor rectangle.
  // The scissor rectangle is transformed by the current transform.
  // void nvgScissor(NVGcontext* ctx, float x, float y, float w, float h);
  nvgScissor(ctx: NVGcontext, x: number, y: number, w: number, h: number): void

  // Intersects current scissor rectangle with the specified rectangle.
  // The scissor rectangle is transformed by the current transform.
  // Note: in case the rotation of previous scissor rect differs from
  // the current one, the intersection will be done between the specified
  // rectangle and the previous scissor rectangle transformed in the current
  // transform space. The resulting shape is always rectangle.
  // void nvgIntersectScissor(NVGcontext* ctx, float x, float y, float w, float h);
  nvgIntersectScissor(ctx: NVGcontext, x: number, y: number, w: number, h: number): void

  // Reset and disables scissoring.
  // void nvgResetScissor(NVGcontext* ctx);
  nvgResetScissor(ctx: NVGcontext): void

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
  nvgBeginPath(ctx: NVGcontext): void;

  // Starts new sub-path with specified point as first point.
  // void nvgMoveTo(NVGcontext* ctx, float x, float y);
  nvgMoveTo(ctx: NVGcontext, x: number, y: number): void;

  // Adds line segment from the last point in the path to the specified point.
  // void nvgLineTo(NVGcontext* ctx, float x, float y);
  nvgLineTo(ctx: NVGcontext, x: number, y: number): void;

  // Adds cubic bezier segment from last point in the path via two control points to the specified point.
  // void nvgBezierTo(NVGcontext* ctx, float c1x, float c1y, float c2x, float c2y, float x, float y);
  nvgBezierTo(ctx: NVGcontext, c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void

  // Adds quadratic bezier segment from last point in the path via a control point to the specified point.
  // void nvgQuadTo(NVGcontext* ctx, float cx, float cy, float x, float y);
  nvgQuadTo(ctx: NVGcontext, cx: number, cy: number, x: number, y: number): void

  // Adds an arc segment at the corner defined by the last path point, and two specified points.
  // void nvgArcTo(NVGcontext* ctx, float x1, float y1, float x2, float y2, float radius);
  nvgArcTo(ctx: NVGcontext, x1: number, y1: number, x2: number, y2: number, radius: number): void

  // Closes current sub-path with a line segment.
  // void nvgClosePath(NVGcontext* ctx);
  nvgClosePath(ctx: NVGcontext): void;

  // Sets the current sub-path winding, see NVGwinding and NVGsolidity.
  // void nvgPathWinding(NVGcontext* ctx, int dir);
  nvgPathWinding(ctx: NVGcontext, dir: number): void

  // Creates new circle arc shaped sub-path. The arc center is at cx,cy, the arc radius is r,
  // and the arc is drawn from angle a0 to a1, and swept in direction dir (NVG_CCW, or NVG_CW).
  // Angles are specified in radians.
  // void nvgArc(NVGcontext* ctx, float cx, float cy, float r, float a0, float a1, int dir);
  nvgArc(ctx: NVGcontext, cx: number, cy: number, r: number, a0: number, a1: number, dir: number): void

  // Creates new rectangle shaped sub-path.
  // void nvgRect(NVGcontext* ctx, float x, float y, float w, float h);
  nvgRect(ctx: NVGcontext, x: number, y: number, w: number, h: number): void;

  // Creates new rounded rectangle shaped sub-path.
  // void nvgRoundedRect(NVGcontext* ctx, float x, float y, float w, float h, float r);
  nvgRoundedRect(ctx: NVGcontext, x: number, y: number, w: number, h: number, r: number): void;

  // Creates new rounded rectangle shaped sub-path with varying radii for each corner.
  // void nvgRoundedRectVarying(NVGcontext* ctx, float x, float y, float w, float h, float radTopLeft, float radTopRight, float radBottomRight, float radBottomLeft);
  nvgRoundedRectVarying(ctx: NVGcontext, x: number, y: number, w: number, h: number, radTopLeft: number, radTopRight: number, radBottomRight: number, radBottomLeft: number): void

  // Creates new ellipse shaped sub-path.
  // void nvgEllipse(NVGcontext* ctx, float cx, float cy, float rx, float ry);
  nvgEllipse(ctx: NVGcontext, cx: number, cy: number, rx: number, ry: number): void

  // Creates new circle shaped sub-path.
  // void nvgCircle(NVGcontext* ctx, float cx, float cy, float r);
  nvgCircle(ctx: NVGcontext, cx: number, cy: number, r: number): void;

  // Fills the current path with current fill style.
  // void nvgFill(NVGcontext* ctx);
  nvgFill(ctx: NVGcontext): void;

  // Fills the current path with current stroke style.
  // void nvgStroke(NVGcontext* ctx);
  nvgStroke(ctx: NVGcontext): void;


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
  //		const char* txt = "Text me up.";
  //		nvgTextBounds(vg, x,y, txt, NULL, bounds);
  //		nvgBeginPath(vg);
  //		nvgRoundedRect(vg, bounds[0],bounds[1], bounds[2]-bounds[0], bounds[3]-bounds[1]);
  //		nvgFill(vg);
  //
  // Note: currently only solid color fill is supported for text.

  // Creates font by loading it from the disk from specified file name.
  // Returns handle to the font.
  // int nvgCreateFont(NVGcontext* ctx, const char* name, const char* filename);
  nvgCreateFont(ctx: NVGcontext, name: string, filename: string): number;

  // Creates font by loading it from the specified memory chunk.
  // Returns handle to the font.
  // int nvgCreateFontMem(NVGcontext* ctx, const char* name, unsigned char* data, int ndata, int freeData);
  nvgCreateFontMem(ctx: NVGcontext, name: string, data: Uint8Array): number;

  // Finds a loaded font of specified name, and returns handle to it, or -1 if the font is not found.
  // int nvgFindFont(NVGcontext* ctx, const char* name);
  nvgFindFont(ctx: NVGcontext, name: string): number;

  // Adds a fallback font by handle.
  // int nvgAddFallbackFontId(NVGcontext* ctx, int baseFont, int fallbackFont);
  nvgAddFallbackFontId(ctx: NVGcontext, baseFont: number, fallbackFont: number): number;

  // Adds a fallback font by name.
  // int nvgAddFallbackFont(NVGcontext* ctx, const char* baseFont, const char* fallbackFont);
  nvgAddFallbackFont(ctx: NVGcontext, baseFont: string, fallbackFont: string): number;

  // Sets the font size of current text style.
  // void nvgFontSize(NVGcontext* ctx, float size);
  nvgFontSize(ctx: NVGcontext, size: number): void;

  // Sets the blur of current text style.
  // void nvgFontBlur(NVGcontext* ctx, float blur);
  nvgFontBlur(ctx: NVGcontext, blur: number): void;

  // Sets the letter spacing of current text style.
  // void nvgTextLetterSpacing(NVGcontext* ctx, float spacing);
  nvgTextLetterSpacing(ctx: NVGcontext, spacing: number): void;

  // Sets the proportional line height of current text style. The line height is specified as multiple of font size.
  // void nvgTextLineHeight(NVGcontext* ctx, float lineHeight);
  nvgTextLineHeight(ctx: NVGcontext, lineHeight: number): void;

  // Sets the text align of current text style, see NVGalign for options.
  // void nvgTextAlign(NVGcontext* ctx, int align);
  nvgTextAlign(ctx: NVGcontext, align: number): void;

  // Sets the font face based on specified id of current text style.
  // void nvgFontFaceId(NVGcontext* ctx, int font);
  nvgFontFaceId(ctx: NVGcontext, font: number): void;

  // Sets the font face based on specified name of current text style.
  // void nvgFontFace(NVGcontext* ctx, const char* font);
  nvgFontFace(ctx: NVGcontext, font: string): void;

  // Draws text string at specified location. If end is specified only the sub-string up to the end is drawn.
  // float nvgText(NVGcontext* ctx, float x, float y, const char* string, const char* end);
  nvgText(ctx: NVGcontext, x: number, y: number, string: string, end: number): number;

  // Draws multi-line text string at specified location wrapped at the specified width. If end is specified only the sub-string up to the end is drawn.
  // White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
  // Words longer than the max width are slit at nearest character (i.e. no hyphenation).
  // void nvgTextBox(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end);
  nvgTextBox(ctx: NVGcontext, x: number, y: number, breakRowWidth: number, string: string, end: number): void;

  // Measures the specified text string. Parameter bounds should be a pointer to float[4],
  // if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
  // Returns the horizontal advance of the measured text (i.e. where the next character should drawn).
  // Measured values are returned in local coordinate space.
  // float nvgTextBounds(NVGcontext* ctx, float x, float y, const char* string, const char* end, float* bounds);
  nvgTextBounds(ctx: NVGcontext, x: number, y: number, string: string, end: number, bounds: Float32Array | null): number;

  // Measures the specified multi-text string. Parameter bounds should be a pointer to float[4],
  // if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
  // Measured values are returned in local coordinate space.
  // void nvgTextBoxBounds(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end, float* bounds);
  nvgTextBoxBounds(ctx: NVGcontext, x: number, y: number, breakRowWidth: number, string: string, end: number, bounds: Float32Array): void;

  // Calculates the glyph x positions of the specified text. If end is specified only the sub-string will be used.
  // Measured values are returned in local coordinate space.
  // int nvgTextGlyphPositions(NVGcontext* ctx, float x, float y, const char* string, const char* end, NVGglyphPosition* positions, int maxPositions);
  nvgTextGlyphPositions(ctx: NVGcontext, x: number, y: number, string: string, end: number, positions: NVGglyphPosition[], maxPositions: number): number;

  // Returns the vertical metrics based on the current text style.
  // Measured values are returned in local coordinate space.
  // void nvgTextMetrics(NVGcontext* ctx, float* ascender, float* descender, float* lineh);
  nvgTextMetrics(ctx: NVGcontext, ascender: [number] | null, descender: [number] | null, lineh: [number] | null): void;

  // Breaks the specified text into lines. If end is specified only the sub-string will be used.
  // White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
  // Words longer than the max width are slit at nearest character (i.e. no hyphenation).
  // int nvgTextBreakLines(NVGcontext* ctx, const char* string, const char* end, float breakRowWidth, NVGtextRow* rows, int maxRows);
  nvgTextBreakLines(ctx: NVGcontext, string: string, end: number, breakRowWidth: number, rows: NVGtextRow[], maxRows: number): number;

  // Constructor and destructor, called by the render back-end.
  // NVGcontext* nvgCreateInternal(NVGparams* params);
  // nvgCreateInternal(params: NVGparams): NVGcontext;
  // void nvgDeleteInternal(NVGcontext* ctx);
  // nvgDeleteInternal(ctx: NVGcontext): void;

  // NVGparams* nvgInternalParams(NVGcontext* ctx);
  // nvgInternalParams(ctx: NVGcontext): NVGparams;

  // Debug function to dump cached path data.
  // void nvgDebugDumpPathCache(NVGcontext* ctx);
  nvgDebugDumpPathCache(ctx: NVGcontext): void;

  // nanovg_gl.h

  // NVGcontext* nvgCreateGLES2(int flags);
  nvgCreateWebGL(gl: WebGLRenderingContext | null, flags: number): NVGcontext;
  // void nvgDeleteGLES2(NVGcontext* ctx);
  nvgDeleteWebGL(ctx: NVGcontext): void;
  // int nvglCreateImageFromHandleGLES2(NVGcontext* ctx, GLuint textureId, int w, int h, int flags);
  nvglCreateImageFromHandleWebGL(ctx: NVGcontext, textureId: WebGLTexture | null, w: number, h: number, flags: number): number;
  // GLuint nvglImageHandleGLES2(NVGcontext* ctx, int image);
  nvglImageHandleWebGL(ctx: NVGcontext, image: number): WebGLTexture | null;

  // nanovg_gl_utils.h

  // void nvgluBindFramebuffer(NVGLUframebuffer* fb);
  nvgluBindFramebuffer(fb: NVGLUframebuffer | null): void;
  // NVGLUframebuffer* nvgluCreateFramebuffer(NVGcontext* ctx, int w, int h, int imageFlags);
  nvgluCreateFramebuffer(ctx: NVGcontext, w: number, h: number, imageFlags: NVGimageFlags): NVGLUframebuffer;
  // void nvgluDeleteFramebuffer(NVGLUframebuffer* fb);
  nvgluDeleteFramebuffer(fb: NVGLUframebuffer): void;
}
