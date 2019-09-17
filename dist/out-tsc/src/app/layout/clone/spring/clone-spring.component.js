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
var CloneSpringComponent = /** @class */ (function () {
    function CloneSpringComponent(gensService, router) {
        this.gensService = gensService;
        this.router = router;
        this.gensInVo = new gens_1.Gens();
        this.gensOutVo = new gens_1.Gens();
    }
    CloneSpringComponent.prototype.ngOnInit = function () {
        this.gensInVo.pkgComNm = localStorage.getItem('pkgComNm');
        this.gensInVo.srcPathNm = localStorage.getItem('srcSpringPathNm');
        this.gensInVo.srcClassNm = localStorage.getItem('srcSpringClassNm');
        this.gensInVo.tarPathNm = localStorage.getItem('tarSpringPathNm');
        this.gensInVo.tarClassNm = localStorage.getItem('tarSpringClassNm');
        console.log("this.gensInVo.srcPathNm=" + this.gensInVo.srcPathNm);
    };
    CloneSpringComponent.prototype.onSave = function () {
        console.log("onSave");
        localStorage.setItem('pkgComNm', this.gensInVo.pkgComNm);
        localStorage.setItem('srcSpringPathNm', this.gensInVo.srcPathNm);
        localStorage.setItem('srcSpringClassNm', this.gensInVo.srcClassNm);
        localStorage.setItem('tarSpringPathNm', this.gensInVo.tarPathNm);
        localStorage.setItem('tarSpringClassNm', this.gensInVo.tarClassNm);
    };
    CloneSpringComponent.prototype.onExecute = function () {
        var _this = this;
        this.onSave();
        this.gensService.cloneSpring(this.gensInVo)
            .subscribe(function (result) {
            if (!result.isSuccess)
                alert(result.errUsrMsg);
            else {
                _this.gensOutVo = result.gensOutVo;
                //console.log(result.codeOutVoList);
            }
        });
    };
    CloneSpringComponent = __decorate([
        core_1.Component({
            selector: 'app-clone-spring',
            templateUrl: './clone-spring.component.html',
            styleUrls: ['./clone-spring.component.scss']
        }),
        __metadata("design:paramtypes", [gens_service_1.GensService,
            router_1.Router])
    ], CloneSpringComponent);
    return CloneSpringComponent;
}());
exports.CloneSpringComponent = CloneSpringComponent;
//# sourceMappingURL=clone-spring.component.js.map