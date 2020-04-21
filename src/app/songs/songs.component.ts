import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { AudioService } from "../service/audioplayer.service"
import { MusicService } from "../service/music.service"
import { Song } from "../interfaces/song"

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  providers: []
})
export class SongsComponent implements OnInit {
  // @Input() songs;
  songs = new Array;
  state;
  @Output() songEvent = new EventEmitter();
  constructor(public musicService: MusicService, public audioService: AudioService) {
    this.musicService.getSongs()
      .subscribe((songs: Song[]) => {
        songs.map((song) => {
          this.songs.push(new Song(song))
        })
      })
  }

  ngOnInit(): void {}

  playSong(song){
    this.audioService.setSongs(this.songs)
    this.audioService.song(song)
  }
}
