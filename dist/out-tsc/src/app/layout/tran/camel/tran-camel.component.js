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
var router_1 = require("@angular/router");
var TranCamelComponent = /** @class */ (function () {
    function TranCamelComponent(router) {
        this.router = router;
        this.srcTxt = "";
        this.tarTxt = "";
    }
    TranCamelComponent.prototype.ngOnInit = function () {
    };
    TranCamelComponent.prototype.onChangeSrcTxt = function (ev) { this.srcTxt = ev.target.value; };
    TranCamelComponent.prototype.onChangeTarTxt = function (ev) { this.tarTxt = ev.target.value; };
    TranCamelComponent.prototype.tranCamelToBar = function () {
        console.log("aaaa");
        var strTmp = this.srcTxt;
        console.log("strTmp=" + strTmp);
        var strRtn = "";
        var flag = false;
        for (var i = 0; i < strTmp.length; i++) {
            if (strTmp[i].match(/[A-Z]/)) {
                strRtn += "_";
            }
            strRtn += strTmp[i];
        }
        strRtn = strRtn.toUpperCase();
        this.tarTxt = strRtn;
    };
    TranCamelComponent.prototype.tranBarToCamel = function () {
        console.log("aaaabbb");
        var strTmp = this.srcTxt.toLowerCase();
        var strRtn = "";
        var flag = false;
        for (var i = 0; i < strTmp.length; i++) {
            if (strTmp[i] == "_") {
                flag = true;
            }
            else {
                if (flag) {
                    strRtn += strTmp[i].toUpperCase();
                    flag = false;
                }
                else {
                    strRtn += strTmp[i];
                }
            }
        }
        this.tarTxt = strRtn;
    };
    TranCamelComponent = __decorate([
        core_1.Component({
            selector: 'app-tran-camel',
            templateUrl: './tran-camel.component.html',
            styleUrls: ['./tran-camel.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], TranCamelComponent);
    return TranCamelComponent;
}());
exports.TranCamelComponent = TranCamelComponent;
//# sourceMappingURL=tran-camel.component.js.map