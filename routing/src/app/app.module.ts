import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import {spotifywebApi} from 'spotify-web-api-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Media } from '@ionic-native/media';
// import { NoimagePipe } from './pipe/noimage.pipe';
import { NoavatarPipe } from './pipes/noavatar.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';
// import { IonicStorageModule} from '@ionic/storage'

@NgModule({
  declarations: [AppComponent, NoavatarPipe, NoimagePipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
