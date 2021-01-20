import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThinqComponent } from './thinq.component';
import { ThinqRoutingModule } from './thinq-routing.module';

@NgModule({
  imports: [
    CommonModule,ThinqRoutingModule
  ],
  declarations: [ThinqComponent]
})
export class ThinqModule { }
