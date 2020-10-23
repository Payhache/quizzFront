import {Component, Inject, OnInit, NgZone, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  reponseName: string;
  reponseValue: string;
}

@Component({
  selector: 'app-reponse-add',
  templateUrl: './reponse-add.component.html',
  styleUrls: ['./reponse-add.component.css']
})
export class ReponseAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReponseAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private ngZone: NgZone) {
  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
