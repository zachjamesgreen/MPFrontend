import { Artist } from "./artist"

export class Album {
  id: number;
  artist: Artist;
  title: string;
  year: null;
  genre: string | undefined;
  band: string | undefined
  constructor(album: Album) {
    this.id = album.id;
    this.artist = album.artist
    this.title = album.title;
    this.year = album.year;
    this.genre = album.genre;
    this.band = album.band
  }
}
