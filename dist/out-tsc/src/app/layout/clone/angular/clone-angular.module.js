"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var clone_angular_component_1 = require("./clone-angular.component");
var clone_angular_routing_module_1 = require("./clone-angular-routing.module");
var CloneAngularModule = /** @class */ (function () {
    function CloneAngularModule() {
    }
    CloneAngularModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, clone_angular_routing_module_1.CloneAngularRoutingModule, forms_1.FormsModule
            ],
            declarations: [clone_angular_component_1.CloneAngularComponent]
        })
    ], CloneAngularModule);
    return CloneAngularModule;
}());
exports.CloneAngularModule = CloneAngularModule;
//# sourceMappingURL=clone-angular.module.js.map