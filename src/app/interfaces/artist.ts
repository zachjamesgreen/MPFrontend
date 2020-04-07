import { Song } from "./song"
import { Album } from "./album"

export class Artist {
  id: number
  name: string
  albums: Album[]
  songs: Song[]
  constructor(artist) {
    this.id = artist.id
    this.name = artist.name
    this.albums = artist.albums
    this.songs = artist.songs
  }
}
