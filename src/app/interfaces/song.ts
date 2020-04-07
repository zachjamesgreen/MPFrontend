export class Song {
  id: number;
  artist_id: number;
  artist: string;
  album_id: number;
  album_title: string;
  name: string
  constructor(song) {
    this.id = song.id
    this.artist_id = song.artist_id
    this.artist = song.artist
    this.album_id = song.album_id
    this.album_title = song.album_title
    this.name = song.name
  }
}
