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
    // //static float maxf(float a, float b) { return a > b ? a : b; }
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
        nvg.fontSize(15.0);
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
        nvg.fontSize(17.0);
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
        nvg.fontSize(17.0);
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
        nvg.fontSize(15.0);
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
        nvg.fontSize(17.0);
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
        nvg.fontSize(15.0);
        nvg.fontFace("sans");
        nvg.fillColor(nvg.RGBA(255, 255, 255, 64));
        nvg.textAlign(NVG.Align.RIGHT | NVG.Align.MIDDLE);
        nvg.text(x + w - h * 0.3, y + h * 0.5, units, null);
        nvg.fontSize(17.0);
        nvg.fontFace("sans");
        nvg.fillColor(nvg.RGBA(255, 255, 255, 128));
        nvg.textAlign(NVG.Align.RIGHT | NVG.Align.MIDDLE);
        nvg.text(x + w - uw - h * 0.5, y + h * 0.5, text, null);
    }
    exports_1("drawEditBoxNum", drawEditBoxNum);
    // void drawCheckBox(NVGcontext* nvg, const char* text, float x, float y, float w, float h)
    function drawCheckBox(nvg, text, x, y, w, h) {
        let bg;
        nvg.fontSize(15.0);
        nvg.fontFace("sans");
        nvg.fillColor(nvg.RGBA(255, 255, 255, 160));
        nvg.textAlign(NVG.Align.LEFT | NVG.Align.MIDDLE);
        nvg.text(x + 28, y + h * 0.5, text, null);
        bg = nvg.boxGradient(x + 1, y + Math.floor(h * 0.5) - 9 + 1, 18, 18, 3, 3, nvg.RGBA(0, 0, 0, 32), nvg.RGBA(0, 0, 0, 92));
        nvg.beginPath();
        nvg.roundedRect(x + 1, y + Math.floor(h * 0.5) - 9, 18, 18, 3);
        nvg.fillPaint(bg);
        nvg.fill();
        nvg.fontSize(33);
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
        nvg.fontSize(17.0);
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
        nvg.fontSize(17.0);
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
                data.images[i] = nvg.createImageMem(NVG.ImageFlags.NONE, new Uint8Array(yield loadArrayBuffer(file)));
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
        const hoverText = "Hover your mouse over the text to see calculated caret position.";
        let gx = 0, gy = 0;
        let gutter = 0;
        const boxText = "Testing\nsome multiline\ntext.";
        nvg.save();
        nvg.fontSize(15.0);
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
                nvg.rect(x + row.minx, y, row.maxx - row.minx, lineh[0]);
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
            nvg.fontSize(12.0);
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
        nvg.fontSize(11.0);
        nvg.textAlign(NVG.Align.LEFT | NVG.Align.TOP);
        nvg.textLineHeight(1.2);
        nvg.textBoxBounds(x, y, 150, hoverText, null, bounds);
        // Fade the tooltip out when close to it.
        gx = clampf(mx, bounds[0], bounds[2]) - mx;
        gy = clampf(my, bounds[1], bounds[3]) - my;
        a = Math.sqrt(gx * gx + gy * gy) / 30.0;
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
        nvg.textBox(x, y, 150, hoverText, null);
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
                if (blob === null)
                    return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUNULGlCQUFpQjtBQUNqQixpQkFBaUI7Ozs7Ozs7Ozs7Ozs7O0lBS2pCLFNBQVMsVUFBVSxDQUFJLENBQVMsRUFBRSxDQUFtQixFQUFFLElBQVMsSUFBSSxLQUFLLENBQUksQ0FBQyxDQUFDO1FBQzdFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBMERELGtFQUFrRTtJQUNsRSxrRUFBa0U7SUFDbEUsNkRBQTZEO0lBQzdELCtGQUErRjtJQUMvRixTQUFTLE1BQU0sQ0FBQyxDQUFTLEVBQUUsRUFBVSxFQUFFLEVBQVUsSUFBWSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0Ryx3REFBd0Q7SUFDeEQsNEJBQTRCO0lBQzVCLFNBQVMsT0FBTyxDQUFDLEdBQWM7UUFDN0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNwRSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLElBQUk7SUFDSixlQUFlO0lBQ2YsMEJBQTBCO0lBQzFCLGdDQUFnQztJQUNoQyxrQ0FBa0M7SUFDbEMsbUNBQW1DO0lBQ25DLG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFDdEMsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQix3RUFBd0U7SUFDeEUsdUVBQXVFO0lBQ3ZFLHNFQUFzRTtJQUN0RSxvRUFBb0U7SUFDcEUsbUVBQW1FO0lBQ25FLHlCQUF5QjtJQUN6QixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLElBQUk7SUFDSixTQUFTLFFBQVEsQ0FBQyxFQUFVO1FBQzFCLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMEZBQTBGO0lBQzFGLFNBQWdCLFVBQVUsQ0FBQyxHQUFnQixFQUFFLEtBQWEsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3BHLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLFdBQXNCLENBQUM7UUFDM0IsSUFBSSxXQUFzQixDQUFDO1FBRTNCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLG9CQUFvQjtRQUVwQixTQUFTO1FBQ1QsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLHNDQUFzQztRQUN0QyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxjQUFjO1FBQ2QsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsSCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsU0FBUztRQUNULFdBQVcsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU3QyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7O0lBRUQsNEZBQTRGO0lBQzVGLFNBQWdCLGFBQWEsQ0FBQyxHQUFnQixFQUFFLElBQVksRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3RHLElBQUksRUFBYSxDQUFDO1FBQ2xCLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLE9BQU87UUFDUCxFQUFFLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9GLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYOzs7dUJBR2U7UUFFZixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVsRSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0MsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhELEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7O0lBRUQsMkZBQTJGO0lBQzNGLFNBQWdCLFlBQVksQ0FBQyxHQUFnQixFQUFFLElBQVksRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3JHLElBQUksRUFBYSxDQUFDO1FBQ2xCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV6QixFQUFFLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDcEUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFB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Q3RCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEY7UUFFRCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElB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LENBQVM7UUFDL0csSUFBSSxLQUFnQixFQUFFLEVBQWEsQ0FBQztRQUNwQyxNQUFNLEVBQUUsR0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFXLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0IsTUFBTSxFQUFFLEdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLEVBQUUsR0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sRUFBRSxHQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sRUFBRSxHQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNkLE1BQU0sRUFBRSxHQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDN0MsTUFBTSxLQUFLLEdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWpFLEVBQUUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsRUFBRSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekgsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ1gsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEI7UUFDRCxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNmLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ2YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN4RSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUNYLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDZixFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNmLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDeEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMs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QUFDLENBQUM7UUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25HLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFB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Q0FBQztRQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLFdBQVc7UUFDWCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTdCLFlBQVk7UUFDWixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6RCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsa0JBQWtCO1FBQ2xCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqSCxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLDRCQUE0QjtRQUM1QixFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2hELEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDaEQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUViLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMs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QyxFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sR0FBRyxHQUFnQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRVgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxRCxJQUFJLEdBQUcsRUFBRTtvQkFDUCxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFWCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUVWLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXRELHlDQUF5QztRQUMxQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0MsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9ILEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFeEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsU0FBUyxVQUFVLENBQUMsR0FBZ0IsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDdkUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNUO1FBRUQsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsU0FBUyxRQUFRLENBQUMsR0FBZ0IsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDckUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUV0QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFWCxHQUFHLENBQUMsV0FB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QUUsQ0FBQztRQUNSLFdBQVcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDUixZQUFZLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRCxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVSLFNBQVM7UUFDVCxTQUFTLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1IsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVIsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEYsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhFLGlCQUFpQjtRQUNqQixjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7O0lBRUQsbUVBQW1FO0lBQ25FLFNBQWdCLGNBQWMsQ0FBQyxFQUFnQyxFQUFFLElBQVk7UUFDM0UsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsRUFBRTtZQUNoRCxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQWlCLEVBQVEsRUFBRTtnQkFDM0MsSUFBSSxJQUFJLEtBQUssSUFBSTtvQkFBRSxPQUFPO2dCQUMxQixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLGNBQWMsQ0FBQztnQkFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDVixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7Ozs7O1lBeG9DRCxxQkFBcUI7WUFDckIsZUFBZTtZQUNmLFNBQVM7WUFFVCxvQkFBb0I7WUFDcEIsb0RBQW9EO1lBQ3BELG9CQUFvQjtZQUNwQixLQUFLO1lBQ0wsb0NBQW9DO1lBQ3BDLFdBQUEsTUFBYSxRQUFRO2dCQUFyQjtvQkFDRSxlQUFVLEdBQVcsQ0FBQyxDQUFDO29CQUN2QixhQUFRLEdBQVcsQ0FBQyxDQUFDO29CQUNyQixjQUFTLEdBQVcsQ0FBQyxDQUFDO29CQUN0QixjQUFTLEdBQVcsQ0FBQyxDQUFDO29CQUN0QixXQUFNLEdBQWEsRUFBRSxDQUFDO2dCQUN4QixDQUFDO2FBQUEsQ0FBQTs7WUFFRCxxREFBcUQ7WUFDckQsc0RBQXNEO1lBQ3RELHdIQUF3SDtZQUV4SCxvRUFBb0U7WUFFcEUscUJBQXFCO1lBQ3JCLElBQUk7WUFDSixTQUFTO1lBRVQsbUJBQW1CO1lBRW5CLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHNCQUFzQjtZQUN0QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHlCQUF5QjtZQUN6QixTQUFTO1lBQ1QsMEJBQTBCO1lBQzFCLHNCQUFzQjtZQUN0Qix5Q0FBeUM7WUFDekMsK0JBQStCO1lBRy9CLGtCQUFrQjtZQUNsQiw2QkFBNkI7WUFDN0IsOEJBQThCO1lBQzlCLHFCQUFxQjtZQUNyQixTQUFTO1lBRUgsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUN0QixrQkFBa0IsR0FBRyxNQUFNLENBQUM7WUFDNUIsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1lBQzVCLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDcEIsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUNwQixVQUFVLEdBQUcsTUFBTSxDQUFDO1lBNHpCMUIsdUdBQXVHO1lBQ2pHLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDL0MsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyJ9