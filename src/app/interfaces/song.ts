// import { Artist } from './artist';
// import { Album } from './album';

// export class Song {
//   id: number;
//   artist: Artist;
//   track_nr: number | undefined;
//   album: Album;
//   name: string
//   filename: string
//   constructor(song: Song) {
//     this.id = song.id
//     this.artist = song.artist
//     this.album = song.album
//     this.name = song.name
//     this.filename = song.filename
//   }
// }

export class Song {
  id: number;
  artist_name: string;
  album_title: string;
  album_artist: string;
  checksum: string;
  filepath: string;
  title: string;
  yr: number;
  constructor(song: Song) {
    this.id = song.id
    this.artist_name = song.artist_name
    this.album_title = song.album_title
    this.filepath = this.fixfilepath(song.filepath)
    this.title = song.title
  }

  fixfilepath(filepath) {
    return filepath.replace("/var/www/html/public/music/", "")
  }
}
