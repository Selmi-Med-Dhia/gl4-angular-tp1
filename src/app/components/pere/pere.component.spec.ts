import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PereComponent } from './pere.component';

describe('PereComponent', () => {
  let component: PereComponent;
  let fixture: ComponentFixture<PereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: shallowTestSchemas,
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [ PereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
