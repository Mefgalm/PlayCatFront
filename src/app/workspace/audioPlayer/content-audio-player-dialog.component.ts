import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-content-audio-player-dialog',
  templateUrl: './content-audio-player-dialog.component.html',
  styleUrls: ['./content-audio-player-dialog.component.css']
})
export class ContentAudioPlayerDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ContentAudioPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
}

  ngOnInit() {
  }

  save() {
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}
