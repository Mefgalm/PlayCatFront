import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAudioPlayerDialogComponent } from './content-audio-player-dialog.component';

describe('ContentAudioPlayerDialogComponent', () => {
  let component: ContentAudioPlayerDialogComponent;
  let fixture: ComponentFixture<ContentAudioPlayerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAudioPlayerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAudioPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
