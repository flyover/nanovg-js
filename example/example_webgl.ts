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

// #include <stdio.h>
// #define GLFW_INCLUDE_ES2
// #define GLFW_INCLUDE_GLEXT
// #include <GLFW/glfw3.h>
// #include "nanovg.h"
import * as NVG from "nanovg-js";
// #define NANOVG_GLES2_IMPLEMENTATION
// #include "nanovg_gl.h"
// import * as nanovg_gl from "../src/nanovg_gl";
// #include "nanovg_gl_utils.h"
// import * as nanovg_gl_utils from "../src/nanovg_gl_utils";
// #include "demo.h"
import * as demo from "./demo";
// #include "perf.h"
import * as perf from "./perf";

let gl: WebGLRenderingContext | null = null;

// void errorcb(int error, const char* desc)
// {
//   printf("GLFW error %d: %s\n", error, desc);
// }

let done: boolean = false;
let blowup: boolean = false;
let screenshot: boolean = false;
let premult: boolean = false;
let cursor_x: number = 0;
let cursor_y: number = 0;

// static void key(GLFWwindow* window, int key, int scancode, int action, int mods)
function key(event: KeyboardEvent): void
{
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

function mousemove(event: MouseEvent): void {
  cursor_x = event.clientX;
  cursor_y = event.clientY;
}

// int main()
export default async function main(): Promise<number>
{
  await NVG.default();

  // GLFWwindow* window;
  const data = new demo.DemoData();
  let nvg: NVG.Context | null = null;
  const fps: perf.PerfGraph = new perf.PerfGraph();
  let prevt: number = 0.0;

  const _init = async (time: number) => {
    // if (!glfwInit()) {
    //   printf("Failed to init GLFW.");
    //   return -1;
    // }

    perf.initGraph(fps, perf.GraphrenderStyle.GRAPH_RENDER_FPS, "Frame Time");

    // glfwSetErrorCallback(errorcb);

    // glfwWindowHint(GLFW_CLIENT_API, GLFW_OPENGL_ES_API);
    // glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
    // glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

    if (typeof(window) !== "undefined") {
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
      window.addEventListener("resize", (event: UIEvent): void => {
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

    if (await demo.loadDemoData(nvg, data) === -1) {
      return -1;
    }

    // glfwSwapInterval(0);

    // glfwSetTime(0);
    // prevt = glfwGetTime();
    prevt = time / 1000;

    if (typeof(window) !== "undefined") {
      window.requestAnimationFrame(_tick);
    }
  }

  // while (!glfwWindowShouldClose(window))
  const _tick = (time: number): void => {
    if (!nvg) { throw new Error(); }
    // double mx, my, t, dt;
    let mx: number = 0;
    let my: number = 0;
    let t: number = 0;
    let dt: number = 0;
    // int winWidth, winHeight;
    let winWidth: number = 0;
    let winHeight: number = 0;
    // int fbWidth, fbHeight;
    let fbWidth: number = 0;
    let fbHeight: number = 0;
    // float pxRatio;
    let pxRatio: number = 1.0;

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
        gl.clearColor(0,0,0,0);
      else
        gl.clearColor(0.3, 0.3, 0.32, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
  
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.CULL_FACE);
      gl.disable(gl.DEPTH_TEST);
    }

    nvg.beginFrame(winWidth, winHeight, pxRatio);

    demo.renderDemo(nvg, mx, my, winWidth,winHeight, t, blowup, data);
    perf.renderGraph(nvg, 5,5, fps);

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

    if (typeof(window) !== "undefined") {
      window.requestAnimationFrame(done ? _fini : _tick);
    }
  }

  const _fini = async () => {
    if (!nvg) { throw new Error(); }

    await demo.freeDemoData(nvg, data);
  
    // nvgDeleteGLES2(nvg);
    NVG.deleteWebGL(nvg);
    nvg = null;
  
    // glfwTerminate();
  }

  if (typeof(window) !== "undefined") {
    window.requestAnimationFrame(_init);
  }

  return 0;
}
