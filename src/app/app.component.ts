import { Component } from '@angular/core';
import { AudioService } from "./service/audioplayer.service";
import { faBackward,faPlay,faForward,faRandom,faRedo,faHeart,faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { StreamState } from './interfaces/stream-state';
import { MusicService } from './service/music.service';
import { Song } from "./interfaces/song";
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from "./service/spotify.service";
import { environment as ENV } from '../environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AudioService]
})
export class AppComponent {
  faBackward = faBackward;
  faPlay = faPlay;
  faForward = faForward;
  faRandom = faRandom;
  faRedo = faRedo;
  faHeart = faHeart;
  faVolumeUp = faVolumeUp;
  faSpotify = faSpotify
  state: StreamState;
  songs: Song[];
  song: any;
  spotifyLoggedIn = false;
  constructor(
    private musicService: MusicService,
    private audioService: AudioService,
    private spotify: SpotifyService,
    private route: ActivatedRoute,
    private router: Router) {
    // this.musicService.getSongs()
    //   .subscribe((data) => {
    //     this.songs = data
    //   })
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (localStorage.access_token) {
      let tokenCheck = moment(localStorage.expires_in) - moment()
      if (Math.sign(tokenCheck) === -1) {
        this.spotify.refreshToken()
      }
      this.spotifyLoggedIn = true
    } else if (code) {
      this.spotify.auth(code)
    }
    console.log("Gotta go hard! I gotta elevate!")
  }

  spotifyAuth() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${ENV.spotify_key}&redirect_uri=http://localhost:4200&scope=user-read-private user-read-email&response_type=code`
  }


  onPlayPauseClick(){
    if(this.state.playing) {
      this.pause()
    } else {
      this.play()
    }
  }
  onShuffleClick(){}

  // TODO: use indexOf()
  onPrevClick(){
    let i = this.state.songs.map((s) => s.name).indexOf(this.state.song.name)
    let n = this.state.songs[i-1]
    if (n) {
      this.audioService.song(n)
    } else {
      // TODO: add check for repeat
      this.audioService.song(this.state.songs[0])
    }
  }
  onNextClick(){
    let i = this.state.songs.map((s) => s.name).indexOf(this.state.song.name)
    let n = this.state.songs[i+1]
    if (n) {
      this.audioService.song(n)
    } else {
      // TODO: add check for repeat
      this.stop()
    }
  }
  onRepeatClick(){}

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
  }

  previous() {
  }

  isFirstPlaying() {
  }

  isLastPlaying() {
  }

  onVolume(e){
    this.audioService.volume(e.target.value)
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.target.value);
  }

  mousePos($event) {
    console.log("EVENT")
    this.top = $event.clientX;
    this.left = $event.clientY;
  }

  doSearch(e) {
    this.router.navigateByUrl(`/search?q=${e}`, { skipLocationChange: true, queryParams: { 'q': e } });
  }
}
