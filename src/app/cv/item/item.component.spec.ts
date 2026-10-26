import { Cv } from '../model/cv';
import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { commonTestImports, commonTestProviders, shallowTestSchemas } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestImports,
      providers: commonTestProviders(),
      declarations: [ItemComponent, DefaultImagePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.cv = new Cv(1, 'Test', 'User', 'Developer', '', '123456', 25);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
