import { Component, OnInit } from '@angular/core';
import { AudioService } from './audios.service';
import { Audiotrack } from '../../../data/audio';
import { ModalService } from '../../../shared/services/modal.service';
import { PlaylistService } from '../../audioPlayer/playlist.service';
import { UserPlaylistsResult } from '../../../data/response/userPlaylistsResult';
import { Playlist } from '../../../data/playlist';
import { SimplePlaylist } from '../../../data/simplePlaylist';

@Component({
    selector: 'audios',
    templateUrl: 'audios.component.html',
    styleUrls: ['audios.component.css'],
})
export class AudiosComponent implements OnInit {
    
    public audios: Audiotrack[];
    private _skip: number;
    private _take: number;
    private selectedAudioId: string;
    private addToPlaylistVisible: boolean;
    private _playlists: SimplePlaylist[];

    constructor(private _audioService: AudioService,
                private _modalService: ModalService,
                private _playlistService: PlaylistService) {        
    }

    ngOnInit(): void {
        this._skip = 0;
        this._take = 20;

        this._playlistService.allUserPlaylists()
            .then(result => {
                if(result.ok) {
                    this._playlists = result.playlists;
                }
            });

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

    selectAudio(audioId: string) {
        this.selectedAudioId = audioId;
        this.addToPlaylistVisible = true;

        this._modalService.open("playlist-dialog");
    }

    closePlaylistDialog() {
        this.addToPlaylistVisible = false;
        this._modalService.close("playlist-dialog");
    }
}