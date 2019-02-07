import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabInfoExt2Component } from './tab-info-ext2.component';
import { TabInfoExt2RoutingModule } from './tab-info-ext2-routing.module';

@NgModule({
  imports: [
    CommonModule,TabInfoExt2RoutingModule,FormsModule
  ],
  declarations: [TabInfoExt2Component]
})
export class TabInfoExt2Module { }
