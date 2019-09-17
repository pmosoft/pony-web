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
var tran_service_1 = require("../tran.service");
var tran_1 = require("../tran");
var router_1 = require("@angular/router");
var DelimeterComponent = /** @class */ (function () {
    function DelimeterComponent(tranService, router) {
        this.tranService = tranService;
        this.router = router;
        this.tranInVo = new tran_1.Tran();
        this.tranOutVo = new tran_1.Tran();
        this.tokenCnt = 0;
        this.delimeterCnt = 0;
    }
    DelimeterComponent.prototype.ngOnInit = function () {
    };
    DelimeterComponent.prototype.onDelimeterToRows = function () {
        var _this = this;
        console.log(this.tranInVo.strToken);
        console.log(this.tranInVo.delimeter);
        this.tranService.delimeterToRows(this.tranInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.tranOutVo = result.tranOutVo;
                _this.tokenCnt = _this.tranOutVo.tokenCnt;
                _this.delimeterCnt = _this.tranOutVo.delimeterCnt;
                console.log(result.tranOutVo);
            }
        });
    };
    DelimeterComponent = __decorate([
        core_1.Component({
            selector: 'app-delimeter',
            templateUrl: './delimeter.component.html',
            styleUrls: ['./delimeter.component.scss']
        }),
        __metadata("design:paramtypes", [tran_service_1.TranService,
            router_1.Router])
    ], DelimeterComponent);
    return DelimeterComponent;
}());
exports.DelimeterComponent = DelimeterComponent;
//# sourceMappingURL=delimeter.component.js.map