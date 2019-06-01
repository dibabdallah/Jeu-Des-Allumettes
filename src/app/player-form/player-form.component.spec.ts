import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFormComponent } from './player-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../player';

describe('PlayerFormComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ PlayerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.playerForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors = {};
    // tslint:disable-next-line:prefer-const
    let name = component.playerForm.controls['name'];
    errors = name.errors || {};
    expect(name.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });

  it('submitting the player form', () => {
    expect(component.playerForm.valid).toBeFalsy();
    component.playerForm.controls['name'].setValue('name 1');
    expect(component.playerForm.valid).toBeTruthy();

    component.submitPlayer();

    expect(component.submitted).toBeTruthy();

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(' name 1 est prêt à jouer !');

  });

});
