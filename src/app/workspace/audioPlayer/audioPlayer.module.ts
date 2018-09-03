import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioPlayerComponent } from './audioPlayer.component';
import { AudioPlayerService } from './audioPlayer.service';
import { AudioService } from '../music/audios/audios.service';
import { ProgressBarModule } from '../../shared/components/progressBar.module';
import { DialogModule } from 'primeng/primeng';
import { SecondToTimePipe } from '../../shared/pipes/secondToTime.pipe';
import { PlaylistService } from './playlist.service';
import { ErrorModule } from '../../shared/components/error.module';
import { PlaylistComponent } from './playlist.component';
import { AudioComponent } from './audio.component';
import  {MatDialogModule } from '@angular/material/dialog';
import { ContentAudioPlayerDialogComponent } from './content-audio-player-dialog.component';
import { ModalModule } from '../../shared/components/modal/modal.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ErrorModule,
        ReactiveFormsModule,
        ProgressBarModule,
        MatDialogModule,
        DialogModule,
        ModalModule,
       InfiniteScrollModule
    ],
    declarations: [
        AudioPlayerComponent,
        SecondToTimePipe,
        PlaylistComponent,
        AudioComponent,
        ContentAudioPlayerDialogComponent],
    exports: [
        AudioPlayerComponent
    ],
    providers: [
        PlaylistService,
        AudioService
    ],
    entryComponents: [
        ContentAudioPlayerDialogComponent
    ]
})
export class AudioPlayerModule {

}