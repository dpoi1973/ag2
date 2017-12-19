import {TestComponent} from './test';
import {TestBed, async} from '@angular/core/testing';

describe('test component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render hello world', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const hello = fixture.nativeElement;
    expect(hello.querySelector('h1').textContent).toBe('Hello World!');
  });
});
