import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import { TypedArray } from 'pdfjs-dist/types/display/api';

const url =
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnChanges {
  @ViewChild('canvasEl') canvasEl: ElementRef;

  @Input() pdfFile: File = null;

  public pagesNum = 0;

  constructor() {
    const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }

  ngOnChanges(): void {
    this.pdfFile && this.pdfToImageDataURLAsync(this.pdfFile);
  }

  public async pdfToImageDataURLAsync(pdfFile: File): Promise<string> {
    const test = (await pdfFile.arrayBuffer()) as TypedArray;
    const pdf = await getDocument(test).promise;

    const canvas = this.canvasEl.nativeElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 5 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    const res = canvas.toDataURL();

    if (pdf != null) pdf.destroy();

    return res;
  }
}
