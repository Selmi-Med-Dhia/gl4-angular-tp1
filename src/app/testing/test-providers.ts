import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const commonTestImports = [
  CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
];

export const shallowTestSchemas = [NO_ERRORS_SCHEMA];

export function commonTestProviders() {
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
