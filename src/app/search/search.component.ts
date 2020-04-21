import { Component, OnInit } from '@angular/core';
import { MusicService } from '../service/music.service';
import { Artist } from '../interfaces/artist';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';
import { AudioService } from '../service/audioplayer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  artists: Artist[];
  albums: Album[];
  songs: Song[];

  constructor(private musicService: MusicService, private audioService: AudioService) { }

  ngOnInit(): void {}

  search(e: string) {
    if (e == "") return
    this.musicService.search(e)
      .subscribe((data: any) => {
        console.log(data)
        this.artists = data.artists;
        this.albums = data.albums;
        this.songs = data.songs;
      })
  }

  playSong(song){
    this.audioService.setSongs(this.songs)
    this.audioService.song(song)
  }

}
