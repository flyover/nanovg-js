// example_gles2.c
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
System.register(["nanovg-js", "./demo", "./perf"], function (exports_1, context_1) {
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
    var NVG, demo, perf, gl, done, blowup, screenshot, premult, cursor_x, cursor_y;
    var __moduleName = context_1 && context_1.id;
    // static void key(GLFWwindow* window, int key, int scancode, int action, int mods)
    function key(event) {
        // console.log(event);
        // NVG_NOTUSED(scancode);
        // NVG_NOTUSED(mods);
        // if (key === GLFW_KEY_ESCAPE && action === GLFW_PRESS)
        //   glfwSetWindowShouldClose(window, GL_TRUE);
        if (event.code === "Escape" && event.type === "keydown")
            done = true;
        // if (key === GLFW_KEY_SPACE && action === GLFW_PRESS)
        if (event.code === "Space" && event.type === "keydown")
            blowup = !blowup;
        // if (key === GLFW_KEY_S && action === GLFW_PRESS)
        if (event.code === "KeyS" && event.type === "keydown")
            screenshot = true;
        // if (key === GLFW_KEY_P && action === GLFW_PRESS)
        if (event.code === "KeyP" && event.type === "keydown")
            premult = !premult;
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
            const data = new demo.DemoData();
            let nvg = null;
            const fps = new perf.PerfGraph();
            let prevt = 0.0;
            const _init = (time) => __awaiter(this, void 0, void 0, function* () {
                // if (!glfwInit()) {
                //   printf("Failed to init GLFW.");
                //   return -1;
                // }
                perf.initGraph(fps, perf.GraphrenderStyle.GRAPH_RENDER_FPS, "Frame Time");
                // glfwSetErrorCallback(errorcb);
                // glfwWindowHint(GLFW_CLIENT_API, GLFW_OPENGL_ES_API);
                // glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
                // glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
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
                // window = glfwCreateWindow(1000, 600, "NanoVG", NULL, NULL);
                // // window = glfwCreateWindow(1000, 600, "NanoVG", glfwGetPrimaryMonitor(), NULL);
                // if (!window) {
                //   glfwTerminate();
                //   return -1;
                // }
                // glfwSetKeyCallback(window, key);
                // glfwMakeContextCurrent(window);
                // nvg = nvgCreateGLES2(NVG_ANTIALIAS | NVG_STENCIL_STROKES | NVG_DEBUG);
                nvg = NVG.createWebGL(gl, NVG.CreateFlags.ANTIALIAS | NVG.CreateFlags.STENCIL_STROKES /*| NVG.CreateFlags.DEBUG*/);
                if (nvg === null) {
                    console.log("Could not init nanovg.");
                    return -1;
                }
                if ((yield demo.loadDemoData(nvg, data)) === -1) {
                    return -1;
                }
                // glfwSwapInterval(0);
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
                // int winWidth, winHeight;
                let winWidth = 0;
                let winHeight = 0;
                // int fbWidth, fbHeight;
                let fbWidth = 0;
                let fbHeight = 0;
                // float pxRatio;
                let pxRatio = 1.0;
                // t = glfwGetTime();
                t = time / 1000;
                dt = t - prevt;
                prevt = t;
                perf.updateGraph(fps, dt);
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
                    // Update and render
                    gl.viewport(0, 0, fbWidth, fbHeight);
                    if (premult)
                        gl.clearColor(0, 0, 0, 0);
                    else
                        gl.clearColor(0.3, 0.3, 0.32, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    gl.enable(gl.CULL_FACE);
                    gl.disable(gl.DEPTH_TEST);
                }
                nvg.beginFrame(winWidth, winHeight, pxRatio);
                demo.renderDemo(nvg, mx, my, winWidth, winHeight, t, blowup, data);
                perf.renderGraph(nvg, 5, 5, fps);
                nvg.endFrame();
                if (screenshot) {
                    screenshot = false;
                    demo.saveScreenShot(nvg.gl, "dump.png");
                }
                if (gl) {
                    gl.enable(gl.DEPTH_TEST);
                }
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
                yield demo.freeDemoData(nvg, data);
                // nvgDeleteGLES2(nvg);
                NVG.deleteWebGL(nvg);
                nvg = null;
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
            function (demo_1) {
                demo = demo_1;
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
            blowup = false;
            screenshot = false;
            premult = false;
            cursor_x = 0;
            cursor_y = 0;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZV93ZWJnbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4YW1wbGVfd2ViZ2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCO0FBQ2xCLEVBQUU7QUFDRixvREFBb0Q7QUFDcEQsRUFBRTtBQUNGLG9FQUFvRTtBQUNwRSx5RUFBeUU7QUFDekUseUNBQXlDO0FBQ3pDLHdFQUF3RTtBQUN4RSx5RUFBeUU7QUFDekUsaURBQWlEO0FBQ2pELDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsMkVBQTJFO0FBQzNFLHNDQUFzQztBQUN0Qyw2RUFBNkU7QUFDN0Usb0RBQW9EO0FBQ3BELDZFQUE2RTtBQUM3RSxFQUFFOzs7Ozs7Ozs7Ozs7OztJQWdDRixtRkFBbUY7SUFDbkYsU0FBUyxHQUFHLENBQUMsS0FBb0I7UUFFL0Isc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsd0RBQXdEO1FBQ3hELCtDQUErQztRQUMvQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2QsdURBQXVEO1FBQ3ZELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQ3BELE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNuQixtREFBbUQ7UUFDbkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDbkQsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNwQixtREFBbUQ7UUFDbkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDbkQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxL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