import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-audio',
  templateUrl: './search-audio.component.html',
  styleUrls: ['./search-audio.component.css']
})
export class SearchAudioComponent implements OnInit {

  @Input() id: string;
  @Input() artist: string;
  @Input() song: string;
  @Input() duration: number;

  @Output() onSelectAudio = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectAudio() {
    this.onSelectAudio.emit(this.id);
}
}
