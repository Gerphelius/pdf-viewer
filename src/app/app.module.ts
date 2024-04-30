import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { DragNDropDirective } from './drag-and-drop.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    PdfViewerComponent,
    DragNDropDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
