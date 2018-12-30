import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeListComponent } from './code-list.component';
import { CodeListRoutingModule } from './code-list-routing.module';

@NgModule({
  imports: [
    CommonModule,CodeListRoutingModule
  ],
  declarations: [CodeListComponent]
})
export class CodeListModule { }
