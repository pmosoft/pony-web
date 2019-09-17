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
var clone_spring_component_1 = require("./clone-spring.component");
var clone_spring_routing_module_1 = require("./clone-spring-routing.module");
var CloneSpringModule = /** @class */ (function () {
    function CloneSpringModule() {
    }
    CloneSpringModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, clone_spring_routing_module_1.CloneSpringRoutingModule, forms_1.FormsModule
            ],
            declarations: [clone_spring_component_1.CloneSpringComponent]
        })
    ], CloneSpringModule);
    return CloneSpringModule;
}());
exports.CloneSpringModule = CloneSpringModule;
//# sourceMappingURL=clone-spring.module.js.map