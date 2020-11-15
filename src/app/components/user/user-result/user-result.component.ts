import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

export interface DialogData {
  userDisplay: User;
}

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})
export class UserResultComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserResultComponent>,
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
