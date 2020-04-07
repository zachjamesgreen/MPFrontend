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
  artist: Artist;
  albums: Album[];
  songs: Song[];
  constructor(private route: ActivatedRoute, public musicService: MusicService, public audioService: AudioService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.musicService.getArtist(id)
      .subscribe((artist: Artist) => {
        this.artist = new Artist(artist)
        this.musicService.getAlbums(this.artist.id)
          .subscribe((albums: Album[]) => {
            this.albums = albums.map((album) => {
              return new Album(album)
            })
            this.musicService.getSongsByArtist(this.artist.id)
              .subscribe((songs: Song[]) => {
                this.songs = songs.map((song) => {
                  return new Song(song)
                })
              })
          })
      })
  }

  playSong(song){
    this.audioService.setSongs(this.artist.songs)
    this.audioService.song(song)
  }

}
