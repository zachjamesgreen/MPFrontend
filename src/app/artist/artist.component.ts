import { Component, OnInit } from '@angular/core';
import { MusicService } from "../music.service"
import { Artist } from "../interfaces/artist"
import { Album } from "../interfaces/album"
import { Song } from "../interfaces/song"
import { ActivatedRoute } from '@angular/router';
import { AudioService } from "../audioplayer.service"

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist;
  constructor(private route: ActivatedRoute, public musicService: MusicService, public audioService: AudioService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.musicService.getArtist(id)
      .subscribe((artist: Artist) => {
        let albums = artist.albums.map((album,i,a) => {
          album.artist = artist.name
          album.songs = artist.songs.map((song,i,a) => {
            if (album.id == song.album_id) {
              song.artist = artist.name
              song.album_title = album.name
              return new Song(song)
            }
          })
          return new Album(album)
        })
        artist.albums = albums
        this.artist = new Artist(artist)
      })
  }

  playSong(song){
    this.audioService.setSongs(this.artist.songs)
    this.audioService.song(song)
  }

}
