// demo.h
// #ifndef DEMO_H
// #define DEMO_H

// #include "nanovg.h"
import * as NVG from "nanovg-js";

function init_array<T>(n: number, c: (i: number) => T, a: T[] = new Array<T>(n)): T[] {
  for (let i = 0; i < n; ++i) { a[i] = c(i); } return a;
}

// #ifdef __cplusplus
// extern "C" {
// #endif

// struct DemoData {
//   int fontNormal, fontBold, fontIcons, fontEmoji;
//   int images[12];
// };
// typedef struct DemoData DemoData;
export class DemoData {
  fontNormal: number = 0;
  fontBold: number = 0;
  fontIcons: number = 0;
  fontEmoji: number = 0;
  images: number[] = [];
}

// int loadDemoData(NVGcontext* nvg, DemoData* data);
// void freeDemoData(NVGcontext* nvg, DemoData* data);
// void renderDemo(NVGcontext* nvg, float mx, float my, float width, float height, float t, int blowup, DemoData* data);

// void saveScreenShot(int w, int h, int premult, const char* name);

// #ifdef __cplusplus
// }
// #endif

// #endif // DEMO_H

// demo.c
// #include "demo.h"
// #include <stdio.h>
// #include <string.h>
// #include <math.h>
// #ifdef NANOVG_GLEW
// #  include <GL/glew.h>
// #endif
// #include <GLFW/glfw3.h>
// #include "nanovg.h"
// #define STB_IMAGE_WRITE_IMPLEMENTATION
// #include "stb_image_write.h"


// #ifdef _MSC_VER
// #define snprintf _snprintf
// #elif !defined(__MINGW32__)
// #include <iconv.h>
// #endif

const ICON_SEARCH = 0x1F50D;
const ICON_CIRCLED_CROSS = 0x2716;
const ICON_CHEVRON_RIGHT = 0xE75E;
const ICON_CHECK = 0x2713;
const ICON_LOGIN = 0xE740;
const ICON_TRASH = 0xE729;

// //static float minf(float a, float b) { return a < b ? a : b; }
// static float maxf(float a, float b) { return a > b ? a : b; }
function maxf(a: number, b: number): number { return a > b ? a : b; }
// //static float absf(float a) { return a >= 0.0 ? a : -a; }
// static float clampf(float a, float mn, float mx) { return a < mn ? mn : (a > mx ? mx : a); }
function clampf(a: number, mn: number, mx: number): number { return a < mn ? mn : (a > mx ? mx : a); }

// Returns 1 if col.rgba is 0.0,0.0,0.0,0.0, 0 otherwise
// int isBlack(NVGcolor col)
function isBlack(col: NVG.Color): boolean {
  if (col.r === 0.0 && col.g === 0.0 && col.b === 0.0 && col.a === 0.0) {
    return true;
  }
  return false;
}

// static char* cpToUTF8(int cp, char* str)
// {
//   int n = 0;
//   if (cp < 0x80) n = 1;
//   else if (cp < 0x800) n = 2;
//   else if (cp < 0x10000) n = 3;
//   else if (cp < 0x200000) n = 4;
//   else if (cp < 0x4000000) n = 5;
//   else if (cp <= 0x7fffffff) n = 6;
//   str[n] = '\0';
//   switch (n) {
//   case 6: str[5] = 0x80 | (cp & 0x3f); cp = cp >> 6; cp |= 0x4000000;
//   case 5: str[4] = 0x80 | (cp & 0x3f); cp = cp >> 6; cp |= 0x200000;
//   case 4: str[3] = 0x80 | (cp & 0x3f); cp = cp >> 6; cp |= 0x10000;
//   case 3: str[2] = 0x80 | (cp & 0x3f); cp = cp >> 6; cp |= 0x800;
//   case 2: str[1] = 0x80 | (cp & 0x3f); cp = cp >> 6; cp |= 0xc0;
//   case 1: str[0] = cp;
//   }
//   return str;
// }
function cpToUTF8(cp: number): string {
  return String.fromCodePoint(cp);
}

// void drawWindow(NVGcontext* nvg, const char* title, float x, float y, float w, float h)
export function drawWindow(nvg: NVG.Context, title: string, x: number, y: number, w: number, h: number): void {
  const cornerRadius = 3.0;
  let shadowPaint: NVG.Paint;
  let headerPaint: NVG.Paint;

  nvg.save();
  // nvg.clearState();

  // Window
  nvg.beginPath();
  nvg.roundedRect(x, y, w, h, cornerRadius);
  nvg.fillColor(nvg.RGBA(28, 30, 34, 192));
  // nvg.fillColor(nvg.RGBA(0,0,0,128));
  nvg.fill();

  // Drop shadow
  shadowPaint = nvg.boxGradient(x, y + 2, w, h, cornerRadius * 2, 10, nvg.RGBA(0, 0, 0, 128), nvg.RGBA(0, 0, 0, 0));
  nvg.beginPath();
  nvg.rect(x - 10, y - 10, w + 20, h + 30);
  nvg.roundedRect(x, y, w, h, cornerRadius);
  nvg.pathWinding(NVG.Solidity.HOLE);
  nvg.fillPaint(shadowPaint);
  nvg.fill();

  // Header
  headerPaint = nvg.linearGradient(x, y, x, y + 15, nvg.RGBA(255, 255, 255, 8), nvg.RGBA(0, 0, 0, 16));
  nvg.beginPath();
  nvg.roundedRect(x + 1, y + 1, w - 2, 30, cornerRadius - 1);
  nvg.fillPaint(headerPaint);
  nvg.fill();
  nvg.beginPath();
  nvg.moveTo(x + 0.5, y + 0.5 + 30);
  nvg.lineTo(x + 0.5 + w - 1, y + 0.5 + 30);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 32));
  nvg.stroke();

  nvg.fontSize(18.0);
  nvg.fontFace("sans-bold");
  nvg.textAlign(NVG.Align.CENTER | NVG.Align.MIDDLE);

  nvg.fontBlur(2);
  nvg.fillColor(nvg.RGBA(0, 0, 0, 128));
  nvg.text(x + w / 2, y + 16 + 1, title, null);

  nvg.fontBlur(0);
  nvg.fillColor(nvg.RGBA(220, 220, 220, 160));
  nvg.text(x + w / 2, y + 16, title, null);

  nvg.restore();
}

// void drawSearchBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
export function drawSearchBox(nvg: NVG.Context, text: string, x: number, y: number, w: number, h: number): void {
  let bg: NVG.Paint;
  const cornerRadius = h / 2 - 1;

  // Edit
  bg = nvg.boxGradient(x, y + 1.5, w, h, h / 2, 5, nvg.RGBA(0, 0, 0, 16), nvg.RGBA(0, 0, 0, 92));
  nvg.beginPath();
  nvg.roundedRect(x, y, w, h, cornerRadius);
  nvg.fillPaint(bg);
  nvg.fill();

  /* nvg.beginPath();
  nvg.roundedRect(x+0.5,y+0.5, w-1,h-1, cornerRadius-0.5);
  nvg.strokeColor(nvg.RGBA(0,0,0,48));
  nvg.stroke();*/

  nvg.fontSize(h * 1.3);
  nvg.fontFace("icons");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
  nvg.textAlign(NVG.Align.CENTER | NVG.Align.MIDDLE);
  nvg.text(x + h * 0.55, y + h * 0.55, cpToUTF8(ICON_SEARCH), null);

  nvg.fontSize(20.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 32));

  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.text(x + h * 1.05, y + h * 0.5, text, null);

  nvg.fontSize(h * 1.3);
  nvg.fontFace("icons");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 32));
  nvg.textAlign(NVG.Align.CENTER | NVG.Align.MIDDLE);
  nvg.text(x + w - h * 0.55, y + h * 0.55, cpToUTF8(ICON_CIRCLED_CROSS), null);
}

// void drawDropDown(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
export function drawDropDown(nvg: NVG.Context, text: string, x: number, y: number, w: number, h: number): void {
  let bg: NVG.Paint;
  const cornerRadius = 4.0;

  bg = nvg.linearGradient(x, y, x, y + h, nvg.RGBA(255, 255, 255, 16), nvg.RGBA(0, 0, 0, 16));
  nvg.beginPath();
  nvg.roundedRect(x + 1, y + 1, w - 2, h - 2, cornerRadius - 1);
  nvg.fillPaint(bg);
  nvg.fill();

  nvg.beginPath();
  nvg.roundedRect(x + 0.5, y + 0.5, w - 1, h - 1, cornerRadius - 0.5);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 48));
  nvg.stroke();

  nvg.fontSize(20.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 160));
  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.text(x + h * 0.3, y + h * 0.5, text, null);

  nvg.fontSize(h * 1.3);
  nvg.fontFace("icons");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
  nvg.textAlign(NVG.Align.CENTER | NVG.Align.MIDDLE);
  nvg.text(x + w - h * 0.5, y + h * 0.5, cpToUTF8(ICON_CHEVRON_RIGHT), null);
}

// void drawLabel(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
export function drawLabel(nvg: NVG.Context, text: string, x: number, y: number, w: number, h: number): void {
  nvg.fontSize(18.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 128));

  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.text(x, y + h * 0.5, text, null);
}

// void drawEditBoxBase(NVGcontext* nvg, float x, float y, float w, float h)
export function drawEditBoxBase(nvg: NVG.Context, x: number, y: number, w: number, h: number): void {
  let bg: NVG.Paint;
  // Edit
  bg = nvg.boxGradient(x + 1, y + 1 + 1.5, w - 2, h - 2, 3, 4, nvg.RGBA(255, 255, 255, 32), nvg.RGBA(32, 32, 32, 32));
  nvg.beginPath();
  nvg.roundedRect(x + 1, y + 1, w - 2, h - 2, 4 - 1);
  nvg.fillPaint(bg);
  nvg.fill();

  nvg.beginPath();
  nvg.roundedRect(x + 0.5, y + 0.5, w - 1, h - 1, 4 - 0.5);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 48));
  nvg.stroke();
}

// void drawEditBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
export function drawEditBox(nvg: NVG.Context, text: string, x: number, y: number, w: number, h: number): void {

  drawEditBoxBase(nvg, x, y, w, h);

  nvg.fontSize(20.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.text(x + h * 0.3, y + h * 0.5, text, null);
}

// void drawEditBoxNum(NVGcontext* nvg,
//           const char* text, const char* units, float x, float y, float w, float h)
export function drawEditBoxNum(nvg: NVG.Context, text: string, units: string, x: number, y: number, w: number, h: number): void {
  drawEditBoxBase(nvg, x, y, w, h);

  const uw = nvg.textBounds(0, 0, units, null, null);

  nvg.fontSize(18.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
  nvg.textAlign(NVG.Align.RIGHT | NVG.Align.MIDDLE);
  nvg.text(x + w - h * 0.3, y + h * 0.5, units, null);

  nvg.fontSize(20.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 128));
  nvg.textAlign(NVG.Align.RIGHT | NVG.Align.MIDDLE);
  nvg.text(x + w - uw - h * 0.5, y + h * 0.5, text, null);
}

// void drawCheckBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
export function drawCheckBox(nvg: NVG.Context, text: string, x: number, y: number, w: number, h: number): void {
  let bg: NVG.Paint;

  nvg.fontSize(18.0);
  nvg.fontFace("sans");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 160));

  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.text(x + 28, y + h * 0.5, text, null);

  bg = nvg.boxGradient(x + 1, y + Math.floor(h * 0.5) - 9 + 1, 18, 18, 3, 3, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 92));
  nvg.beginPath();
  nvg.roundedRect(x + 1, y + Math.floor(h * 0.5) - 9, 18, 18, 3);
  nvg.fillPaint(bg);
  nvg.fill();

  nvg.fontSize(40);
  nvg.fontFace("icons");
  nvg.fillColor(nvg.RGBA(255, 255, 255, 128));
  nvg.textAlign(NVG.Align.CENTER | NVG.Align.MIDDLE);
  nvg.text(x + 9 + 2, y + h * 0.5, cpToUTF8(ICON_CHECK), null);
}

// void drawButton(NVGcontext* nvg, int preicon, const char* text, float x, float y, float w, float h, NVGcolor col)
export function drawButton(nvg: NVG.Context, preicon: number, text: string, x: number, y: number, w: number, h: number, col: NVG.Color): void {
  let bg: NVG.Paint;
  const cornerRadius = 4.0;
  let tw = 0, iw = 0;

  bg = nvg.linearGradient(x, y, x, y + h, nvg.RGBA(255, 255, 255, isBlack(col) ? 16 : 32), nvg.RGBA(0, 0, 0, isBlack(col) ? 16 : 32));
  nvg.beginPath();
  nvg.roundedRect(x + 1, y + 1, w - 2, h - 2, cornerRadius - 1);
  if (!isBlack(col)) {
    nvg.fillColor(col);
    nvg.fill();
  }
  nvg.fillPaint(bg);
  nvg.fill();

  nvg.beginPath();
  nvg.roundedRect(x + 0.5, y + 0.5, w - 1, h - 1, cornerRadius - 0.5);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 48));
  nvg.stroke();

  nvg.fontSize(20.0);
  nvg.fontFace("sans-bold");
  tw = nvg.textBounds(0, 0, text, null, null);
  if (preicon !== 0) {
    nvg.fontSize(h * 1.3);
    nvg.fontFace("icons");
    iw = nvg.textBounds(0, 0, cpToUTF8(preicon), null, null);
    iw += h * 0.15;
  }

  if (preicon !== 0) {
    nvg.fontSize(h * 1.3);
    nvg.fontFace("icons");
    nvg.fillColor(nvg.RGBA(255, 255, 255, 96));
    nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
    nvg.text(x + w * 0.5 - tw * 0.5 - iw * 0.75, y + h * 0.5, cpToUTF8(preicon), null);
  }

  nvg.fontSize(20.0);
  nvg.fontFace("sans-bold");
  nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
  nvg.fillColor(nvg.RGBA(0, 0, 0, 160));
  nvg.text(x + w * 0.5 - tw * 0.5 + iw * 0.25, y + h * 0.5 - 1, text, null);
  nvg.fillColor(nvg.RGBA(255, 255, 255, 160));
  nvg.text(x + w * 0.5 - tw * 0.5 + iw * 0.25, y + h * 0.5, text, null);
}

// void drawSlider(NVGcontext* nvg, float pos, float x, float y, float w, float h)
export function drawSlider(nvg: NVG.Context, pos: number, x: number, y: number, w: number, h: number): void {
  let bg: NVG.Paint, knob: NVG.Paint;
  const cy = y + Math.floor(h * 0.5);
  const kr = Math.floor(h * 0.25);

  nvg.save();
  // nvg.clearState();

  // Slot
  bg = nvg.boxGradient(x, cy - 2 + 1, w, 4, 2, 2, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 128));
  nvg.beginPath();
  nvg.roundedRect(x, cy - 2, w, 4, 2);
  nvg.fillPaint(bg);
  nvg.fill();

  // Knob Shadow
  bg = nvg.radialGradient(x + Math.floor(pos * w), cy + 1, kr - 3, kr + 3, nvg.RGBA(0, 0, 0, 64), nvg.RGBA(0, 0, 0, 0));
  nvg.beginPath();
  nvg.rect(x + Math.floor(pos * w) - kr - 5, cy - kr - 5, kr * 2 + 5 + 5, kr * 2 + 5 + 5 + 3);
  nvg.circle(x + Math.floor(pos * w), cy, kr);
  nvg.pathWinding(NVG.Solidity.HOLE);
  nvg.fillPaint(bg);
  nvg.fill();

  // Knob
  knob = nvg.linearGradient(x, cy - kr, x, cy + kr, nvg.RGBA(255, 255, 255, 16), nvg.RGBA(0, 0, 0, 16));
  nvg.beginPath();
  nvg.circle(x + Math.floor(pos * w), cy, kr - 1);
  nvg.fillColor(nvg.RGBA(40, 43, 48, 255));
  nvg.fill();
  nvg.fillPaint(knob);
  nvg.fill();

  nvg.beginPath();
  nvg.circle(x + Math.floor(pos * w), cy, kr - 0.5);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 92));
  nvg.stroke();

  nvg.restore();
}

// void drawEyes(NVGcontext* nvg, float x, float y, float w, float h, float mx, float my, float t)
function drawEyes(nvg: NVG.Context, x: number, y: number, w: number, h: number, mx: number, my: number, t: number): void {
  let gloss: NVG.Paint, bg: NVG.Paint;
  const ex: number = w * 0.23;
  const ey: number = h * 0.5;
  const lx: number = x + ex;
  const ly: number = y + ey;
  const rx: number = x + w - ex;
  const ry: number = y + ey;
  let dx, dy, d;
  const br: number = (ex < ey ? ex : ey) * 0.5;
  const blink: number = 1 - Math.pow(Math.sin(t * 0.5), 200) * 0.8;

  bg = nvg.linearGradient(x, y + h * 0.5, x + w * 0.1, y + h, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 16));
  nvg.beginPath();
  nvg.ellipse(lx + 3.0, ly + 16.0, ex, ey);
  nvg.ellipse(rx + 3.0, ry + 16.0, ex, ey);
  nvg.fillPaint(bg);
  nvg.fill();

  bg = nvg.linearGradient(x, y + h * 0.25, x + w * 0.1, y + h, nvg.RGBA(220, 220, 220, 255), nvg.RGBA(128, 128, 128, 255));
  nvg.beginPath();
  nvg.ellipse(lx, ly, ex, ey);
  nvg.ellipse(rx, ry, ex, ey);
  nvg.fillPaint(bg);
  nvg.fill();

  dx = (mx - rx) / (ex * 10);
  dy = (my - ry) / (ey * 10);
  d = Math.sqrt(dx * dx + dy * dy);
  if (d > 1.0) {
    dx /= d; dy /= d;
  }
  dx *= ex * 0.4;
  dy *= ey * 0.5;
  nvg.beginPath();
  nvg.ellipse(lx + dx, ly + dy + ey * 0.25 * (1 - blink), br, br * blink);
  nvg.fillColor(nvg.RGBA(32, 32, 32, 255));
  nvg.fill();

  dx = (mx - rx) / (ex * 10);
  dy = (my - ry) / (ey * 10);
  d = Math.sqrt(dx * dx + dy * dy);
  if (d > 1.0) {
    dx /= d; dy /= d;
  }
  dx *= ex * 0.4;
  dy *= ey * 0.5;
  nvg.beginPath();
  nvg.ellipse(rx + dx, ry + dy + ey * 0.25 * (1 - blink), br, br * blink);
  nvg.fillColor(nvg.RGBA(32, 32, 32, 255));
  nvg.fill();

  gloss = nvg.radialGradient(lx - ex * 0.25, ly - ey * 0.5, ex * 0.1, ex * 0.75, nvg.RGBA(255, 255, 255, 128), nvg.RGBA(255, 255, 255, 0));
  nvg.beginPath();
  nvg.ellipse(lx, ly, ex, ey);
  nvg.fillPaint(gloss);
  nvg.fill();

  gloss = nvg.radialGradient(rx - ex * 0.25, ry - ey * 0.5, ex * 0.1, ex * 0.75, nvg.RGBA(255, 255, 255, 128), nvg.RGBA(255, 255, 255, 0));
  nvg.beginPath();
  nvg.ellipse(rx, ry, ex, ey);
  nvg.fillPaint(gloss);
  nvg.fill();
}

// void drawGraph(NVGcontext* nvg, float x, float y, float w, float h, float t)
function drawGraph(nvg: NVG.Context, x: number, y: number, w: number, h: number, t: number): void {
  let bg: NVG.Paint;
  const samples: number[] = [];
  const sx: number[] = [], sy: number[] = [];
  const dx: number = w / 5.0;

  samples[0] = (1 + Math.sin(t * 1.2345 + Math.cos(t * 0.33457) * 0.44)) * 0.5;
  samples[1] = (1 + Math.sin(t * 0.68363 + Math.cos(t * 1.3) * 1.55)) * 0.5;
  samples[2] = (1 + Math.sin(t * 1.1642 + Math.cos(t * 0.33457) * 1.24)) * 0.5;
  samples[3] = (1 + Math.sin(t * 0.56345 + Math.cos(t * 1.63) * 0.14)) * 0.5;
  samples[4] = (1 + Math.sin(t * 1.6245 + Math.cos(t * 0.254) * 0.3)) * 0.5;
  samples[5] = (1 + Math.sin(t * 0.345 + Math.cos(t * 0.03) * 0.6)) * 0.5;

  for (let i = 0; i < 6; i++) {
    sx[i] = x + i * dx;
    sy[i] = y + h * samples[i] * 0.8;
  }

  // Graph background
  bg = nvg.linearGradient(x, y, x, y + h, nvg.RGBA(0, 160, 192, 0), nvg.RGBA(0, 160, 192, 64));
  nvg.beginPath();
  nvg.moveTo(sx[0], sy[0]);
  for (let i = 1; i < 6; i++)
    nvg.bezierTo(sx[i - 1] + dx * 0.5, sy[i - 1], sx[i] - dx * 0.5, sy[i], sx[i], sy[i]);
  nvg.lineTo(x + w, y + h);
  nvg.lineTo(x, y + h);
  nvg.fillPaint(bg);
  nvg.fill();

  // Graph line
  nvg.beginPath();
  nvg.moveTo(sx[0], sy[0] + 2);
  for (let i = 1; i < 6; i++)
    nvg.bezierTo(sx[i - 1] + dx * 0.5, sy[i - 1] + 2, sx[i] - dx * 0.5, sy[i] + 2, sx[i], sy[i] + 2);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 32));
  nvg.strokeWidth(3.0);
  nvg.stroke();

  nvg.beginPath();
  nvg.moveTo(sx[0], sy[0]);
  for (let i = 1; i < 6; i++)
    nvg.bezierTo(sx[i - 1] + dx * 0.5, sy[i - 1], sx[i] - dx * 0.5, sy[i], sx[i], sy[i]);
  nvg.strokeColor(nvg.RGBA(0, 160, 192, 255));
  nvg.strokeWidth(3.0);
  nvg.stroke();

  // Graph sample pos
  for (let i = 0; i < 6; i++) {
    bg = nvg.radialGradient(sx[i], sy[i] + 2, 3.0, 8.0, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 0));
    nvg.beginPath();
    nvg.rect(sx[i] - 10, sy[i] - 10 + 2, 20, 20);
    nvg.fillPaint(bg);
    nvg.fill();
  }

  nvg.beginPath();
  for (let i = 0; i < 6; i++)
    nvg.circle(sx[i], sy[i], 4.0);
  nvg.fillColor(nvg.RGBA(0, 160, 192, 255));
  nvg.fill();
  nvg.beginPath();
  for (let i = 0; i < 6; i++)
    nvg.circle(sx[i], sy[i], 2.0);
  nvg.fillColor(nvg.RGBA(220, 220, 220, 255));
  nvg.fill();

  nvg.strokeWidth(1.0);
}

// void drawSpinner(NVGcontext* nvg, float cx, float cy, float r, float t)
export function drawSpinner(nvg: NVG.Context, cx: number, cy: number, r: number, t: number): void {
  const a0: number = 0.0 + t * 6;
  const a1: number = NVG.PI + t * 6;
  const r0: number = r;
  const r1: number = r * 0.75;
  let ax, ay, bx, by;
  let paint: NVG.Paint;

  nvg.save();

  nvg.beginPath();
  nvg.arc(cx, cy, r0, a0, a1, NVG.Winding.CW);
  nvg.arc(cx, cy, r1, a1, a0, NVG.Winding.CCW);
  nvg.closePath();
  ax = cx + Math.cos(a0) * (r0 + r1) * 0.5;
  ay = cy + Math.sin(a0) * (r0 + r1) * 0.5;
  bx = cx + Math.cos(a1) * (r0 + r1) * 0.5;
  by = cy + Math.sin(a1) * (r0 + r1) * 0.5;
  paint = nvg.linearGradient(ax, ay, bx, by, nvg.RGBA(0, 0, 0, 0), nvg.RGBA(0, 0, 0, 128));
  nvg.fillPaint(paint);
  nvg.fill();

  nvg.restore();
}

// void drawThumbnails(NVGcontext* nvg, float x, float y, float w, float h, const int* images, int nimages, float t)
export function drawThumbnails(nvg: NVG.Context, x: number, y: number, w: number, h: number, images: number[], nimages: number, t: number): void {
  const cornerRadius = 3.0;
  let shadowPaint: NVG.Paint, imgPaint: NVG.Paint, fadePaint: NVG.Paint;
  let ix, iy, iw, ih;
  const thumb = 60.0;
  const arry = 30.5;
  let imgw: [number] = [0], imgh: [number] = [0];
  const stackh = (nimages / 2) * (thumb + 10) + 10;
  // let i;
  const u = (1 + Math.cos(t * 0.5)) * 0.5;
  const u2 = (1 - Math.cos(t * 0.2)) * 0.5;
  let scrollh, dv;

  nvg.save();
  // nvg.clearState();

  // Drop shadow
  shadowPaint = nvg.boxGradient(x, y + 4, w, h, cornerRadius * 2, 20, nvg.RGBA(0, 0, 0, 128), nvg.RGBA(0, 0, 0, 0));
  nvg.beginPath();
  nvg.rect(x - 10, y - 10, w + 20, h + 30);
  nvg.roundedRect(x, y, w, h, cornerRadius);
  nvg.pathWinding(NVG.Solidity.HOLE);
  nvg.fillPaint(shadowPaint);
  nvg.fill();

  // Window
  nvg.beginPath();
  nvg.roundedRect(x, y, w, h, cornerRadius);
  nvg.moveTo(x - 10, y + arry);
  nvg.lineTo(x + 1, y + arry - 11);
  nvg.lineTo(x + 1, y + arry + 11);
  nvg.fillColor(nvg.RGBA(200, 200, 200, 255));
  nvg.fill();

  nvg.save();
  nvg.scissor(x, y, w, h);
  nvg.translate(0, -(stackh - h) * u);

  dv = 1.0 / (nimages - 1);

  for (let i = 0; i < nimages; i++) {
    let tx, ty, v, a;
    tx = x + 10;
    ty = y + 10;
    tx += Math.floor(i % 2) * (thumb + 10);
    ty += Math.floor(i / 2) * (thumb + 10);
    nvg.imageSize(images[i], imgw, imgh);
    if (imgw[0] < imgh[0]) {
      iw = thumb;
      ih = iw * imgh[0] / imgw[0];
      ix = 0;
      iy = -(ih - thumb) * 0.5;
    } else {
      ih = thumb;
      iw = ih * imgw[0] / imgh[0];
      ix = -(iw - thumb) * 0.5;
      iy = 0;
    }

    v = i * dv;
    a = clampf((u2 - v) / dv, 0, 1);

    if (a < 1.0)
      drawSpinner(nvg, tx + thumb / 2, ty + thumb / 2, thumb * 0.25, t);

    imgPaint = nvg.imagePattern(tx + ix, ty + iy, iw, ih, 0.0 / 180.0 * NVG.PI, images[i], a);
    nvg.beginPath();
    nvg.roundedRect(tx, ty, thumb, thumb, 5);
    nvg.fillPaint(imgPaint);
    nvg.fill();

    shadowPaint = nvg.boxGradient(tx - 1, ty, thumb + 2, thumb + 2, 5, 3, nvg.RGBA(0, 0, 0, 128), nvg.RGBA(0, 0, 0, 0));
    nvg.beginPath();
    nvg.rect(tx - 5, ty - 5, thumb + 10, thumb + 10);
    nvg.roundedRect(tx, ty, thumb, thumb, 6);
    nvg.pathWinding(NVG.Solidity.HOLE);
    nvg.fillPaint(shadowPaint);
    nvg.fill();

    nvg.beginPath();
    nvg.roundedRect(tx + 0.5, ty + 0.5, thumb - 1, thumb - 1, 4 - 0.5);
    nvg.strokeWidth(1.0);
    nvg.strokeColor(nvg.RGBA(255, 255, 255, 192));
    nvg.stroke();
  }
  nvg.restore();

  // Hide fades
  fadePaint = nvg.linearGradient(x, y, x, y + 6, nvg.RGBA(200, 200, 200, 255), nvg.RGBA(200, 200, 200, 0));
  nvg.beginPath();
  nvg.rect(x + 4, y, w - 8, 6);
  nvg.fillPaint(fadePaint);
  nvg.fill();

  fadePaint = nvg.linearGradient(x, y + h, x, y + h - 6, nvg.RGBA(200, 200, 200, 255), nvg.RGBA(200, 200, 200, 0));
  nvg.beginPath();
  nvg.rect(x + 4, y + h - 6, w - 8, 6);
  nvg.fillPaint(fadePaint);
  nvg.fill();

  // Scroll bar
  shadowPaint = nvg.boxGradient(x + w - 12 + 1, y + 4 + 1, 8, h - 8, 3, 4, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 92));
  nvg.beginPath();
  nvg.roundedRect(x + w - 12, y + 4, 8, h - 8, 3);
  nvg.fillPaint(shadowPaint);
  // nvg.fillColor(nvg.RGBA(255,0,0,128));
  nvg.fill();

  scrollh = (h / stackh) * (h - 8);
  shadowPaint = nvg.boxGradient(x + w - 12 - 1, y + 4 + (h - 8 - scrollh) * u - 1, 8, scrollh, 3, 4, nvg.RGBA(220, 220, 220, 255), nvg.RGBA(128, 128, 128, 255));
  nvg.beginPath();
  nvg.roundedRect(x + w - 12 + 1, y + 4 + 1 + (h - 8 - scrollh) * u, 8 - 2, scrollh - 2, 2);
  nvg.fillPaint(shadowPaint);
  // nvg.fillColor(nvgRGBA(0,0,0,128));
  nvg.fill();

  nvg.restore();
}

// void drawColorwheel(NVGcontext* nvg, float x, float y, float w, float h, float t)
export function drawColorwheel(nvg: NVG.Context, x: number, y: number, w: number, h: number, t: number): void {
  let r0, r1, ax, ay, bx, by, cx, cy, aeps, r;
  let hue = Math.sin(t * 0.12);
  let paint: NVG.Paint;

  nvg.save();

  /* nvg.beginPath();
  nvg.rect(x,y,w,h);
  nvg.fillColor(nvg.RGBA(255,0,0,128));
  nvg.fill();*/

  cx = x + w * 0.5;
  cy = y + h * 0.5;
  r1 = (w < h ? w : h) * 0.5 - 5.0;
  r0 = r1 - 20.0;
  aeps = 0.5 / r1;  // half a pixel arc length in radians (2pi cancels out).

  for (let i = 0; i < 6; i++) {
    const a0 = i / 6.0 * NVG.PI * 2.0 - aeps;
    const a1 = (i + 1.0) / 6.0 * NVG.PI * 2.0 + aeps;
    nvg.beginPath();
    nvg.arc(cx, cy, r0, a0, a1, NVG.Winding.CW);
    nvg.arc(cx, cy, r1, a1, a0, NVG.Winding.CCW);
    nvg.closePath();
    ax = cx + Math.cos(a0) * (r0 + r1) * 0.5;
    ay = cy + Math.sin(a0) * (r0 + r1) * 0.5;
    bx = cx + Math.cos(a1) * (r0 + r1) * 0.5;
    by = cy + Math.sin(a1) * (r0 + r1) * 0.5;
    paint = nvg.linearGradient(ax, ay, bx, by, nvg.HSLA(a0 / (NVG.PI * 2), 1.0, 0.55, 255), nvg.HSLA(a1 / (NVG.PI * 2), 1.0, 0.55, 255));
    nvg.fillPaint(paint);
    nvg.fill();
  }

  nvg.beginPath();
  nvg.circle(cx, cy, r0 - 0.5);
  nvg.circle(cx, cy, r1 + 0.5);
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 64));
  nvg.strokeWidth(1.0);
  nvg.stroke();

  // Selector
  nvg.save();
  nvg.translate(cx, cy);
  nvg.rotate(hue * NVG.PI * 2);

  // Marker on
  nvg.strokeWidth(2.0);
  nvg.beginPath();
  nvg.rect(r0 - 1, -3, r1 - r0 + 2, 6);
  nvg.strokeColor(nvg.RGBA(255, 255, 255, 192));
  nvg.stroke();

  paint = nvg.boxGradient(r0 - 3, -5, r1 - r0 + 6, 10, 2, 4, nvg.RGBA(0, 0, 0, 128), nvg.RGBA(0, 0, 0, 0));
  nvg.beginPath();
  nvg.rect(r0 - 2 - 10, -4 - 10, r1 - r0 + 4 + 20, 8 + 20);
  nvg.rect(r0 - 2, -4, r1 - r0 + 4, 8);
  nvg.pathWinding(NVG.Solidity.HOLE);
  nvg.fillPaint(paint);
  nvg.fill();

  // Center triangle
  r = r0 - 6;
  ax = Math.cos(120.0 / 180.0 * NVG.PI) * r;
  ay = Math.sin(120.0 / 180.0 * NVG.PI) * r;
  bx = Math.cos(-120.0 / 180.0 * NVG.PI) * r;
  by = Math.sin(-120.0 / 180.0 * NVG.PI) * r;
  nvg.beginPath();
  nvg.moveTo(r, 0);
  nvg.lineTo(ax, ay);
  nvg.lineTo(bx, by);
  nvg.closePath();
  paint = nvg.linearGradient(r, 0, ax, ay, nvg.HSLA(hue, 1.0, 0.5, 255), nvg.RGBA(255, 255, 255, 255));
  nvg.fillPaint(paint);
  nvg.fill();
  paint = nvg.linearGradient((r + ax) * 0.5, (0 + ay) * 0.5, bx, by, nvg.RGBA(0, 0, 0, 0), nvg.RGBA(0, 0, 0, 255));
  nvg.fillPaint(paint);
  nvg.fill();
  nvg.strokeColor(nvg.RGBA(0, 0, 0, 64));
  nvg.stroke();

  // Select circle on triangle
  ax = Math.cos(120.0 / 180.0 * NVG.PI) * r * 0.3;
  ay = Math.sin(120.0 / 180.0 * NVG.PI) * r * 0.4;
  nvg.strokeWidth(2.0);
  nvg.beginPath();
  nvg.circle(ax, ay, 5);
  nvg.strokeColor(nvg.RGBA(255, 255, 255, 192));
  nvg.stroke();

  paint = nvg.radialGradient(ax, ay, 7, 9, nvg.RGBA(0, 0, 0, 64), nvg.RGBA(0, 0, 0, 0));
  nvg.beginPath();
  nvg.rect(ax - 20, ay - 20, 40, 40);
  nvg.circle(ax, ay, 7);
  nvg.pathWinding(NVG.Solidity.HOLE);
  nvg.fillPaint(paint);
  nvg.fill();

  nvg.restore();

  nvg.restore();
}

// void drawLines(NVGcontext* nvg, float x, float y, float w, float h, float t)
function drawLines(nvg: NVG.Context, x: number, y: number, w: number, h: number, t: number): void {
  const pad = 5.0, s = w / 9.0 - pad * 2;
  const pts: number[] = [];
  const joins = [ NVG.LineCap.MITER, NVG.LineCap.ROUND, NVG.LineCap.BEVEL ];
  const caps = [ NVG.LineCap.BUTT, NVG.LineCap.ROUND, NVG.LineCap.NVG_SQUARE ];

  nvg.save();
  pts[0] = -s * 0.25 + Math.cos(t * 0.3) * s * 0.5;
  pts[1] = Math.sin(t * 0.3) * s * 0.5;
  pts[2] = -s * 0.25;
  pts[3] = 0;
  pts[4] = s * 0.25;
  pts[5] = 0;
  pts[6] = s * 0.25 + Math.cos(-t * 0.3) * s * 0.5;
  pts[7] = Math.sin(-t * 0.3) * s * 0.5;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const fx = x + s * 0.5 + (i * 3 + j) / 9.0 * w + pad;
      const fy = y - s * 0.5 + pad;

      nvg.lineCap(caps[i] as any);
      nvg.lineJoin(joins[j] as any);

      nvg.strokeWidth(s * 0.3);
      nvg.strokeColor(nvg.RGBA(0, 0, 0, 160));
      nvg.beginPath();
      nvg.moveTo(fx + pts[0], fy + pts[1]);
      nvg.lineTo(fx + pts[2], fy + pts[3]);
      nvg.lineTo(fx + pts[4], fy + pts[5]);
      nvg.lineTo(fx + pts[6], fy + pts[7]);
      nvg.stroke();

      nvg.lineCap(NVG.LineCap.BUTT);
      nvg.lineJoin(NVG.LineCap.BEVEL);

      nvg.strokeWidth(1.0);
      nvg.strokeColor(nvg.RGBA(0, 192, 255, 255));
      nvg.beginPath();
      nvg.moveTo(fx + pts[0], fy + pts[1]);
      nvg.lineTo(fx + pts[2], fy + pts[3]);
      nvg.lineTo(fx + pts[4], fy + pts[5]);
      nvg.lineTo(fx + pts[6], fy + pts[7]);
      nvg.stroke();
    }
  }


  nvg.restore();
}

// int loadDemoData(NVGcontext* nvg, DemoData* data)
export async function loadDemoData(nvg: NVG.Context, data: DemoData): Promise<number> {
  if (nvg === null)
    return -1;

  const loadArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
    const response: Response = await fetch(url);
    return await response.arrayBuffer();
  };

  for (let i = 0; i < 12; i++) {
    const file = `../nanovg/example/images/image${i + 1}.jpg`;
    // data.images[i] = nvg.createImage(file, 0);
    data.images[i] = nvg.createImageMem(0, new Uint8Array(await loadArrayBuffer(file)));
    if (data.images[i] === 0) {
      console.log(`Could not load ${file}.`);
      return -1;
    }
  }

  // data.fontIcons = nvg.createFont("icons", "../example/entypo.ttf");
  data.fontIcons = nvg.createFontMem("icons", new Uint8Array(await loadArrayBuffer("../nanovg/example/entypo.ttf")));
  if (data.fontIcons === -1) {
    console.log("Could not add font icons.\n");
    return -1;
  }
  // data.fontNormal = nvg.createFont("sans", "../example/Roboto-Regular.ttf");
  data.fontNormal = nvg.createFontMem("sans", new Uint8Array(await loadArrayBuffer("../nanovg/example/Roboto-Regular.ttf")));
  if (data.fontNormal === -1) {
    console.log("Could not add font italic.\n");
    return -1;
  }
  // data.fontBold = nvg.createFont("sans-bold", "../example/Roboto-Bold.ttf");
  data.fontBold = nvg.createFontMem("sans-bold", new Uint8Array(await loadArrayBuffer("../nanovg/example/Roboto-Bold.ttf")));
  if (data.fontBold === -1) {
    console.log("Could not add font bold.\n");
    return -1;
  }
  // data.fontEmoji = nvg.createFont("emoji", "../example/NotoEmoji-Regular.ttf");
  data.fontEmoji = nvg.createFontMem("emoji", new Uint8Array(await loadArrayBuffer("../nanovg/example/NotoEmoji-Regular.ttf")));
  if (data.fontEmoji === -1) {
    console.log("Could not add font emoji.\n");
    return -1;
  }
  nvg.addFallbackFontId(data.fontNormal, data.fontEmoji);
  nvg.addFallbackFontId(data.fontBold, data.fontEmoji);

  return 0;
}

// void freeDemoData(NVGcontext* nvg, DemoData* data)
export async function freeDemoData(nvg: NVG.Context, data: DemoData): Promise<void> {
  if (nvg === null)
    return;

  for (let i = 0; i < 12; i++)
    nvg.deleteImage(data.images[i]);
}

// void drawParagraph(NVGcontext* nvg, float x, float y, float width, float height, float mx, float my)
const _rows = init_array(3, () => new NVG.TextRow());
const _glyphs = init_array(100, () => new NVG.GlyphPosition());
function drawParagraph(nvg: NVG.Context, x: number, y: number, width: number, height: number, mx: number, my: number): void {
  const rows: NVG.TextRow[] = _rows;
  const glyphs: NVG.GlyphPosition[] = _glyphs;
  const text: string = "This is longer chunk of text.\n  \n  Would have used lorem ipsum but she    was busy jumping over the lazy dog with the fox and all the men who came to the aid of the party.";
  let start: string;
  // let end: number;
  let nrows: number, nglyphs: number, lnum: number = 0;
  const lineh: [number] = [0];
  let caretx: number, px: number;
  const bounds: Float32Array = new Float32Array(4);
  let a: number;
  let gx: number = 0, gy: number = 0;
  let gutter: number = 0;

  nvg.save();

  nvg.fontSize(18.0);
  nvg.fontFace("sans");
  nvg.textAlign(NVG.Align.LEFT | NVG.Align.TOP);
  nvg.textMetrics(null, null, lineh);

  // The text break API can be used to fill a large buffer of rows,
  // or to iterate over the text just few lines (or just one) at a time.
  // The "next" variable of the last returned item tells where to continue.
  start = text;
  // end = text.length;
  while ((nrows = nvg.textBreakLines(start, null, width, rows/*, 3*/))) {
    for (let i = 0; i < nrows; i++) {
      const row: NVG.TextRow = rows[i];
      const hit = mx > x && mx < (x + width) && my >= y && my < (y + lineh[0]);

      nvg.beginPath();
      nvg.fillColor(nvg.RGBA(255, 255, 255, hit ? 64 : 16));
      nvg.rect(x, y, row.width, lineh[0]);
      nvg.fill();

      nvg.fillColor(nvg.RGBA(255, 255, 255, 255));
      nvg.text(x, y, start.substring(row.start, row.end), null);

      if (hit) {
        caretx = (mx < x + row.width / 2) ? x : x + row.width;
        px = x;
        nglyphs = nvg.textGlyphPositions(x, y, start.substring(row.start, row.end), null, glyphs/*, 100*/);
        for (let j = 0; j < nglyphs; j++) {
          const x0 = glyphs[j].x;
          const x1 = (j + 1 < nglyphs) ? glyphs[j + 1].x : x + row.width;
          const gx = x0 * 0.3 + x1 * 0.7;
          if (mx >= px && mx < gx)
            caretx = glyphs[j].x;
          px = gx;
        }
        nvg.beginPath();
        nvg.fillColor(nvg.RGBA(255, 192, 0, 255));
        nvg.rect(caretx, y, 1, lineh[0]);
        nvg.fill();

        gutter = lnum + 1;
        gx = x - 10;
        gy = y + lineh[0] / 2;
      }
      lnum++;
      y += lineh[0];
    }
    // Keep going...
    start = start.substring(rows[nrows - 1].next);
  }

  if (gutter) {
    const txt = `${gutter}`;
    nvg.fontSize(13.0);
    nvg.textAlign(NVG.Align.RIGHT | NVG.Align.MIDDLE);

    nvg.textBounds(gx, gy, txt, null, bounds);

    nvg.beginPath();
    nvg.fillColor(nvg.RGBA(255, 192, 0, 255));
    nvg.roundedRect(Math.floor(bounds[0]) - 4, Math.floor(bounds[1]) - 2, Math.floor(bounds[2] - bounds[0]) + 8, Math.floor(bounds[3] - bounds[1]) + 4, (Math.floor(bounds[3] - bounds[1]) + 4) / 2 - 1);
    nvg.fill();

    nvg.fillColor(nvg.RGBA(32, 32, 32, 255));
    nvg.text(gx, gy, txt, null);
  }

  y += 20.0;

  nvg.fontSize(13.0);
  nvg.textAlign(NVG.Align.LEFT | NVG.Align.TOP);
  nvg.textLineHeight(1.2);

  nvg.textBoxBounds(x, y, 150, "Hover your mouse over the text to see calculated caret position.", null, bounds);

  // Fade the tooltip out when close to it.
  gx = Math.abs((mx - (bounds[0] + bounds[2]) * 0.5) / (bounds[0] - bounds[2]));
  gy = Math.abs((my - (bounds[1] + bounds[3]) * 0.5) / (bounds[1] - bounds[3]));
  a = maxf(gx, gy) - 0.5;
  a = clampf(a, 0, 1);
  nvg.globalAlpha(a);

  nvg.beginPath();
  nvg.fillColor(nvg.RGBA(220, 220, 220, 255));
  nvg.roundedRect(bounds[0] - 2, bounds[1] - 2, Math.floor(bounds[2] - bounds[0]) + 4, Math.floor(bounds[3] - bounds[1]) + 4, 3);
  px = Math.floor((bounds[2] + bounds[0]) / 2);
  nvg.moveTo(px, bounds[1] - 10);
  nvg.lineTo(px + 7, bounds[1] + 1);
  nvg.lineTo(px - 7, bounds[1] + 1);
  nvg.fill();

  nvg.fillColor(nvg.RGBA(0, 0, 0, 220));
  nvg.textBox(x, y, 150, "Hover your mouse over the text to see calculated caret position.", null);

  nvg.restore();
}

// void drawWidths(NVGcontext* nvg, float x, float y, float width)
function drawWidths(nvg: NVG.Context, x: number, y: number, width: number): void {
  nvg.save();

  nvg.strokeColor(nvg.RGBA(0, 0, 0, 255));

  for (let i = 0; i < 20; i++) {
    const w = (i + 0.5) * 0.1;
    nvg.strokeWidth(w);
    nvg.beginPath();
    nvg.moveTo(x, y);
    nvg.lineTo(x + width, y + width * 0.3);
    nvg.stroke();
    y += 10;
  }

  nvg.restore();
}

// void drawCaps(NVGcontext* nvg, float x, float y, float width)
function drawCaps(nvg: NVG.Context, x: number, y: number, width: number): void {
  const caps = [NVG.LineCap.BUTT, NVG.LineCap.ROUND, NVG.LineCap.NVG_SQUARE];
  const lineWidth = 8.0;

  nvg.save();

  nvg.beginPath();
  nvg.rect(x - lineWidth / 2, y, width + lineWidth, 40);
  nvg.fillColor(nvg.RGBA(255, 255, 255, 32));
  nvg.fill();

  nvg.beginPath();
  nvg.rect(x, y, width, 40);
  nvg.fillColor(nvg.RGBA(255, 255, 255, 32));
  nvg.fill();

  nvg.strokeWidth(lineWidth);
  for (let i = 0; i < 3; i++) {
    nvg.lineCap(caps[i] as any);
    nvg.strokeColor(nvg.RGBA(0, 0, 0, 255));
    nvg.beginPath();
    nvg.moveTo(x, y + i * 10 + 5);
    nvg.lineTo(x + width, y + i * 10 + 5);
    nvg.stroke();
  }

  nvg.restore();
}

// void drawScissor(NVGcontext* nvg, float x, float y, float t)
function drawScissor(nvg: NVG.Context, x: number, y: number, t: number): void {
  nvg.save();

  // Draw first rect and set scissor to it's area.
  nvg.translate(x, y);
  nvg.rotate(nvg.degToRad(5));
  nvg.beginPath();
  nvg.rect(-20, -20, 60, 40);
  nvg.fillColor(nvg.RGBA(255, 0, 0, 255));
  nvg.fill();
  nvg.scissor(-20, -20, 60, 40);

  // Draw second rectangle with offset and rotation.
  nvg.translate(40, 0);
  nvg.rotate(t);

  // Draw the intended second rectangle without any scissoring.
  nvg.save();
  nvg.resetScissor();
  nvg.beginPath();
  nvg.rect(-20, -10, 60, 30);
  nvg.fillColor(nvg.RGBA(255, 128, 0, 64));
  nvg.fill();
  nvg.restore();

  // Draw second rectangle with combined scissoring.
  nvg.intersectScissor(-20, -10, 60, 30);
  nvg.beginPath();
  nvg.rect(-20, -10, 60, 30);
  nvg.fillColor(nvg.RGBA(255, 128, 0, 255));
  nvg.fill();

  nvg.restore();
}

// void renderDemo(NVGcontext* nvg, float mx, float my, float width, float height, float t, int blowup, DemoData* data)
export function renderDemo(nvg: NVG.Context, mx: number, my: number, width: number, height: number, t: number, blowup: boolean, data: DemoData): void {
  let x, y, popy;

  drawEyes(nvg, width - 250, 50, 150, 100, mx, my, t);
  drawParagraph(nvg, width - 450, 50, 150, 100, mx, my);
  drawGraph(nvg, 0, height / 2, width, height / 2, t);
  drawColorwheel(nvg, width - 300, height - 300, 250.0, 250.0, t);

  // Line joints
  drawLines(nvg, 120, height - 50, 600, 50, t);

  // Line caps
  drawWidths(nvg, 10, 50, 30);

  // Line caps
  drawCaps(nvg, 10, 300, 30);

  drawScissor(nvg, 50, height - 80, t);

  nvg.save();
  if (blowup) {
    nvg.rotate(Math.sin(t * 0.3) * 5.0 / 180.0 * NVG.PI);
    nvg.scale(2.0, 2.0);
  }

  // Widgets
  drawWindow(nvg, "Widgets `n Stuff", 50, 50, 300, 400);
  x = 60; y = 95;
  drawSearchBox(nvg, "Search", x, y, 280, 25);
  y += 40;
  drawDropDown(nvg, "Effects", x, y, 280, 28);
  popy = y + 14;
  y += 45;

  // Form
  drawLabel(nvg, "Login", x, y, 280, 20);
  y += 25;
  drawEditBox(nvg, "Email", x, y, 280, 28);
  y += 35;
  drawEditBox(nvg, "Password", x, y, 280, 28);
  y += 38;
  drawCheckBox(nvg, "Remember me", x, y, 140, 28);
  drawButton(nvg, ICON_LOGIN, "Sign in", x + 138, y, 140, 28, nvg.RGBA(0, 96, 128, 255));
  y += 45;

  // Slider
  drawLabel(nvg, "Diameter", x, y, 280, 20);
  y += 25;
  drawEditBoxNum(nvg, "123.00", "px", x + 180, y, 100, 28);
  drawSlider(nvg, 0.4, x, y, 170, 28);
  y += 55;

  drawButton(nvg, ICON_TRASH, "Delete", x, y, 160, 28, nvg.RGBA(128, 16, 8, 255));
  drawButton(nvg, 0, "Cancel", x + 170, y, 110, 28, nvg.RGBA(0, 0, 0, 0));

  // Thumbnails box
  drawThumbnails(nvg, 365, popy - 30, 160, 300, data.images, 12, t);

  nvg.restore();
}

// void saveScreenShot(int w, int h, int premult, const char* name)
export function saveScreenShot(gl: WebGLRenderingContext | null, name: string): void {
  if (gl && gl.canvas instanceof HTMLCanvasElement) {
    gl.canvas.toBlob((blob: Blob | null): void => {
      const a = document.createElement("a");  
      a.href = URL.createObjectURL(blob);
      a.download = name || "untitled.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
