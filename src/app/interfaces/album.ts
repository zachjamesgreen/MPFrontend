import { Song } from "./song"
import { Artist } from "./artist"

export class Album {
  id: number;
  artist_id: number;
  artist: string;
  name: string;
  year: null;
  genre: string;
  songs: Song[]
  constructor(album) {
    this.id = album.id;
    this.artist_id = album.artist_id;
    this.artist = album.artist
    this.name = album.name;
    this.year = album.year;
    this.genre = album.genre;
    this.songs = album.songs;
  }
}
