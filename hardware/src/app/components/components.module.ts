import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide/slide.component';
import { StartComponent } from './start/start.component';



@NgModule({
  declarations: [ StartComponent, SlideComponent],
  imports: [
    CommonModule
  ],
  exports: [ StartComponent, SlideComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
