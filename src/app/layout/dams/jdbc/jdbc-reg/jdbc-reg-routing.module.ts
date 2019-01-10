import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JdbcRegComponent } from './jdbc-reg.component';

const routes: Routes = [
  {
      path: '',
      component: JdbcRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class JdbcRegRoutingModule { }
  
