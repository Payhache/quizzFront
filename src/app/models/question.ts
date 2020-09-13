import { Examen } from './examen';
import { ReponseQuestion } from './reponse-question';

export class Question {
    id: number;
    name: string;
    picture: string;
    examen: Examen|any;
    reponses: ReponseQuestion;
}
