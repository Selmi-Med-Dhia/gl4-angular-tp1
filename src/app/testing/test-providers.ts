import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export function componentTestProviders() {
  return [
    provideHttpClient(),
    provideHttpClientTesting(),
    provideRouter([]),
    {
      provide: ToastrService,
      useValue: jasmine.createSpyObj<ToastrService>('ToastrService', [
        'error', 'info', 'success', 'warning',
      ]),
    },
  ];
}
