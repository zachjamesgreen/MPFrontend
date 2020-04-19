import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  API_URL: string = 'https://music.zachgreen.codes/api'

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Object> {
    return this.http.get(`${this.API_URL}/songs`)
  }

  getSongsByArtist(id: number): Observable<Object> {
    return this.http.get(`${this.API_URL}/songs/artist/${id}`)
  }

  getSongsByAlbum(id: number): Observable<Object> {
    return this.http.get(`${this.API_URL}/songs/album/${id}`)
  }

  getArtists(): Observable<Object> {
    return this.http.get(`${this.API_URL}/artists`)
  }

  getArtist(id: number): Observable<Object> {
    return this.http.get(`${this.API_URL}/artist/${id}` )
  }

  getAlbums(artist_id: number = null): Observable<Object> {
    if (artist_id) {
      return this.http.get(`${this.API_URL}/albums/${artist_id}`)
    } else {
      return this.http.get(`${this.API_URL}/albums`)
    }
  }

  getAlbum(id: number): Observable<Object> {
    return this.http.get(`${this.API_URL}/album/${id}` )
  }

  search(q: string): Observable<Object> {
    return this.http.get(`${this.API_URL}/search?q=${q}`)
  }

  upload(formData): Observable<Object> {
    // let headers = new HttpHeaders({'Content-Type': 'multipart/form-data','content-type': 'audio/mp3'})
    return this.http.post(`${this.API_URL}/upload`, formData)
  }
}
