import { NumberValueAccessor } from '@angular/forms';
import { Examen } from './examen';
import { HttpResponseBase } from '@angular/common/http';
import { ReponseQuestion } from './reponse-question';

export class Question {
    id:number;
    nbr:number;
    name:string;
    picture:string;
    examen:Examen;
    reponses:ReponseQuestion;
}
