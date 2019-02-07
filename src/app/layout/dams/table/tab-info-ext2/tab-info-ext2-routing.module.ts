import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabInfoExt2Component } from './tab-info-ext2.component';

const routes: Routes = [
  {
      path: '',
      component: TabInfoExt2Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class TabInfoExt2RoutingModule { }
  
