// demo.h
// #ifndef DEMO_H
// #define DEMO_H
System.register(["nanovg-js"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var NVG, DemoData, ICON_SEARCH, ICON_CIRCLED_CROSS, ICON_CHEVRON_RIGHT, ICON_CHECK, ICON_LOGIN, ICON_TRASH, _rows, _glyphs;
    var __moduleName = context_1 && context_1.id;
    function init_array(n, c, a = new Array(n)) {
        for (let i = 0; i < n; ++i) {
            a[i] = c(i);
        }
        return a;
    }
    // //static float minf(float a, float b) { return a < b ? a : b; }
    // static float maxf(float a, float b) { return a > b ? a : b; }
    function maxf(a, b) { return a > b ? a : b; }
    // //static float absf(float a) { return a >= 0.0 ? a : -a; }
    // static float clampf(float a, float mn, float mx) { return a < mn ? mn : (a > mx ? mx : a); }
    function clampf(a, mn, mx) { return a < mn ? mn : (a > mx ? mx : a); }
    // Returns 1 if col.rgba is 0.0,0.0,0.0,0.0, 0 otherwise
    // int isBlack(NVGcolor col)
    function isBlack(col) {
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
    function cpToUTF8(cp) {
        return String.fromCodePoint(cp);
    }
    // void drawWindow(NVGcontext* nvg, const char* title, float x, float y, float w, float h)
    function drawWindow(nvg, title, x, y, w, h) {
        const cornerRadius = 3.0;
        let shadowPaint;
        let headerPaint;
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
    exports_1("drawWindow", drawWindow);
    // void drawSearchBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawSearchBox(nvg, text, x, y, w, h) {
        let bg;
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
    exports_1("drawSearchBox", drawSearchBox);
    // void drawDropDown(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawDropDown(nvg, text, x, y, w, h) {
        let bg;
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
    exports_1("drawDropDown", drawDropDown);
    // void drawLabel(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawLabel(nvg, text, x, y, w, h) {
        nvg.fontSize(18.0);
        nvg.fontFace("sans");
        nvg.fillColor(nvg.RGBA(255, 255, 255, 128));
        nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
        nvg.text(x, y + h * 0.5, text, null);
    }
    exports_1("drawLabel", drawLabel);
    // void drawEditBoxBase(NVGcontext* nvg, float x, float y, float w, float h)
    function drawEditBoxBase(nvg, x, y, w, h) {
        let bg;
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
    exports_1("drawEditBoxBase", drawEditBoxBase);
    // void drawEditBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawEditBox(nvg, text, x, y, w, h) {
        drawEditBoxBase(nvg, x, y, w, h);
        nvg.fontSize(20.0);
        nvg.fontFace("sans");
        nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
        nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
        nvg.text(x + h * 0.3, y + h * 0.5, text, null);
    }
    exports_1("drawEditBox", drawEditBox);
    // void drawEditBoxNum(NVGcontext* nvg,
    //           const char* text, const char* units, float x, float y, float w, float h)
    function drawEditBoxNum(nvg, text, units, x, y, w, h) {
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
    exports_1("drawEditBoxNum", drawEditBoxNum);
    // void drawCheckBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawCheckBox(nvg, text, x, y, w, h) {
        let bg;
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
    exports_1("drawCheckBox", drawCheckBox);
    // void drawButton(NVGcontext* nvg, int preicon, const char* text, float x, float y, float w, float h, NVGcolor col)
    function drawButton(nvg, preicon, text, x, y, w, h, col) {
        let bg;
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
    exports_1("drawButton", drawButton);
    // void drawSlider(NVGcontext* nvg, float pos, float x, float y, float w, float h)
    function drawSlider(nvg, pos, x, y, w, h) {
        let bg, knob;
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
    exports_1("drawSlider", drawSlider);
    // void drawEyes(NVGcontext* nvg, float x, float y, float w, float h, float mx, float my, float t)
    function drawEyes(nvg, x, y, w, h, mx, my, t) {
        let gloss, bg;
        const ex = w * 0.23;
        const ey = h * 0.5;
        const lx = x + ex;
        const ly = y + ey;
        const rx = x + w - ex;
        const ry = y + ey;
        let dx, dy, d;
        const br = (ex < ey ? ex : ey) * 0.5;
        const blink = 1 - Math.pow(Math.sin(t * 0.5), 200) * 0.8;
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
            dx /= d;
            dy /= d;
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
            dx /= d;
            dy /= d;
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
    function drawGraph(nvg, x, y, w, h, t) {
        let bg;
        const samples = [];
        const sx = [], sy = [];
        const dx = w / 5.0;
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
    function drawSpinner(nvg, cx, cy, r, t) {
        const a0 = 0.0 + t * 6;
        const a1 = NVG.PI + t * 6;
        const r0 = r;
        const r1 = r * 0.75;
        let ax, ay, bx, by;
        let paint;
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
    exports_1("drawSpinner", drawSpinner);
    // void drawThumbnails(NVGcontext* nvg, float x, float y, float w, float h, const int* images, int nimages, float t)
    function drawThumbnails(nvg, x, y, w, h, images, nimages, t) {
        const cornerRadius = 3.0;
        let shadowPaint, imgPaint, fadePaint;
        let ix, iy, iw, ih;
        const thumb = 60.0;
        const arry = 30.5;
        let imgw = [0], imgh = [0];
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
            }
            else {
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
    exports_1("drawThumbnails", drawThumbnails);
    // void drawColorwheel(NVGcontext* nvg, float x, float y, float w, float h, float t)
    function drawColorwheel(nvg, x, y, w, h, t) {
        let r0, r1, ax, ay, bx, by, cx, cy, aeps, r;
        let hue = Math.sin(t * 0.12);
        let paint;
        nvg.save();
        /* nvg.beginPath();
        nvg.rect(x,y,w,h);
        nvg.fillColor(nvg.RGBA(255,0,0,128));
        nvg.fill();*/
        cx = x + w * 0.5;
        cy = y + h * 0.5;
        r1 = (w < h ? w : h) * 0.5 - 5.0;
        r0 = r1 - 20.0;
        aeps = 0.5 / r1; // half a pixel arc length in radians (2pi cancels out).
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
    exports_1("drawColorwheel", drawColorwheel);
    // void drawLines(NVGcontext* nvg, float x, float y, float w, float h, float t)
    function drawLines(nvg, x, y, w, h, t) {
        const pad = 5.0, s = w / 9.0 - pad * 2;
        const pts = [];
        const joins = [NVG.LineCap.MITER, NVG.LineCap.ROUND, NVG.LineCap.BEVEL];
        const caps = [NVG.LineCap.BUTT, NVG.LineCap.ROUND, NVG.LineCap.NVG_SQUARE];
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
                nvg.lineCap(caps[i]);
                nvg.lineJoin(joins[j]);
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
    function loadDemoData(nvg, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nvg === null)
                return -1;
            const loadArrayBuffer = (url) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url);
                return yield response.arrayBuffer();
            });
            for (let i = 0; i < 12; i++) {
                const file = `../nanovg/example/images/image${i + 1}.jpg`;
                // data.images[i] = nvg.createImage(file, 0);
                data.images[i] = nvg.createImageMem(0, new Uint8Array(yield loadArrayBuffer(file)));
                if (data.images[i] === 0) {
                    console.log(`Could not load ${file}.`);
                    return -1;
                }
            }
            // data.fontIcons = nvg.createFont("icons", "../example/entypo.ttf");
            data.fontIcons = nvg.createFontMem("icons", new Uint8Array(yield loadArrayBuffer("../nanovg/example/entypo.ttf")));
            if (data.fontIcons === -1) {
                console.log("Could not add font icons.\n");
                return -1;
            }
            // data.fontNormal = nvg.createFont("sans", "../example/Roboto-Regular.ttf");
            data.fontNormal = nvg.createFontMem("sans", new Uint8Array(yield loadArrayBuffer("../nanovg/example/Roboto-Regular.ttf")));
            if (data.fontNormal === -1) {
                console.log("Could not add font italic.\n");
                return -1;
            }
            // data.fontBold = nvg.createFont("sans-bold", "../example/Roboto-Bold.ttf");
            data.fontBold = nvg.createFontMem("sans-bold", new Uint8Array(yield loadArrayBuffer("../nanovg/example/Roboto-Bold.ttf")));
            if (data.fontBold === -1) {
                console.log("Could not add font bold.\n");
                return -1;
            }
            // data.fontEmoji = nvg.createFont("emoji", "../example/NotoEmoji-Regular.ttf");
            data.fontEmoji = nvg.createFontMem("emoji", new Uint8Array(yield loadArrayBuffer("../nanovg/example/NotoEmoji-Regular.ttf")));
            if (data.fontEmoji === -1) {
                console.log("Could not add font emoji.\n");
                return -1;
            }
            nvg.addFallbackFontId(data.fontNormal, data.fontEmoji);
            nvg.addFallbackFontId(data.fontBold, data.fontEmoji);
            return 0;
        });
    }
    exports_1("loadDemoData", loadDemoData);
    // void freeDemoData(NVGcontext* nvg, DemoData* data)
    function freeDemoData(nvg, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nvg === null)
                return;
            for (let i = 0; i < 12; i++)
                nvg.deleteImage(data.images[i]);
        });
    }
    exports_1("freeDemoData", freeDemoData);
    function drawParagraph(nvg, x, y, width, height, mx, my) {
        const rows = _rows;
        const glyphs = _glyphs;
        const text = "This is longer chunk of text.\n  \n  Would have used lorem ipsum but she    was busy jumping over the lazy dog with the fox and all the men who came to the aid of the party.";
        let start;
        // let end: number;
        let nrows, nglyphs, lnum = 0;
        const lineh = [0];
        let caretx, px;
        const bounds = new Float32Array(4);
        let a;
        let gx = 0, gy = 0;
        let gutter = 0;
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
        while ((nrows = nvg.textBreakLines(start, null, width, rows /*, 3*/))) {
            for (let i = 0; i < nrows; i++) {
                const row = rows[i];
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
                    nglyphs = nvg.textGlyphPositions(x, y, start.substring(row.start, row.end), null, glyphs /*, 100*/);
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
    function drawWidths(nvg, x, y, width) {
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
    function drawCaps(nvg, x, y, width) {
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
            nvg.lineCap(caps[i]);
            nvg.strokeColor(nvg.RGBA(0, 0, 0, 255));
            nvg.beginPath();
            nvg.moveTo(x, y + i * 10 + 5);
            nvg.lineTo(x + width, y + i * 10 + 5);
            nvg.stroke();
        }
        nvg.restore();
    }
    // void drawScissor(NVGcontext* nvg, float x, float y, float t)
    function drawScissor(nvg, x, y, t) {
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
    function renderDemo(nvg, mx, my, width, height, t, blowup, data) {
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
        x = 60;
        y = 95;
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
    exports_1("renderDemo", renderDemo);
    // void saveScreenShot(int w, int h, int premult, const char* name)
    function saveScreenShot(gl, name) {
        if (gl) {
            gl.canvas.toBlob((blob) => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = name || "untitled.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    }
    exports_1("saveScreenShot", saveScreenShot);
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
            // struct DemoData {
            //   int fontNormal, fontBold, fontIcons, fontEmoji;
            //   int images[12];
            // };
            // typedef struct DemoData DemoData;
            DemoData = class DemoData {
                constructor() {
                    this.fontNormal = 0;
                    this.fontBold = 0;
                    this.fontIcons = 0;
                    this.fontEmoji = 0;
                    this.images = [];
                }
            };
            exports_1("DemoData", DemoData);
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
            ICON_SEARCH = 0x1F50D;
            ICON_CIRCLED_CROSS = 0x2716;
            ICON_CHEVRON_RIGHT = 0xE75E;
            ICON_CHECK = 0x2713;
            ICON_LOGIN = 0xE740;
            ICON_TRASH = 0xE729;
            // void drawParagraph(NVGcontext* nvg, float x, float y, float width, float height, float mx, float my)
            _rows = init_array(3, () => new NVG.TextRow());
            _glyphs = init_array(100, () => new NVG.GlyphPosition());
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULGlCQUFpQjtBQUNqQixpQkFBaUI7Ozs7Ozs7Ozs7Ozs7SUFLakIsU0FBUyxVQUFVLENBQUksQ0FBUyxFQUFFLENBQW1CLEVBQUUsSUFBUyxJQUFJLEtBQUssQ0FBSSxDQUFDLENBQUM7UUFDN0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUEwREQsa0VBQWtFO0lBQ2xFLGdFQUFnRTtJQUNoRSxTQUFTLElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBUyxJQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLDZEQUE2RDtJQUM3RCwrRkFBK0Y7SUFDL0YsU0FBUyxNQUFNLENBQUMsQ0FBUyxFQUFFLEVBQVUsRUFBRSxFQUFVLElBQVksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEcsd0RBQXdEO0lBQ3hELDRCQUE0QjtJQUM1QixTQUFTLE9BQU8sQ0FBQyxHQUFjO1FBQzdCLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxH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QUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQixDQUFDOztJQUVELDRGQUE0RjtJQUM1RixTQUFnQixhQUFhLENBQUMsR0FBZ0IsRUFBRSxJQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUN0RyxJQUFJLEVBQWEsQ0FBQztRQUNsQixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixPQUFPO1FBQ1AsRUFBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWDs7O3VCQUdlO1FBRWYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbEUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRSxDQUFDOztJQUVELDJGQUEyRjtJQUMzRixTQUFnQixZQUFZLENBQUMsR0FBZ0IsRUFBRSxJQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNyRyxJQUFJLEVBQWEsQ0FBQztRQUNsQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7UUFFekIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RCxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFL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LENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7O0lBRUQsMkZBQTJGO0lBQzNGLFNBQWdCLFlBQVksQ0FBQyxHQUFnQixFQUFFLElBQVksRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3JHLElBQUksRUFBYSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU1QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6SCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7SUFFRCxvSEFBb0g7SUFDcEgsU0FBZ0IsVUFBVSxDQUFDLEdBQWdCLEVBQUUsT0FBZSxFQUFFLElBQVksRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsR0FBYztRQUNwSSxJQUFJLEVBQWEsQ0FBQztRQUNsQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjtRQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QixFQUFFLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekQsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDaEI7UUFFRCxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BGO1FBRUQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDOztJQUVELGtGQUFrRjtJQUNsRixTQUFnQixVQUFVLENBQUMsR0FBZ0IsRUFBRSxHQUFXLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNsRyxJQUFJLEVBQWEsRUFBRSxJQUFlLENBQUM7UUFDbkMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLG9CQUFvQjtRQUVwQixPQUFPO1FBQ1AsRUFBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvRixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsY0FBYztRQUNkLEVBQUUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0SCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsSUFB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QUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM3RSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUV4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ2xDO1FBRUQsbUJBQW1CO1FBQ25CLEVBQUUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLGFBQWE7UUFDYixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixtQkFBbUI7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixFQUFFLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ1o7UUFFRCxHQUFHLENB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QUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixXQUFXO1FBQ1gsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3QixZQUFZO1FBQ1osR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLGtCQUFrQjtRQUNsQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNYLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixLQUFLLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxFQUFF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RyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9ILEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMs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QUM7UUFFN0MsWUFBWTtRQUNaLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1QixZQUFZO1FBQ1osUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTNCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsSUFBSSxNQUFNLEVBQUU7WUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsVUFBVTtRQUNWLFVBQVUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1IsWUFBWSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZCxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVIsT0FBTztRQUNQLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxF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