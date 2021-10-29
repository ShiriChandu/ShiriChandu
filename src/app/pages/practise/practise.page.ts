import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.page.html',
  styleUrls: ['./practise.page.scss'],
})
export class PractisePage implements OnInit {
  taskId = '';
  taskList: any= [];
  subtaskList: any= [];
  subtaskListPhase2: any= [];
  subtaskListPhase3: any= [];
  subtaskListPhase4: any= [];
  subtaskListPhase5: any= [];
  subtaskListPhase6: any= [];

  isShownphase1 = false;
  isShownphase2 = false;
  isShownphase3 = false;
  isShownphase4 = false;
  isShownphase5 = false;
  isShownphase6 = false;


  constructor(private database: DatabaseService) {
    this.getTasksOfPareZero();
  }

  ngOnInit() {
  }

  projectChangePhase1($event) {
    console.log($event.target.value);
    this.taskId = $event.target.value;
    this.getsubTasks(this.taskId);




  }
  getTasksOfPareZero() {
    this.database.getSubTaskOfParentIdzero().then((res) => {
      this.taskList = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.taskList.push(res.rows.item(i));
        }
      }
    });
  }

  getsubTasks(parentId: any) {
    this.database.getSubTasksOfProjcts(parentId).then((data1) => {
      this.subtaskList = [];
      if (data1.rows.length > 0) {
        for (let i = 0; i < data1.rows.length; i++) {
          this.subtaskList.push(data1.rows.item(i));
        }
        this.toggleShowPhase1();
      }else{
        this.isShownphase1 = false;
        this.isShownphase2 = false;
        this.isShownphase3 = false;
        this.isShownphase4 = false;
        this.isShownphase5 = false;
        this.isShownphase6 = false;


      }
    });
  }

  toggleShowPhase1(){
    this.isShownphase1 = !this.isShownphase1;
  }

  // phase2 ....

  projectChangePhase2($event){
    console.log($event.target.value);
    this.taskId = $event.target.value;
    this.getsubTasksPhase2(this.taskId);




  }
  getsubTasksPhase2(parentId: any) {
    this.database.getSubTasksOfProjcts(parentId).then((data1) => {
      this.subtaskListPhase2 = [];
      if (data1.rows.length > 0) {
        for (let i = 0; i < data1.rows.length; i++) {
          this.subtaskListPhase2.push(data1.rows.item(i));
        }
        this.toggleShowPhase2();
      }else{
        this.isShownphase2 = false;
        this.isShownphase3 = false;
        this.isShownphase4 = false;
        this.isShownphase5 = false;
        this.isShownphase6 = false;

      }
    });
  }
  toggleShowPhase2(){
    this.isShownphase2 = !this.isShownphase2;
  }


}
