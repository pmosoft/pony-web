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
var tab_info_ext2_component_1 = require("./tab-info-ext2.component");
var tab_info_ext2_routing_module_1 = require("./tab-info-ext2-routing.module");
var TabInfoExt2Module = /** @class */ (function () {
    function TabInfoExt2Module() {
    }
    TabInfoExt2Module = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, tab_info_ext2_routing_module_1.TabInfoExt2RoutingModule, forms_1.FormsModule
            ],
            declarations: [tab_info_ext2_component_1.TabInfoExt2Component]
        })
    ], TabInfoExt2Module);
    return TabInfoExt2Module;
}());
exports.TabInfoExt2Module = TabInfoExt2Module;
//# sourceMappingURL=tab-info-ext2.module.js.map