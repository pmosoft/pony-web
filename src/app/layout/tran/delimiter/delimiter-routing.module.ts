import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelimiterComponent } from './delimiter.component';

const routes: Routes = [
  {
      path: '',
      component: DelimiterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DelimiterRoutingModule { }

