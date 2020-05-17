import { TestBed, async, inject } from '@angular/core/testing';

import { SplashGuard } from './splash.guard';

describe('SplashGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplashGuard]
    });
  });

  it('should ...', inject([SplashGuard], (guard: SplashGuard) => {
    expect(guard).toBeTruthy();
  }));
});
