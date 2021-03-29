import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsRetrieveComponent } from './questions-retrieve.component';

describe('QuestionsRetrieveComponent', () => {
  let component: QuestionsRetrieveComponent;
  let fixture: ComponentFixture<QuestionsRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsRetrieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
