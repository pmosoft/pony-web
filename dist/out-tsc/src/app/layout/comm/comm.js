"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comm = /** @class */ (function () {
    function Comm() {
    }
    Comm.prototype.nullToSpace = function (str) {
        if (str == null || str == 'null' || str == undefined || str == 'undefined')
            str = "";
        return str;
    };
    Comm.prototype.nullToZero = function (str) {
        if (str == null || str == 'null' || str == undefined || str == 'undefined')
            str = "0";
        return str;
    };
    return Comm;
}());
exports.Comm = Comm;
//# sourceMappingURL=comm.js.map