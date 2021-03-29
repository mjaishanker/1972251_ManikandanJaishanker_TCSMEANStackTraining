import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './questions.model';


@Injectable({
  providedIn: 'root'  // Equal to provided in app.module.ts file
})
export class QuestionsService {

  constructor(public http:HttpClient) {
  }

  loadQuestionAnswers():Observable<Question[]> {
    //console.log(this.http.get<Question[]>("/assets/mqc.json"));
    return this.http.get<Question[]>("/assets/mqc.json");
  }

}
