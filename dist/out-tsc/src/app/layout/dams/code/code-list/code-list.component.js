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
var code_service_1 = require("../code.service");
var code_1 = require("../code");
var router_1 = require("@angular/router");
var CodeListComponent = /** @class */ (function () {
    function CodeListComponent(codeService, router) {
        this.codeService = codeService;
        this.router = router;
        this.comboCode = [
            { id: 'ALL', name: '전체' },
            { id: 'CD_GRP', name: '코드그룹' },
            { id: 'CD_GRP_NM', name: '코드그룹명' },
            { id: 'CD_ID', name: '코드ID' },
            { id: 'CD_ID_NM', name: '코드ID명' },
            { id: 'CD', name: '코드' },
            { id: 'CD_NM', name: '코드명' },
            { id: 'CD_DESC', name: '코드설명' }
        ];
        this.codeInVo = new code_1.Code();
    }
    CodeListComponent.prototype.ngOnInit = function () {
    };
    CodeListComponent.prototype.onComboCodeChange = function (id) {
        console.log(id);
        this.codeInVo.comboCodeId = id;
    };
    CodeListComponent.prototype.onSelectCodeList = function () {
        var _this = this;
        this.codeService.selectCodeList(this.codeInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.codeOutVoList = result.codeOutVoList;
                //console.log(result.codeOutVoList);  
            }
        });
    };
    CodeListComponent.prototype.onDownloadExcel = function () {
        var data = JSON.stringify(this.codeOutVoList);
        //console.log(data);
        var fd = new FormData();
        fd.append('fileNm', "code-list.xls");
        fd.append('data', data);
        this.codeService.downloadExcel(fd)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
            }
        });
    };
    CodeListComponent = __decorate([
        core_1.Component({
            selector: 'app-code-list',
            templateUrl: './code-list.component.html',
            styleUrls: ['./code-list.component.scss']
        }),
        __metadata("design:paramtypes", [code_service_1.CodeService,
            router_1.Router])
    ], CodeListComponent);
    return CodeListComponent;
}());
exports.CodeListComponent = CodeListComponent;
//# sourceMappingURL=code-list.component.js.map