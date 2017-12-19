import {TestCompont} from './TestCompont';
import {TestBed, async} from '@angular/core/testing';

describe('test component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCompont
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render hello world', () => {
    const fixture = TestBed.createComponent(TestCompont);
    fixture.detectChanges();
    const hello = fixture.nativeElement;
    expect(hello.querySelector('h1').textContent).toBe('Hello World!');
  });
});


