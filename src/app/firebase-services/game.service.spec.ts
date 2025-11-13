import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service.js';

describe('GameServiceTs', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
