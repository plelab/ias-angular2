import {TestBed, inject} from '@angular/core/testing';

import {AjaxService} from './ajax.service';

describe('AjaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxService]
    });
  });

  it('should be created', inject([AjaxService], (service: AjaxService) => {
    expect(service).toBeTruthy();
  }));
});
