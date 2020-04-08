import { Component } from '@angular/core';
import { AudioService } from "./audioplayer.service"
import { faBackward,faPlay,faForward,faRandom,faRedo } from '@fortawesome/free-solid-svg-icons';
import { StreamState } from './interfaces/stream-state';
import { MusicService } from './music.service'
import { Song } from "./interfaces/song"
import { Router } from '@angular/router';

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
  state: StreamState;
  songs: Song[];
  song: any;
  left;
  top;
  constructor(private musicService: MusicService, private audioService: AudioService, private router: Router) {
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
    console.log("Gotta go hard! I gotta elevate!")
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
