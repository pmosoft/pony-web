import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JavaVoComponent } from './java-vo.component';
import { JavaVoRoutingModule } from './java-vo-routing.module';

@NgModule({
  imports: [
    CommonModule,JavaVoRoutingModule
  ],
  declarations: [JavaVoComponent]
})
export class JavaVoModule { }
