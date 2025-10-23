import { Component } from '@angular/core';
import sheet200 from './shared/data/sheet200';
import sheet400 from './shared/data/sheet400';
import { FirebaseService } from './shared/services/firebaseService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  curSheet: number = 1;

  sheetData: any[] = [];

  uploadData : any = {};

  difficultyMap = ['Easy', 'Medium', 'Hard'];

  activeStep: number = 0;
  activeSubstep: number = 0;

  constructor(private firebaseService : FirebaseService) { }

  async ngOnInit() {
    
    this.setupFirebaseConfig();

    let sheetState :any = localStorage.getItem('localData');
    if(sheetState)
    {
      sheetState = JSON.parse(sheetState);
      this.curSheet = sheetState.curSheet;
      this.activeStep = sheetState.activeStep;
      this.activeSubstep = sheetState.activeSubstep;
    }

    await this.loadSheetData();
  }

  setupFirebaseConfig() {
    let firebaseConfig :any = localStorage.getItem('firebaseConfig');

    if(firebaseConfig)
    {
      let config = null;

      try {
        config = JSON.parse(firebaseConfig);
        if(this.firebaseService.setConfig(config) == false) throw 'Invalid config';

      } catch {
        firebaseConfig = null;
      }
    }

    if(!firebaseConfig)
    {
      let done = false;
      while(done == false)
      {
        firebaseConfig = prompt('Enter Firebase config string');
        if(!firebaseConfig) continue;

        let config = null;
        try {
          config = JSON.parse(firebaseConfig);
        } catch {
          continue;
        }
        done = this.firebaseService.setConfig(config);
      }
      
      localStorage.setItem('firebaseConfig', firebaseConfig);
    }
  }

  async loadSheetData()
  {
    if(this.curSheet == 1)
    {
      this.sheetData = sheet200.sheetData;

      this.sheetData.forEach((stp:any) => {
        stp.topics.forEach((topic:any) => {

          this.uploadData[topic.id] = {
            questionId: topic.id,
            questionTitle: topic.title ?? "",
            difficulty: topic.difficulty ?? "1",
            isSolved: false
          };
        
        });
      });

      let sheetData : any = await this.firebaseService.getDocById('DSA_Sheet', 'sheet_200_status');
      if(sheetData)
      {
        Object.keys(sheetData.status).forEach((qId:any) => {
          this.uploadData[qId].isSolved = sheetData.status[qId].isSolved ?? false;
        });
      }
    }
    else
    {
      this.sheetData = sheet400;

      this.sheetData.forEach((stp:any) => {
        stp.sub_steps.forEach((substp:any) => {

          substp.topics.forEach((topic:any) => {

            this.uploadData[topic.id] = {
              questionId: topic.id,
              questionTitle: topic.question_title ?? "",
              difficulty: topic.difficulty ?? "1",
              isSolved: false
            };
          
          });
        
        });
      });

      let sheetData : any = await this.firebaseService.getDocById('DSA_Sheet', 'sheet_400_status');
      if(sheetData)
      {
        Object.keys(sheetData.status).forEach((qId:any) => {
          this.uploadData[qId].isSolved = sheetData.status[qId].isSolved ?? false;
        });
      }
    }
  }

  async updateState(target: string, data : any) {
    if(target == 'curSheet')
    {
      this.curSheet = data;
    }
    else if(target == 'activeStep')
    {
      this.activeStep = data;
    }
    else if(target == 'activeSubstep')
    {
      this.activeSubstep = data;
    }

    localStorage.setItem('localData', JSON.stringify({ curSheet: this.curSheet, activeStep: this.activeStep, activeSubstep: this.activeSubstep}));

    await this.loadSheetData();
  }

  updateData() {
    if(this.curSheet == 1)
    {
      this.firebaseService.updateDocById('DSA_Sheet', 'sheet_200_status', { status : this.uploadData });
    }
    else 
    {
      this.firebaseService.updateDocById('DSA_Sheet', 'sheet_400_status', { status : this.uploadData });
    }
  }
}
