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
var tab_col_list_excel_1 = require("./tab-col-list-excel");
var jdbc_info_service_1 = require("../../jdbc/jdbc-info.service");
var jdbc_info_1 = require("../../jdbc/jdbc-info");
var router_1 = require("@angular/router");
var comm_1 = require("../../../comm/comm");
var comm_service_1 = require("../../../comm/comm.service");
var TabColListComponent = /** @class */ (function () {
    function TabColListComponent(tabInfoService, jdbcInfoService, commService, route) {
        this.tabInfoService = tabInfoService;
        this.jdbcInfoService = jdbcInfoService;
        this.commService = commService;
        this.route = route;
        /***************************************************
         * 변수부
         ***************************************************/
        this.comm = new comm_1.Comm();
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
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
    }
    /***************************************************
     * 초기화
     ***************************************************/
    TabColListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
        this.route.queryParams.subscribe(function (params) {
            //console.log("tabNm="+params['tabNm']);
            var tabNm = params['tabNm'];
            if (tabNm == null || tabNm == ':tabNm')
                _this.tabInfoInVo.tabNm = "";
            else
                _this.tabInfoInVo.tabNm = tabNm;
        });
        this.tabInfoInVo.whereTabs1 = this.comm.nullToSpace(localStorage.getItem('whereTabs1'));
        this.tabInfoInVo.whereTabs2 = this.comm.nullToSpace(localStorage.getItem('whereTabs2'));
        this.tabInfoInVo.whereTabs3 = this.comm.nullToSpace(localStorage.getItem('whereTabs3'));
        this.tabInfoInVo.whereTabs4 = this.comm.nullToSpace(localStorage.getItem('whereTabs4'));
        this.onSetComboJdbc();
        this.onSelectTabInfoList();
    };
    /***************************
     * JDBC콤보 박스 초기 세팅
     **************************/
    TabColListComponent.prototype.onSetComboJdbc = function () {
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
    TabColListComponent.prototype.onChangeComboJdbc = function (i) {
        //console.log("event.value=="+event.value);
        //console.log("event.value=="+event.selectedIndex);
        //console.log("event.value=="+event.options[event.selectedIndex]);
        //console.log("event.value=="+event.options[event.selectedIndex].owner);
        //var aa = event.options[event.selectedIndex];
        //console.log("event.value=="+aa.owner);
        //console.log("event.value=="+this.comboJdbc[0].usrId);
        //console.log(i);
        //console.log("aa".toUpperCase());
        if (i == 0) {
            this.tabInfoInVo.jdbcNm = "";
            this.tabInfoInVo.owner = "";
        }
        else {
            this.tabInfoInVo.jdbcNm = this.comboJdbc[i].jdbcNm;
            this.tabInfoInVo.owner = this.comboJdbc[i].usrId;
        }
        this.onSelectTabInfoList();
    };
    /*****************************
     * IN 테이블 검색
     ****************************/
    TabColListComponent.prototype.onChangeComboWhereTabs = function (i) {
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
    TabColListComponent.prototype.onChangeTabs = function (i) {
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
    TabColListComponent.prototype.onChangeComboWhereColTab = function (i) {
        this.tabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
    };
    /********************
     * 정렬 컬럼 선택
     ********************/
    TabColListComponent.prototype.onChangeComboOrderBy = function (i) {
        this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
        this.onSelectTabInfoList();
    };
    /********************
     * 오름-내림 정렬
     ********************/
    TabColListComponent.prototype.onChangeComboAscDesc = function (i) {
        this.tabInfoInVo.ascDesc = this.comboAscDesc[i].value;
        this.onSelectTabInfoList();
    };
    /********************************************
     * 그리드 전체 선택
     ********************************************/
    TabColListComponent.prototype.onCheckAll = function () {
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
     * 버튼 이벤트
     ***************************************************/
    /********************
     * 테이블정보 조회
     ********************/
    TabColListComponent.prototype.onSelectTabInfoList = function () {
        var _this = this;
        console.log("this.tabInfoInVo.selectedTabs==" + this.tabInfoInVo.selectedTabs);
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
        console.log(this.comboWhereTabs[this.tabInfoInVo.selectedTabs].value);
        console.log("11=" + this.tabInfoInVo.whereTabs);
        console.log("22=" + this.tabInfoInVo.whereTabs1);
        this.tabInfoService.selectTabInfoList(this.tabInfoInVo)
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
     * 메타테이블정보 조회
     ********************/
    TabColListComponent.prototype.onSelectMetaTabInfoList = function () {
        //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
        //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);
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
    TabColListComponent.prototype.onUploadMetaTabInfo = function () { };
    /********************
     * 비교
     ********************/
    TabColListComponent.prototype.onCompare = function () {
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
    /********************
     * 저장
     ********************/
    TabColListComponent.prototype.onSave = function () {
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
    TabColListComponent.prototype.onDelete = function () { };
    /********************
     * 엑셀 다운로드
     ********************/
    TabColListComponent.prototype.onDownloadExcel = function () {
        var infoArray = [];
        var tabColListExcels = [];
        for (var i in this.tabInfoOutVoList) {
            var excel = new tab_col_list_excel_1.TabColListExcel();
            excel.jdbcNm = this.tabInfoOutVoList[i].jdbcNm;
            excel.tabNm = this.tabInfoOutVoList[i].tabNm;
            excel.tabHnm = this.tabInfoOutVoList[i].tabHnm;
            excel.colId = this.tabInfoOutVoList[i].colId;
            excel.colNm = this.tabInfoOutVoList[i].colNm;
            excel.colHnm = this.tabInfoOutVoList[i].colHnm;
            excel.dataTypeDesc = this.tabInfoOutVoList[i].dataTypeDesc;
            excel.nullable = this.tabInfoOutVoList[i].nullable;
            excel.pk = this.tabInfoOutVoList[i].pk;
            excel.tabRows = this.tabInfoOutVoList[i].tabRows;
            excel.tabUpdDt2 = this.tabInfoOutVoList[i].tabUpdDt2;
            excel.tabRegDt2 = this.tabInfoOutVoList[i].tabRegDt2;
            tabColListExcels.push(excel);
        }
        var infoArray = [];
        infoArray.push({ jdbcNm: 'aa', tabNm: '20' });
        infoArray.push({ jdbcNm: 'SASS', num1: 100, num2: 70 });
        var aa = new tab_col_list_excel_1.TabColListExcel();
        aa.jdbcNm = 'aa';
        aa.tabNm = 'aa';
        infoArray.push(aa);
        //this.tabColListExcels[0] = new TabColListExcel; 
        //this.tabColListExcels[1] = new TabColListExcel; 
        //this.tabColListExcels[0].jdbcNm = 'aa'; 
        //this.tabColListExcels[0].tabNm = 'aa'; 
        //this.tabColListExcels[1].jdbcNm = 'aa'; 
        //this.tabColListExcels[1].tabNm = 'aa'; 
        var data = JSON.stringify(tabColListExcels);
        //console.log(data);
        var fd = new FormData();
        fd.append('fileNm', "tab-col-list.xls");
        fd.append('data', data);
        this.commService.downloadExcel(fd)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
            }
        });
    };
    TabColListComponent = __decorate([
        core_1.Component({
            selector: 'app-tab-col-list',
            templateUrl: './tab-col-list.component.html',
            styleUrls: ['./tab-col-list.component.scss']
        }),
        __metadata("design:paramtypes", [tab_info_service_1.TabInfoService,
            jdbc_info_service_1.JdbcInfoService,
            comm_service_1.CommService,
            router_1.ActivatedRoute])
    ], TabColListComponent);
    return TabColListComponent;
}());
exports.TabColListComponent = TabColListComponent;
//# sourceMappingURL=tab-col-list.component.js.map