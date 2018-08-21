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
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZV93ZWJnbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4YW1wbGVfd2ViZ2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCO0FBQ2xCLEVBQUU7QUFDRixvREFBb0Q7QUFDcEQsRUFBRTtBQUNGLG9FQUFvRTtBQUNwRSx5RUFBeUU7QUFDekUseUNBQXlDO0FBQ3pDLHdFQUF3RTtBQUN4RSx5RUFBeUU7QUFDekUsaURBQWlEO0FBQ2pELDBFQUEwRTtBQUMxRSwwRUFBMEU7QUFDMUUsMkVBQTJFO0FBQzNFLHNDQUFzQztBQUN0Qyw2RUFBNkU7QUFDN0Usb0RBQW9EO0FBQ3BELDZFQUE2RTtBQUM3RSxFQUFFOzs7Ozs7Ozs7Ozs7O0lBZ0NGLG1GQUFtRjtJQUNuRixTQUFTLEdBQUcsQ0FBQyxLQUFvQjtRQUUvQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQix3REFBd0Q7UUFDeEQsK0NBQStDO1FBQy9DLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQ3JELElBQUksR0FBRyxJQUFJLENBQUM7UUFDZCx1REFBdUQ7UUFDdkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDcEQsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ25CLG1EQUFtRDtRQUNuRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLG1EQUFtRDtRQUNuRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNuRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDdkIsQ0FBQztJQUVELFNBQVMsU0FBUyxDQUFDLEtB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