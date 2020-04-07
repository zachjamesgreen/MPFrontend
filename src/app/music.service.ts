import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Song } from "./interfaces/song"

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getSongs() {
    return this.http.get("http://localhost:3000/api/songs")
  }

  getArtists() {
    return this.http.get("http://localhost:3000/api/artists")
  }

  getArtist(id) {
    return this.http.get(`http://localhost:3000/api/artist/${id}` )
  }

  getAlbums() {

  }

  getAlbum(id) {
    return this.http.get(`http://localhost:3000/api/album/${id}` )
  }
}
