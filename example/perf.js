// perf.h
// #ifndef PERF_H
// #define PERF_H
System.register(["nanovg-js"], function (exports_1, context_1) {
    "use strict";
    var NVG, GraphrenderStyle, GRAPH_HISTORY_COUNT, PerfGraph, GPU_QUERY_COUNT, GPUtimer;
    var __moduleName = context_1 && context_1.id;
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
    function initGPUTimer(timer) {
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
    exports_1("initGPUTimer", initGPUTimer);
    // void startGPUTimer(GPUtimer* timer)
    function startGPUTimer(timer) {
        if (!timer.supported)
            return;
        // glBeginQuery(GL_TIME_ELAPSED, timer.queries[timer.cur % GPU_QUERY_COUNT] );
        timer.cur++;
    }
    exports_1("startGPUTimer", startGPUTimer);
    // int stopGPUTimer(GPUtimer* timer, float* times, int maxTimes)
    function stopGPUTimer(timer, times, maxTimes = times.length) {
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
    exports_1("stopGPUTimer", stopGPUTimer);
    // void initGraph(PerfGraph* fps, int style, const char* name)
    function initGraph(fps, style, name) {
        // memset(fps, 0, sizeof(PerfGraph));
        for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
            fps.values[i] = 0;
        }
        fps.style = style;
        // strncpy(fps.name, name, sizeof(fps.name));
        // fps.name[sizeof(fps.name)-1] = '\0';
        fps.name = name;
    }
    exports_1("initGraph", initGraph);
    // void updateGraph(PerfGraph* fps, float frameTime)
    function updateGraph(fps, frameTime) {
        fps.head = (fps.head + 1) % GRAPH_HISTORY_COUNT;
        fps.values[fps.head] = frameTime;
    }
    exports_1("updateGraph", updateGraph);
    // float getGraphAverage(PerfGraph* fps)
    function getGraphAverage(fps) {
        // int i;
        let avg = 0;
        for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
            avg += fps.values[i];
        }
        return avg / GRAPH_HISTORY_COUNT;
    }
    exports_1("getGraphAverage", getGraphAverage);
    // void renderGraph(NVGcontext* vg, float x, float y, PerfGraph* fps)
    function renderGraph(nvg, x, y, fps) {
        let avg, w, h;
        let str;
        avg = getGraphAverage(fps);
        w = 200;
        h = 35;
        nvg.beginPath();
        nvg.rect(x, y, w, h);
        nvg.fillColor(nvg.RGBA(0, 0, 0, 128));
        nvg.fill();
        nvg.beginPath();
        nvg.moveTo(x, y + h);
        if (fps.style === GraphrenderStyle.GRAPH_RENDER_FPS) {
            for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                let v = 1.0 / (0.00001 + fps.values[(fps.head + i) % GRAPH_HISTORY_COUNT]);
                let vx, vy;
                if (v > 80.0)
                    v = 80.0;
                vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                vy = y + h - ((v / 80.0) * h);
                nvg.lineTo(vx, vy);
            }
        }
        else if (fps.style === GraphrenderStyle.GRAPH_RENDER_PERCENT) {
            for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                let v = fps.values[(fps.head + i) % GRAPH_HISTORY_COUNT] * 1.0;
                let vx, vy;
                if (v > 100.0)
                    v = 100.0;
                vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                vy = y + h - ((v / 100.0) * h);
                nvg.lineTo(vx, vy);
            }
        }
        else {
            for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                let v = fps.values[(fps.head + i) % GRAPH_HISTORY_COUNT] * 1000.0;
                let vx, vy;
                if (v > 20.0)
                    v = 20.0;
                vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                vy = y + h - ((v / 20.0) * h);
                nvg.lineTo(vx, vy);
            }
        }
        nvg.lineTo(x + w, y + h);
        nvg.fillColor(nvg.RGBA(255, 192, 0, 128));
        nvg.fill();
        nvg.fontFace("sans");
        if (fps.name[0] !== '\0') {
            nvg.fontSize(14.0);
            nvg.textAlign(NVG.Align.LEFT | NVG.Align.TOP);
            nvg.fillColor(nvg.RGBA(240, 240, 240, 192));
            nvg.text(x + 3, y + 1, fps.name, null);
        }
        if (fps.style === GraphrenderStyle.GRAPH_RENDER_FPS) {
            nvg.fontSize(18.0);
            nvg.textAlign(NVG.Align.RIGHT | NVG.Align.TOP);
            nvg.fillColor(nvg.RGBA(240, 240, 240, 255));
            str = `${(1.0 / avg).toFixed(2)} FPS`;
            nvg.text(x + w - 3, y + 1, str, null);
            nvg.fontSize(15.0);
            nvg.textAlign(NVG.Align.RIGHT | NVG.Align.BOTTOM);
            nvg.fillColor(nvg.RGBA(240, 240, 240, 160));
            str = `${(avg * 1000).toFixed(2)} ms`;
            nvg.text(x + w - 3, y + h - 1, str, null);
        }
        else if (fps.style === GraphrenderStyle.GRAPH_RENDER_PERCENT) {
            nvg.fontSize(18.0);
            nvg.textAlign(NVG.Align.RIGHT | NVG.Align.TOP);
            nvg.fillColor(nvg.RGBA(240, 240, 240, 255));
            str = `${(avg * 1.0).toFixed(1)} %`;
            nvg.text(x + w - 3, y + 1, str, null);
        }
        else {
            nvg.fontSize(18.0);
            nvg.textAlign(NVG.Align.RIGHT | NVG.Align.TOP);
            nvg.fillColor(nvg.RGBA(240, 240, 240, 255));
            str = `${(avg * 1000).toFixed(2)} ms`;
            nvg.text(x + w - 3, y + 1, str, null);
        }
    }
    exports_1("renderGraph", renderGraph);
    return {
        setters: [
            function (NVG_1) {
                NVG = NVG_1;
            }
        ],
        execute: function () {
            // #ifdef __cplusplus
            // extern "C" {
            // #endif
            (function (GraphrenderStyle) {
                GraphrenderStyle[GraphrenderStyle["GRAPH_RENDER_FPS"] = 0] = "GRAPH_RENDER_FPS";
                GraphrenderStyle[GraphrenderStyle["GRAPH_RENDER_MS"] = 1] = "GRAPH_RENDER_MS";
                GraphrenderStyle[GraphrenderStyle["GRAPH_RENDER_PERCENT"] = 2] = "GRAPH_RENDER_PERCENT";
            })(GraphrenderStyle || (GraphrenderStyle = {}));
            exports_1("GraphrenderStyle", GraphrenderStyle);
            // #define GRAPH_HISTORY_COUNT 100
            exports_1("GRAPH_HISTORY_COUNT", GRAPH_HISTORY_COUNT = 100);
            // struct PerfGraph {
            //   int style;
            //   char name[32];
            //   float values[GRAPH_HISTORY_COUNT];
            //   int head;
            // };
            // typedef struct PerfGraph PerfGraph;
            PerfGraph = class PerfGraph {
                constructor() {
                    this.style = GraphrenderStyle.GRAPH_RENDER_FPS;
                    this.name = "";
                    this.values = [];
                    this.head = 0;
                }
            };
            exports_1("PerfGraph", PerfGraph);
            // void initGraph(PerfGraph* fps, int style, const char* name);
            // void updateGraph(PerfGraph* fps, float frameTime);
            // void renderGraph(NVGcontext* vg, float x, float y, PerfGraph* fps);
            // float getGraphAverage(PerfGraph* fps);
            // #define GPU_QUERY_COUNT 5
            exports_1("GPU_QUERY_COUNT", GPU_QUERY_COUNT = 5);
            // struct GPUtimer {
            //   int supported;
            //   int cur, ret;
            //   unsigned int queries[GPU_QUERY_COUNT];
            // };
            // typedef struct GPUtimer GPUtimer;
            GPUtimer = class GPUtimer {
                constructor() {
                    this.supported = false;
                    this.cur = 0;
                    this.ret = 0;
                    this.queries = [];
                }
            };
            exports_1("GPUtimer", GPUtimer);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlcmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULGlCQUFpQjtBQUNqQixpQkFBaUI7Ozs7O0lBbURqQixzQ0FBc0M7SUFDdEMsdUNBQXVDO0lBQ3ZDLGlFQUFpRTtJQUVqRSxxQkFBcUI7SUFDckIsSUFBSTtJQUNKLFNBQVM7SUFFVCxtQkFBbUI7SUFFbkIsU0FBUztJQUNULG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBRXRCLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsOEJBQThCO0lBQzlCLHFCQUFxQjtJQUNyQixTQUFTO0lBRVQseUJBQXlCO0lBQ3pCLDZCQUE2QjtJQUM3QixtREFBbUQ7SUFDbkQsa0dBQWtHO0lBQ2xHLHdEQUF3RDtJQUN4RCxTQUFTO0lBRVQscUNBQXFDO0lBQ3JDLFNBQWdCLFlBQVksQ0FBQyxLQUFlO1FBRTFDLG9DQUFvQztRQUVwQyxvRUFBb0U7UUFDcEUseUJBQXlCO1FBQ3pCLCtCQUErQjtRQUMvQixtR0FBbUc7UUFDbkcsaUVBQWlFO1FBQ2pFLGtDQUFrQztRQUNsQyxrQ0FBa0M7UUFDbEMsY0FBYztRQUNkLE1BQU07UUFDTixXQUFXO1FBQ1gsa0RBQWtEO1FBQ2xELE1BQU07SUFDUixDQUFDOztJQUVELHNDQUFzQztJQUN0QyxTQUFnQixhQUFhLENBQUMsS0FBZTtRQUUzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDbEIsT0FBTztRQUNULDhFQUE4RTtRQUM5RSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZCxDQUFDOztJQUVELGdFQUFnRTtJQUNoRSxTQUFnQixZQUFZLENBQUMsS0FBZSxFQUFFLEtBQWUsRUFBRSxXQUFtQixLQUFLLENBQUMsTUFBTTtRQUU1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