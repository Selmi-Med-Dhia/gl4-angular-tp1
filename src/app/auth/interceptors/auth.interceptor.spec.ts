import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: commonTestImports,
    providers: [...commonTestProviders(),
      AuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
