import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderuserComponent } from './headerUser.component';

describe('HeaderuserComponent', () => {
  let component: HeaderuserComponent;
  let fixture: ComponentFixture<HeaderuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
