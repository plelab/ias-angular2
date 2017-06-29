import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipartComponent } from './multipart.component';

describe('MultipartComponent', () => {
  let component: MultipartComponent;
  let fixture: ComponentFixture<MultipartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
