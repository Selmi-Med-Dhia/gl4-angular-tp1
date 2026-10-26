import { componentTestProviders } from '../../testing/test-providers';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NavbarComponent],
    providers: componentTestProviders(),
})
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('targets the collapsible menu', () => {
    const toggle = fixture.nativeElement.querySelector('.navbar-toggler');
    expect(toggle.getAttribute('data-bs-target')).toBe('#navbarNavAltMarkup');
  });
});
