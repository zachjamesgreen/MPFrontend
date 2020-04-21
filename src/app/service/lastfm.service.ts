import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  API_URL = "http://ws.audioscrobbler.com/2.0/?"


  constructor(private http: HttpClient) { }

  getArtistInfo(artist): Observable<Object> {
    return this.http.get(`${this.API_URL}method=artist.getinfo&artist=${artist}&api_key=${ENV.lastfm_key}&format=json`)
  }
}
