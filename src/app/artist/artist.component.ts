import { Component, OnInit } from '@angular/core';
import { MusicService } from "../service/music.service"
import { Artist } from "../interfaces/artist"
import { Album } from "../interfaces/album"
import { Song } from "../interfaces/song"
import { ActivatedRoute } from '@angular/router';
import { AudioService } from "../service/audioplayer.service"

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: string;
  albums: string[] = [];
  songs: Song[];
  constructor(private route: ActivatedRoute, public musicService: MusicService, public audioService: AudioService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.musicService.getSongsByArtist(id)
    .subscribe((songs: Song[]) => {
      this.songs = songs.map((song) => {
        return new Song(song)
      })
      this.artist = this.songs[0].artist_name
      this.songs.forEach((v, i) => {
        if (this.albums.indexOf(v.album_title) == -1) {
          this.albums.push(v.album_title)
        }
        
      })
    })
  }

  playSong(song: Song){
    this.audioService.setSongs(this.songs)
    this.audioService.song(song)
  }

}
