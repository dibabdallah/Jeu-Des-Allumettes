import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Player } from '../player';
import { Match } from '../match';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // List of player
  listPlayer: Player[];
  // Number of matches set
  nbMatches: number;
  // List of Match
  listMatch: Match[];
  // Current Player playing
  currentPlayer: Player;
  // Game is started
  started: boolean;

  constructor(private _gameService: GameService) { }

  // Init the variables to empty settings
  ngOnInit() {
    this.started = false;
    this.currentPlayer = null;
    this.nbMatches = 4;
    this.listMatch = [];
    this.listPlayer = [];

    // Subscribe to the service for the list of players
    this._gameService.getPlayers().subscribe(res => this.listPlayer = res);

    // DATA TEST FOR CONFIG PARTY;
    // this.listPlayer = [
    //   {nbVictory: 0, name: "Joueur 1"},
    //   {nbVictory: 0, name: "Joueur 2"}
    // ];
    // this.nbMatches = 21;
    // this.startParty();
  }

  // Action triggered when player are defined also as the number of matches
  startParty() {
    // Check if the config is right
    if (this.listPlayer.length === 2 && this.nbMatches > 3 && this.nbMatches <= 100) {
      this.started = true;

      // Set the player who's going to started playing
      this.currentPlayer = this.listPlayer[Math.floor(Math.random() * 2)];

      // Populate the list of matches according to the number of matches set
      for (let i = 0; i < this.nbMatches ; i++) {
        this.listMatch.push(new Match());
      }
    }
  }

  // Action triggered when the mouse is over a match
  isSelectable(index: number) {
    // If the current match is at least the third
    if (index < 3) {
      // Set the property "selected" to true, for the matches selected
      this.listMatch.filter((match, i) => {
        match.selected = (i <= index) ? true : false;
      });
    }
  }

  // Action triggered for removing the matches selected
  removeMatches() {
    // Si au moins 1 match is selected && pas plus de 3
    if (this.listMatch.filter(match => match.selected).length > 0 && this.listMatch.filter(match => match.selected).length < 4) {
      // Update the list of match with the ones who are not selected
      this.listMatch = this.listMatch.filter((match) => match.selected !== true);

      // If : the new list of match is empty : the winner is the current player
      if (this.listMatch.length === 0) {
        this.currentPlayer.nbVictory += 1;
      } else {
        this.currentPlayer = this.listPlayer.filter((player) => player !== this.currentPlayer)[0];
      }
    }
  }

  // Restart the game with the same settings (players & nbMatch)
  restartGame(): void {
    this.listMatch = [];
    this.startParty();
  }

  // Reset all the settings of the game (start from scratch)
  resetGame(): void {
    this._gameService.removeAllPlayers();
    this.ngOnInit();
  }
}
