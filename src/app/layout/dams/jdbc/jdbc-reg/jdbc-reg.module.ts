import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JdbcRegComponent } from './jdbc-reg.component';
import { JdbcRegRoutingModule } from './jdbc-reg-routing.module';

@NgModule({
  imports: [
    CommonModule,JdbcRegRoutingModule,FormsModule
  ],
  declarations: [JdbcRegComponent]
})
export class JdbcRegModule { }
