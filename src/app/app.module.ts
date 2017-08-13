import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/homeController';
import { PlayerComponent } from './shared/player/playerController';
import { CardComponent } from './shared/card/cardController';
@NgModule({
  declarations: [
    HomeComponent,
    PlayerComponent,
    CardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
