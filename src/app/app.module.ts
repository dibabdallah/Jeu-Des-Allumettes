import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameComponent } from './game/game.component';
import { PlayerFormComponent } from './player-form/player-form.component';

@NgModule({
  declarations: [
    GameComponent,
    PlayerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [GameComponent]
})
export class AppModule { }
