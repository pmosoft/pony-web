import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExtStatViewComponent } from './ext-stat-view.component';
import { ExtStatViewRoutingModule } from './ext-stat-view-routing.module';

@NgModule({
  imports: [
    CommonModule,ExtStatViewRoutingModule,FormsModule
  ],
  declarations: [ExtStatViewComponent]
})
export class ExtStatViewModule { }
