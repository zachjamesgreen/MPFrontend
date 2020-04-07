import { Component, OnInit } from '@angular/core';
import { MusicService } from "../music.service"
import { Artist } from "../interfaces/artist"

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists = new Array
  constructor(public musicService: MusicService) {
    this.musicService.getArtists()
      .subscribe((artists: Artist[]) => {
        artists.map((artist) => {
          this.artists.push(new Artist(artist))
        })
      })

  }

  ngOnInit(): void {
  }

}
