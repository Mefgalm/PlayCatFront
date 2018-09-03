import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
