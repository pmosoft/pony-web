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
var tab_info_1 = require("./tab-info");
var platform_browser_1 = require("@angular/platform-browser");
var comm_1 = require("../../comm/comm");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var TabInfoService = /** @class */ (function () {
    function TabInfoService(http, document) {
        this.http = http;
        this.document = document;
        this.comm = new comm_1.Comm();
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.comboAscDesc = [
            { name: 'ASC', value: 'ASC' },
            { name: 'DESC', value: 'DESC' }
        ];
    }
    /********************************************
     * Http
     ********************************************/
    TabInfoService.prototype.selectMetaTabInfoList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectMetaTabInfoList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectCmpTabInfoList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectCmpTabInfoList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.saveCmpTabInfoList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/saveCmpTabInfoList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.deleteTabInfo = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/deleteTabInfo', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectTabInfoList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectTabInfoList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectTabList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectTabList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectColList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectColList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectCreateScript = function (tabInfoOutVoList) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectCreateScript', tabInfoOutVoList, httpOptions);
    };
    TabInfoService.prototype.selectTabQryList = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectTabQryList', tabInfo, httpOptions);
    };
    TabInfoService.prototype.selectSelectScript = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/selectSelectScript', tabInfo, httpOptions);
    };
    TabInfoService.prototype.downloadInsStat = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/downloadInsStat', tabInfo, httpOptions);
    };
    TabInfoService.prototype.downloadExcel2 = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/downloadExcel', tabInfo, httpOptions);
    };
    TabInfoService.prototype.downloadExcel = function (fd) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/comm/excel/downloadExcel', fd);
    };
    TabInfoService.prototype.downloadCommaFile = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/downloadCommaFile', tabInfo, httpOptions);
    };
    TabInfoService.prototype.downloadBarFile = function (tabInfo) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/downloadBarFile', tabInfo, httpOptions);
    };
    TabInfoService.prototype.updateTabRowsUpdateScript = function (tabInfoOutVoList) {
        return this.http.post('http://' + this.document.location.hostname + ':9201/dams/table/updateTabRowsUpdateScript', tabInfoOutVoList, httpOptions);
    };
    /********************************************
     * Param
     ********************************************/
    TabInfoService.prototype.onGetLocalStorageTabInfo = function () {
        console.log("tabNm=" + localStorage.getItem('tabNm'));
        //console.log(this.comm.nullToSpace(localStorage.getItem('jdbcNm'  )));
        this.tabInfoInVo.jdbcNm = this.comm.nullToSpace(localStorage.getItem('jdbcNm'));
        this.tabInfoInVo.tabNm = this.comm.nullToSpace(localStorage.getItem('tabNm'));
        this.tabInfoInVo.tabHnm = this.comm.nullToSpace(localStorage.getItem('tabHnm'));
        //this.tabInfoInVo.tabRows  = parseInt(this.comm.nullToZero(localStorage.getItem('tabRows' )));
        this.tabInfoInVo.tabRegDt = this.comm.nullToSpace(localStorage.getItem('tabRegDt'));
        this.tabInfoInVo.tabUpdDt = this.comm.nullToSpace(localStorage.getItem('tabUpdDt'));
        return this.tabInfoInVo;
    };
    TabInfoService.prototype.onSetLocalStorageTabInfo = function (tabInfoInvo) {
        localStorage.setItem('jdbcNm', this.tabInfoInVo.jdbcNm);
        localStorage.setItem('tabNm', this.tabInfoInVo.tabNm);
        localStorage.setItem('tabHnm', this.tabInfoInVo.tabHnm);
        //localStorage.setItem('tabRows' , this.tabInfoInVo.tabRows.toString());
        localStorage.setItem('tabRegDt', this.tabInfoInVo.tabRegDt);
        localStorage.setItem('tabUpdDt', this.tabInfoInVo.tabUpdDt);
    };
    TabInfoService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [http_1.HttpClient, Object])
    ], TabInfoService);
    return TabInfoService;
}());
exports.TabInfoService = TabInfoService;
//# sourceMappingURL=tab-info.service.js.map