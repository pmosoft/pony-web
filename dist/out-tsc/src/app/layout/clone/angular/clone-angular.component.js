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
var gens_service_1 = require("../gens.service");
var gens_1 = require("../gens");
var router_1 = require("@angular/router");
var CloneAngularComponent = /** @class */ (function () {
    function CloneAngularComponent(gensService, router) {
        this.gensService = gensService;
        this.router = router;
        this.gensInVo = new gens_1.Gens();
        this.gensOutVo = new gens_1.Gens();
    }
    CloneAngularComponent.prototype.ngOnInit = function () {
        this.gensInVo.srcPathNm = localStorage.getItem('srcPathNm');
        this.gensInVo.srcBarNm = localStorage.getItem('srcBarNm');
        this.gensInVo.tarPathNm = localStorage.getItem('tarPathNm');
        this.gensInVo.tarBarNm = localStorage.getItem('tarBarNm');
        console.log("this.gensInVo.srcPathNm=" + this.gensInVo.srcPathNm);
    };
    CloneAngularComponent.prototype.onSave = function () {
        console.log("onSaveSrcPath");
        localStorage.setItem('srcPathNm', this.gensInVo.srcPathNm);
        localStorage.setItem('srcBarNm', this.gensInVo.srcBarNm);
        localStorage.setItem('tarPathNm', this.gensInVo.tarPathNm);
        localStorage.setItem('tarBarNm', this.gensInVo.tarBarNm);
    };
    CloneAngularComponent.prototype.onExecute = function () {
        var _this = this;
        this.onSave();
        this.gensService.cloneAngular(this.gensInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.gensOutVo = result.gensOutVo;
                //console.log(result.codeOutVoList);  
            }
        });
    };
    CloneAngularComponent = __decorate([
        core_1.Component({
            selector: 'app-clone-angular',
            templateUrl: './clone-angular.component.html',
            styleUrls: ['./clone-angular.component.scss']
        }),
        __metadata("design:paramtypes", [gens_service_1.GensService,
            router_1.Router])
    ], CloneAngularComponent);
    return CloneAngularComponent;
}());
exports.CloneAngularComponent = CloneAngularComponent;
//# sourceMappingURL=clone-angular.component.js.map