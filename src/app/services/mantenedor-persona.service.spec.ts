import { TestBed } from '@angular/core/testing';

import { MantenedorPersonaService } from './mantenedor-persona.service';

describe('MantenedorPersonaService', () => {
  let service: MantenedorPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
