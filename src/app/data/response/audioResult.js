"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseResult_1 = require("./baseResult");
var AudioResult = (function (_super) {
    __extends(AudioResult, _super);
    function AudioResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AudioResult;
}(baseResult_1.BaseResult));
exports.AudioResult = AudioResult;
//# sourceMappingURL=audioResult.js.map