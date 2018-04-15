import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangchuuserComponent } from './trangchuUser.component';

describe('TrangchuuserComponent', () => {
  let component: TrangchuuserComponent;
  let fixture: ComponentFixture<TrangchuuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangchuuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangchuuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
