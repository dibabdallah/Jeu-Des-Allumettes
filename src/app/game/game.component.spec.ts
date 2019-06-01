import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Player } from '../player';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ PlayerFormComponent, GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    startParty();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new party', () => {
    expect(component.started).toBeTruthy();
    expect(component.listMatch.length).toBe(10);
    expect(component.listPlayer.length).toBe(2);

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Celui qui prend la dernière allumette remporte la partie !');
    expect(fixture.nativeElement.textContent).toContain('C\'est au tour de ' + component.currentPlayer.name + ' : ');
  });

  it('should remove 1 match', () => {
    expect(component.started).toBeTruthy();

    component.isSelectable(0);
    expect(component.listMatch.filter(match => match.selected).length).toBe(1);

    component.removeMatches();
    expect(component.listMatch.filter(match => match.selected).length).toBe(0);
    expect(component.listMatch.length).toBe(9);
  });

  it('should remove 2 match', () => {

    component.isSelectable(1);
    expect(component.listMatch.filter(match => match.selected).length).toBe(2);

    component.removeMatches();
    expect(component.listMatch.filter(match => match.selected).length).toBe(0);
    expect(component.listMatch.length).toBe(8);
  });

  it('should remove 3 match', () => {

    component.isSelectable(2);
    expect(component.listMatch.filter(match => match.selected).length).toBe(3);

    component.removeMatches();
    expect(component.listMatch.filter(match => match.selected).length).toBe(0);
    expect(component.listMatch.length).toBe(7);
  });

  it('should not remove 4 match', () => {

    component.isSelectable(3);
    expect(component.listMatch.filter(match => match.selected).length).toBe(0);

    component.removeMatches();
    expect(component.listMatch.filter(match => match.selected).length).toBe(0);
    expect(component.listMatch.length).toBe(10);
  });

  it('should change the current player when remove matches', () => {
    let newPlayerExpected;
    for (let i = 0 ; i < 2 ; i++) {
      newPlayerExpected = component.listPlayer.filter((player) => player !== component.currentPlayer)[0];
      component.isSelectable(2);
      component.removeMatches();
      expect(newPlayerExpected).toBe(component.currentPlayer);
    }
  });

  it('should show the winner when the last match is remove', () => {
    for (let i = 0 ; i < 4 ; i++) {
      component.isSelectable(2);
      component.removeMatches();
    }
    expect(component.listMatch.length).toBe(0);
    expect(component.currentPlayer.nbVictory).toBe(1);

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(component.currentPlayer.name + ' a gagné la partie ! (1 victoire(s))');
  });

  it('should restart the game, with the same players and number of matches', () => {
    component.isSelectable(2);
    component.removeMatches();
    component.isSelectable(2);
    component.removeMatches();

    expect(component.listMatch.length).toBe(4);
    expect(component.listPlayer.length).toBe(2);
    expect(component.nbMatches).toBe(10);

    component.restartGame();

    expect(component.listMatch.length).toBe(10);
    expect(component.listPlayer.length).toBe(2);
    expect(component.nbMatches).toBe(10);
  });

  it('should reset the game, empty players and number of matches', () => {
    component.isSelectable(2);
    component.removeMatches();
    component.isSelectable(2);
    component.removeMatches();

    expect(component.listMatch.length).toBe(4);
    expect(component.listPlayer.length).toBe(2);
    expect(component.nbMatches).toBe(10);

    component.resetGame();

    expect(component.started).toBeFalsy();
    expect(component.listMatch.length).toBe(0);
    expect(component.listPlayer.length).toBe(0);
    expect(component.nbMatches).toBe(4);
  });

  function startParty() {
    component.listPlayer = [
      {nbVictory: 0, name: 'Joueur 1'},
      {nbVictory: 0, name: 'Joueur 2'}
    ];
    component.nbMatches = 10;
    component.startParty();
  }
});
