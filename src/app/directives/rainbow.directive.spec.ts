import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RainbowDirective } from './rainbow.directive';

@Component({
  imports: [RainbowDirective],
  template: '<input appRainbow><div appRainbow>Plain div</div>',
})
class TestHostComponent {}

describe('RainbowDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('only attaches to inputs', () => {
    expect(fixture.debugElement.queryAll(By.directive(RainbowDirective)).length).toBe(1);
  });

  it('updates the text and border color after a keyup', () => {
    const element = fixture.debugElement.query(By.directive(RainbowDirective));
    const directive = element.injector.get(RainbowDirective);

    element.nativeElement.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();

    expect(directive.color).toMatch(/^#[0-9a-f]{6}$/);
    expect(directive.borderColor).toBe(directive.color);
    expect((element.nativeElement as HTMLInputElement).style.color).toBeTruthy();
  });
});
