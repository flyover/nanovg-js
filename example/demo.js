// demo.h
// #ifndef DEMO_H
// #define DEMO_H
System.register(["nanovg-js"], function (exports_1, context_1) {
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
        if (gl && gl.canvas instanceof HTMLCanvasElement) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULGlCQUFpQjtBQUNqQixpQkFBaUI7Ozs7Ozs7Ozs7Ozs7O0lBS2pCLFNBQVMsVUFBVSxDQUFJLENBQVMsRUFBRSxDQUFtQixFQUFFLElBQVMsSUFBSSxLQUFLLENBQUksQ0FBQyxDQUFDO1FBQzdFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBMERELGtFQUFrRTtJQUNsRSxnRUFBZ0U7SUFDaEUsU0FBUyxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVMsSUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSw2REFBNkQ7SUFDN0QsK0ZBQStGO0lBQy9GLFNBQVMsTUFBTSxDQUFDLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxJQUFZLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRHLHdEQUF3RDtJQUN4RCw0QkFBNEI7SUFDNUIsU0FBUyxPQUFPLENBQUMsR0FBYztRQUM3QixJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUss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QUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuRCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTdDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6QyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7SUFFRCw0RkFBNEY7SUFDNUYsU0FBZ0IsYUFBYSxDQUFDLEdBQWdCLEVBQUUsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDdEcsSUFBSSxFQUFhLENBQUM7UUFDbEIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0IsT0FBTztRQUNQLEVBQUUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVg7Ozt1QkFHZTtRQUVmLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWxFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdB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QUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekgsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENB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Q0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDN0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFeEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FB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QUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksS0FBZ0IsQ0FBQztRQUVyQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWDs7O3FCQUdhO1FBRWIsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqQixFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFFLHdEQUF3RDtRQUUxRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDakQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFF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Q0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxrQkFBa0I7UUFDbEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWCxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pILEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsNEJBQTRCO1FBQzVCLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDaEQsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoRCxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxH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QyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sR0FBRyxHQUFnQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFWCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTFELElBQUksR0FBRyxFQUFFO29CQUNQLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN2QixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvSCxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFD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