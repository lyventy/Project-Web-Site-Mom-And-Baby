import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangchuAdminComponent } from './trangchu-admin.component';

describe('TrangchuAdminComponent', () => {
  let component: TrangchuAdminComponent;
  let fixture: ComponentFixture<TrangchuAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangchuAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangchuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
