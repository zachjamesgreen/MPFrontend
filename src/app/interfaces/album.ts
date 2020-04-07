import { Artist } from "./artist"

export class Album {
  id: number;
  artist: Artist;
  name: string;
  year: null;
  genre: string | undefined;
  constructor(album: Album) {
    this.id = album.id;
    this.artist = album.artist
    this.name = album.name;
    this.year = album.year;
    this.genre = album.genre;
  }
}
