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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_info_service_1 = require("../tab-info.service");
var tab_info_1 = require("../tab-info");
var jdbc_info_service_1 = require("../../jdbc/jdbc-info.service");
var jdbc_info_1 = require("../../jdbc/jdbc-info");
var router_1 = require("@angular/router");
var TabInfoExtComponent = /** @class */ (function () {
    function TabInfoExtComponent(tabInfoService, jdbcInfoService, router) {
        this.tabInfoService = tabInfoService;
        this.jdbcInfoService = jdbcInfoService;
        this.router = router;
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
    }
    TabInfoExtComponent.prototype.ngOnInit = function () {
        this.onSetComboJdbc();
    };
    TabInfoExtComponent.prototype.onSetComboJdbc = function () {
        var _this = this;
        this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
            //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //console.log(result.jdbcInfoOutVoList); //
                _this.comboJdbc = result.jdbcInfoOutVoList;
            }
        });
    };
    TabInfoExtComponent.prototype.onChangeComboJdbc = function (i) {
        //console.log("event.value=="+event.value);
        //console.log("event.value=="+event.selectedIndex);
        //console.log("event.value=="+event.options[event.selectedIndex]);
        //console.log("event.value=="+event.options[event.selectedIndex].owner);
        //var aa = event.options[event.selectedIndex];
        //console.log("event.value=="+aa.owner);
        //console.log("event.value=="+this.comboJdbc[0].usrId);
        //console.log(usrId);
        //console.log("aa".toUpperCase());
        if (i == 0)
            this.tabInfoInVo = new tab_info_1.TabInfo();
        else {
            this.tabInfoInVo.jdbcNm = this.comboJdbc[i].jdbcNm;
            this.tabInfoInVo.owner = this.comboJdbc[i].usrId;
        }
    };
    TabInfoExtComponent.prototype.onSelectMetaTabInfoList = function () {
        var _this = this;
        if (this.tabInfoInVo.jdbcNm == "") {
            alert("JDBC를 선택해 주십시요.");
            return;
        }
        this.tabInfoService.selectMetaTabInfoList(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoOutVoList = result.tabInfoOutVoList;
                console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabInfoExtComponent.prototype.onUploadMetaTabInfo = function () { };
    TabInfoExtComponent.prototype.onCompare = function () {
        var _this = this;
        this.tabInfoService.selectCmpTabInfoList(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabInfoExtComponent.prototype.onSave = function () {
        var _this = this;
        this.tabInfoService.saveCmpTabInfoList(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                _this.onCompare();
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabInfoExtComponent.prototype.onDelete = function () {
        var _this = this;
        this.tabInfoService.deleteTabInfo(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //console.log(result.tabInfoOutVoList);
                _this.onSelectTabInfoList();
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabInfoExtComponent.prototype.onSelectTabInfoList = function () {
        var _this = this;
        this.tabInfoService.selectTabInfoList(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabInfoExtComponent.prototype.onDownloadExcel = function () {
        // let data = JSON.stringify(this.codeOutVoList);
        // //console.log(data);
        // const fd = new FormData();
        // fd.append('fileNm', "tab-info-ext.xls");
        // fd.append('data', data);
        // this.codeService.downloadExcel(fd)
        // .subscribe(result => {
        //    if(!result.isSuccess) alert(result.errUsrMsg)
        //   else {
        //   }
        // });
    };
    TabInfoExtComponent = __decorate([
        core_1.Component({
            selector: 'app-tab-info-ext',
            templateUrl: './tab-info-ext.component.html',
            styleUrls: ['./tab-info-ext.component.scss']
        }),
        __metadata("design:paramtypes", [tab_info_service_1.TabInfoService,
            jdbc_info_service_1.JdbcInfoService,
            router_1.Router])
    ], TabInfoExtComponent);
    return TabInfoExtComponent;
}());
exports.TabInfoExtComponent = TabInfoExtComponent;
//# sourceMappingURL=tab-info-ext.component.js.map