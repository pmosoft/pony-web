import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'code-list' },
            { path: 'code-list'    , loadChildren: './dams/code/code-list/code-list.module#CodeListModule' },
            { path: 'tran-camel'   , loadChildren: './tran/camel/tran-camel.module#TranCamelModule' },
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
