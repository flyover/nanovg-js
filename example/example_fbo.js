// example_fbo.c
//
// Copyright (c) 2013 Mikko Mononen memon@inside.org
//
// This software is provided 'as-is', without any express or implied
// warranty.  In no event will the authors be held liable for any damages
// arising from the use of this software.
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.
//
System.register(["nanovg-js", "./perf"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var NVG, perf, gl, done, cursor_x, cursor_y;
    var __moduleName = context_1 && context_1.id;
    // void renderPattern(NVGcontext* vg, NVGLUframebuffer* fb, float t, float pxRatio)
    function renderPattern(nvg, fb, t, pxRatio) {
        // int winWidth, winHeight;
        // int fboWidth, fboHeight;
        const fboWidth = [0];
        const fboHeight = [0];
        // int pw, ph, x, y;
        const s = 16.0; // 20.0;
        const sr = (Math.cos(t) + 1) * 0.5;
        const r = s * 0.6 * (0.2 + 0.8 * sr);
        if (fb === null)
            return;
        nvg.imageSize(fb.image, fboWidth, fboHeight);
        const winWidth = Math.floor(fboWidth[0] / pxRatio);
        const winHeight = Math.floor(fboHeight[0] / pxRatio);
        // Draw some stuff to an FBO as a test
        NVG.nvgluBindFramebuffer(fb);
        if (gl) {
            // glViewport(0, 0, fboWidth, fboHeight);
            gl.viewport(0, 0, fboWidth[0], fboHeight[0]);
            // glClearColor(0, 0, 0, 0);
            gl.clearColor(0, 0, 0, 0);
            // glClear(GL_COLOR_BUFFER_BIT|GL_STENCIL_BUFFER_BIT);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }
        nvg.beginFrame(winWidth, winHeight, pxRatio);
        const pw = Math.ceil(winWidth / s);
        const ph = Math.ceil(winHeight / s);
        nvg.beginPath();
        for (let y = 0; y < ph; y++) {
            for (let x = 0; x < pw; x++) {
                const cx = (x + 0.5) * s;
                const cy = (y + 0.5) * s;
                nvg.circle(cx, cy, r);
            }
        }
        nvg.fillColor(nvg.RGBA(220, 160, 0, 200));
        nvg.fill();
        nvg.endFrame();
        NVG.nvgluBindFramebuffer(null);
    }
    // int loadFonts(NVGcontext* vg)
    function loadFonts(nvg) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadArrayBuffer = (url) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url);
                return yield response.arrayBuffer();
            });
            // int font;
            let font;
            // font = nvgCreateFont(vg, "sans", "../example/Roboto-Regular.ttf");
            font = nvg.createFontMem("sans", new Uint8Array(yield loadArrayBuffer("../nanovg/example/Roboto-Regular.ttf")));
            if (font === -1) {
                // printf("Could not add font regular.\n");
                return -1;
            }
            // font = nvgCreateFont(vg, "sans-bold", "../example/Roboto-Bold.ttf");
            font = nvg.createFontMem("sans-bold", new Uint8Array(yield loadArrayBuffer("../nanovg/example/Roboto-Bold.ttf")));
            if (font === -1) {
                // printf("Could not add font bold.\n");
                return -1;
            }
            return 0;
        });
    }
    // static void key(GLFWwindow* window, int key, int scancode, int action, int mods)
    // {
    //   NVG_NOTUSED(scancode);
    //   NVG_NOTUSED(mods);
    //   if (key === GLFW_KEY_ESCAPE && action === GLFW_PRESS)
    //     glfwSetWindowShouldClose(window, GL_TRUE);
    // }
    function key(event) {
        // console.log(event);
        // NVG_NOTUSED(scancode);
        // NVG_NOTUSED(mods);
        // if (key === GLFW_KEY_ESCAPE && action === GLFW_PRESS)
        //   glfwSetWindowShouldClose(window, GL_TRUE);
        if (event.code === "Escape" && event.type === "keydown")
            done = true;
    }
    function mousemove(event) {
        cursor_x = event.clientX;
        cursor_y = event.clientY;
    }
    // int main()
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield NVG.default();
            // GLFWwindow* window;
            // NVGcontext* vg = null;
            let nvg = null;
            // GPUtimer gpuTimer;
            const gpuTimer = new perf.GPUtimer();
            // PerfGraph fps, cpuGraph, gpuGraph;
            const fps = new perf.PerfGraph();
            const cpuGraph = new perf.PerfGraph();
            const gpuGraph = new perf.PerfGraph();
            // double prevt = 0, cpuTime = 0;
            let prevt = 0.0, cpuTime = 0;
            // NVGLUframebuffer* fb = null;
            let fb = null;
            // int winWidth, winHeight;
            let winWidth = 0;
            let winHeight = 0;
            // int fbWidth, fbHeight;
            let fbWidth = 0;
            let fbHeight = 0;
            // float pxRatio;
            let pxRatio = 1.0;
            const _init = (time) => __awaiter(this, void 0, void 0, function* () {
                // if (!glfwInit()) {
                //   printf("Failed to init GLFW.");
                //   return -1;
                // }
                perf.initGraph(fps, perf.GraphrenderStyle.GRAPH_RENDER_FPS, "Frame Time");
                perf.initGraph(cpuGraph, perf.GraphrenderStyle.GRAPH_RENDER_MS, "CPU Time");
                perf.initGraph(gpuGraph, perf.GraphrenderStyle.GRAPH_RENDER_MS, "GPU Time");
                // glfwSetErrorCallback(errorcb);
                // #ifndef _WIN32 // don't require this on win32, and works with more cards
                // glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
                // glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
                // glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
                // glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
                // #endif
                // glfwWindowHint(GLFW_OPENGL_DEBUG_CONTEXT, 1);
                // #ifdef DEMO_MSAA
                // glfwWindowHint(GLFW_SAMPLES, 4);
                // #endif
                if (typeof (window) !== "undefined") {
                    window.addEventListener("keydown", key);
                    window.addEventListener("mousemove", mousemove);
                    const canvas = document.createElement("canvas");
                    document.body.appendChild(canvas);
                    canvas.tabIndex = 1;
                    canvas.style.position = "absolute";
                    canvas.style.left = "0px";
                    canvas.style.right = "0px";
                    canvas.style.top = "0px";
                    canvas.style.bottom = "0px";
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    window.addEventListener("resize", (event) => {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    });
                    gl = canvas.getContext("webgl", { stencil: true });
                }
                // window = glfwCreateWindow(1000, 600, "NanoVG", null, null);
                // // window = glfwCreateWindow(1000, 600, "NanoVG", glfwGetPrimaryMonitor(), null);
                // if (!window) {
                //   glfwTerminate();
                //   return -1;
                // }
                // glfwSetKeyCallback(window, key);
                // glfwMakeContextCurrent(window);
                // #ifdef NANOVG_GLEW
                // glewExperimental = GL_TRUE;
                // if(glewInit() !== GLEW_OK) {
                //   printf("Could not init glew.\n");
                //   return -1;
                // }
                // // GLEW generates GL error because it calls glGetString(GL_EXTENSIONS), we'll consume it here.
                // glGetError();
                // #endif
                // #ifdef DEMO_MSAA
                // vg = nvgCreateGL3(NVG_STENCIL_STROKES | NVG_DEBUG);
                // #else
                // vg = nvgCreateGL3(NVG_ANTIALIAS | NVG_STENCIL_STROKES | NVG_DEBUG);
                // #endif
                nvg = NVG.createWebGL(gl, NVG.CreateFlags.ANTIALIAS | NVG.CreateFlags.STENCIL_STROKES /*| NVG.CreateFlags.DEBUG*/);
                if (nvg === null) {
                    console.log("Could not init nanovg.");
                    return -1;
                }
                if (gl) {
                    // Create hi-dpi FBO for hi-dpi screens.
                    // glfwGetWindowSize(window, &winWidth, &winHeight);
                    winWidth = gl.canvas.width;
                    winHeight = gl.canvas.height;
                    // glfwGetFramebufferSize(window, &fbWidth, &fbHeight);
                    fbWidth = gl.drawingBufferWidth;
                    fbHeight = gl.drawingBufferHeight;
                    // Calculate pixel ration for hi-dpi devices.
                    pxRatio = fbWidth / winWidth;
                }
                // The image pattern is tiled, set repeat on x and y.
                // fb = nvgluCreateFramebuffer(vg, (int)(100*pxRatio), (int)(100*pxRatio), NVG_IMAGE_REPEATX | NVG_IMAGE_REPEATY);
                // fb = NVG.nvgluCreateFramebuffer(nvg.ctx, Math.floor(100*pxRatio), Math.floor(100*pxRatio), NVG.ImageFlags.REPEATX | NVG.ImageFlags.REPEATY);
                fb = NVG.nvgluCreateFramebuffer(nvg.ctx, 128, 128, NVG.ImageFlags.REPEATX | NVG.ImageFlags.REPEATY);
                if (fb === null) {
                    console.log("Could not create FBO.");
                    return -1;
                }
                if ((yield loadFonts(nvg)) === -1) {
                    console.log("Could not load fonts");
                    return -1;
                }
                // glfwSwapInterval(0);
                // initGPUTimer(&gpuTimer);
                perf.initGPUTimer(gpuTimer);
                // glfwSetTime(0);
                // prevt = glfwGetTime();
                prevt = time / 1000;
                if (typeof (window) !== "undefined") {
                    window.requestAnimationFrame(_tick);
                }
            });
            // while (!glfwWindowShouldClose(window))
            const _tick = (time) => {
                if (!nvg) {
                    throw new Error();
                }
                // double mx, my, t, dt;
                let mx = 0;
                let my = 0;
                let t = 0;
                let dt = 0;
                // float gpuTimes[3];
                const gpuTimes = [0, 0, 0];
                // int i, n;
                // t = glfwGetTime();
                t = time / 1000;
                dt = t - prevt;
                prevt = t;
                // startGPUTimer(&gpuTimer);
                perf.startGPUTimer(gpuTimer);
                if (gl) {
                    // glfwGetCursorPos(window, &mx, &my);
                    mx = cursor_x;
                    my = cursor_y;
                    // glfwGetWindowSize(window, &winWidth, &winHeight);
                    winWidth = gl.canvas.width;
                    winHeight = gl.canvas.height;
                    // glfwGetFramebufferSize(window, &fbWidth, &fbHeight);
                    fbWidth = gl.drawingBufferWidth;
                    fbHeight = gl.drawingBufferHeight;
                    // Calculate pixel ration for hi-dpi devices.
                    pxRatio = fbWidth / winWidth;
                }
                renderPattern(nvg, fb, t, pxRatio);
                // Update and render
                if (gl) {
                    // glViewport(0, 0, fbWidth, fbHeight);
                    gl.viewport(0, 0, fbWidth, fbHeight);
                    // glClearColor(0.3f, 0.3f, 0.32f, 1.0f);
                    gl.clearColor(0.3, 0.3, 0.32, 1.0);
                    // glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT|GL_STENCIL_BUFFER_BIT);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                }
                nvg.beginFrame(winWidth, winHeight, pxRatio);
                // Use the FBO as image pattern.
                if (fb !== null) {
                    const img = nvg.imagePattern(0, 0, 100, 100, 0, fb.image, 1.0);
                    nvg.save();
                    for (let i = 0; i < 20; i++) {
                        nvg.beginPath();
                        nvg.rect(10 + i * 30, 10, 10, winHeight - 20);
                        nvg.fillColor(nvg.HSLA(i / 19.0, 0.5, 0.5, 255));
                        nvg.fill();
                    }
                    nvg.beginPath();
                    nvg.roundedRect(140 + Math.sin(t * 1.3) * 100, 140 + Math.cos(t * 1.71244) * 100, 250, 250, 20);
                    nvg.fillPaint(img);
                    nvg.fill();
                    nvg.strokeColor(nvg.RGBA(220, 160, 0, 255));
                    nvg.strokeWidth(3.0);
                    nvg.stroke();
                    nvg.restore();
                }
                perf.renderGraph(nvg, 5, 5, fps);
                perf.renderGraph(nvg, 5 + 200 + 5, 5, cpuGraph);
                if (gpuTimer.supported)
                    perf.renderGraph(nvg, 5 + 200 + 5 + 200 + 5, 5, gpuGraph);
                nvg.endFrame();
                // Measure the CPU time taken excluding swap buffers (as the swap may wait for GPU)
                // cpuTime = glfwGetTime() - t;
                cpuTime = time / 1000 - t; // TODO: performance.now();
                perf.updateGraph(fps, dt);
                perf.updateGraph(cpuGraph, cpuTime);
                // We may get multiple results.
                // n = stopGPUTimer(&gpuTimer, gpuTimes, 3);
                const n = perf.stopGPUTimer(gpuTimer, gpuTimes);
                for (let i = 0; i < n; i++)
                    perf.updateGraph(gpuGraph, gpuTimes[i]);
                // glfwSwapBuffers(window);
                // glfwPollEvents();
                if (typeof (window) !== "undefined") {
                    window.requestAnimationFrame(done ? _fini : _tick);
                }
            };
            const _fini = () => __awaiter(this, void 0, void 0, function* () {
                if (!nvg) {
                    throw new Error();
                }
                NVG.nvgluDeleteFramebuffer(fb);
                // nvgDeleteGL3(vg);
                NVG.deleteWebGL(nvg);
                nvg = null;
                console.log(`Average Frame Time: ${(perf.getGraphAverage(fps) * 1000.0).toFixed(2)} ms`);
                console.log(`          CPU Time: ${(perf.getGraphAverage(cpuGraph) * 1000.0).toFixed(2)} ms`);
                console.log(`          GPU Time: ${(perf.getGraphAverage(gpuGraph) * 1000.0).toFixed(2)} ms`);
                // glfwTerminate();
            });
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_init);
            }
            return 0;
        });
    }
    exports_1("default", main);
    return {
        setters: [
            function (NVG_1) {
                NVG = NVG_1;
            },
            function (perf_1) {
                perf = perf_1;
            }
        ],
        execute: function () {
            gl = null;
            // void errorcb(int error, const char* desc)
            // {
            //   printf("GLFW error %d: %s\n", error, desc);
            // }
            done = false;
            cursor_x = 0;
            cursor_y = 0;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZV9mYm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlX2Ziby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEIsRUFBRTtBQUNGLG9EQUFvRDtBQUNwRCxFQUFFO0FBQ0Ysb0VBQW9FO0FBQ3BFLHlFQUF5RTtBQUN6RSx5Q0FBeUM7QUFDekMsd0VBQXdFO0FBQ3hFLHlFQUF5RTtBQUN6RSxpREFBaUQ7QUFDakQsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwyRUFBMkU7QUFDM0Usc0NBQXNDO0FBQ3RDLDZFQUE2RTtBQUM3RSxvREFBb0Q7QUFDcEQsNkVBQTZFO0FBQzdFLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0lBb0JGLG1GQUFtRjtJQUNuRixTQUFTLGFBQWEsQ0FBQyxHQUFnQixFQUFFLEVBQU8sRUFBRSxDQUFTLEVBQUUsT0FBZTtRQUUxRSwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLE1BQU0sUUFBUSxHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksRUFBRSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRXhCLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMs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