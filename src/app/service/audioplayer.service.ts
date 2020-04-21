import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { StreamState } from '../interfaces/stream-state';
import { Song } from "../interfaces/song"
import { environment as ENV } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject();
  private audioObj = new Audio();
  private playPromise: Promise<any>;
  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    songs: undefined,
    song: undefined,
  };

  private streamObservable(song: Song) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = `${ENV.music_uri}/${song.artist.name}/${song.album.title}/${song.filename}`;
      this.audioObj.load();
      this.playPromise = this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: any, events: Array<any>, handler: Function) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: Array<any>, handler: Function) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(song: Song) {
    return this.streamObservable(song).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format: string = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  volume(v: number){
    this.audioObj.volume = v
  }

  song(song: Song) {
    this.state.song = song;
    this.stateChange.next(this.state);
    this.playStream(song).subscribe()
    // if (this.playPromise !== undefined ) {
    //   this.playPromise.then(_ => {
    //     this.playStream(song).subscribe()
    //   })
    // }


  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
      case 'ended':
        let i = this.state.songs.indexOf(this.state.song)
        let n = this.state.songs[i+1]
        if (n) {
          this.stop();
          this.song(n);
        } else {
          this.stop();
        }
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      songs: this.state.songs,
      song: undefined
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  setSongs(songs: Song[]) {
    this.state.songs = songs;
    this.stateChange.next(this.state);
  }
}
