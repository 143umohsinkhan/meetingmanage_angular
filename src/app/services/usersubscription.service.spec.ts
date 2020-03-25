import { TestBed } from '@angular/core/testing';

import { UsersubscriptionService } from './usersubscription.service';

describe('UsersubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersubscriptionService = TestBed.get(UsersubscriptionService);
    expect(service).toBeTruthy();
  });
});
