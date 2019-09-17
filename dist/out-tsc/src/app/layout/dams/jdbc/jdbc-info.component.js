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
var jdbc_info_service_1 = require("./jdbc-info.service");
var jdbc_info_1 = require("./jdbc-info");
var router_1 = require("@angular/router");
var tab_info_1 = require("../table/tab-info");
var JdbcInfoComponent = /** @class */ (function () {
    function JdbcInfoComponent(jdbcInfoService, router) {
        this.jdbcInfoService = jdbcInfoService;
        this.router = router;
        /***************************************************
         * 변수부
         ***************************************************/
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
        this.tabInfoInVo = new tab_info_1.TabInfo();
        //----------------
        // select
        //----------------
        this.comboDbDriver = [
            { driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy", db: "oracle" },
            { driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy", db: "mariadb" },
            { driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy", db: "sqlite" },
            { driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy", db: "postgre" }
            //    ,{value: "db2"    , name: "db2"    }
            //    ,{value: "sybase" , name: "sybase" }
            //    ,{value: "IQ"     , name: "iq"     }
            //    ,{value: "mssql"  , name: "mssql"  }
            //    ,{value: "Exadata", name: "exadata"}
            //    ,{value: "mysql"  , name: "mysql"  }
            //    ,{value: "hsqldb" , name: "hsqldb" }
            //    ,{value: "postgre", name: "postgre"}
        ];
    }
    /***************************************************
     * 초기화
     ***************************************************/
    JdbcInfoComponent.prototype.ngOnInit = function () {
        this.jdbcInfoInVo.db = "oracle";
        this.jdbcInfoInVo.driver = "net.sf.log4jdbc.sql.jdbcapi.DriverSpy";
        this.onSelect();
    };
    /***************************************************
     * 이벤트
     ***************************************************/
    /********************
     * 입력 DB 콤보 변경시
     ********************/
    JdbcInfoComponent.prototype.onComboChange = function (i) {
        this.jdbcInfoInVo.db = this.comboDbDriver[i].db;
        this.jdbcInfoInVo.driver = this.comboDbDriver[i].driver;
    };
    /********************
     * 그리드 클릭시
     ********************/
    JdbcInfoComponent.prototype.onClick = function (jdbcInfoInVo) {
        this.jdbcInfoInVo = jdbcInfoInVo;
    };
    /********************
     * 신규
     ********************/
    JdbcInfoComponent.prototype.onNew = function () {
        this.jdbcInfoInVo = new jdbc_info_1.JdbcInfo();
        this.jdbcInfoInVo.db = "oracle";
    };
    /********************
     * 저장
     ********************/
    JdbcInfoComponent.prototype.onSave = function () {
        var _this = this;
        console.log("onSave");
        this.jdbcInfoService.saveJdbcInfo(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.jdbcInfoOutVoList = result.jdbcOutVo;
                _this.onSelect();
                //console.log(result.codeOutVoList);
            }
        });
    };
    /********************
     * 테스트
     ********************/
    JdbcInfoComponent.prototype.onTest = function () {
        console.log("onTest");
        this.tabInfoInVo.jdbcNm = this.jdbcInfoInVo.jdbcNm;
        this.tabInfoInVo.owner = this.jdbcInfoInVo.usrId;
        this.jdbcInfoService.testJdbcInfo(this.tabInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                //alert(result.errUsrMsg)
                alert("Fail");
            else {
                alert("Success");
                //console.log(result.codeOutVoList);
            }
        });
    };
    /********************
     * 조회
     ********************/
    JdbcInfoComponent.prototype.onSelect = function () {
        var _this = this;
        this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.jdbcInfoOutVoList = result.jdbcInfoOutVoList;
                console.log(result.jdbcInfoOutVoList);
                console.log(result.jdbcInfoOutVoJson);
            }
        });
    };
    /********************
     * 삭제
     ********************/
    JdbcInfoComponent.prototype.onDelete = function () {
        var _this = this;
        this.jdbcInfoService.deleteJdbcInfo(this.jdbcInfoInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.onNew();
                _this.onSelect();
            }
        });
    };
    JdbcInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-jdbc-info',
            templateUrl: './jdbc-info.component.html',
            styleUrls: ['./jdbc-info.component.scss']
        }),
        __metadata("design:paramtypes", [jdbc_info_service_1.JdbcInfoService,
            router_1.Router])
    ], JdbcInfoComponent);
    return JdbcInfoComponent;
}());
exports.JdbcInfoComponent = JdbcInfoComponent;
//# sourceMappingURL=jdbc-info.component.js.map