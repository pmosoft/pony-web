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
var tab_info_ext_component_1 = require("./tab-info-ext.component");
var tab_info_ext_routing_module_1 = require("./tab-info-ext-routing.module");
var TabInfoExtModule = /** @class */ (function () {
    function TabInfoExtModule() {
    }
    TabInfoExtModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, tab_info_ext_routing_module_1.TabInfoExtRoutingModule, forms_1.FormsModule
            ],
            declarations: [tab_info_ext_component_1.TabInfoExtComponent]
        })
    ], TabInfoExtModule);
    return TabInfoExtModule;
}());
exports.TabInfoExtModule = TabInfoExtModule;
//# sourceMappingURL=tab-info-ext.module.js.map