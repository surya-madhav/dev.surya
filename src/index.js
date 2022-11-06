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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import { addCheckBox, addText } from "./inner-html.helper";
var fs = require('fs');
var puppeteer = require('puppeteer');
var args = process.argv;
var data = JSON.parse(args[3]);
// console.log(banner);
// let data: Data = {
//     "mode-of-transaction-cash": { type: "checkbox", value: true },
//     "first-name": { type: "text", value: "Rebbapragada" },
//     "middle-name": { type: "text", value: "Sai Surya" },
//     "last-name": { type: "text", value: "Madhav" },
//     "pin-code": { type: "text", value: "575030" },
//     "mobile-number": { type: "text", value: "9686397040" },
//     "mode-of-transaction-cheque": { type: "checkbox", value: false },
//     "mode-of-transaction-card": { type: "checkbox", value: true }
// }
function generatePdf(data, template) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, html, pdf;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    html = fs.readFileSync("./src/html-templates/".concat(template, ".html"), 'utf-8');
                    page.on('console', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                        var msgArgs, i, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    msgArgs = msg.args();
                                    i = 0;
                                    _c.label = 1;
                                case 1:
                                    if (!(i < msgArgs.length)) return [3 /*break*/, 4];
                                    _b = (_a = console).log;
                                    return [4 /*yield*/, msgArgs[i].jsonValue()];
                                case 2:
                                    _b.apply(_a, [_c.sent()]);
                                    _c.label = 3;
                                case 3:
                                    ++i;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, page.setContent(html, { waitUntil: 'domcontentloaded' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.emulateMediaType('print')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector("#page-container")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function (data) {
                            function addText(element, value) {
                                element.innerHTML = value;
                            }
                            function addCheckBox(element, value) {
                                element.style.opacity = value ? "100%" : "0";
                            }
                            var dom = document.querySelectorAll('.kaldata');
                            for (var index = 0; index < dom.length; index++) {
                                var element = dom[index];
                                if (document.querySelector("#" + element.id)) {
                                    var qs = document.querySelector("#" + element.id);
                                    var d = data[element.id];
                                    if (d.type == "text") {
                                        addText(qs, d.value);
                                    }
                                    else if (data[element.id].type == "checkbox") {
                                        addCheckBox(qs, d.value);
                                    }
                                }
                            }
                        }, data)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.pdf({
                            path: 'result.pdf',
                            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                            printBackground: true,
                            format: 'A4'
                        })];
                case 7:
                    pdf = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent();
                    // return pdf;
                    return [2 /*return*/, "Generated PDF"];
            }
        });
    });
}
generatePdf(data, "form-60").then(function (res) { console.log(res), function (err) { console.error(err); }; });
