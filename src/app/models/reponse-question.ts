 import { Question } from './question';
 import {Examen} from './examen';

 export class ReponseQuestion {
    id: number;
    name: string;
    isOk: boolean;
    explanation: string;
    picture: string;
    picture2: string;
    picture3: string;
    question: Question|any;
}
