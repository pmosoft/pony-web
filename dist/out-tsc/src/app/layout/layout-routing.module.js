"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var layout_component_1 = require("./layout.component");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'tab-list' },
            { path: 'tab-info-ext', loadChildren: './dams/table/tab-info-ext/tab-info-ext.module#TabInfoExtModule' },
            { path: 'tab-info-ext2', loadChildren: './dams/table/tab-info-ext2/tab-info-ext2.module#TabInfoExt2Module' },
            { path: 'tab-col-list', loadChildren: './dams/table/tab-col-list/tab-col-list.module#TabColListModule' },
            { path: 'tab-list', loadChildren: './dams/table/tab-list/tab-list.module#TabListModule' },
            { path: 'tab-qry-list', loadChildren: './dams/table/tab-qry-list/tab-qry-list.module#TabQryListModule' },
            { path: 'col-list', loadChildren: './dams/table/col-list/col-list.module#ColListModule' },
            { path: 'code-list', loadChildren: './dams/code/code-list/code-list.module#CodeListModule' },
            { path: 'jdbc-info', loadChildren: './dams/jdbc/jdbc-info.module#JdbcInfoModule' },
            { path: 'ext-stat-view', loadChildren: './dams/table/ext-stat-view/ext-stat-view.module#ExtStatViewModule' },
            { path: 'etl-tab', loadChildren: './etl/etl-tab/etlxt-stat-view.module#ExtStatViewModule' },
            { path: 'tran-camel', loadChildren: './tran/camel/tran-camel.module#TranCamelModule' },
            { path: 'delimeter', loadChildren: './tran/delimeter/delimeter.module#DelimeterModule' },
            { path: 'clone-angular', loadChildren: './clone/angular/clone-angular.module#CloneAngularModule' },
            { path: 'clone-spring', loadChildren: './clone/spring/clone-spring.module#CloneSpringModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
//# sourceMappingURL=layout-routing.module.js.map