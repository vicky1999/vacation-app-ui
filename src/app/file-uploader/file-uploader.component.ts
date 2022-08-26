import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() label: string;
  @Input() multiple: boolean;

  @Output() fileUpload = new EventEmitter<any>();

  files: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  fileUploaded(event: any) {
    this.files = [];
    for(let file of event.target.files) {
      this.files.push(file);
    }
    this.fileUpload.emit(this.files);
  }

}
