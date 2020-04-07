import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SongsComponent } from './songs/songs.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBackward,faPlay,faForward,faRandom,faRedo } from '@fortawesome/free-solid-svg-icons';
import { ArtistComponent } from './artist/artist.component';
import { AudioService } from "./audioplayer.service";
import { ArtistsComponent } from './artists/artists.component';
import { AlbumComponent } from './album/album.component';
import { AlbumsComponent } from './albums/albums.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SongsComponent,
    ArtistComponent,
    ArtistsComponent,
    AlbumComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faBackward,faPlay,faForward,faRandom,faRedo);
  }
}
