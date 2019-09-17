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
var JdbcInfoService = /** @class */ (function () {
    function JdbcInfoService(http, document) {
        this.http = http;
        this.document = document;
        this.heroesUrl = '/jdbcInfo/test3'; // URL to web api
    }
    JdbcInfoService.prototype.saveJdbcInfo = function (jdbcInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/jdbc/saveJdbcInfo', jdbcInfo, httpOptions);
    };
    JdbcInfoService.prototype.selectJdbcInfoList = function (jdbcInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/jdbc/selectJdbcInfoList', jdbcInfo, httpOptions);
    };
    JdbcInfoService.prototype.selectComboJdbcList = function (jdbcInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/jdbc/selectComboJdbcList', jdbcInfo, httpOptions);
    };
    JdbcInfoService.prototype.deleteJdbcInfo = function (jdbcInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/jdbc/deleteJdbcInfo', jdbcInfo, httpOptions);
    };
    JdbcInfoService.prototype.testJdbcInfo = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/testJdbcInfo', tabInfo, httpOptions);
    };
    JdbcInfoService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [http_1.HttpClient, Object])
    ], JdbcInfoService);
    return JdbcInfoService;
}());
exports.JdbcInfoService = JdbcInfoService;
//# sourceMappingURL=jdbc-info.service.js.map