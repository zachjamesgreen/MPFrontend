import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  providers: [MusicService]
})
export class SongsComponent implements OnInit {
  songs: []

  constructor(private musicService: MusicService) {

  }

  ngOnInit(): void {
    this.musicService.getSongs()
      .subscribe((data) => {
        console.log(data)
        this.songs = data
      })
  }

}
