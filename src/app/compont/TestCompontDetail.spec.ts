import {TestCompontDetail} from './TestCompontDetail';
import {TestBed, async} from '@angular/core/testing';

describe('test component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCompontDetail
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'FountainJS team\'', () => {
    const fixture = TestBed.createComponent(TestCompontDetail);
    fixture.detectChanges();
    const footer = fixture.nativeElement;
    expect(footer.querySelector('a').textContent.trim()).toBe('FountainJS team');
  });
});

