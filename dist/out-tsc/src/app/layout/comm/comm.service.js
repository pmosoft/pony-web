"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var CommService = /** @class */ (function () {
    function CommService(http, document) {
        this.http = http;
        this.document = document;
        this.comboAscDesc = [
            { name: 'ASC', value: 'ASC' },
            { name: 'DESC', value: 'DESC' }
        ];
    }
    CommService.prototype.downloadExcel = function (fd) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/comm/excel/downloadExcel', fd);
    };
    CommService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [http_1.HttpClient, Object])
    ], CommService);
    return CommService;
}());
exports.CommService = CommService;
//# sourceMappingURL=comm.service.js.map