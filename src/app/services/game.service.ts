import { Injectable, EventEmitter } from '@angular/core';
import { Player } from '../player';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  listPlayer: Player[] = [];


  addPlayer(player: Player) {
    this.listPlayer.push(player);
  }

  getPlayers(): Observable<Player[]> {
    return of(this.listPlayer);
  }

  removeAllPlayers(): void {
    this.listPlayer = [];
  }
}
