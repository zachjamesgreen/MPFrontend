import { Component, OnInit } from '@angular/core';
import { MusicService } from "../service/music.service"
import { Album } from '../interfaces/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];
  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getAlbums()
      .subscribe((albums: Album[]) => {
        this.albums = albums
      })
  }

}
