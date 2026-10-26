import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniWordComponent } from './mini-word.component';

describe('MiniWordComponent', () => {
  let component: MiniWordComponent;
  let fixture: ComponentFixture<MiniWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [ MiniWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
