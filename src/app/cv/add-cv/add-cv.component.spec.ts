import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvComponent } from './add-cv.component';

describe('AddCvComponent', () => {
  let component: AddCvComponent;
  let fixture: ComponentFixture<AddCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: shallowTestSchemas,
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [ AddCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
