import { Component, OnInit } from '@angular/core';
import { MusicService } from "../service/music.service"
import { Artist } from "../interfaces/artist"
import { Album } from "../interfaces/album"
import { Song } from "../interfaces/song"
import { ActivatedRoute } from '@angular/router';
import { AudioService } from "../service/audioplayer.service"

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;
  songs: Song[];
  constructor(private route: ActivatedRoute, public musicService: MusicService, public audioService: AudioService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.musicService.getAlbum(id)
      .subscribe((album: Album) => {
        this.album = new Album(album)
        this.musicService.getSongsByAlbum(this.album.id)
          .subscribe((songs: Song[]) => {
            this.songs = songs.map((song) => {
              return new Song(song)
            })
          })
          console.log(this.album)
      })
  }

  playSong(song){
    this.audioService.setSongs(this.songs)
    this.audioService.song(song)
  }

}
