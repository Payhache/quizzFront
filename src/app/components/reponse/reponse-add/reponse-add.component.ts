import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {QuestionListComponent} from '../../question/question-list/question-list.component';

export interface DialogData {
  reponseName: string;
  reponseValue: string;
}

interface ReponseStatus {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-reponse-add',
  templateUrl: './reponse-add.component.html',
  styleUrls: ['./reponse-add.component.css']
})
export class ReponseAddComponent implements OnInit {

  reponseValues: ReponseStatus[] = [
    {value: 0, viewValue: 'Bonne réponse'},
    {value: 1, viewValue: 'Mauvaise réponse'},
  ];

  constructor(public dialogRef: MatDialogRef<ReponseAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
