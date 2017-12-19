import {SJcomponent} from './sjcomponent';
import {TestBed, async} from '@angular/core/testing';

describe('test component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SJcomponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'FountainJS team\'', () => {
    const fixture = TestBed.createComponent(SJcomponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement;
    expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
  });
});

