import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public file = null;

  public processFiles(files: File[]) {
    this.file = files[0];
  }
}
