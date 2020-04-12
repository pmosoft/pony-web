import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JavaVoComponent } from './java-vo.component';

const routes: Routes = [
  {
      path: '',
      component: JavaVoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class JavaVoRoutingModule { }
  
