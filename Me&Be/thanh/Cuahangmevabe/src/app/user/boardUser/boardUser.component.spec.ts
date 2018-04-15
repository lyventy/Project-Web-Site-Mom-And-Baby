import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoarduserComponent } from './boardUser.component';

describe('BoarduserComponent', () => {
  let component: BoarduserComponent;
  let fixture: ComponentFixture<BoarduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoarduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoarduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
