import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/homeController';
import { IndexComponent } from './components/index/indexController';
import { PlayerComponent } from './shared/player/playerController';
import { CardComponent } from './shared/card/cardController';
import { routing }      	  from './route';
@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    PlayerComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [IndexComponent]
})
export class AppModule { }
