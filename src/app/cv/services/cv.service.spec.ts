import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { TestBed } from '@angular/core/testing';

import { CvService } from './cv.service';

describe('CvService', () => {
  let service: CvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: commonTestImports,
      providers: commonTestProviders(),});
    service = TestBed.inject(CvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
