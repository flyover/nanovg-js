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
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZV9mYm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlX2Ziby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEIsRUFBRTtBQUNGLG9EQUFvRDtBQUNwRCxFQUFFO0FBQ0Ysb0VBQW9FO0FBQ3BFLHlFQUF5RTtBQUN6RSx5Q0FBeUM7QUFDekMsd0VBQXdFO0FBQ3hFLHlFQUF5RTtBQUN6RSxpREFBaUQ7QUFDakQsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRSwyRUFBMkU7QUFDM0Usc0NBQXNDO0FBQ3RDLDZFQUE2RTtBQUM3RSxvREFBb0Q7QUFDcEQsNkVBQTZFO0FBQzdFLEVBQUU7Ozs7Ozs7Ozs7Ozs7SUFvQkYsbUZBQW1GO0lBQ25GLFNBQVMsYUFBYSxDQUFDLEdBQWdCLEVBQUUsRUFBTyxFQUFFLENBQVMsRUFBRSxPQUFlO1FBRTFFLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsTUFBTSxRQUFRLEdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLFNBQVMsR0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBQ3hCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxFQUFFLEtBQUssSUFBSTtZQUFFLE9BQU87UUFFeEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxD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