import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamUserComponent } from './sanpham-user.component';

describe('SanphamUserComponent', () => {
  let component: SanphamUserComponent;
  let fixture: ComponentFixture<SanphamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
