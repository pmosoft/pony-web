import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThinqComponent } from './thinq.component';

const routes: Routes = [
  {
      path: '',
      component: ThinqComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class ThinqRoutingModule { }
  
