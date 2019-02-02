import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabQryListComponent } from './tab-qry-list.component';

const routes: Routes = [
  {
      path: '',
      component: TabQryListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class TabQryListRoutingModule { }
  
