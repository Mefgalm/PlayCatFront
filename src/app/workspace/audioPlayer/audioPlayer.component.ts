import { Component, ViewChild } from '@angular/core';
import { AudioPlayerService } from './audioPlayer.service';
import { Playlist } from '../../data/playlist';
import { BaseResult } from '../../data/response/baseResult';
import { Audiotrack } from '../../data/audio';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ContentAudioPlayerDialogComponent } from './content-audio-player-dialog.component';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'audioPlayer',
    templateUrl: 'audioPlayer.component.html',
    styleUrls: ['audioPlayer.component.css'],
})
export class AudioPlayerComponent {
    //@ViewChild('progressBar') progressBar;
    private _timeUpdateSubscription: any;
    private _audioChangedSubscription: any;
    private _actionChangedSubscription: any;
    private _playlistLoadedSubscription: any;
    private _isLoopChangedSubscription: any;
    private _playlistChangedSubscription: any;
    private _playlistUpdatedSubscription: any;

    public isPlaylistLoaded: boolean;
    public currentTime: number;

    public display: boolean;

    public addToPlaylistVisible: boolean;

    public playlists: Playlist[];
    public currentPlaylist: Playlist;
    public audio: Audiotrack;

    public isPlaying: boolean;

    public volume: number;

    public isLoop: boolean;

    public playListName: string;

    public selectedAudioId: string;

    public isAddToPlaylistError: boolean;
    public addToPlaylistError: string;

    constructor(private modalService: ModalService,
        private _audioPlayerService: AudioPlayerService,
        public dialog: MatDialog) {
        this.isPlaylistLoaded = false;
        this.display = false;
        this.addToPlaylistVisible = false;

        this.selectedAudioId = null;
        this.addToPlaylistError = null;

        this.isAddToPlaylistError = false;

        this.isPlaying = this._audioPlayerService.isPlaying();

        this.volume = this._audioPlayerService.getVolume() * 100;
        this.playlists = this._audioPlayerService.getPlaylists();
        this.currentPlaylist = this._audioPlayerService.getCurrentPlaylist();
        this.audio = this._audioPlayerService.getCurrentAudio();
        this.currentTime = this._audioPlayerService.getCurrentTime();
        this.isLoop = this._audioPlayerService.isLoop();

        if (this.playlists) {
            this.isPlaylistLoaded = true;
        } else {
            this._playlistLoadedSubscription = this._audioPlayerService.getOnPlayerLoadedEmitter()
                .subscribe(playlists => {
                    this.playlists = playlists;
                    this.isPlaylistLoaded = true;
                });
        }

        this._audioChangedSubscription = this._audioPlayerService.getOnAudioChanged()
            .subscribe(audio => this.audio = audio);

        this._timeUpdateSubscription = this._audioPlayerService.getOnTimeUpdateEmitter()
            .subscribe(currentTime => this.currentTime = currentTime);

        this._actionChangedSubscription = this._audioPlayerService.getOnActionChanged()
            .subscribe(isPlaingAction => this.isPlaying = isPlaingAction);

        this._playlistUpdatedSubscription = this._audioPlayerService.getOnPlaylistUpdated()
            .subscribe(playlist => {
                let index = this.playlists.findIndex(x => x.id == playlist.id);

                if (index !== -1) {
                    this.playlists.splice(index, 1);
                    this.playlists.splice(index, 0, playlist);
                }
            });

        this._isLoopChangedSubscription = this._audioPlayerService.getOnIsLoopEmitter()
            .subscribe(isLoop => this.isLoop = isLoop);

        this._playlistChangedSubscription = this._audioPlayerService.getOnPlaylistChanged()
            .subscribe(currentPlaylist => this.currentPlaylist = currentPlaylist);
    }

    showDialog() {
        // const dialogConfig = new MatDialogConfig();

        // dialogConfig.autoFocus = true;
        // dialogConfig.disableClose = true;
        // dialogConfig.hasBackdrop = true;
        // dialogConfig.backdropClass = null;
        // this.dialog.open(ContentAudioPlayerDialogComponent, dialogConfig);

        this.display = true;
    }

    hideDialog() {
        //this.dialog.closeAll();
        this.display = false;
    }

    play() {
        this._audioPlayerService.play();
    }

    playById(id: string) {
        this._audioPlayerService.playById(id);
    }

    pause() {
        this._audioPlayerService.pause();
    }

    next() {
        this._audioPlayerService.next();
    }

    toggleLoop() {
        this._audioPlayerService.setIsLoop(!this.isLoop);
    }

    previous() {
        this._audioPlayerService.previous();
    }

    volumeChanged(value: number) {
        this.volume = value;
        this._audioPlayerService.setVolume(this.volume / 100);
    }

    currentTimeChanged(value: number) {
        this.currentTime = value;
        this._audioPlayerService.setCurrentTime(this.currentTime);
    }

    selectPlaylist(playlist: Playlist) {
        this._audioPlayerService.selectPlaylist(playlist.id);
    }

    createPlaylist(playlist: Playlist) {
        this._audioPlayerService.createPlaylist(playlist.title);
    }

    updatePlaylist(playlist: Playlist) {
        this._audioPlayerService.updatePlaylist(playlist.id, playlist.title);
    }

    deletePlaylist(playlist: Playlist) {
        this._audioPlayerService.deletePlaylist(playlist.id);
    }

    onScrollDown() {
        this._audioPlayerService.loadAudios(this.currentPlaylist.id);
    }

    selectAudio(audioId: string) {
        this.selectedAudioId = audioId;
        this.addToPlaylistVisible = true;

        this.modalService.open("playlist-dialog");
    }

    closePlaylistDialog() {
        this.addToPlaylistVisible = false;
        this.modalService.close("playlist-dialog");
    }

    openModal(id: string) {
        this.display = true;
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.display = false;
        this.modalService.close(id);
    }

    async addToPlaylist(playlistId: string): Promise<void> {
        if (this.selectedAudioId) {
            this.isAddToPlaylistError = false;
            this.addToPlaylistError = null;

            let baseResult = await this._audioPlayerService.addToPlaylist(playlistId, this.selectedAudioId);

            this.isAddToPlaylistError = !baseResult.ok;
            if (this.isAddToPlaylistError) {
                this.addToPlaylistError = baseResult.info;
            } else {
                this.addToPlaylistVisible = false;
            }
        }
    }

    async removeFromPlaylist(audioId: string): Promise<void> {
        await this._audioPlayerService.removeFromPlaylist(audioId);
    }

    onNgDestroy() {
        this._playlistLoadedSubscription.unsubscribe();
        this._audioChangedSubscription.unsubscribe();
        this._timeUpdateSubscription.unsubscribe();
        this._isLoopChangedSubscription.unsubscribe();
        this._actionChangedSubscription.unsubscribe();
        this._playlistChangedSubscription.unsubscribe();
        this._playlistUpdatedSubscription.unsubscribe();
    }
}