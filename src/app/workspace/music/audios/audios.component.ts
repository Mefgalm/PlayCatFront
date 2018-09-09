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
    private readonly defaultSkip = 0;
    private readonly defaultTake = 20;
    
    public audios: Audiotrack[];
    private _skip: number;
    private _take: number;
    private selectedAudioId: string;
    private addToPlaylistVisible: boolean;
    private _playlists: SimplePlaylist[];
    private isAddToPlaylistError: boolean;
    private addToPlaylistError: string;
    private isAudiosIsLoading: boolean;

    constructor(private _audioService: AudioService,
                private _modalService: ModalService,
                private _playlistService: PlaylistService) {        
    }

    ngOnInit(): void {
        this._skip = this.defaultSkip;
        this._take = this.defaultTake;
        this.isAudiosIsLoading = true;
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
                this.isAudiosIsLoading = false;
            });
    }

    onKeyUp(value: string) {
        this._skip = this.defaultSkip;
        this._take = this.defaultTake;

        this.isAudiosIsLoading = true;
        this._audioService.searchAudios(value, this._skip, this._take)
            .then(result => {
                if(result.ok) {
                    this.audios = result.audios;
                }
                else {
                    console.log(result.info);
                }
                this.isAudiosIsLoading = false;
            });
    }

    async addToPlaylist(playlistId: string): Promise<void> {
        if (this.selectedAudioId) {
            this.isAddToPlaylistError = false;
            this.addToPlaylistError = null;

            let baseResult = await this._audioService.addAudioToPlaylist(playlistId, this.selectedAudioId);

            this.isAddToPlaylistError = !baseResult.ok;
            if (this.isAddToPlaylistError) {
                this.addToPlaylistError = baseResult.info;
            } else {
                this.addToPlaylistVisible = false;
            }
        }
    }    

    selectAudio(audioId: string) {
        this.selectedAudioId = audioId;
        this.addToPlaylistVisible = true;
        this.isAddToPlaylistError = false;
        this.addToPlaylistError = null;

        this._modalService.open("playlist-dialog");
    }

    closePlaylistDialog() {
        this.addToPlaylistVisible = false;
        this._modalService.close("playlist-dialog");
    }
}