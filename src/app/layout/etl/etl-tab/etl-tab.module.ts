import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EtlTabComponent } from './etl-tab.component';
import { EtlTabRoutingModule } from './etl-tab-routing.module';

@NgModule({
  imports: [
    CommonModule,EtlTabRoutingModule,FormsModule
  ],
  declarations: [EtlTabComponent]
})
export class EtlTabModule { }
