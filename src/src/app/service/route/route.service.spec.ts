import {TestBed, inject} from '@angular/core/testing';

import {RouteService} from './route.service';

describe('AjaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteService]
    });
  });

  it('should be created', inject([RouteService], (service: RouteService) => {
    expect(service).toBeTruthy();
  }));
});
