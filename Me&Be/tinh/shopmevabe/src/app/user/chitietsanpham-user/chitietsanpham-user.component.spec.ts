import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietsanphamUserComponent } from './chitietsanpham-user.component';

describe('ChitietsanphamUserComponent', () => {
  let component: ChitietsanphamUserComponent;
  let fixture: ComponentFixture<ChitietsanphamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietsanphamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietsanphamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
