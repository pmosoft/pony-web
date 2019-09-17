import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtlTabComponent } from './etl-tab.component';

const routes: Routes = [
  {
      path: '',
      component: EtlTabComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class EtlTabRoutingModule { }
  
