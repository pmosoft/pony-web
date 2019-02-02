import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabQryListComponent } from './tab-qry-list.component';
import { TabQryListRoutingModule } from './tab-qry-list-routing.module';

@NgModule({
  imports: [
    CommonModule,TabQryListRoutingModule,FormsModule
  ],
  declarations: [TabQryListComponent]
})
export class TabQryListModule { }
