import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtStatViewComponent } from './ext-stat-view.component';

const routes: Routes = [
  {
      path: '',
      component: ExtStatViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class ExtStatViewRoutingModule { }
  
