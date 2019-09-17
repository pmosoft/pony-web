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
var tab_info_service_1 = require("../dams/table/tab-info.service");
var tab_info_1 = require("../dams/table/tab-info");
var jdbc_info_service_1 = require("../dams/jdbc/jdbc-info.service");
var jdbc_info_1 = require("../dams/jdbc/jdbc-info");
var router_1 = require("@angular/router");
var comm_1 = require("../comm/comm");
var comm_service_1 = require("../comm/comm.service");
var EtlTabComponent = /** @class */ (function () {
    function EtlTabComponent(tabInfoService, jdbcInfoService, commService, router) {
        this.tabInfoService = tabInfoService;
        this.jdbcInfoService = jdbcInfoService;
        this.commService = commService;
        this.router = router;
        /***************************************************
         * 변수부
         ***************************************************/
        this.comm = new comm_1.Comm();
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
        this.createScript = "";
        this.tabRowsUpdateScript = "";
        this.comboWhereTabs = [
            { name: 'T0', value: 'T0' },
            { name: 'T1', value: 'T1' },
            { name: 'T2', value: 'T2' },
            { name: 'T3', value: 'T3' },
            { name: 'T4', value: 'T4' }
        ];
        this.comboWhereColTab = [
            { name: 'COL', value: 'COL' },
            { name: 'TAB', value: 'TAB' }
        ];
        this.comboOrderBy = [
            { name: '선택(정렬)', value: 'JDBC_NM' },
            { name: '테이블명', value: 'TAB_NM' },
            { name: '테이블한글명', value: 'TAB_HNM' },
            { name: 'Rows', value: 'TAB_ROWS' },
            { name: '최근변경일', value: 'TAB_UPD_DT' },
            { name: '테이블생성일', value: 'TAB_REG_DT' }
        ];
        this.cnt = 0;
        this.comboAscDesc = this.tabInfoService.comboAscDesc;
        this.isCheckAll = false;
    }
    /***************************************************
     * 초기화
     ***************************************************/
    EtlTabComponent.prototype.ngOnInit = function () {
        //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
        this.onSetComboJdbc();
        this.onSelectEtlTab();
        this.tabInfoInVo.whereTabs1 = this.comm.nullToSpace(localStorage.getItem('whereTabs1'));
        this.tabInfoInVo.whereTabs2 = this.comm.nullToSpace(localStorage.getItem('whereTabs2'));
        this.tabInfoInVo.whereTabs3 = this.comm.nullToSpace(localStorage.getItem('whereTabs3'));
        this.tabInfoInVo.whereTabs4 = this.comm.nullToSpace(localStorage.getItem('whereTabs4'));
    };
    /***************************
     * JDBC콤보 박스 초기 세팅
     **************************/
    EtlTabComponent.prototype.onSetComboJdbc = function () {
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
    /***************************************************
     * 검색 조건 이벤트
     ***************************************************/
    /********************
     * JDBC변경시
     ********************/
    EtlTabComponent.prototype.onChangeComboJdbc = function (i) {
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
        this.onSelectEtlTab();
    };
    /*****************************
     * IN 테이블 검색
     ****************************/
    EtlTabComponent.prototype.onChangeComboWhereTabs = function (i) {
        //localStorage.setItem('ponyTabs1' , this.tabInfoInVo.whereTabs);
        console.log(i);
        console.log(this.comboWhereTabs[i].value);
        this.tabInfoInVo.chkWhereTabs = (i == 0) ? false : true;
        this.tabInfoInVo.selectedTabs = i;
        //this.tabInfoInVo.whereTabs = this.comboWhereTabs[i-1].value;
        this.tabInfoInVo.tabNm = "";
        if (this.tabInfoInVo.selectedTabs == 0)
            this.tabInfoInVo.whereTabs = "";
        if (this.tabInfoInVo.selectedTabs == 1)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
        if (this.tabInfoInVo.selectedTabs == 2)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
        if (this.tabInfoInVo.selectedTabs == 3)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
        if (this.tabInfoInVo.selectedTabs == 4)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;
    };
    EtlTabComponent.prototype.onChangeTabs = function (i) {
        if (this.tabInfoInVo.selectedTabs == 0)
            this.tabInfoInVo.whereTabs = "";
        if (this.tabInfoInVo.selectedTabs == 1)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
        if (this.tabInfoInVo.selectedTabs == 2)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
        if (this.tabInfoInVo.selectedTabs == 3)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
        if (this.tabInfoInVo.selectedTabs == 4)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;
        if (i == 1)
            localStorage.setItem('whereTabs1', this.tabInfoInVo.whereTabs1);
        if (i == 2)
            localStorage.setItem('whereTabs2', this.tabInfoInVo.whereTabs2);
        if (i == 3)
            localStorage.setItem('whereTabs3', this.tabInfoInVo.whereTabs3);
        if (i == 4)
            localStorage.setItem('whereTabs4', this.tabInfoInVo.whereTabs4);
        console.log("this.tabInfoInVo.whereColTab==" + this.tabInfoInVo.whereColTab);
    };
    /*****************************
     * 컬럼 혹은 컬럼포함 테이블 검색
     ****************************/
    EtlTabComponent.prototype.onChangeComboWhereColTab = function (i) {
        this.tabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
    };
    /********************
     * 순차정렬
     ********************/
    EtlTabComponent.prototype.onChangeComboOrderBy = function (i) {
        this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
        this.onSelectEtlTab();
    };
    /********************
     * 역순정렬
     ********************/
    EtlTabComponent.prototype.onChangeComboAscDesc = function (i) {
        this.tabInfoInVo.ascDesc = this.comboAscDesc[i].value;
        this.onSelectEtlTab();
    };
    /********************************************
     * 그리드 전체 선택
     ********************************************/
    EtlTabComponent.prototype.onCheckGridAll = function () {
        for (var i = 0; i < this.tabInfoOutVoList.length; i++) {
            this.tabInfoOutVoList[i].chk = this.isCheckAll;
            console.log("chk[" + i + "]=" + this.tabInfoOutVoList[i].chk);
        }
    };
    EtlTabComponent.prototype.onCheckGrid = function (i) {
        console.log("chk1=" + this.tabInfoOutVoList[i].chk);
    };
    /***************************************************
     * 버튼 이벤트
     ***************************************************/
    /********************
     * 테이블정보 조회
     ********************/
    EtlTabComponent.prototype.onSelectEtlTab = function () {
        var _this = this;
        //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
        //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);
        //alert("onSelectEtlTab");
        if (this.tabInfoInVo.selectedTabs == 0)
            this.tabInfoInVo.whereTabs = "";
        if (this.tabInfoInVo.selectedTabs == 1)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
        if (this.tabInfoInVo.selectedTabs == 2)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
        if (this.tabInfoInVo.selectedTabs == 3)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
        if (this.tabInfoInVo.selectedTabs == 4)
            this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;
        this.tabInfoService.selectEtlTab(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoOutVoList = result.tabInfoOutVoList;
                _this.cnt = _this.tabInfoOutVoList.length;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    /********************
     * DDL 생성
     ********************/
    EtlTabComponent.prototype.onDDL = function () {
        var _this = this;
        console.log("onDDL");
        this.tabInfoService.selectCreateScript(this.tabInfoOutVoList)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                console.log(result.createScript);
                _this.createScript = result.createScript;
                //alert(this.createScript);
                //this.router.navigate(["/ext-stat-view/"+this.createScript]);
                _this.router.navigate(['/ext-stat-view', { result: _this.createScript }]);
                //this.router.navigate(['/ext-stat-view/',{debug: true}]);
            }
        });
    };
    /********************
     * SELECT 쿼리
     ********************/
    EtlTabComponent.prototype.onSelectSelectScript = function () {
        //    console.log("onSelectSelectScript");
        //    this.tabInfoService.selectSelectScript(this.tabInfoOutVoList)
        //    .subscribe(result => {
        //       if(!result.isSuccess) alert(result.errUsrMsg)
        //      else {
        //        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //        console.log(result.sqlScript);
        //        //this.createScript = result.createScript;
        //        //alert(this.createScript);
        //        //this.router.navigate(["/ext-stat-view/"+this.createScript]);
        //        this.router.navigate(['/ext-stat-view',{result: result.sqlScript}]);
        //        //this.router.navigate(['/ext-stat-view/',{debug: true}]);
        //      }
        //    });
    };
    /********************
     * 테이블건수 현행화 갱신
     ********************/
    EtlTabComponent.prototype.onUpdateTabRowsUpdateScript = function () {
        var _this = this;
        console.log("onUpdateTabRowsUpdateScript");
        this.tabInfoService.updateTabRowsUpdateScript(this.tabInfoOutVoList)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                console.log(result.tabRowsUpdateScript);
                _this.tabRowsUpdateScript = result.tabRowsUpdateScript;
                //alert(this.createScript);
                //this.router.navigate(["/ext-stat-view/"+this.createScript]);
                //this.router.navigate(['/ext-stat-view',{result: this.createScript}]);
                //this.router.navigate(['/ext-stat-view/',{debug: true}]);
            }
        });
    };
    /********************
     * 엑셀 다운로드
     ********************/
    EtlTabComponent.prototype.onDownloadExcel = function () {
        var etlTabExcels = [];
        for (var i in this.tabInfoOutVoList) {
            var excel = new EtlTabExcel();
            excel.owner = this.tabInfoOutVoList[i].owner;
            excel.tabNm = this.tabInfoOutVoList[i].tabNm;
            excel.tabHnm = this.tabInfoOutVoList[i].tabHnm;
            excel.tabRows = this.tabInfoOutVoList[i].tabRows;
            excel.tabUpdDt2 = this.tabInfoOutVoList[i].tabUpdDt2;
            excel.tabRegDt2 = this.tabInfoOutVoList[i].tabRegDt2;
            etlTabExcels.push(excel);
        }
        var data = JSON.stringify(etlTabExcels);
        var fd = new FormData();
        fd.append('fileNm', "etl-tab.xls");
        fd.append('data', data);
        this.commService.downloadExcel(fd)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
            }
        });
    };
    var _a, _b, _c;
    EtlTabComponent = __decorate([
        core_1.Component({
            selector: 'app-etl-tab',
            templateUrl: './etl-tab.component.html',
            styleUrls: ['./etl-tab.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof tab_info_service_1.TabInfoService !== "undefined" && tab_info_service_1.TabInfoService) === "function" ? _a : Object, typeof (_b = typeof jdbc_info_service_1.JdbcInfoService !== "undefined" && jdbc_info_service_1.JdbcInfoService) === "function" ? _b : Object, typeof (_c = typeof comm_service_1.CommService !== "undefined" && comm_service_1.CommService) === "function" ? _c : Object, router_1.Router])
    ], EtlTabComponent);
    return EtlTabComponent;
}());
exports.EtlTabComponent = EtlTabComponent;
//# sourceMappingURL=etl-tab.component.js.map