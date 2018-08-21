System.register(["./bind-nanovg"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Bind, bind, NVG_PI, NVGcolor, NVGpaint, NVGwinding, NVGsolidity, NVGlineCap, NVGalign, NVGblendFactor, NVGcompositeOperation, NVGcompositeOperationState, NVGglyphPosition, NVGtextRow, NVGimageFlags, s2, NVGcreateFlags, Context;
    var __moduleName = context_1 && context_1.id;
    function default_1(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                Bind.default(value).then((value) => {
                    exports_1("bind", bind = value);
                    resolve();
                });
            });
        });
    }
    exports_1("default", default_1);
    // static float nvg__sqrtf(float a) { return sqrtf(a); }
    function nvg__modf(a, b) { return a % b; }
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
    function nvg__clampf(a, mn, mx) { return a < mn ? mn : mx < a ? mx : a; }
    // Begin drawing a new frame
    // Calls to nanovg drawing API should be wrapped in nvgBeginFrame() & nvgEndFrame()
    // nvgBeginFrame() defines the size of the window to render to in relation currently
    // set viewport (i.e. glViewport on GL backends). Device pixel ration allows to
    // control the rendering on Hi-DPI devices.
    // For example, GLFW returns two dimension for an opened window: window size and
    // frame buffer size. In that case you would set windowWidth/Height to the window size
    // devicePixelRatio to: frameBufferWidth / windowWidth.
    // void nvgBeginFrame(NVGcontext* ctx, float windowWidth, float windowHeight, float devicePixelRatio);
    function nvgBeginFrame(ctx, windowWidth, windowHeight, devicePixelRatio) {
        bind.nvgBeginFrame(ctx, windowWidth, windowHeight, devicePixelRatio);
    }
    exports_1("nvgBeginFrame", nvgBeginFrame);
    // Cancels drawing the current frame.
    // void nvgCancelFrame(NVGcontext* ctx);
    function nvgCancelFrame(ctx) {
        bind.nvgCancelFrame(ctx);
    }
    exports_1("nvgCancelFrame", nvgCancelFrame);
    // Ends drawing flushing remaining render state.
    // void nvgEndFrame(NVGcontext* ctx);
    function nvgEndFrame(ctx) {
        bind.nvgEndFrame(ctx);
    }
    exports_1("nvgEndFrame", nvgEndFrame);
    //
    // Composite operation
    //
    // The composite operations in NanoVG are modeled after HTML Canvas API, and
    // the blend func is based on OpenGL (see corresponding manuals for more info).
    // The colors in the blending state have premultiplied alpha.
    // Sets the composite operation. The op parameter should be one of NVGcompositeOperation.
    // void nvgGlobalCompositeOperation(NVGcontext* ctx, int op);
    function nvgGlobalCompositeOperation(ctx, op) {
        bind.nvgGlobalCompositeOperation(ctx, op);
    }
    exports_1("nvgGlobalCompositeOperation", nvgGlobalCompositeOperation);
    // Sets the composite operation with custom pixel arithmetic. The parameters should be one of NVGblendFactor.
    // void nvgGlobalCompositeBlendFunc(NVGcontext* ctx, int sfactor, int dfactor);
    function nvgGlobalCompositeBlendFunc(ctx, sfactor, dfactor) {
        bind.nvgGlobalCompositeBlendFunc(ctx, sfactor, dfactor);
    }
    exports_1("nvgGlobalCompositeBlendFunc", nvgGlobalCompositeBlendFunc);
    // Sets the composite operation with custom pixel arithmetic for RGB and alpha components separately. The parameters should be one of NVGblendFactor.
    // void nvgGlobalCompositeBlendFuncSeparate(NVGcontext* ctx, int srcRGB, int dstRGB, int srcAlpha, int dstAlpha);
    function nvgGlobalCompositeBlendFuncSeparate(ctx, srcRGB, dstRGB, srcAlpha, dstAlpha) {
        bind.nvgGlobalCompositeBlendFuncSeparate(ctx, srcRGB, dstRGB, srcAlpha, dstAlpha);
    }
    exports_1("nvgGlobalCompositeBlendFuncSeparate", nvgGlobalCompositeBlendFuncSeparate);
    //
    // Color utils
    //
    // Colors in NanoVG are stored as unsigned ints in ABGR format.
    // Returns a color value from red, green, blue values. Alpha will be set to 255 (1.0f).
    // NVGcolor nvgRGB(unsigned char r, unsigned char g, unsigned char b);
    function nvgRGB(r, g, b, out = new NVGcolor()) {
        return nvgRGBA(r, g, b, 255, out);
    }
    exports_1("nvgRGB", nvgRGB);
    exports_1("RGB", nvgRGB);
    // Returns a color value from red, green, blue values. Alpha will be set to 1.0f.
    // NVGcolor nvgRGBf(float r, float g, float b);
    function nvgRGBf(r, g, b, out = new NVGcolor()) {
        return nvgRGBAf(r, g, b, 1.0, out);
    }
    exports_1("nvgRGBf", nvgRGBf);
    exports_1("RGBf", nvgRGBf);
    // Returns a color value from red, green, blue and alpha values.
    // NVGcolor nvgRGBA(unsigned char r, unsigned char g, unsigned char b, unsigned char a);
    function nvgRGBA(r, g, b, a, out = new NVGcolor()) {
        out.r = r / 255.0;
        out.g = g / 255.0;
        out.b = b / 255.0;
        out.a = a / 255.0;
        return out;
    }
    exports_1("nvgRGBA", nvgRGBA);
    exports_1("RGBA", nvgRGBA);
    // Returns a color value from red, green, blue and alpha values.
    // NVGcolor nvgRGBAf(float r, float g, float b, float a);
    function nvgRGBAf(r, g, b, a, out = new NVGcolor()) {
        out.r = r;
        out.g = g;
        out.b = b;
        out.a = a;
        return out;
    }
    exports_1("nvgRGBAf", nvgRGBAf);
    exports_1("RGBAf", nvgRGBAf);
    // Linearly interpolates from color c0 to c1, and returns resulting color value.
    // NVGcolor nvgLerpRGBA(NVGcolor c0, NVGcolor c1, float u);
    function nvgLerpRGBA(c0, c1, u, out = new NVGcolor()) {
        u = nvg__clampf(u, 0.0, 1.0);
        const oneminu = 1.0 - u;
        for (let i = 0; i < 4; ++i) {
            out.rgba[i] = c0.rgba[i] * oneminu + c1.rgba[i] * u;
        }
        return out;
    }
    exports_1("nvgLerpRGBA", nvgLerpRGBA);
    exports_1("lerpRGBA", nvgLerpRGBA);
    // Sets transparency of a color value.
    // NVGcolor nvgTransRGBA(NVGcolor c0, unsigned char a);
    function nvgTransRGBA(c, a) {
        c.a = a / 255.0;
        return c;
    }
    exports_1("nvgTransRGBA", nvgTransRGBA);
    exports_1("transRGBA", nvgTransRGBA);
    // Sets transparency of a color value.
    // NVGcolor nvgTransRGBAf(NVGcolor c0, float a);
    function nvgTransRGBAf(c, a) {
        c.a = a;
        return c;
    }
    exports_1("nvgTransRGBAf", nvgTransRGBAf);
    exports_1("transRGBAf", nvgTransRGBAf);
    // Returns color value specified by hue, saturation and lightness.
    // HSL values are all in range [0..1], alpha will be set to 255.
    // NVGcolor nvgHSL(float h, float s, float l);
    function nvgHSL(h, s, l, out = new NVGcolor()) {
        return nvgHSLA(h, s, l, 255, out);
    }
    exports_1("nvgHSL", nvgHSL);
    exports_1("HSL", nvgHSL);
    // static float nvg__hue(float h, float m1, float m2)
    function nvg__hue(h, m1, m2) {
        if (h < 0)
            h += 1;
        if (h > 1)
            h -= 1;
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
    function nvgHSLA(h, s, l, a, out = new NVGcolor()) {
        h = nvg__modf(h, 1.0);
        if (h < 0.0)
            h += 1.0;
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
    exports_1("nvgHSLA", nvgHSLA);
    exports_1("HSLA", nvgHSLA);
    //
    // State Handling
    //
    // NanoVG contains state which represents how paths will be rendered.
    // The state contains transform, fill and stroke styles, text and font styles,
    // and scissor clipping.
    // Pushes and saves the current render state into a state stack.
    // A matching nvgRestore() must be used to restore the state.
    // void nvgSave(NVGcontext* ctx);
    function nvgSave(ctx) {
        bind.nvgSave(ctx);
    }
    exports_1("nvgSave", nvgSave);
    // Pops and restores current render state.
    // void nvgRestore(NVGcontext* ctx);
    function nvgRestore(ctx) {
        bind.nvgRestore(ctx);
    }
    exports_1("nvgRestore", nvgRestore);
    // Resets current render state to default values. Does not affect the render state stack.
    // void nvgReset(NVGcontext* ctx);
    function nvgReset(ctx) {
        bind.nvgReset(ctx);
    }
    exports_1("nvgReset", nvgReset);
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
    function nvgShapeAntiAlias(ctx, enabled = true) {
        bind.nvgShapeAntiAlias(ctx, enabled ? 1 : 0);
    }
    exports_1("nvgShapeAntiAlias", nvgShapeAntiAlias);
    // Sets current stroke style to a solid color.
    // void nvgStrokeColor(NVGcontext* ctx, NVGcolor color);
    function nvgStrokeColor(ctx, color) {
        bind.nvgStrokeColor(ctx, color);
    }
    exports_1("nvgStrokeColor", nvgStrokeColor);
    // Sets current stroke style to a paint, which can be a one of the gradients or a pattern.
    // void nvgStrokePaint(NVGcontext* ctx, NVGpaint paint);
    function nvgStrokePaint(ctx, paint) {
        bind.nvgStrokePaint(ctx, paint);
    }
    exports_1("nvgStrokePaint", nvgStrokePaint);
    // Sets current fill style to a solid color.
    // void nvgFillColor(NVGcontext* ctx, NVGcolor color);
    function nvgFillColor(ctx, color) {
        bind.nvgFillColor(ctx, color);
    }
    exports_1("nvgFillColor", nvgFillColor);
    // Sets current fill style to a paint, which can be a one of the gradients or a pattern.
    // void nvgFillPaint(NVGcontext* ctx, NVGpaint paint);
    function nvgFillPaint(ctx, paint) {
        bind.nvgFillPaint(ctx, paint);
    }
    exports_1("nvgFillPaint", nvgFillPaint);
    // Sets the miter limit of the stroke style.
    // Miter limit controls when a sharp corner is beveled.
    // void nvgMiterLimit(NVGcontext* ctx, float limit);
    function nvgMiterLimit(ctx, limit) {
        bind.nvgMiterLimit(ctx, limit);
    }
    exports_1("nvgMiterLimit", nvgMiterLimit);
    // Sets the stroke width of the stroke style.
    // void nvgStrokeWidth(NVGcontext* ctx, float size);
    function nvgStrokeWidth(ctx, size) {
        bind.nvgStrokeWidth(ctx, size);
    }
    exports_1("nvgStrokeWidth", nvgStrokeWidth);
    // Sets how the end of the line (cap) is drawn,
    // Can be one of: NVG_BUTT (default), NVG_ROUND, NVG_SQUARE.
    // void nvgLineCap(NVGcontext* ctx, int cap);
    function nvgLineCap(ctx, cap) {
        bind.nvgLineCap(ctx, cap);
    }
    exports_1("nvgLineCap", nvgLineCap);
    // Sets how sharp path corners are drawn.
    // Can be one of NVG_MITER (default), NVG_ROUND, NVG_BEVEL.
    // void nvgLineJoin(NVGcontext* ctx, int join);
    function nvgLineJoin(ctx, join) {
        bind.nvgLineJoin(ctx, join);
    }
    exports_1("nvgLineJoin", nvgLineJoin);
    // Sets the transparency applied to all rendered shapes.
    // Already transparent paths will get proportionally more transparent as well.
    // void nvgGlobalAlpha(NVGcontext* ctx, float alpha);
    function nvgGlobalAlpha(ctx, alpha) {
        bind.nvgGlobalAlpha(ctx, alpha);
    }
    exports_1("nvgGlobalAlpha", nvgGlobalAlpha);
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
    function nvgResetTransform(ctx) {
        bind.nvgResetTransform(ctx);
    }
    exports_1("nvgResetTransform", nvgResetTransform);
    // Premultiplies current coordinate system by specified matrix.
    // The parameters are interpreted as matrix as follows:
    //   [a c e]
    //   [b d f]
    //   [0 0 1]
    // void nvgTransform(NVGcontext* ctx, float a, float b, float c, float d, float e, float f);
    function nvgTransform(ctx, a, b, c, d, e, f) {
        bind.nvgTransform(ctx, a, b, c, d, e, f);
    }
    exports_1("nvgTransform", nvgTransform);
    // Translates current coordinate system.
    // void nvgTranslate(NVGcontext* ctx, float x, float y);
    function nvgTranslate(ctx, x, y) {
        bind.nvgTranslate(ctx, x, y);
    }
    exports_1("nvgTranslate", nvgTranslate);
    // Rotates current coordinate system. Angle is specified in radians.
    // void nvgRotate(NVGcontext* ctx, float angle);
    function nvgRotate(ctx, angle) {
        bind.nvgRotate(ctx, angle);
    }
    exports_1("nvgRotate", nvgRotate);
    // Skews the current coordinate system along X axis. Angle is specified in radians.
    // void nvgSkewX(NVGcontext* ctx, float angle);
    function nvgSkewX(ctx, angle) {
        bind.nvgSkewX(ctx, angle);
    }
    exports_1("nvgSkewX", nvgSkewX);
    // Skews the current coordinate system along Y axis. Angle is specified in radians.
    // void nvgSkewY(NVGcontext* ctx, float angle);
    function nvgSkewY(ctx, angle) {
        bind.nvgSkewY(ctx, angle);
    }
    exports_1("nvgSkewY", nvgSkewY);
    // Scales the current coordinate system.
    // void nvgScale(NVGcontext* ctx, float x, float y);
    function nvgScale(ctx, x, y) {
        bind.nvgScale(ctx, x, y);
    }
    exports_1("nvgScale", nvgScale);
    // Stores the top part (a-f) of the current transformation matrix in to the specified buffer.
    //   [a c e]
    //   [b d f]
    //   [0 0 1]
    // There should be space for 6 floats in the return buffer for the values a-f.
    // void nvgCurrentTransform(NVGcontext* ctx, float* xform);
    function nvgCurrentTransform(ctx, xform) {
        bind.nvgCurrentTransform(ctx, xform);
    }
    exports_1("nvgCurrentTransform", nvgCurrentTransform);
    // The following functions can be used to make calculations on 2x3 transformation matrices.
    // A 2x3 matrix is represented as float[6].
    // Sets the transform to identity matrix.
    // void nvgTransformIdentity(float* dst);
    function nvgTransformIdentity(dst) {
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = 1.0;
        dst[4] = 0.0;
        dst[5] = 0.0;
    }
    exports_1("nvgTransformIdentity", nvgTransformIdentity);
    exports_1("transformIdentity", nvgTransformIdentity);
    // Sets the transform to translation matrix matrix.
    // void nvgTransformTranslate(float* dst, float tx, float ty);
    function nvgTransformTranslate(dst, tx, ty) {
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = 1.0;
        dst[4] = tx;
        dst[5] = ty;
    }
    exports_1("nvgTransformTranslate", nvgTransformTranslate);
    exports_1("transformTranslate", nvgTransformTranslate);
    // Sets the transform to scale matrix.
    // void nvgTransformScale(float* dst, float sx, float sy);
    function nvgTransformScale(dst, sx, sy) {
        dst[0] = sx;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = sy;
        dst[4] = 0.0;
        dst[5] = 0.0;
    }
    exports_1("nvgTransformScale", nvgTransformScale);
    exports_1("transformScale", nvgTransformScale);
    // Sets the transform to rotate matrix. Angle is specified in radians.
    // void nvgTransformRotate(float* dst, float a);
    function nvgTransformRotate(dst, a) {
        const cs = Math.cos(a), sn = Math.sin(a);
        dst[0] = cs;
        dst[1] = sn;
        dst[2] = -sn;
        dst[3] = cs;
        dst[4] = 0.0;
        dst[5] = 0.0;
    }
    exports_1("nvgTransformRotate", nvgTransformRotate);
    exports_1("transformRotate", nvgTransformRotate);
    // Sets the transform to skew-x matrix. Angle is specified in radians.
    // void nvgTransformSkewX(float* dst, float a);
    function nvgTransformSkewX(dst, a) {
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = Math.tan(a);
        dst[3] = 1.0;
        dst[4] = 0.0;
        dst[5] = 0.0;
    }
    exports_1("nvgTransformSkewX", nvgTransformSkewX);
    exports_1("transformSkewX", nvgTransformSkewX);
    // Sets the transform to skew-y matrix. Angle is specified in radians.
    // void nvgTransformSkewY(float* dst, float a);
    function nvgTransformSkewY(dst, a) {
        dst[0] = 1.0;
        dst[1] = Math.tan(a);
        dst[2] = 0.0;
        dst[3] = 1.0;
        dst[4] = 0.0;
        dst[5] = 0.0;
    }
    exports_1("nvgTransformSkewY", nvgTransformSkewY);
    exports_1("transformSkewY", nvgTransformSkewY);
    // Sets the transform to the result of multiplication of two transforms, of A = A*B.
    // void nvgTransformMultiply(float* dst, const float* src);
    function nvgTransformMultiply(dst, src) {
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
    exports_1("nvgTransformMultiply", nvgTransformMultiply);
    exports_1("transformMultiply", nvgTransformMultiply);
    function nvgTransformPremultiply(dst, src) {
        s2.set(src); // memcpy(s2, src, sizeof(float)*6);
        nvgTransformMultiply(s2, dst);
        dst.set(s2); // memcpy(dst, s2, sizeof(float)*6);
    }
    exports_1("nvgTransformPremultiply", nvgTransformPremultiply);
    exports_1("transformPremultiply", nvgTransformPremultiply);
    // Sets the destination to inverse of specified transform.
    // Returns 1 if the inverse could be calculated, else 0.
    // int nvgTransformInverse(float* dst, const float* src);
    function nvgTransformInverse(dst, src) {
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
    exports_1("nvgTransformInverse", nvgTransformInverse);
    exports_1("transformInverse", nvgTransformInverse);
    // Transform a point by given transform.
    // void nvgTransformPoint(float* dstx, float* dsty, const float* xform, float srcx, float srcy);
    function nvgTransformPoint(dst, xform, src) {
        const srcx = src[0], srcy = src[1];
        dst[0] = srcx * xform[0] + srcy * xform[2] + xform[4];
        dst[1] = srcx * xform[1] + srcy * xform[3] + xform[5];
    }
    exports_1("nvgTransformPoint", nvgTransformPoint);
    exports_1("transformPoint", nvgTransformPoint);
    // Converts degrees to radians and vice versa.
    // float nvgDegToRad(float deg);
    function nvgDegToRad(deg) {
        return deg / 180.0 * NVG_PI;
    }
    exports_1("nvgDegToRad", nvgDegToRad);
    exports_1("degToRad", nvgDegToRad);
    // float nvgRadToDeg(float rad);
    function nvgRadToDeg(rad) {
        return rad / NVG_PI * 180.0;
    }
    exports_1("nvgRadToDeg", nvgRadToDeg);
    exports_1("radToDeg", nvgRadToDeg);
    //
    // Images
    //
    // NanoVG allows you to load jpg, png, psd, tga, pic and gif files to be used for rendering.
    // In addition you can upload your own image. The image loading is provided by stb_image.
    // The parameter imageFlags is combination of flags defined in NVGimageFlags.
    // Creates image by loading it from the disk from specified file name.
    // Returns handle to the image.
    // int nvgCreateImage(NVGcontext* ctx, const char* filename, int imageFlags);
    function nvgCreateImage(ctx, filename, imageFlags) {
        return nvgCreateImage(ctx, filename, imageFlags);
    }
    exports_1("nvgCreateImage", nvgCreateImage);
    // Creates image by loading it from the specified chunk of memory.
    // Returns handle to the image.
    // int nvgCreateImageMem(NVGcontext* ctx, int imageFlags, unsigned char* data, int ndata);
    function nvgCreateImageMem(ctx, imageFlags, data) {
        return bind.nvgCreateImageMem(ctx, imageFlags, data);
    }
    exports_1("nvgCreateImageMem", nvgCreateImageMem);
    // Creates image from specified image data.
    // Returns handle to the image.
    // int nvgCreateImageRGBA(NVGcontext* ctx, int w, int h, int imageFlags, const unsigned char* data);
    function nvgCreateImageRGBA(ctx, w, h, imageFlags, data) {
        return bind.nvgCreateImageRGBA(ctx, w, h, imageFlags, data);
    }
    exports_1("nvgCreateImageRGBA", nvgCreateImageRGBA);
    // Updates image data specified by image handle.
    // void nvgUpdateImage(NVGcontext* ctx, int image, const unsigned char* data);
    function nvgUpdateImage(ctx, image, data) {
        bind.nvgUpdateImage(ctx, image, data);
    }
    exports_1("nvgUpdateImage", nvgUpdateImage);
    // Returns the dimensions of a created image.
    // void nvgImageSize(NVGcontext* ctx, int image, int* w, int* h);
    function nvgImageSize(ctx, image, w, h) {
        bind.nvgImageSize(ctx, image, w, h);
    }
    exports_1("nvgImageSize", nvgImageSize);
    // Deletes created image.
    // void nvgDeleteImage(NVGcontext* ctx, int image);
    function nvgDeleteImage(ctx, image) {
        bind.nvgDeleteImage(ctx, image);
    }
    exports_1("nvgDeleteImage", nvgDeleteImage);
    //
    // Paints
    //
    // NanoVG supports four types of paints: linear gradient, box gradient, radial gradient and image pattern.
    // These can be used as paints for strokes and fills.
    // Creates and returns a linear gradient. Parameters (sx,sy)-(ex,ey) specify the start and end coordinates
    // of the linear gradient, icol specifies the start color and ocol the end color.
    // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
    // NVGpaint nvgLinearGradient(NVGcontext* ctx, float sx, float sy, float ex, float ey, NVGcolor icol, NVGcolor ocol);
    function nvgLinearGradient(ctx, sx, sy, ex, ey, icol, ocol, out = new NVGpaint()) {
        bind.nvgLinearGradient(ctx, sx, sy, ex, ey, icol, ocol, out);
        return out;
    }
    exports_1("nvgLinearGradient", nvgLinearGradient);
    // Creates and returns a box gradient. Box gradient is a feathered rounded rectangle, it is useful for rendering
    // drop shadows or highlights for boxes. Parameters (x,y) define the top-left corner of the rectangle,
    // (w,h) define the size of the rectangle, r defines the corner radius, and f feather. Feather defines how blurry
    // the border of the rectangle is. Parameter icol specifies the inner color and ocol the outer color of the gradient.
    // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
    // NVGpaint nvgBoxGradient(NVGcontext* ctx, float x, float y, float w, float h, float r, float f, NVGcolor icol, NVGcolor ocol);
    function nvgBoxGradient(ctx, x, y, w, h, r, f, icol, ocol, out = new NVGpaint()) {
        bind.nvgBoxGradient(ctx, x, y, w, h, r, f, icol, ocol, out);
        return out;
    }
    exports_1("nvgBoxGradient", nvgBoxGradient);
    // Creates and returns a radial gradient. Parameters (cx,cy) specify the center, inr and outr specify
    // the inner and outer radius of the gradient, icol specifies the start color and ocol the end color.
    // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
    // NVGpaint nvgRadialGradient(NVGcontext* ctx, float cx, float cy, float inr, float outr, NVGcolor icol, NVGcolor ocol);
    function nvgRadialGradient(ctx, cx, cy, inr, outr, icol, ocol, out = new NVGpaint()) {
        bind.nvgRadialGradient(ctx, cx, cy, inr, outr, icol, ocol, out);
        return out;
    }
    exports_1("nvgRadialGradient", nvgRadialGradient);
    // Creates and returns an image patter. Parameters (ox,oy) specify the left-top location of the image pattern,
    // (ex,ey) the size of one image, angle rotation around the top-left corner, image is handle to the image to render.
    // The gradient is transformed by the current transform when it is passed to nvgFillPaint() or nvgStrokePaint().
    // NVGpaint nvgImagePattern(NVGcontext* ctx, float ox, float oy, float ex, float ey, float angle, int image, float alpha);
    function nvgImagePattern(ctx, ox, oy, ex, ey, angle, image, alpha, out = new NVGpaint()) {
        bind.nvgImagePattern(ctx, ox, oy, ex, ey, angle, image, alpha, out);
        return out;
    }
    exports_1("nvgImagePattern", nvgImagePattern);
    //
    // Scissoring
    //
    // Scissoring allows you to clip the rendering into a rectangle. This is useful for various
    // user interface cases like rendering a text edit or a timeline.
    // Sets the current scissor rectangle.
    // The scissor rectangle is transformed by the current transform.
    // void nvgScissor(NVGcontext* ctx, float x, float y, float w, float h);
    function nvgScissor(ctx, x, y, w, h) {
        bind.nvgScissor(ctx, x, y, w, h);
    }
    exports_1("nvgScissor", nvgScissor);
    // Intersects current scissor rectangle with the specified rectangle.
    // The scissor rectangle is transformed by the current transform.
    // Note: in case the rotation of previous scissor rect differs from
    // the current one, the intersection will be done between the specified
    // rectangle and the previous scissor rectangle transformed in the current
    // transform space. The resulting shape is always rectangle.
    // void nvgIntersectScissor(NVGcontext* ctx, float x, float y, float w, float h);
    function nvgIntersectScissor(ctx, x, y, w, h) {
        bind.nvgIntersectScissor(ctx, x, y, w, h);
    }
    exports_1("nvgIntersectScissor", nvgIntersectScissor);
    // Reset and disables scissoring.
    // void nvgResetScissor(NVGcontext* ctx);
    function nvgResetScissor(ctx) {
        bind.nvgResetScissor(ctx);
    }
    exports_1("nvgResetScissor", nvgResetScissor);
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
    function nvgBeginPath(ctx) {
        bind.nvgBeginPath(ctx);
    }
    exports_1("nvgBeginPath", nvgBeginPath);
    // Starts new sub-path with specified point as first point.
    // void nvgMoveTo(NVGcontext* ctx, float x, float y);
    function nvgMoveTo(ctx, x, y) {
        bind.nvgMoveTo(ctx, x, y);
    }
    exports_1("nvgMoveTo", nvgMoveTo);
    // Adds line segment from the last point in the path to the specified point.
    // void nvgLineTo(NVGcontext* ctx, float x, float y);
    function nvgLineTo(ctx, x, y) {
        bind.nvgLineTo(ctx, x, y);
    }
    exports_1("nvgLineTo", nvgLineTo);
    // Adds cubic bezier segment from last point in the path via two control points to the specified point.
    // void nvgBezierTo(NVGcontext* ctx, float c1x, float c1y, float c2x, float c2y, float x, float y);
    function nvgBezierTo(ctx, c1x, c1y, c2x, c2y, x, y) {
        bind.nvgBezierTo(ctx, c1x, c1y, c2x, c2y, x, y);
    }
    exports_1("nvgBezierTo", nvgBezierTo);
    // Adds quadratic bezier segment from last point in the path via a control point to the specified point.
    // void nvgQuadTo(NVGcontext* ctx, float cx, float cy, float x, float y);
    function nvgQuadTo(ctx, cx, cy, x, y) {
        bind.nvgQuadTo(ctx, cx, cy, x, y);
    }
    exports_1("nvgQuadTo", nvgQuadTo);
    // Adds an arc segment at the corner defined by the last path point, and two specified points.
    // void nvgArcTo(NVGcontext* ctx, float x1, float y1, float x2, float y2, float radius);
    function nvgArcTo(ctx, x1, y1, x2, y2, radius) {
        bind.nvgArcTo(ctx, x1, y1, x2, y2, radius);
    }
    exports_1("nvgArcTo", nvgArcTo);
    // Closes current sub-path with a line segment.
    // void nvgClosePath(NVGcontext* ctx);
    function nvgClosePath(ctx) {
        bind.nvgClosePath(ctx);
    }
    exports_1("nvgClosePath", nvgClosePath);
    // Sets the current sub-path winding, see NVGwinding and NVGsolidity.
    // void nvgPathWinding(NVGcontext* ctx, int dir);
    function nvgPathWinding(ctx, dir) {
        bind.nvgPathWinding(ctx, dir);
    }
    exports_1("nvgPathWinding", nvgPathWinding);
    // Creates new circle arc shaped sub-path. The arc center is at cx,cy, the arc radius is r,
    // and the arc is drawn from angle a0 to a1, and swept in direction dir (NVG_CCW, or NVG_CW).
    // Angles are specified in radians.
    // void nvgArc(NVGcontext* ctx, float cx, float cy, float r, float a0, float a1, int dir);
    function nvgArc(ctx, cx, cy, r, a0, a1, dir) {
        bind.nvgArc(ctx, cx, cy, r, a0, a1, dir);
    }
    exports_1("nvgArc", nvgArc);
    // Creates new rectangle shaped sub-path.
    // void nvgRect(NVGcontext* ctx, float x, float y, float w, float h);
    function nvgRect(ctx, x, y, w, h) {
        bind.nvgRect(ctx, x, y, w, h);
    }
    exports_1("nvgRect", nvgRect);
    // Creates new rounded rectangle shaped sub-path.
    // void nvgRoundedRect(NVGcontext* ctx, float x, float y, float w, float h, float r);
    function nvgRoundedRect(ctx, x, y, w, h, r) {
        bind.nvgRoundedRect(ctx, x, y, w, h, r);
    }
    exports_1("nvgRoundedRect", nvgRoundedRect);
    // Creates new rounded rectangle shaped sub-path with varying radii for each corner.
    // void nvgRoundedRectVarying(NVGcontext* ctx, float x, float y, float w, float h, float radTopLeft, float radTopRight, float radBottomRight, float radBottomLeft);
    function nvgRoundedRectVarying(ctx, x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft) {
        bind.nvgRoundedRectVarying(ctx, x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft);
    }
    exports_1("nvgRoundedRectVarying", nvgRoundedRectVarying);
    // Creates new ellipse shaped sub-path.
    // void nvgEllipse(NVGcontext* ctx, float cx, float cy, float rx, float ry);
    function nvgEllipse(ctx, cx, cy, rx, ry) {
        bind.nvgEllipse(ctx, cx, cy, rx, ry);
    }
    exports_1("nvgEllipse", nvgEllipse);
    // Creates new circle shaped sub-path.
    // void nvgCircle(NVGcontext* ctx, float cx, float cy, float r);
    function nvgCircle(ctx, cx, cy, r) {
        bind.nvgCircle(ctx, cx, cy, r);
    }
    exports_1("nvgCircle", nvgCircle);
    // Fills the current path with current fill style.
    // void nvgFill(NVGcontext* ctx);
    function nvgFill(ctx) {
        bind.nvgFill(ctx);
    }
    exports_1("nvgFill", nvgFill);
    // Fills the current path with current stroke style.
    // void nvgStroke(NVGcontext* ctx);
    function nvgStroke(ctx) {
        bind.nvgStroke(ctx);
    }
    exports_1("nvgStroke", nvgStroke);
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
    function nvgCreateFont(ctx, name, filename) {
        return bind.nvgCreateFont(ctx, name, filename);
    }
    exports_1("nvgCreateFont", nvgCreateFont);
    // Creates font by loading it from the specified memory chunk.
    // Returns handle to the font.
    // int nvgCreateFontMem(NVGcontext* ctx, const char* name, unsigned char* data, int ndata, int freeData);
    function nvgCreateFontMem(ctx, name, data) {
        return bind.nvgCreateFontMem(ctx, name, data);
    }
    exports_1("nvgCreateFontMem", nvgCreateFontMem);
    // Finds a loaded font of specified name, and returns handle to it, or -1 if the font is not found.
    // int nvgFindFont(NVGcontext* ctx, const char* name);
    function nvgFindFont(ctx, name) {
        return bind.nvgFindFont(ctx, name);
    }
    exports_1("nvgFindFont", nvgFindFont);
    // Adds a fallback font by handle.
    // int nvgAddFallbackFontId(NVGcontext* ctx, int baseFont, int fallbackFont);
    function nvgAddFallbackFontId(ctx, baseFont, fallbackFont) {
        return bind.nvgAddFallbackFontId(ctx, baseFont, fallbackFont);
    }
    exports_1("nvgAddFallbackFontId", nvgAddFallbackFontId);
    // Adds a fallback font by name.
    // int nvgAddFallbackFont(NVGcontext* ctx, const char* baseFont, const char* fallbackFont);
    function nvgAddFallbackFont(ctx, baseFont, fallbackFont) {
        return bind.nvgAddFallbackFont(ctx, baseFont, fallbackFont);
    }
    exports_1("nvgAddFallbackFont", nvgAddFallbackFont);
    // Sets the font size of current text style.
    // void nvgFontSize(NVGcontext* ctx, float size);
    function nvgFontSize(ctx, size) {
        bind.nvgFontSize(ctx, size);
    }
    exports_1("nvgFontSize", nvgFontSize);
    // Sets the blur of current text style.
    // void nvgFontBlur(NVGcontext* ctx, float blur);
    function nvgFontBlur(ctx, blur) {
        bind.nvgFontBlur(ctx, blur);
    }
    exports_1("nvgFontBlur", nvgFontBlur);
    // Sets the letter spacing of current text style.
    // void nvgTextLetterSpacing(NVGcontext* ctx, float spacing);
    function nvgTextLetterSpacing(ctx, spacing) {
        bind.nvgTextLetterSpacing(ctx, spacing);
    }
    exports_1("nvgTextLetterSpacing", nvgTextLetterSpacing);
    // Sets the proportional line height of current text style. The line height is specified as multiple of font size.
    // void nvgTextLineHeight(NVGcontext* ctx, float lineHeight);
    function nvgTextLineHeight(ctx, lineHeight) {
        bind.nvgTextLineHeight(ctx, lineHeight);
    }
    exports_1("nvgTextLineHeight", nvgTextLineHeight);
    // Sets the text align of current text style, see NVGalign for options.
    // void nvgTextAlign(NVGcontext* ctx, int align);
    function nvgTextAlign(ctx, align) {
        bind.nvgTextAlign(ctx, align);
    }
    exports_1("nvgTextAlign", nvgTextAlign);
    // Sets the font face based on specified id of current text style.
    // void nvgFontFaceId(NVGcontext* ctx, int font);
    function nvgFontFaceId(ctx, font) {
        bind.nvgFontFaceId(ctx, font);
    }
    exports_1("nvgFontFaceId", nvgFontFaceId);
    // Sets the font face based on specified name of current text style.
    // void nvgFontFace(NVGcontext* ctx, const char* font);
    function nvgFontFace(ctx, font) {
        bind.nvgFontFace(ctx, font);
    }
    exports_1("nvgFontFace", nvgFontFace);
    // Draws text string at specified location. If end is specified only the sub-string up to the end is drawn.
    // float nvgText(NVGcontext* ctx, float x, float y, const char* string, const char* end);
    function nvgText(ctx, x, y, string, end = null) {
        return bind.nvgText(ctx, x, y, string, end === null ? 0 : end);
    }
    exports_1("nvgText", nvgText);
    // Draws multi-line text string at specified location wrapped at the specified width. If end is specified only the sub-string up to the end is drawn.
    // White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
    // Words longer than the max width are slit at nearest character (i.e. no hyphenation).
    // void nvgTextBox(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end);
    function nvgTextBox(ctx, x, y, breakRowWidth, string, end = null) {
        bind.nvgTextBox(ctx, x, y, breakRowWidth, string, end === null ? 0 : end);
    }
    exports_1("nvgTextBox", nvgTextBox);
    // Measures the specified text string. Parameter bounds should be a pointer to float[4],
    // if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
    // Returns the horizontal advance of the measured text (i.e. where the next character should drawn).
    // Measured values are returned in local coordinate space.
    // float nvgTextBounds(NVGcontext* ctx, float x, float y, const char* string, const char* end, float* bounds);
    function nvgTextBounds(ctx, x, y, string, end = null, bounds = null) {
        return bind.nvgTextBounds(ctx, x, y, string, end === null ? 0 : end, bounds);
    }
    exports_1("nvgTextBounds", nvgTextBounds);
    // Measures the specified multi-text string. Parameter bounds should be a pointer to float[4],
    // if the bounding box of the text should be returned. The bounds value are [xmin,ymin, xmax,ymax]
    // Measured values are returned in local coordinate space.
    // void nvgTextBoxBounds(NVGcontext* ctx, float x, float y, float breakRowWidth, const char* string, const char* end, float* bounds);
    function nvgTextBoxBounds(ctx, x, y, breakRowWidth, string, end, bounds) {
        bind.nvgTextBoxBounds(ctx, x, y, breakRowWidth, string, end === null ? 0 : end, bounds);
    }
    exports_1("nvgTextBoxBounds", nvgTextBoxBounds);
    // Calculates the glyph x positions of the specified text. If end is specified only the sub-string will be used.
    // Measured values are returned in local coordinate space.
    // int nvgTextGlyphPositions(NVGcontext* ctx, float x, float y, const char* string, const char* end, NVGglyphPosition* positions, int maxPositions);
    function nvgTextGlyphPositions(ctx, x, y, string, end, positions) {
        return bind.nvgTextGlyphPositions(ctx, x, y, string, end === null ? 0 : end, positions, positions.length);
    }
    exports_1("nvgTextGlyphPositions", nvgTextGlyphPositions);
    // Returns the vertical metrics based on the current text style.
    // Measured values are returned in local coordinate space.
    // void nvgTextMetrics(NVGcontext* ctx, float* ascender, float* descender, float* lineh);
    function nvgTextMetrics(ctx, ascender, descender, lineh) {
        bind.nvgTextMetrics(ctx, ascender, descender, lineh);
    }
    exports_1("nvgTextMetrics", nvgTextMetrics);
    // Breaks the specified text into lines. If end is specified only the sub-string will be used.
    // White space is stripped at the beginning of the rows, the text is split at word boundaries or when new-line characters are encountered.
    // Words longer than the max width are slit at nearest character (i.e. no hyphenation).
    // int nvgTextBreakLines(NVGcontext* ctx, const char* string, const char* end, float breakRowWidth, NVGtextRow* rows, int maxRows);
    function nvgTextBreakLines(ctx, string, end, breakRowWidth, rows) {
        return bind.nvgTextBreakLines(ctx, string, end === null ? 0 : end, breakRowWidth, rows, rows.length);
    }
    exports_1("nvgTextBreakLines", nvgTextBreakLines);
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
    function nvgDebugDumpPathCache(ctx) {
        bind.nvgDebugDumpPathCache(ctx);
    }
    exports_1("nvgDebugDumpPathCache", nvgDebugDumpPathCache);
    // NVGcontext* nvgCreateGLES2(int flags);
    function nvgCreateWebGL(gl, flags) {
        return bind.nvgCreateWebGL(gl, flags);
    }
    exports_1("nvgCreateWebGL", nvgCreateWebGL);
    // void nvgDeleteGLES2(NVGcontext* ctx);
    function nvgDeleteWebGL(ctx) {
        bind.nvgDeleteWebGL(ctx);
    }
    exports_1("nvgDeleteWebGL", nvgDeleteWebGL);
    // int nvglCreateImageFromHandleGLES2(NVGcontext* ctx, GLuint textureId, int w, int h, int flags);
    function nvglCreateImageFromHandleWebGL(ctx, textureId, w, h, flags) {
        return bind.nvglCreateImageFromHandleWebGL(ctx, textureId, w, h, flags);
    }
    exports_1("nvglCreateImageFromHandleWebGL", nvglCreateImageFromHandleWebGL);
    // GLuint nvglImageHandleGLES2(NVGcontext* ctx, int image);
    function nvglImageHandleWebGL(ctx, image) {
        return bind.nvglImageHandleWebGL(ctx, image);
    }
    exports_1("nvglImageHandleWebGL", nvglImageHandleWebGL);
    // void nvgluBindFramebuffer(NVGLUframebuffer* fb);
    function nvgluBindFramebuffer(fb) {
        return bind.nvgluBindFramebuffer(fb);
    }
    exports_1("nvgluBindFramebuffer", nvgluBindFramebuffer);
    // NVGLUframebuffer* nvgluCreateFramebuffer(NVGcontext* ctx, int w, int h, int imageFlags);
    function nvgluCreateFramebuffer(ctx, w, h, imageFlags) {
        return bind.nvgluCreateFramebuffer(ctx, w, h, imageFlags);
    }
    exports_1("nvgluCreateFramebuffer", nvgluCreateFramebuffer);
    // void nvgluDeleteFramebuffer(NVGLUframebuffer* fb);
    function nvgluDeleteFramebuffer(fb) {
        return bind.nvgluDeleteFramebuffer(fb);
    }
    exports_1("nvgluDeleteFramebuffer", nvgluDeleteFramebuffer);
    function createWebGL(gl, flags) {
        return new Context(gl, flags);
    }
    exports_1("createWebGL", createWebGL);
    function deleteWebGL(ctx) {
        ctx.delete();
    }
    exports_1("deleteWebGL", deleteWebGL);
    return {
        setters: [
            function (Bind_1) {
                Bind = Bind_1;
            }
        ],
        execute: function () {
            exports_1("Bind", Bind);
            exports_1("NVG_PI", NVG_PI = 3.14159265358979323846264338327);
            exports_1("PI", NVG_PI);
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
            NVGcolor = class NVGcolor {
                constructor(rgba = new Float32Array(4)) {
                    this.rgba = rgba;
                }
                get r() { return this.rgba[0]; }
                set r(value) { this.rgba[0] = value; }
                get g() { return this.rgba[1]; }
                set g(value) { this.rgba[1] = value; }
                get b() { return this.rgba[2]; }
                set b(value) { this.rgba[2] = value; }
                get a() { return this.rgba[3]; }
                set a(value) { this.rgba[3] = value; }
            };
            exports_1("NVGcolor", NVGcolor);
            exports_1("Color", NVGcolor);
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
            NVGpaint = class NVGpaint {
                constructor(_array = new Float32Array(18)) {
                    this.image = 0;
                    this.xform = new Float32Array(_array.subarray(0, 6));
                    this.extent = new Float32Array(_array.subarray(6, 8));
                    this._radius = new Float32Array(_array.subarray(8, 9));
                    this._feather = new Float32Array(_array.subarray(9, 10));
                    this.innerColor = new NVGcolor(new Float32Array(_array.subarray(10, 14)));
                    this.outerColor = new NVGcolor(new Float32Array(_array.subarray(14, 18)));
                }
                get radius() { return this._radius[0]; }
                set radius(value) { this._radius[0] = value; }
                get feather() { return this._feather[0]; }
                set feather(value) { this._feather[0] = value; }
            };
            exports_1("NVGpaint", NVGpaint);
            exports_1("Paint", NVGpaint);
            (function (NVGwinding) {
                NVGwinding[NVGwinding["CCW"] = 1] = "CCW";
                NVGwinding[NVGwinding["CW"] = 2] = "CW";
            })(NVGwinding || (NVGwinding = {}));
            exports_1("NVGwinding", NVGwinding);
            exports_1("Winding", NVGwinding);
            (function (NVGsolidity) {
                NVGsolidity[NVGsolidity["SOLID"] = 1] = "SOLID";
                NVGsolidity[NVGsolidity["HOLE"] = 2] = "HOLE";
            })(NVGsolidity || (NVGsolidity = {}));
            exports_1("NVGsolidity", NVGsolidity);
            exports_1("Solidity", NVGsolidity);
            (function (NVGlineCap) {
                NVGlineCap[NVGlineCap["BUTT"] = 0] = "BUTT";
                NVGlineCap[NVGlineCap["ROUND"] = 1] = "ROUND";
                NVGlineCap[NVGlineCap["NVG_SQUARE"] = 2] = "NVG_SQUARE";
                NVGlineCap[NVGlineCap["BEVEL"] = 3] = "BEVEL";
                NVGlineCap[NVGlineCap["MITER"] = 4] = "MITER";
            })(NVGlineCap || (NVGlineCap = {}));
            exports_1("NVGlineCap", NVGlineCap);
            exports_1("LineCap", NVGlineCap);
            (function (NVGalign) {
                // Horizontal align
                NVGalign[NVGalign["LEFT"] = 1] = "LEFT";
                NVGalign[NVGalign["CENTER"] = 2] = "CENTER";
                NVGalign[NVGalign["RIGHT"] = 4] = "RIGHT";
                // Vertical align
                NVGalign[NVGalign["TOP"] = 8] = "TOP";
                NVGalign[NVGalign["MIDDLE"] = 16] = "MIDDLE";
                NVGalign[NVGalign["BOTTOM"] = 32] = "BOTTOM";
                NVGalign[NVGalign["BASELINE"] = 64] = "BASELINE";
            })(NVGalign || (NVGalign = {}));
            exports_1("NVGalign", NVGalign);
            exports_1("Align", NVGalign);
            (function (NVGblendFactor) {
                NVGblendFactor[NVGblendFactor["ZERO"] = 1] = "ZERO";
                NVGblendFactor[NVGblendFactor["ONE"] = 2] = "ONE";
                NVGblendFactor[NVGblendFactor["SRC_COLOR"] = 4] = "SRC_COLOR";
                NVGblendFactor[NVGblendFactor["ONE_MINUS_SRC_COLOR"] = 8] = "ONE_MINUS_SRC_COLOR";
                NVGblendFactor[NVGblendFactor["DST_COLOR"] = 16] = "DST_COLOR";
                NVGblendFactor[NVGblendFactor["ONE_MINUS_DST_COLOR"] = 32] = "ONE_MINUS_DST_COLOR";
                NVGblendFactor[NVGblendFactor["SRC_ALPHA"] = 64] = "SRC_ALPHA";
                NVGblendFactor[NVGblendFactor["ONE_MINUS_SRC_ALPHA"] = 128] = "ONE_MINUS_SRC_ALPHA";
                NVGblendFactor[NVGblendFactor["DST_ALPHA"] = 256] = "DST_ALPHA";
                NVGblendFactor[NVGblendFactor["ONE_MINUS_DST_ALPHA"] = 512] = "ONE_MINUS_DST_ALPHA";
                NVGblendFactor[NVGblendFactor["SRC_ALPHA_SATURATE"] = 1024] = "SRC_ALPHA_SATURATE";
            })(NVGblendFactor || (NVGblendFactor = {}));
            exports_1("NVGblendFactor", NVGblendFactor);
            exports_1("BlendFactor", NVGblendFactor);
            (function (NVGcompositeOperation) {
                NVGcompositeOperation[NVGcompositeOperation["SOURCE_OVER"] = 0] = "SOURCE_OVER";
                NVGcompositeOperation[NVGcompositeOperation["SOURCE_IN"] = 1] = "SOURCE_IN";
                NVGcompositeOperation[NVGcompositeOperation["SOURCE_OUT"] = 2] = "SOURCE_OUT";
                NVGcompositeOperation[NVGcompositeOperation["ATOP"] = 3] = "ATOP";
                NVGcompositeOperation[NVGcompositeOperation["DESTINATION_OVER"] = 4] = "DESTINATION_OVER";
                NVGcompositeOperation[NVGcompositeOperation["DESTINATION_IN"] = 5] = "DESTINATION_IN";
                NVGcompositeOperation[NVGcompositeOperation["DESTINATION_OUT"] = 6] = "DESTINATION_OUT";
                NVGcompositeOperation[NVGcompositeOperation["DESTINATION_ATOP"] = 7] = "DESTINATION_ATOP";
                NVGcompositeOperation[NVGcompositeOperation["LIGHTER"] = 8] = "LIGHTER";
                NVGcompositeOperation[NVGcompositeOperation["COPY"] = 9] = "COPY";
                NVGcompositeOperation[NVGcompositeOperation["XOR"] = 10] = "XOR";
            })(NVGcompositeOperation || (NVGcompositeOperation = {}));
            exports_1("NVGcompositeOperation", NVGcompositeOperation);
            exports_1("CompositeOperation", NVGcompositeOperation);
            // struct NVGcompositeOperationState {
            //   int srcRGB;
            //   int dstRGB;
            //   int srcAlpha;
            //   int dstAlpha;
            // };
            // typedef struct NVGcompositeOperationState NVGcompositeOperationState;
            NVGcompositeOperationState = class NVGcompositeOperationState {
                constructor() {
                    this.srcRGB = 0;
                    this.dstRGB = 0;
                    this.srcAlpha = 0;
                    this.dstAlpha = 0;
                }
            };
            exports_1("NVGcompositeOperationState", NVGcompositeOperationState);
            exports_1("CompositeOperationState", NVGcompositeOperationState);
            // struct NVGglyphPosition {
            //   const char* str;  // Position of the glyph in the input string.
            //   float x;      // The x-coordinate of the logical glyph position.
            //   float minx, maxx;  // The bounds of the glyph shape.
            // };
            // typedef struct NVGglyphPosition NVGglyphPosition;
            NVGglyphPosition = class NVGglyphPosition {
                constructor() {
                    this.str = 0;
                    this.x = 0.0;
                    this.minx = 0.0;
                    this.maxx = 0.0;
                }
            };
            exports_1("NVGglyphPosition", NVGglyphPosition);
            exports_1("GlyphPosition", NVGglyphPosition);
            // struct NVGtextRow {
            //   const char* start;  // Pointer to the input text where the row starts.
            //   const char* end;  // Pointer to the input text where the row ends (one past the last character).
            //   const char* next;  // Pointer to the beginning of the next row.
            //   float width;    // Logical width of the row.
            //   float minx, maxx;  // Actual bounds of the row. Logical with and bounds can differ because of kerning and some parts over extending.
            // };
            // typedef struct NVGtextRow NVGtextRow;
            NVGtextRow = class NVGtextRow {
                constructor() {
                    this.start = 0;
                    this.end = 0;
                    this.next = 0;
                    this.width = 0.0;
                    this.minx = 0.0;
                    this.maxx = 0.0;
                }
            };
            exports_1("NVGtextRow", NVGtextRow);
            exports_1("TextRow", NVGtextRow);
            (function (NVGimageFlags) {
                NVGimageFlags[NVGimageFlags["GENERATE_MIPMAPS"] = 1] = "GENERATE_MIPMAPS";
                NVGimageFlags[NVGimageFlags["REPEATX"] = 2] = "REPEATX";
                NVGimageFlags[NVGimageFlags["REPEATY"] = 4] = "REPEATY";
                NVGimageFlags[NVGimageFlags["FLIPY"] = 8] = "FLIPY";
                NVGimageFlags[NVGimageFlags["PREMULTIPLIED"] = 16] = "PREMULTIPLIED";
                NVGimageFlags[NVGimageFlags["NEAREST"] = 32] = "NEAREST";
            })(NVGimageFlags || (NVGimageFlags = {}));
            exports_1("NVGimageFlags", NVGimageFlags);
            exports_1("ImageFlags", NVGimageFlags);
            ;
            // Sets the transform to the result of multiplication of two transforms, of A = B*A.
            // void nvgTransformPremultiply(float* dst, const float* src);
            s2 = new Float32Array(6); // float s2[6];
            // nanovg_gl.h
            (function (NVGcreateFlags) {
                // Flag indicating if geometry based anti-aliasing is used (may not be needed when using MSAA).
                NVGcreateFlags[NVGcreateFlags["ANTIALIAS"] = 1] = "ANTIALIAS";
                // Flag indicating if strokes should be drawn using stencil buffer. The rendering will be a little
                // slower, but path overlaps (i.e. self-intersecting or sharp turns) will be drawn just once.
                NVGcreateFlags[NVGcreateFlags["STENCIL_STROKES"] = 2] = "STENCIL_STROKES";
                // Flag indicating that additional debug checks are done.
                NVGcreateFlags[NVGcreateFlags["DEBUG"] = 4] = "DEBUG";
            })(NVGcreateFlags || (NVGcreateFlags = {}));
            exports_1("NVGcreateFlags", NVGcreateFlags);
            exports_1("CreateFlags", NVGcreateFlags);
            Context = class Context {
                constructor(gl, flags) {
                    this.gl = gl;
                    this.ctx = nvgCreateWebGL(gl, flags);
                }
                delete() {
                    nvgDeleteWebGL(this.ctx);
                    delete this.ctx;
                    this.gl = null;
                }
                beginFrame(windowWidth, windowHeight, devicePixelRatio) { nvgBeginFrame(this.ctx, windowWidth, windowHeight, devicePixelRatio); }
                cancelFrame() { nvgCancelFrame(this.ctx); }
                endFrame() { nvgEndFrame(this.ctx); }
                globalCompositeOperation(op) { nvgGlobalCompositeOperation(this.ctx, op); }
                globalCompositeBlendFunc(sfactor, dfactor) { nvgGlobalCompositeBlendFunc(this.ctx, sfactor, dfactor); }
                globalCompositeBlendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha) { nvgGlobalCompositeBlendFuncSeparate(this.ctx, srcRGB, dstRGB, srcAlpha, dstAlpha); }
                RGB(r, g, b, out = new NVGcolor()) { return nvgRGB(r, g, b, out); }
                RGBf(r, g, b, out = new NVGcolor()) { return nvgRGBf(r, g, b, out); }
                RGBA(r, g, b, a, out = new NVGcolor()) { return nvgRGBA(r, g, b, a, out); }
                RGBAf(r, g, b, a, out = new NVGcolor()) { return nvgRGBAf(r, g, b, a, out); }
                lerpRGBA(c0, c1, u, out = new NVGcolor()) { return nvgLerpRGBA(c0, c1, u, out); }
                transRGBA(c, a) { return nvgTransRGBA(c, a); }
                transRGBAf(c, a) { return nvgTransRGBAf(c, a); }
                HSL(h, s, l, out = new NVGcolor()) { return nvgHSL(h, s, l, out); }
                HSLA(h, s, l, a, out = new NVGcolor()) { return nvgHSLA(h, s, l, a, out); }
                save() { nvgSave(this.ctx); }
                restore() { nvgRestore(this.ctx); }
                reset() { nvgReset(this.ctx); }
                shapeAntiAlias(enabled = true) { nvgShapeAntiAlias(this.ctx, enabled); }
                strokeColor(color) { nvgStrokeColor(this.ctx, color); }
                strokePaint(paint) { nvgStrokePaint(this.ctx, paint); }
                fillColor(color) { nvgFillColor(this.ctx, color); }
                fillPaint(paint) { nvgFillPaint(this.ctx, paint); }
                miterLimit(limit) { nvgMiterLimit(this.ctx, limit); }
                strokeWidth(size) { nvgStrokeWidth(this.ctx, size); }
                lineCap(cap) { nvgLineCap(this.ctx, cap); }
                lineJoin(join) { nvgLineJoin(this.ctx, join); }
                globalAlpha(alpha) { nvgGlobalAlpha(this.ctx, alpha); }
                resetTransform() { nvgResetTransform(this.ctx); }
                transform(a, b, c, d, e, f) { nvgTransform(this.ctx, a, b, c, d, e, f); }
                translate(x, y) { nvgTranslate(this.ctx, x, y); }
                rotate(angle) { nvgRotate(this.ctx, angle); }
                skewX(angle) { nvgSkewX(this.ctx, angle); }
                skewY(angle) { nvgSkewY(this.ctx, angle); }
                scale(x, y) { nvgScale(this.ctx, x, y); }
                currentTransform(xform) { nvgCurrentTransform(this.ctx, xform); }
                transformIdentity(dst) { nvgTransformIdentity(dst); }
                transformTranslate(dst, tx, ty) { nvgTransformTranslate(dst, tx, ty); }
                transformScale(dst, sx, sy) { nvgTransformScale(dst, sx, sy); }
                transformRotate(dst, a) { nvgTransformRotate(dst, a); }
                transformSkewX(dst, a) { nvgTransformSkewX(dst, a); }
                transformSkewY(dst, a) { nvgTransformSkewY(dst, a); }
                transformMultiply(dst, src) { nvgTransformMultiply(dst, src); }
                transformPremultiply(dst, src) { nvgTransformPremultiply(dst, src); }
                transformInverse(dst, src) { return nvgTransformInverse(dst, src); }
                transformPoint(dst, xform, src) { nvgTransformPoint(dst, xform, src); }
                degToRad(deg) { return nvgDegToRad(deg); }
                radToDeg(rad) { return nvgRadToDeg(rad); }
                createImage(filename, imageFlags) { return nvgCreateImage(this.ctx, filename, imageFlags); }
                createImageMem(imageFlags, data) { return nvgCreateImageMem(this.ctx, imageFlags, data); }
                createImageRGBA(w, h, imageFlags, data) { return nvgCreateImageRGBA(this.ctx, w, h, imageFlags, data); }
                updateImage(image, data) { nvgUpdateImage(this.ctx, image, data); }
                imageSize(image, w, h) { nvgImageSize(this.ctx, image, w, h); }
                deleteImage(image) { nvgDeleteImage(this.ctx, image); }
                linearGradient(sx, sy, ex, ey, icol, ocol, out = new NVGpaint()) { return nvgLinearGradient(this.ctx, sx, sy, ex, ey, icol, ocol, out); }
                boxGradient(x, y, w, h, r, f, icol, ocol, out = new NVGpaint()) { return nvgBoxGradient(this.ctx, x, y, w, h, r, f, icol, ocol, out); }
                radialGradient(cx, cy, inr, outr, icol, ocol, out = new NVGpaint()) { return nvgRadialGradient(this.ctx, cx, cy, inr, outr, icol, ocol, out); }
                imagePattern(ox, oy, ex, ey, angle, image, alpha, out = new NVGpaint()) { return nvgImagePattern(this.ctx, ox, oy, ex, ey, angle, image, alpha, out); }
                scissor(x, y, w, h) { nvgScissor(this.ctx, x, y, w, h); }
                intersectScissor(x, y, w, h) { nvgIntersectScissor(this.ctx, x, y, w, h); }
                resetScissor() { nvgResetScissor(this.ctx); }
                beginPath() { nvgBeginPath(this.ctx); }
                moveTo(x, y) { nvgMoveTo(this.ctx, x, y); }
                lineTo(x, y) { nvgLineTo(this.ctx, x, y); }
                bezierTo(c1x, c1y, c2x, c2y, x, y) { nvgBezierTo(this.ctx, c1x, c1y, c2x, c2y, x, y); }
                quadTo(cx, cy, x, y) { nvgQuadTo(this.ctx, cx, cy, x, y); }
                arcTo(x1, y1, x2, y2, radius) { nvgArcTo(this.ctx, x1, y1, x2, y2, radius); }
                closePath() { nvgClosePath(this.ctx); }
                pathWinding(dir) { nvgPathWinding(this.ctx, dir); }
                arc(cx, cy, r, a0, a1, dir) { nvgArc(this.ctx, cx, cy, r, a0, a1, dir); }
                rect(x, y, w, h) { nvgRect(this.ctx, x, y, w, h); }
                roundedRect(x, y, w, h, r) { nvgRoundedRect(this.ctx, x, y, w, h, r); }
                roundedRectVarying(x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft) { nvgRoundedRectVarying(this.ctx, x, y, w, h, radTopLeft, radTopRight, radBottomRight, radBottomLeft); }
                ellipse(cx, cy, rx, ry) { nvgEllipse(this.ctx, cx, cy, rx, ry); }
                circle(cx, cy, r) { nvgCircle(this.ctx, cx, cy, r); }
                fill() { nvgFill(this.ctx); }
                stroke() { nvgStroke(this.ctx); }
                createFont(name, filename) { return nvgCreateFont(this.ctx, name, filename); }
                createFontMem(name, data) { return nvgCreateFontMem(this.ctx, name, data); }
                findFont(name) { return nvgFindFont(this.ctx, name); }
                addFallbackFontId(baseFont, fallbackFont) { return nvgAddFallbackFontId(this.ctx, baseFont, fallbackFont); }
                addFallbackFont(baseFont, fallbackFont) { return nvgAddFallbackFont(this.ctx, baseFont, fallbackFont); }
                fontSize(size) { nvgFontSize(this.ctx, size); }
                fontBlur(blur) { nvgFontBlur(this.ctx, blur); }
                textLetterSpacing(spacing) { nvgTextLetterSpacing(this.ctx, spacing); }
                textLineHeight(lineHeight) { nvgTextLineHeight(this.ctx, lineHeight); }
                textAlign(align) { nvgTextAlign(this.ctx, align); }
                fontFaceId(font) { nvgFontFaceId(this.ctx, font); }
                fontFace(font) { nvgFontFace(this.ctx, font); }
                text(x, y, string, end = null) { return nvgText(this.ctx, x, y, string, end); }
                textBox(x, y, breakRowWidth, string, end = null) { nvgTextBox(this.ctx, x, y, breakRowWidth, string, end); }
                textBounds(x, y, string, end = null, bounds = null) { return nvgTextBounds(this.ctx, x, y, string, end, bounds); }
                textBoxBounds(x, y, breakRowWidth, string, end, bounds) { nvgTextBoxBounds(this.ctx, x, y, breakRowWidth, string, end, bounds); }
                textGlyphPositions(x, y, string, end, positions) { return nvgTextGlyphPositions(this.ctx, x, y, string, end, positions); }
                textMetrics(ascender, descender, lineh) { nvgTextMetrics(this.ctx, ascender, descender, lineh); }
                textBreakLines(string, end, breakRowWidth, rows) { return nvgTextBreakLines(this.ctx, string, end, breakRowWidth, rows); }
                strokeRect(x, y, w, h) { this.beginPath(); this.rect(x, y, w, h); this.stroke(); }
                fillRect(x, y, w, h) { this.beginPath(); this.rect(x, y, w, h); this.fill(); }
                drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
                    const w = [0];
                    const h = [0];
                    this.imageSize(image, w, h);
                    sw = sw || w[0];
                    sh = sh || h[0];
                    this.fillPaint(this.imagePattern(sx, sy, sw, sh, 0, image, 1.0));
                    this.fillRect(sx, sy, sw, sh);
                }
                debugDumpPathCache() { nvgDebugDumpPathCache(this.ctx); }
            };
            exports_1("Context", Context);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFub3ZnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmFub3ZnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBLG1CQUErQixLQUE0Qjs7WUFDekQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQW1CLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFrQixFQUFRLEVBQUU7b0JBQ3BELGtCQUFBLElBQUksR0FBRyxLQUFLLEVBQUM7b0JBQ2IsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTs7SUFRRCx3REFBd0Q7SUFDeEQsU0FBUyxTQUFTLENBQUMsQ0FBUyxFQUFFLENBQVMsSUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLHNEQUFzRDtJQUN0RCxzREFBc0Q7SUFDdEQsc0RBQXNEO0lBQ3RELHFFQUFxRTtJQUNyRSx3REFBd0Q7SUFFeEQsK0RBQStEO0lBQy9ELCtEQUErRDtJQUMvRCw0RkFBNEY7SUFDNUYscUVBQXFFO0lBQ3JFLHFFQUFxRTtJQUNyRSxpRUFBaUU7SUFDakUsd0VBQXdFO0lBQ3hFLFNBQVMsV0FBVyxDQUFDLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxJQUFZLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFvS3pHLDRCQUE0QjtJQUM1QixtRkFBbUY7SUFDbkYsb0ZBQW9GO0lBQ3BGLCtFQUErRTtJQUMvRSwyQ0FBMkM7SUFDM0MsZ0ZBQWdGO0lBQ2hGLHNGQUFzRjtJQUN0Rix1REFBdUQ7SUFDdkQsc0dBQXNHO0lBQ3RH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RSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqSCxZQUFZLEtBQVcsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELFNBQVMsS0FBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTLElBQVUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTLElBQVUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsUUFBUSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxDQUFTLEVBQUUsQ0FBUyxJQUFVLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3SSxNQUFNLENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxJQUFVLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsS0FBSyxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxNQUFjLElBQVUsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0gsU0FBUyxLQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENB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