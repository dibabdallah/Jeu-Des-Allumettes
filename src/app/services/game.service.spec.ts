import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { Player } from '../player';

describe('GameService', () => {

  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
    service = new GameService();
  });

  // tslint:disable-next-line:no-shadowed-variable
  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('#getPlayers should return empty value', () => {
    service.getPlayers().subscribe(value => {
      expect(value).toEqual([]);
    });
  });

  it('#getPlayers should return 1 player', () => {
    // tslint:disable-next-line:prefer-const
    let player: Player = {nbVictory: 0, name: 'Name 1'};
    service.addPlayer(player);
    service.getPlayers().subscribe(value => {
      expect(value).toEqual([player]);
      expect(value[0].name).toEqual(player.name);
    });
  });

  it('#getPlayers should return 1 player and then empty value', () => {
    const player: Player = {nbVictory: 0, name: 'Name 1'};
    service.addPlayer(player);
    service.getPlayers().subscribe(value => {
      expect(value).toEqual([player]);
      expect(value[0].name).toEqual(player.name);
    });
    service.removeAllPlayers();
    service.getPlayers().subscribe(value => {
      expect(value).toEqual([]);
    });
  });

  it('#getPlayers should return 2 players and then empty value', () => {
    const player: Player = {nbVictory: 0, name: 'Name 1'};
    const player2: Player = {nbVictory: 0, name: 'Name 2'};
    service.addPlayer(player);
    service.addPlayer(player2);
    service.getPlayers().subscribe(value => {
      expect(value.length).toBe(2);
      expect(value[1].name).toEqual(player2.name);
    });
    service.removeAllPlayers();
    service.getPlayers().subscribe(value => {
      expect(value).toEqual([]);
    });
  });
});
