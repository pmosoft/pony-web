import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabDataComponent } from './tab-data.component';
import { TabDataRoutingModule } from './tab-data-routing.module';

@NgModule({
  imports: [
    CommonModule,TabDataRoutingModule,FormsModule
  ],
  declarations: [TabDataComponent]
})
export class TabDataModule { }
