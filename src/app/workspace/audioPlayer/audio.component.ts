import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'audiotrack',
    templateUrl: 'audio.component.html',
    styleUrls: ['audio.component.css'],
})

export class AudioComponent {
    @Input() id: string;
    @Input() artist: string;
    @Input() song: string;
    @Input() duration: number;

    @Output() onPlayStart = new EventEmitter();
    @Output() onSelectAudio = new EventEmitter<string>();
    @Output() onRemoveFromPlaylist = new EventEmitter<string>();

    play() {
        this.onPlayStart.emit();
    }

    selectAudio() {
        this.onSelectAudio.emit(this.id);
    }

    removeFromPlaylist() {
        this.onRemoveFromPlaylist.emit(this.id);
    }
}