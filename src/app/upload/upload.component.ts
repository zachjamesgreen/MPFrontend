import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files = new FormControl('')

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {}

  upload(f) {
    var formData = new FormData();
    console.log(f.files[0])
    for (let i = 0; i < f.files.length; i++) {
      formData.append(`${i}`, f.files[i])
    }


    this.musicService.upload(formData)
      .subscribe((res) => {
        console.log(res)
      },
      (error) => {
        console.error(error)
      })
  }

}
