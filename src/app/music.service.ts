import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Object> {
    return this.http.get("http://localhost:3000/api/songs")
  }

  getSongsByArtist(id: number): Observable<Object> {
    return this.http.get(`http://localhost:3000/api/songs/artist/${id}`)
  }

  getSongsByAlbum(id: number): Observable<Object> {
    return this.http.get(`http://localhost:3000/api/songs/album/${id}`)
  }

  getArtists(): Observable<Object> {
    return this.http.get("http://localhost:3000/api/artists")
  }

  getArtist(id: number): Observable<Object> {
    return this.http.get(`http://localhost:3000/api/artist/${id}` )
  }

  getAlbums(artist_id: number = null): Observable<Object> {
    if (artist_id) {
      return this.http.get(`http://localhost:3000/api/albums/${artist_id}`)
    } else {
      return this.http.get("http://localhost:3000/api/albums")
    }
  }

  getAlbum(id: number): Observable<Object> {
    return this.http.get(`http://localhost:3000/api/album/${id}` )
  }
}
