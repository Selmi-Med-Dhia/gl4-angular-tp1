import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCardComponent } from './cv-card.component';

describe('CvCardComponent', () => {
  let component: CvCardComponent;
  let fixture: ComponentFixture<CvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [CvCardComponent, DefaultImagePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
