import { TestBed } from '@angular/core/testing';

import { GameServiceTs } from './game.service.ts.js';

describe('GameServiceTs', () => {
  let service: GameServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
