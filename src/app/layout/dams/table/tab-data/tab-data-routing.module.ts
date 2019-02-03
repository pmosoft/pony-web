import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabDataComponent } from './tab-data.component';

const routes: Routes = [
  {
      path: '',
      component: TabDataComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class TabDataRoutingModule { }
  
