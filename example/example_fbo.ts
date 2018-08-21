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

// #include <stdio.h>
// #ifdef NANOVG_GLEW
// #  include <GL/glew.h>
// #endif
// #ifdef __APPLE__
// #  define GLFW_INCLUDE_GLCOREARB
// #endif
// #include <GLFW/glfw3.h>
// #include "nanovg.h"
import * as NVG from "nanovg-js";
// #define NANOVG_GL3_IMPLEMENTATION
// #include "nanovg_gl.h"
// #include "nanovg_gl_utils.h"
// #include "perf.h"
import * as perf from "./perf";

let gl: WebGLRenderingContext | null = null;

// void renderPattern(NVGcontext* vg, NVGLUframebuffer* fb, float t, float pxRatio)
function renderPattern(nvg: NVG.Context, fb: any, t: number, pxRatio: number): void
{
  // int winWidth, winHeight;
  // int fboWidth, fboHeight;
  const fboWidth: [number] = [0];
  const fboHeight: [number] = [0];
  // int pw, ph, x, y;
  const s = 16.0; // 20.0;
  const sr = (Math.cos(t)+1)*0.5;
  const r = s * 0.6 * (0.2 + 0.8 * sr);

  if (fb === null) return;

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
      const cx = (x+0.5) * s;
      const cy = (y+0.5) * s;
      nvg.circle(cx,cy, r);
    }
  }
  nvg.fillColor(nvg.RGBA(220,160,0,200));
  nvg.fill();

  nvg.endFrame();
  NVG.nvgluBindFramebuffer(null);
}

// int loadFonts(NVGcontext* vg)
async function loadFonts(nvg: NVG.Context): Promise<number>
{
  const loadArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
    const response: Response = await fetch(url);
    return await response.arrayBuffer();
  };

  // int font;
  let font;
  // font = nvgCreateFont(vg, "sans", "../example/Roboto-Regular.ttf");
  font = nvg.createFontMem("sans", new Uint8Array(await loadArrayBuffer("../nanovg/example/Roboto-Regular.ttf")));
  if (font === -1) {
    // printf("Could not add font regular.\n");
    return -1;
  }
  // font = nvgCreateFont(vg, "sans-bold", "../example/Roboto-Bold.ttf");
  font = nvg.createFontMem("sans-bold", new Uint8Array(await loadArrayBuffer("../nanovg/example/Roboto-Bold.ttf")));
  if (font === -1) {
    // printf("Could not add font bold.\n");
    return -1;
  }
  return 0;
}

// void errorcb(int error, const char* desc)
// {
//   printf("GLFW error %d: %s\n", error, desc);
// }

let done: boolean = false;
let cursor_x: number = 0;
let cursor_y: number = 0;

// static void key(GLFWwindow* window, int key, int scancode, int action, int mods)
// {
//   NVG_NOTUSED(scancode);
//   NVG_NOTUSED(mods);
//   if (key === GLFW_KEY_ESCAPE && action === GLFW_PRESS)
//     glfwSetWindowShouldClose(window, GL_TRUE);
// }
function key(event: KeyboardEvent): void
{
  // console.log(event);
  // NVG_NOTUSED(scancode);
  // NVG_NOTUSED(mods);
  // if (key === GLFW_KEY_ESCAPE && action === GLFW_PRESS)
  //   glfwSetWindowShouldClose(window, GL_TRUE);
  if (event.code === "Escape" && event.type === "keydown")
    done = true;
}

function mousemove(event: MouseEvent): void {
  cursor_x = event.clientX;
  cursor_y = event.clientY;
}

// int main()
export default async function main(): Promise<number> {
  await NVG.default();
  // GLFWwindow* window;
  // NVGcontext* vg = null;
  let nvg: NVG.Context | null = null;
  // GPUtimer gpuTimer;
  const gpuTimer: perf.GPUtimer = new perf.GPUtimer();
  // PerfGraph fps, cpuGraph, gpuGraph;
  const fps: perf.PerfGraph = new perf.PerfGraph();
  const cpuGraph: perf.PerfGraph = new perf.PerfGraph();
  const gpuGraph: perf.PerfGraph = new perf.PerfGraph();
  // double prevt = 0, cpuTime = 0;
  let prevt: number = 0.0, cpuTime = 0;
  // NVGLUframebuffer* fb = null;
  let fb: any = null;
  // int winWidth, winHeight;
  let winWidth: number = 0;
  let winHeight: number = 0;
  // int fbWidth, fbHeight;
  let fbWidth: number = 0;
  let fbHeight: number = 0;
  // float pxRatio;
  let pxRatio: number = 1.0;

  const _init = async (time: number) => {
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

    if (await loadFonts(nvg) === -1) {
      console.log("Could not load fonts");
      return -1;
    }

    // glfwSwapInterval(0);

    // initGPUTimer(&gpuTimer);
    perf.initGPUTimer(gpuTimer);

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
    // float gpuTimes[3];
    const gpuTimes: number[] = [ 0, 0, 0 ];
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
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
    }

    nvg.beginFrame(winWidth, winHeight, pxRatio);

    // Use the FBO as image pattern.
    if (fb !== null) {
      const img: NVG.Paint = nvg.imagePattern(0, 0, 100, 100, 0, fb.image, 1.0);
      nvg.save();

      for (let i = 0; i < 20; i++) {
        nvg.beginPath();
        nvg.rect(10 + i*30,10, 10, winHeight-20);
        nvg.fillColor(nvg.HSLA(i/19.0, 0.5, 0.5, 255));
        nvg.fill();
      }

      nvg.beginPath();
      nvg.roundedRect(140 + Math.sin(t*1.3)*100, 140 + Math.cos(t*1.71244)*100, 250, 250, 20);
      nvg.fillPaint(img);
      nvg.fill();
      nvg.strokeColor(nvg.RGBA(220,160,0,255));
      nvg.strokeWidth(3.0);
      nvg.stroke();

      nvg.restore();
    }

    perf.renderGraph(nvg, 5,5, fps);
    perf.renderGraph(nvg, 5+200+5,5, cpuGraph);
    if (gpuTimer.supported)
      perf.renderGraph(nvg, 5+200+5+200+5,5, gpuGraph);

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

    if (typeof(window) !== "undefined") {
      window.requestAnimationFrame(done ? _fini : _tick);
    }
  }

  const _fini = async () => {
    if (!nvg) { throw new Error(); }
    NVG.nvgluDeleteFramebuffer(fb);

    // nvgDeleteGL3(vg);
    NVG.deleteWebGL(nvg);
    nvg = null;

    console.log(`Average Frame Time: ${(perf.getGraphAverage(fps) * 1000.0).toFixed(2)} ms`);
    console.log(`          CPU Time: ${(perf.getGraphAverage(cpuGraph) * 1000.0).toFixed(2)} ms`);
    console.log(`          GPU Time: ${(perf.getGraphAverage(gpuGraph) * 1000.0).toFixed(2)} ms`);

    // glfwTerminate();
  }

  if (typeof(window) !== "undefined") {
    window.requestAnimationFrame(_init);
  }

  return 0;
}
