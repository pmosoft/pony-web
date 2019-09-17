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
var comm_service_1 = require("../../../comm/comm.service");
var tab_info_service_1 = require("../tab-info.service");
var tab_info_1 = require("../tab-info");
var jdbc_info_service_1 = require("../../jdbc/jdbc-info.service");
var jdbc_info_1 = require("../../jdbc/jdbc-info");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var TabQryListComponent = /** @class */ (function () {
    function TabQryListComponent(commService, tabInfoService, jdbcInfoService, router, route) {
        this.commService = commService;
        this.tabInfoService = tabInfoService;
        this.jdbcInfoService = jdbcInfoService;
        this.router = router;
        this.route = route;
        /***************************************************
         * 변수부
         ***************************************************/
        this.isParam = false;
        this.tabInfoInVo = new tab_info_1.TabInfo();
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
        this.cnt = 0;
        this.jdbcIdx = 0;
        this.comboOrderBy = [
            { name: '선택(정렬)', value: 'JDBC_NM' },
            { name: '테이블명', value: 'TAB_NM' },
            { name: '테이블한글명', value: 'TAB_HNM' },
            { name: 'Rows', value: 'TAB_ROWS' },
            { name: '최근변경일', value: 'TAB_UPD_DT' },
            { name: '테이블생성일', value: 'TAB_REG_DT' }
        ];
        /***************************
         * 정렬콤보 박스 초기 세팅
         **************************/
        this.comboAscDesc = this.tabInfoService.comboAscDesc;
    }
    /***************************************************
     * 초기화
     ***************************************************/
    TabQryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
        this.route.queryParams.subscribe(function (params) {
            console.log("jdbcNm=" + params['jdbcNm']);
            console.log("owner=" + params['owner']);
            console.log("tabNm=" + params['tabNm']);
            _this.tabInfoInVo.jdbcNm = params['jdbcNm'];
            _this.tabInfoInVo.owner = params['owner'];
            _this.tabInfoInVo.tabNm = params['tabNm'];
        });
        this.onSelectTabInfoList();
        this.setComboJdbc();
        if (this.tabInfoInVo.jdbcNm.length > 3) {
            this.isParam = true;
            this.onSelectTabQryList();
        }
    };
    /***************************
     * JDBC콤보 박스 초기 세팅
     **************************/
    TabQryListComponent.prototype.setComboJdbc = function () {
        var _this = this;
        this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
            //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //console.log(result.jdbcInfoOutVoList);
                _this.comboJdbc = result.jdbcInfoOutVoList;
                console.log("this.comboJdbc=============================");
                console.log("this.comboJdbc===" + result.jdbcInfoOutVoList);
                for (var key in _this.comboJdbc) {
                    console.log(key + '=>' + _this.comboJdbc[key].jdbcNm.toUpperCase());
                }
                _this.jdbcIdx = _this.comboJdbc.findIndex(function (jdbc) { return jdbc.jdbcNm.toUpperCase() === _this.tabInfoInVo.jdbcNm.toUpperCase(); });
                console.log("this.tabInfoInVo.jdbcNm===" + _this.tabInfoInVo.jdbcNm);
                console.log("this.jdbcIdx===" + _this.jdbcIdx);
                _this.jdbcIdx = 2;
            }
        });
    };
    /***************************************************
     * 검색 조건 이벤트
     ***************************************************/
    /********************
     * 컬럼조건이 체크될때
     ********************/
    TabQryListComponent.prototype.onCheckCol = function () {
        var _this = this;
        console.log(this.tabInfoInVo.chkWhere);
        this.tabInfoService.selectSelectScript(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tabInfoInVo.txtSelect = result.sqlScript;
            }
        });
    };
    /********************
     * Where조건이 체크될때
     ********************/
    TabQryListComponent.prototype.onCheckWhere = function () {
        console.log(this.tabInfoInVo.chkWhere);
        //if(this.tabInfoInVo.chkWhere) {
        //  this.tabInfoInVo.txtWhere = localStorage.getItem('txtWhere');
        //}
    };
    /********************
     * 순차정렬
     ********************/
    TabQryListComponent.prototype.onChangeComboOrderBy = function (event) {
        console.log(event.value);
        this.tabInfoInVo.orderBy = event.value;
        this.onSelectTabQryList();
    };
    /********************
     * 역순정렬
     ********************/
    TabQryListComponent.prototype.onChangeComboAscDesc = function (event) {
        this.tabInfoInVo.ascDesc = event.value;
        this.onSelectTabQryList();
    };
    /***************************************************
     * 버튼 이벤트
     ***************************************************/
    /********************
     * 테이블정보 조회
     ********************/
    TabQryListComponent.prototype.onSelectTabInfoList = function () {
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
    /********************
     * 쿼리 데이터 조회
     ********************/
    TabQryListComponent.prototype.onSelectTabQryList = function () {
        var _this = this;
        this.tabInfoInVo.limitCnt = 100;
        this.tabInfoService.selectTabQryList(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                console.log(result.tabQryOutVoList);
                _this.tabQryOutVoList = result.tabQryOutVoList;
                _this.cnt = _this.tabQryOutVoList.length;
                console.log("list=" + _this.tabQryOutVoList[0]);
                console.log([{ aaa: 'aaa', bbb: 'bbb' }, { aaa: 'aaa', bbb: 'bbb' }]);
                _this.jj = [{ aaa: 'aaa111', bbb: 'bbb111' }, { aaa: 'aaa2222', bbb: 'bbb2222' }];
                console.log("jj=" + _this.jj[0]['aaa']);
                console.log("jj=" + _this.jj[0].aaa);
            }
        });
    };
    /********************
     * Insert문장 조회
     ********************/
    TabQryListComponent.prototype.onDownloadInsStat = function () {
        this.tabInfoService.downloadInsStat(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    /********************
     * SELECT 쿼리
     ********************/
    TabQryListComponent.prototype.onSelectSelectScript = function () {
        var _this = this;
        console.log("onSelectSelectScript");
        this.tabInfoService.selectSelectScript(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                console.log(result.sqlScript);
                //this.createScript = result.createScript;
                //alert(this.createScript);
                //this.router.navigate(["/ext-stat-view/"+this.createScript]);
                _this.router.navigate(['/ext-stat-view', { result: result.sqlScript }]);
                //this.router.navigate(['/ext-stat-view/',{debug: true}]);
            }
        });
    };
    /********************
     * 엑셀 다운로드
     ********************/
    TabQryListComponent.prototype.onDownloadExcel = function () {
        this.tabInfoService.downloadExcel2(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    /********************
     * 콤마샘파일 조회
     ********************/
    TabQryListComponent.prototype.onDownloadCommaFile = function () {
        this.tabInfoService.downloadCommaFile(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    /********************
     * 바샘파일 조회
     ********************/
    TabQryListComponent.prototype.onDownloadBarFile = function () {
        this.tabInfoService.downloadBarFile(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                //this.tabInfoOutVoList = result.tabInfoOutVoList;
                //console.log(result.tabInfoOutVoList);
                //alert("onSelectMetaTabInfoList");
            }
        });
    };
    TabQryListComponent = __decorate([
        core_1.Component({
            selector: 'app-tab-qry-list',
            templateUrl: './tab-qry-list.component.html',
            styleUrls: ['./tab-qry-list.component.scss']
        }),
        __metadata("design:paramtypes", [comm_service_1.CommService,
            tab_info_service_1.TabInfoService,
            jdbc_info_service_1.JdbcInfoService,
            router_1.Router,
            router_2.ActivatedRoute])
    ], TabQryListComponent);
    return TabQryListComponent;
}());
exports.TabQryListComponent = TabQryListComponent;
//# sourceMappingURL=tab-qry-list.component.js.map