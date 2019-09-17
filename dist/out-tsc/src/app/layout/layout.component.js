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
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(router) {
        this.router = router;
    }
    LayoutComponent.prototype.ngOnInit = function () {
        //this.router.navigate(['/pony-regist']);
        // this.ponyInVo.usrId = this.usrId;
        // this.ponyService.selectUsrSttlMstrList(this.ponyInVo)
        // .subscribe(result => {
        //    if(!result.isSuccess) alert(result.errUsrMsg)
        //   else {
        //     this.usrSttlVoList = result.usrSttlVoList;
        //     if(this.usrSttlVoList.length==0) 
        //          this.router.navigate(['/pony-regist']);
        //     else this.router.navigate(['/pony-view/:blank']);
        //   } 
        // });
    };
    LayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-layout',
            templateUrl: './layout.component.html',
            styleUrls: ['./layout.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], LayoutComponent);
    return LayoutComponent;
}());
exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=layout.component.js.map