import { Song } from "./song"
export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
    songs: Array<Song> | undefined;
    song: Song | undefined
  }
