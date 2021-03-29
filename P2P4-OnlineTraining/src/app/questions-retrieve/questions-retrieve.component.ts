import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Question } from '../questions.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-questions-retrieve',
  templateUrl: './questions-retrieve.component.html',
  styleUrls: ['./questions-retrieve.component.css']
})
export class QuestionsRetrieveComponent implements OnInit {

  questionsnanswers:Array<Question> = [];
  selectedVal: string = '';
  totalCorrect: number = 0;
  totalScore: number = 0;
  QnADetails = new FormGroup({
    options: new FormControl()
  });


  constructor(public mcqSer:QuestionsService) { } //DI for Questions Service

  ngOnInit(): void {
    this.mcqSer.loadQuestionAnswers().subscribe(result=>this.questionsnanswers=result);
    //console.log(result=>this.questionsnanswers=result);
  }
  

  onItemChange(value: any){
    //console.log(" Value is : ", value );
  }
  storeQuesVals(quesRef: any){
    //console.log(quesRef);
    //console.log("After");
    JSON.stringify(this.questionsnanswers);
    for(let i in this.questionsnanswers){
      //console.log(this.questionsnanswers[i].correctAnswer);
      for(let x in quesRef){
        if(quesRef[x] == this.questionsnanswers[i].correctAnswer){
          //console.log("Correct");
          this.totalCorrect++;
        }
      }
      
    }
    this.totalScore = (this.totalCorrect / this.questionsnanswers.length) * 100;
    
    if(this.totalScore > 70)
      alert("Total Score is: " + this.totalScore + "! YOU PASSED!");
    else
      alert("Total Score is: " + this.totalScore + "! Try Again!");
    this.totalCorrect = 0;
    this.totalScore = 0;
  }
  radioChangeHandler (event: any) {
    //update the ui
    this.selectedVal = event.target.value;
    //console.log(this.selectedVal);
  }
}
