import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../environments/env';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) { }

  auth(c: string) {
    let body = encodeURI(`grant_type=authorization_code&code=${c}&redirect_uri=${ENV.redirect_uri}`)
    let auth = btoa(`${ENV.spotify_key}:${ENV.spotify_secret}`)
    let headers = new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    this.http.post('https://accounts.spotify.com/api/token', body, {headers: headers})
      .subscribe((data: any) => {
        localStorage.access_token = data.access_token
        localStorage.token_type = data.token_type
        localStorage.scope = data.scope
        localStorage.expires_in = moment().add(data.expires_in, 's')
        localStorage.refresh_token = data.refresh_token
      })
  }

  refreshToken() {
    let body = encodeURI(`grant_type=refresh_token&refresh_token=${localStorage.refresh_token}`)
    let auth = btoa(`${ENV.spotify_key}:${ENV.spotify_secret}`)
    let headers = new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    this.http.post('https://accounts.spotify.com/api/token', body, {headers: headers})
      .subscribe((data: any) => {
        localStorage.access_token = data.access_token
        localStorage.token_type = data.token_type
        localStorage.scope = data.scope
        localStorage.expires_in = moment().add(data.expires_in, 's')
        localStorage.refresh_token = data.refresh_token
      })
  }

  /**
   * [search description]
   * @param  type [string Comma delimited list]
   * @param  q    [string]
   * @return      [Observable]
   */
  search(type: string, q: string): Observable<Object> {
    let url = `https://api.spotify.com/v1/search?query=${q}&type=${type}&limit=1`
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.access_token}`
    })
    return this.http.get(url, {headers: headers})
  }
}
