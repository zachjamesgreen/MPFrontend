import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files = new FormControl('')

  constructor() { }

  ngOnInit(): void {
    this.files.valueChanges.subscribe((a) => console.log(a))
  }

  upload(f) {
    console.log(f.files)
  }

}
