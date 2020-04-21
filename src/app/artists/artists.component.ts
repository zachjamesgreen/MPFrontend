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
    let a;
    this.musicService.getArtists()
      .subscribe((artists: Artist[]) => {
        a = artists.map((artist) => {
          this.spotify.search('artist', artist.name)
            .subscribe((body) => {
              artist.image = body.artists.items[0].images[0].url
              this.artists.push(new Artist(artist))
            })
        })
      })
  }
}
