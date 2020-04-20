import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsComponent } from "./songs/songs.component"
import { ArtistComponent } from "./artist/artist.component"
import { ArtistsComponent } from "./artists/artists.component"
import { AlbumComponent } from "./album/album.component"
import { AlbumsComponent } from "./albums/albums.component"
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
// import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: 'songs', component: SongsComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'search', component: SearchComponent },
  { path: '', component: HomeComponent},
  // { path: 'upload', component: UploadComponent },
  // { path: '', redirectTo: '/songs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
