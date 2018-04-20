import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteruserComponent } from './footerUser.component';

describe('FooteruserComponent', () => {
  let component: FooteruserComponent;
  let fixture: ComponentFixture<FooteruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooteruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooteruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
