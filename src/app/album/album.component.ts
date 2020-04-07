import { Component, OnInit } from '@angular/core';
import { MusicService } from "../music.service"
import { Artist } from "../interfaces/artist"
import { Album } from "../interfaces/album"
import { Song } from "../interfaces/song"
import { ActivatedRoute } from '@angular/router';
import { AudioService } from "../audioplayer.service"

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album;
  constructor(private route: ActivatedRoute, public musicService: MusicService, public audioService: AudioService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.musicService.getAlbum(id)
      .subscribe((album) => {
        let s = album.songs.map((song,i,a) => {
          console.log(song)
          new Song(song)
        })
        console.log(s)
      })
  }

}
