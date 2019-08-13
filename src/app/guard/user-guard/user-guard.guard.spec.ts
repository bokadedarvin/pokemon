import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuardGuard } from './user-guard.guard';

describe('LoginGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuardGuard]
    });
  });

  it('should ...', inject([UserGuardGuard], (guard: UserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
