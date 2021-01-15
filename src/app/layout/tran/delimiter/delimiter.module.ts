import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DelimiterComponent } from './delimiter.component';
import { DelimiterRoutingModule } from './delimiter-routing.module';

@NgModule({
  imports: [
    CommonModule,DelimiterRoutingModule,FormsModule
  ],
  declarations: [DelimiterComponent]
})
export class DelimiterModule { }
