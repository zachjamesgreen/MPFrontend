import { Component, OnInit } from '@angular/core';
import { MusicService } from "../service/music.service"
import { SpotifyService } from "../service/spotify.service"
import { Artist } from "../interfaces/artist"

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists = new Array
  constructor(public musicService: MusicService, public spotify: SpotifyService) {

  }

  ngOnInit(): void {
    this.getArtists()
  }

  getArtists() {
    this.musicService.getArtists()
      .subscribe((artists: Artist[]) => {
        this.artists = artists
      })
  }
}
