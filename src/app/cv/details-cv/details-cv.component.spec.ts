import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCvComponent } from './details-cv.component';

describe('DetailsCvComponent', () => {
  let component: DetailsCvComponent;
  let fixture: ComponentFixture<DetailsCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [DetailsCvComponent, DefaultImagePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
