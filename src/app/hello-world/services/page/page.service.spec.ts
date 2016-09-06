import { Injectable } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

import { PageService } from './page.service';

@Injectable()
class DummyService {
  constructor(private page: PageService) {}

  getTitle() {
    return this.page.getTitle();
  }
}

@Injectable()
class FakeService {
  getTitle() {
    return 'bbbbb';
  }
}

describe('PageService', function() {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PageService,
          useClass: FakeService
        },
        DummyService
      ]
    });
  });

  it('should be fun', inject([DummyService], (service) => {
    service.getTitle();
  }));

  it('should work', function() {
    expect(true).toBeTruthy();
  });
});
