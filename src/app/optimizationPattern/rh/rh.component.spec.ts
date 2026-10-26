import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhComponent } from './rh.component';

describe('RhComponent', () => {
  let component: RhComponent;
  let fixture: ComponentFixture<RhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: shallowTestSchemas,
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [ RhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
