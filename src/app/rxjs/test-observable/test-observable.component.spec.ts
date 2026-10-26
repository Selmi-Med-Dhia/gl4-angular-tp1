import { componentTestProviders } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestObservableComponent } from './test-observable.component';

describe('TestObservableComponent', () => {
  let component: TestObservableComponent;
  let fixture: ComponentFixture<TestObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TestObservableComponent],
    providers: componentTestProviders(),
})
    .compileComponents();

    fixture = TestBed.createComponent(TestObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
