import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAudioComponent } from './search-audio.component';

describe('SearchAudioComponent', () => {
  let component: SearchAudioComponent;
  let fixture: ComponentFixture<SearchAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
