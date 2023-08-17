// perf.h
// #ifndef PERF_H
// #define PERF_H

// #include "nanovg.h"
import * as NVG from "nanovg-js";

// #ifdef __cplusplus
// extern "C" {
// #endif

export enum GraphrenderStyle {
    GRAPH_RENDER_FPS,
    GRAPH_RENDER_MS,
    GRAPH_RENDER_PERCENT,
}

// #define GRAPH_HISTORY_COUNT 100
export const GRAPH_HISTORY_COUNT = 100;
// struct PerfGraph {
//   int style;
//   char name[32];
//   float values[GRAPH_HISTORY_COUNT];
//   int head;
// };
// typedef struct PerfGraph PerfGraph;
export class PerfGraph {
  style: GraphrenderStyle = GraphrenderStyle.GRAPH_RENDER_FPS;
  name: string = "";
  values: number[] = [];
  head: number = 0;
}

// void initGraph(PerfGraph* fps, int style, const char* name);
// void updateGraph(PerfGraph* fps, float frameTime);
// void renderGraph(NVGcontext* vg, float x, float y, PerfGraph* fps);
// float getGraphAverage(PerfGraph* fps);

// #define GPU_QUERY_COUNT 5
export const GPU_QUERY_COUNT = 5;
// struct GPUtimer {
//   int supported;
//   int cur, ret;
//   unsigned int queries[GPU_QUERY_COUNT];
// };
// typedef struct GPUtimer GPUtimer;
export class GPUtimer {
  supported: boolean = false;
  cur: number = 0;
  ret: number = 0;
  queries: number[] = [];
}

// void initGPUTimer(GPUtimer* timer);
// void startGPUTimer(GPUtimer* timer);
// int stopGPUTimer(GPUtimer* timer, float* times, int maxTimes);

// #ifdef __cplusplus
// }
// #endif

// #endif // PERF_H

// perf.c
// #include "perf.h"
// #include <stdio.h>
// #include <string.h>
// #include <math.h>
// #ifdef NANOVG_GLEW
// #  include <GL/glew.h>
// #endif
// #include <GLFW/glfw3.h>
// #include "nanovg.h"

// #ifdef _MSC_VER
// #define snprintf _snprintf
// #elif !defined(__MINGW32__)
// #include <iconv.h>
// #endif

// // timer query support
// #ifndef GL_ARB_timer_query
// #define GL_TIME_ELAPSED                   0x88BF
// //typedef void (APIENTRY *pfnGLGETQUERYOBJECTUI64V)(GLuint id, GLenum pname, GLuint64* params);
// //pfnGLGETQUERYOBJECTUI64V glGetQueryObjectui64v = 0;
// #endif

// void initGPUTimer(GPUtimer* timer)
export function initGPUTimer(timer: GPUtimer): void
{
  // memset(timer, 0, sizeof(*timer));

  // /*timer.supported = glfwExtensionSupported("GL_ARB_timer_query");
  // if (timer.supported) {
  //   #ifndef GL_ARB_timer_query
  //   glGetQueryObjectui64v = (pfnGLGETQUERYOBJECTUI64V)glfwGetProcAddress("glGetQueryObjectui64v");
  //   printf("glGetQueryObjectui64v=%p\n", glGetQueryObjectui64v);
  //   if (!glGetQueryObjectui64v) {
  //     timer.supported = GL_FALSE;
  //     return;
  //   }
  //   #endif
  //   glGenQueries(GPU_QUERY_COUNT, timer.queries);
  // }*/
}

// void startGPUTimer(GPUtimer* timer)
export function startGPUTimer(timer: GPUtimer): void
{
  if (!timer.supported)
    return;
  // glBeginQuery(GL_TIME_ELAPSED, timer.queries[timer.cur % GPU_QUERY_COUNT] );
  timer.cur++;
}

// int stopGPUTimer(GPUtimer* timer, float* times, int maxTimes)
export function stopGPUTimer(timer: GPUtimer, times: number[], maxTimes: number = times.length): number
{
  // NVG_NOTUSED(times);
  // NVG_NOTUSED(maxTimes);
  // GLint available = 1;
  let n = 0;
  if (!timer.supported)
    return 0;

  // glEndQuery(GL_TIME_ELAPSED);
  // while (available && timer.ret <= timer.cur) {
  //   // check for results if there are any
  //   glGetQueryObjectiv(timer.queries[timer.ret % GPU_QUERY_COUNT], GL_QUERY_RESULT_AVAILABLE, &available);
  //   if (available) {
  //     /*GLuint64 timeElapsed = 0;
  //     glGetQueryObjectui64v(timer.queries[timer.ret % GPU_QUERY_COUNT], GL_QUERY_RESULT, &timeElapsed);
  //     timer.ret++;
  //     if (n < maxTimes) {
  //       times[n] = (float)((double)timeElapsed * 1e-9);
  //       n++;
  //     }*/
  //   }
  // }
  return n;
}


// void initGraph(PerfGraph* fps, int style, const char* name)
export function initGraph(fps: PerfGraph, style: GraphrenderStyle, name: string): void
{
  // memset(fps, 0, sizeof(PerfGraph));
  for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
    fps.values[i] = 0;
  }
  fps.style = style;
  // strncpy(fps.name, name, sizeof(fps.name));
  // fps.name[sizeof(fps.name)-1] = '\0';
  fps.name = name;
}

// void updateGraph(PerfGraph* fps, float frameTime)
export function updateGraph(fps: PerfGraph, frameTime: number): void
{
  fps.head = (fps.head+1) % GRAPH_HISTORY_COUNT;
  fps.values[fps.head] = frameTime;
}

// float getGraphAverage(PerfGraph* fps)
export function getGraphAverage(fps: PerfGraph): number
{
  // int i;
  let avg = 0;
  for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
    avg += fps.values[i];
  }
  return avg / GRAPH_HISTORY_COUNT;
}

// void renderGraph(NVGcontext* vg, float x, float y, PerfGraph* fps)
export function renderGraph(nvg: NVG.Context, x: number, y: number, fps: PerfGraph): void
{
  let avg, w, h;
  let str: string;

  avg = getGraphAverage(fps);

  w = 200;
  h = 35;

  nvg.beginPath();
  nvg.rect(x,y, w,h);
  nvg.fillColor(nvg.RGBA(0,0,0,128));
  nvg.fill();

  nvg.beginPath();
  nvg.moveTo(x, y+h);
  if (fps.style === GraphrenderStyle.GRAPH_RENDER_FPS) {
    for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
      let v = 1.0 / (0.00001 + fps.values[(fps.head+i) % GRAPH_HISTORY_COUNT]);
      let vx, vy;
      if (v > 80.0) v = 80.0;
      vx = x + (i/(GRAPH_HISTORY_COUNT-1)) * w;
      vy = y + h - ((v / 80.0) * h);
      nvg.lineTo(vx, vy);
    }
  } else if (fps.style === GraphrenderStyle.GRAPH_RENDER_PERCENT) {
    for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
      let v = fps.values[(fps.head+i) % GRAPH_HISTORY_COUNT] * 1.0;
      let vx, vy;
      if (v > 100.0) v = 100.0;
      vx = x + (i/(GRAPH_HISTORY_COUNT-1)) * w;
      vy = y + h - ((v / 100.0) * h);
      nvg.lineTo(vx, vy);
    }
  } else {
    for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
      let v = fps.values[(fps.head+i) % GRAPH_HISTORY_COUNT] * 1000.0;
      let vx, vy;
      if (v > 20.0) v = 20.0;
      vx = x + (i/(GRAPH_HISTORY_COUNT-1)) * w;
      vy = y + h - ((v / 20.0) * h);
      nvg.lineTo(vx, vy);
    }
  }
  nvg.lineTo(x+w, y+h);
  nvg.fillColor(nvg.RGBA(255,192,0,128));
  nvg.fill();

  nvg.fontFace("sans");

  if (fps.name[0] !== '\0') {
    nvg.fontSize(12.0);
    nvg.textAlign(NVG.Align.LEFT|NVG.Align.TOP);
    nvg.fillColor(nvg.RGBA(240,240,240,192));
    nvg.text(x+3,y+3, fps.name, null);
  }

  if (fps.style === GraphrenderStyle.GRAPH_RENDER_FPS) {
    nvg.fontSize(15.0);
    nvg.textAlign(NVG.Align.RIGHT|NVG.Align.TOP);
    nvg.fillColor(nvg.RGBA(240,240,240,255));
    str = `${(1.0 / avg).toFixed(2)} FPS`;
    nvg.text(x+w-3,y+3, str, null);

    nvg.fontSize(13.0);
    nvg.textAlign(NVG.Align.RIGHT|NVG.Align.BASELINE);
    nvg.fillColor(nvg.RGBA(240,240,240,160));
    str = `${(avg * 1000).toFixed(2)} ms`;
    nvg.text(x+w-3,y+h-3, str, null);
  } else if (fps.style === GraphrenderStyle.GRAPH_RENDER_PERCENT) {
    nvg.fontSize(15.0);
    nvg.textAlign(NVG.Align.RIGHT|NVG.Align.TOP);
    nvg.fillColor(nvg.RGBA(240,240,240,255));
    str = `${(avg * 1.0).toFixed(1)} %`;
    nvg.text(x+w-3,y+3, str, null);
  } else {
    nvg.fontSize(15.0);
    nvg.textAlign(NVG.Align.RIGHT|NVG.Align.TOP);
    nvg.fillColor(nvg.RGBA(240,240,240,255));
    str = `${(avg * 1000).toFixed(2)} ms`;
    nvg.text(x+w-3,y+3, str, null);
  }
}
