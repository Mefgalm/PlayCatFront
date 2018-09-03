import { Component, OnInit } from '@angular/core';
import { AudioService } from './audios.service';
import { Audiotrack } from '../../../data/audio';

@Component({
    selector: 'audios',
    templateUrl: 'audios.component.html',
    styleUrls: ['audios.component.css'],
})
export class AudiosComponent implements OnInit {
    
    public audios: Audiotrack[];
    private _skip: number;
    private _take: number;

    constructor(private _audioService: AudioService) {        
    }

    ngOnInit(): void {
        this._skip = 0;
        this._take = 20;

        this._audioService.searchAudios("", this._skip, this._take)
            .then(result => {
                if(result.ok) {
                    this.audios = result.audios;
                }
                else {
                    console.log(result.info);
                }
            });
    }

}