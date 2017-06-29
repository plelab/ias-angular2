import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjaxComponent } from './ajax.component';

describe('AjaxComponent', () => {
  let component: AjaxComponent;
  let fixture: ComponentFixture<AjaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
