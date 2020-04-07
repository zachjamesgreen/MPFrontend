import { Artist } from './artist';
import { Album } from './album';

export class Song {
  id: number;
  artist: Artist;
  track_nr: number | undefined;
  album: Album;
  name: string
  constructor(song: Song) {
    this.id = song.id
    this.artist = song.artist
    this.album = song.album
    this.name = song.name
  }
}
