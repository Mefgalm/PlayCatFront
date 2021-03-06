﻿import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';
import { Playlist } from '../../data/playlist';
import { ValidationModel } from '../../data/validationModel';
import { FormService } from '../../shared/services/form.service';
import { PlaylistEdit } from '../../data/playlistEdit';

@Component({
    selector: 'playlist',
    templateUrl: 'playlist.component.html',
    styleUrls: ['playlist.component.css'],
})

export class PlaylistComponent {
    private createModelName = 'CreatePlaylistRequest';
    private updateModelName = 'UpdatePlaylistRequest';

    @Input() playlists: Playlist[];
    @Input() currentPlaylist: Playlist;

    public editPlaylists: PlaylistEdit[];

    @Output() onCreate: EventEmitter<Playlist>;
    @Output() onEdit:   EventEmitter<Playlist>;
    @Output() onDelete: EventEmitter<Playlist>;
    @Output() onSelect: EventEmitter<Playlist>;

    public createPlaylistForm: FormGroup;
    public updatePlaylistForm: FormGroup;

    public createErrorsValidation: Map<string, Map<string, ValidationModel>>;
    public updateErrorsValidation: Map<string, Map<string, ValidationModel>>;

    constructor(
        private _fb: FormBuilder,
        private _validationService: ValidationService,
        private _formService: FormService,
    ) {
        this.onCreate = new EventEmitter<Playlist>();
        this.onEdit =   new EventEmitter<Playlist>();
        this.onDelete = new EventEmitter<Playlist>();
        this.onSelect = new EventEmitter<Playlist>();

        this.createErrorsValidation = new Map<string, Map<string, ValidationModel>>();
        this.updateErrorsValidation = new Map<string, Map<string, ValidationModel>>();

        this.createPlaylistForm = this._fb.group({
            title: [null],
        });

        this.updatePlaylistForm = this._fb.group({
            playlistId: [null],
            title: [null],
        });
    }

    ngOnInit() {
        this._validationService
            .get(this.createModelName)
            .then(res => {
                this.createErrorsValidation = res;
                this.createPlaylistForm = this._formService.buildFormGroup(res);
            });

        this._validationService
            .get(this.updateModelName)
            .then(res => {
                this.updateErrorsValidation = res;
                this.updatePlaylistForm = this._formService.buildFormGroup(res);
            });
    }

    ngOnChanges() {
        this.editPlaylists = new Array<PlaylistEdit>();

        for (let pl of this.playlists) {
            let playlistEdit = pl as PlaylistEdit;
            playlistEdit.isEditing = false;

            this.editPlaylists.push(playlistEdit);
        }
    } 

    startEdit(playlistEdit: PlaylistEdit) {
        this.editPlaylists.forEach(x => x.isEditing = false);

        playlistEdit.isEditing = true;

        this.updatePlaylistForm.setValue({
            playlistId: playlistEdit.id,
            title: playlistEdit.title
        });
    }

    delete(playlistEdit: PlaylistEdit) {
        let playlist = new Playlist();
        playlist.id = playlistEdit.id;

        this.onDelete.emit(playlist);
    }

    stopEdit(playlistEdit: PlaylistEdit) {
        playlistEdit.isEditing = false;
    }

    select(playlist: Playlist) {
        console.log(playlist.id);
        this.onSelect.emit(playlist);
    }

    create({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            let playlist = new Playlist();
            playlist.title = value.title;

            this.onCreate.emit(playlist);
        } else {
            this._formService.markControlsAsDirty(this.createPlaylistForm);
        }
    }

    update({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            let playlist = new Playlist();
            playlist.title = value.title;
            playlist.id = value.playlistId;

            this.onEdit.emit(playlist);
        } else {
            this._formService.markControlsAsDirty(this.updatePlaylistForm);
        }
    }
}