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
var ColListComponent = /** @class */ (function () {
    function ColListComponent(tabInfoService, jdbcInfoService, router) {
        this.tabInfoService = tabInfoService;
        this.jdbcInfoService = jdbcInfoService;
        this.router = router;
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
        this.comboOrderBy = [
            { name: '선택(정렬)', value: 'JDBC_NM' },
            { name: '컬럼명', value: 'COL_NM' },
            { name: '컬럼한글명', value: 'COL_HNM' },
            { name: '타입', value: 'DATA_TYPE_DESC' },
            { name: 'Rows', value: 'TAB_ROWS' },
            { name: '테이블명', value: 'TAB_NM' }
        ];
        this.comboAscDesc = [
            { name: 'ASC', value: 'ASC' },
            { name: 'DESC', value: 'DESC' }
        ];
    }
    ColListComponent.prototype.ngOnInit = function () {
        this.onSetComboJdbc();
    };
    ColListComponent.prototype.onSetComboJdbc = function () {
        var _this = this;
        this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
            //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //console.log(result.jdbcInfoOutVoList);
                _this.comboJdbc = result.jdbcInfoOutVoList;
            }
        });
    };
    ColListComponent.prototype.onChangeComboJdbc = function (i) {
        //console.log("event.value=="+event.value);
        //console.log("event.value=="+event.selectedIndex);
        //console.log("event.value=="+event.options[event.selectedIndex]);
        //console.log("event.value=="+event.options[event.selectedIndex].owner);
        //var aa = event.options[event.selectedIndex];
        //console.log("event.value=="+aa.owner);
        //console.log("event.value=="+this.comboJdbc[0].usrId);
        //console.log(usrId);
        //console.log("aa".toUpperCase());
        if (i == 0) {
            this.tabInfoInVo.jdbcNm = "";
            this.tabInfoInVo.owner = "";
        }
        else {
            this.tabInfoInVo.jdbcNm = this.comboJdbc[i].jdbcNm;
            this.tabInfoInVo.owner = this.comboJdbc[i].usrId;
        }
        this.onSelectColList();
    };
    ColListComponent.prototype.onChangeComboOrderBy = function (i) {
        this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
        this.onSelectColList();
    };
    ColListComponent.prototype.onChangeComboAscDesc = function (i) {
        this.tabInfoInVo.ascDesc = this.comboAscDesc[i].value;
        this.onSelectColList();
    };
    ColListComponent.prototype.onSelectColList = function () {
        var _this = this;
        this.tabInfoService.selectColList(this.tabInfoInVo)
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
    ColListComponent.prototype.onDownloadExcel = function () {
        // let data = JSON.stringify(this.codeOutVoList);
        // //console.log(data);
        // const fd = new FormData();
        // fd.append('fileNm', "col-list.xls");
        // fd.append('data', data);
        // this.codeService.downloadExcel(fd)
        // .subscribe(result => {
        //    if(!result.isSuccess) alert(result.errUsrMsg)
        //   else {
        //   }
        // });
    };
    ColListComponent = __decorate([
        core_1.Component({
            selector: 'app-col-list',
            templateUrl: './col-list.component.html',
            styleUrls: ['./col-list.component.scss']
        }),
        __metadata("design:paramtypes", [tab_info_service_1.TabInfoService,
            jdbc_info_service_1.JdbcInfoService,
            router_1.Router])
    ], ColListComponent);
    return ColListComponent;
}());
exports.ColListComponent = ColListComponent;
//# sourceMappingURL=col-list.component.js.map