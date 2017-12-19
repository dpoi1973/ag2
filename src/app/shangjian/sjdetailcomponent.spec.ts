import {SJDetailcomponent} from './sjdetailcomponent';
import {TestBed, async} from '@angular/core/testing';

describe('test component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SJDetailcomponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'FountainJS team\'', () => {
    const fixture = TestBed.createComponent(SJDetailcomponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement;
    expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
  });
});

