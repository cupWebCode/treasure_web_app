import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerModalComponent } from './new-player.component';

describe('NewPlayerModalComponent', () => {
  let component: NewPlayerModalComponent;
  let fixture: ComponentFixture<NewPlayerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlayerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
