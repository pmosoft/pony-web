import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'tab-list' },
            { path: 'tab-info-ext' , loadChildren: './dams/table/tab-info-ext/tab-info-ext.module#TabInfoExtModule' },
            { path: 'tab-info-ext2', loadChildren: './dams/table/tab-info-ext2/tab-info-ext2.module#TabInfoExt2Module' },
            { path: 'tab-col-list' , loadChildren: './dams/table/tab-col-list/tab-col-list.module#TabColListModule' },
            { path: 'tab-list'     , loadChildren: './dams/table/tab-list/tab-list.module#TabListModule' },
            { path: 'tab-qry-list' , loadChildren: './dams/table/tab-qry-list/tab-qry-list.module#TabQryListModule' },
            { path: 'col-list'     , loadChildren: './dams/table/col-list/col-list.module#ColListModule' },
            { path: 'code-list'    , loadChildren: './dams/code/code-list/code-list.module#CodeListModule' },
            { path: 'jdbc-info'    , loadChildren: './dams/jdbc/jdbc-info.module#JdbcInfoModule' },
            { path: 'ext-stat-view', loadChildren: './dams/table/ext-stat-view/ext-stat-view.module#ExtStatViewModule' },
            { path: 'etl-tab'      , loadChildren: './etl/etl-tab/etl-tab.module#EtlTabModule' },
            { path: 'tran-camel'   , loadChildren: './tran/camel/tran-camel.module#TranCamelModule' },
            { path: 'delimeter'    , loadChildren: './tran/delimeter/delimeter.module#DelimeterModule' },
            { path: 'clone-angular', loadChildren: './clone/angular/clone-angular.module#CloneAngularModule' },
            { path: 'clone-spring' , loadChildren: './clone/spring/clone-spring.module#CloneSpringModule' },
            { path: 'blank-page'   , loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
