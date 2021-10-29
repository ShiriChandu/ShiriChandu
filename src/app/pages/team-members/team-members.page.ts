import { TaskService } from './../../services/task.service';
import { Constants } from 'src/app/common/common-constants';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { JsonInt } from './../../one-item';
import { DDTArray } from 'src/app/models/ddtasksarry-items';
import { AlertController } from '@ionic/angular';

import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.page.html',
  styleUrls: ['./team-members.page.scss'],
})
export class TeamMembersPage implements OnInit {
  taskNamePro='';
  assignProjList: any = [];
  empList: any = [];
  emptaskList: any = [];
  showContent = true;
  isShown = false; // hidden by default
  isShownNew = false; // hidden by default
  isShownAddTask = false; // hidden by default
  isShownCalender = false; // hidden by default
  isShowInput=false;

  projectId = '';
  employeeId = '';
  newsubTaskval = '';
  existNew = '';
  hours: any;

  menuLevel1 = null;
  menuLevel2 = null;
  menuLevel3 = null;

  public navPages: any = [];
  isShowTaskList =  false;

  taskMainId = '';
  taskName = '';

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
  };

  minDate = new Date().toISOString();

  inputJSON = {
    createddate: '2017-04-13 10:12:12',
    currenttime: '2017-04-13 11:12:46',
  };

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  collapseCard = false;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  //https://github.com/ryaa/ionic3-multi-level-select

  constructor(
    private database: DatabaseService,
    private router: Router,
    private http: HTTP,
    private taskService: TaskService,
    private alertCtrl: AlertController,

    @Inject(LOCALE_ID) private locale: string
  ) {
    this.getAssignedProjects();
  }

  ngOnInit() {}
  getAssignedProjects() {
    this.database.getAssignedProjects().then((data) => {
      this.assignProjList = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.assignProjList.push(data.rows.item(i));
        }
      }
    });
  }
  getResponseFromServer11() {
    this.router.navigate(['practise']);
  }
  projectChange($event) {
    console.log($event.target.value);
    this.projectId = $event.target.value;

    this.getEmployeesByProjectsById($event.target.value);
    this.callServiceTasks($event.target.value);
    //this.getResponseFromServer($event.target.value);
  }

  getEmployeesByProjectsById(projectId: string) {
    this.database.getEmployees(projectId).then((data) => {
      this.empList = [];
      console.log('size: ', data.rows.length);
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.empList.push(data.rows.item(i));
        }
      }
    });
  }
  employeeChange($event) {
    console.log($event.target.value);
    this.employeeId = $event.target.value;
    this.getResponseOfEmployeeTask(this.projectId, $event.target.value);
    this.toggleShowCalendar();
  }
  gotoCalenderscreen() {
    this.router.navigate(['calender']);
  }

  getResponseFromServer(projectId: any) {
    this.http
      .get(
        'http://sraossinc.net:7071/dailydiaryapi/getallprojecttasks/projectid/' +
          projectId,
        {},
        {}
      )
      .then((response) => {
        const responsebody: string = response.data;

        const obj: JsonInt = JSON.parse(responsebody);

        const error1 = obj.error;

        if (error1 === false) {
          const data: string = obj.data;

          const projectTasks = obj.data;
          const myObjStr = JSON.stringify(data);
          const obj2: DDTArray = JSON.parse(myObjStr);

          const projcetTasks = obj2.tasks;
          console.log('projcetTasks', projcetTasks);
          for (const value of projcetTasks) {
            const tId = Object.values(value)[0];
            const task = Object.values(value)[1];
            const parentTask = Object.values(value)[2];
            const haschild = Object.values(value)[3];

            this.addProjectTasks(tId, task, parentTask, haschild);
          }
        }
      });
  }

  addProjectTasks(tid: any, task: any, parenttask: any, haschild: any) {
    this.database.addDDTasksData(tid, task, parenttask, haschild).then(() => {
      console.log('DDTasks added');
    //  this.getTasksOfPareZero();
    });
  }

  getResponseOfEmployeeTask(projectId: any, employeeId: any) {
    this.http
      .get(
        'http://sraossinc.net:7071/dailydiaryapi/getallprojectemployeetasks/projectid/' +
          projectId +
          '/employeeid/' +
          employeeId,
        {},
        {}
      )
      .then((response) => {
        const responsebody: string = response.data;

        const obj: DDTArray = JSON.parse(responsebody);

        const error1 = obj.error;

        if (error1 === false) {
          const employeeTasks = obj.data;
          console.log('employeeTasks', employeeTasks);
          for (const value of employeeTasks) {
            const tId = Object.values(value)[0];
            const task = Object.values(value)[1];
            const parentTask = Object.values(value)[2];
            const startdate = Object.values(value)[3];
            const enddate = Object.values(value)[4];
            const estimatedhrs = Object.values(value)[5];

            console.log('startdate', startdate);
            this.addEmployeeTasks(
              tId,
              task,
              parentTask,
              startdate,
              enddate,
              estimatedhrs
            );
          }
        }
      });
  }
  addEmployeeTasks(
    tid: any,
    task: any,
    parentTask: any,
    startdate: any,
    enddate: any,
    estimatedhrs: any
  ) {
    this.database
      .addEmployeeTasksData(
        tid,
        task,
        parentTask,
        startdate,
        enddate,
        estimatedhrs
      )
      .then(() => {
        console.log('Employee Tasks added');
        this.getEmployeeTaskList();
      });
  }

  //calender....

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
    };
  }

  getDataDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    const minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    const seconds =
      Math.floor(diff / 1000) -
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
    this.hours = hours;
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
      this.toggleShowAddTaskClose();
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

    const date1 = new Date(eventCopy.startTime);
    const date2 = new Date(eventCopy.endTime);

    const format = 'YYYY-MM-dd HH:mm:ss';

    const locale = 'en-US';
    const formattedDate = formatDate(date1, format, locale);
    const formattedDate1 = formatDate(date2, format, locale);

    console.log('formattedDate: ', formattedDate);

    console.log('formattedDate1: ', formattedDate1);

    const diff = this.getDataDiff(
      new Date(formattedDate),
      new Date(formattedDate1)
    );
    console.log(diff);
    console.log(this.hours);

    if (this.existNew === '0') {
      this.addCalenderTask(
        this.projectId,
        this.employeeId,
        this.taskMainId,
        this.event.startTime,
        this.event.endTime,
        this.hours,
        this.event.desc,
        0,
        this.event.title,
        0,
        1
      );
    } else if (this.existNew === '1') {
      this.addCalenderTask(
        this.projectId,
        this.employeeId,
        '',
        this.event.startTime,
        this.event.endTime,
        this.hours,
        this.event.desc,
        1,
        this.event.title,
        '',
        1
      );
    }

    // this.getEmployeeTaskList();
  }

  loadEmployeeEvents(task: any, startdate: any, enddate: any) {
    const eventCopy1 = {
      title: task,
      startTime: new Date(startdate),
      endTime: new Date(enddate),
      allDay: this.event.allDay,
      desc: this.event.desc,
    };
    this.eventSource.push(eventCopy1);
    this.myCal.loadEvents();
    this.resetEvent();
  }
  getEmployeeTaskList() {
    this.database.getEmployeeTask().then((data) => {
      this.emptaskList = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.emptaskList.push(data.rows.item(i));
          console.log('emptaskList', this.emptaskList[i]);
        }
      }
      if (this.emptaskList.length > 0) {
        for (const value of this.emptaskList) {
          const task = Object.values(value)[0];
          const startDate = Object.values(value)[1];
          const endDate = Object.values(value)[2];

          this.loadEmployeeEvents(task, startDate, endDate);
        }
      }
    });
  }
  next() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK',{
        text: 'Edit',
         handler: data => {
          console.log('Edit clicked',event.title);
        }
      }],
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }

  getResponseFromServer1() {
    this.http
      .get(
        'http://sraossinc.net:7071/dailydiaryapi/getallprojecttasks/projectid/2381',
        {},
        {}
      )
      .then((response) => {
        const responsebody: string = response.data;

        const obj: JsonInt = JSON.parse(responsebody);

        const error1 = obj.error;

        if (error1 === false) {
          const data: string = obj.data;
          console.log('data', data);

          const myObjStr = JSON.stringify(data);
          const obj2: DDTArray = JSON.parse(myObjStr);

          const projcetTasks = obj2.tasks;
          console.log('projcetTasks', projcetTasks);
          // this.generateTree(projcetTasks, 0, 0);

        }
      });
  }

  hideContent() {
    this.showContent = false;
  }

  taskChange($event) {
    console.log($event.target.value);

    this.newsubTaskval = $event.target.value;
    if (this.newsubTaskval === 'sub') {
      this.toggleShow();
      this.isShownNew = false;
      this.existNew = '0';
    } else if (this.newsubTaskval === 'new') {
      this.toggleShowNew();
      this.isShown = false;
      this.existNew = '1';
    } else {
      this.isShown = false;
      this.isShownNew = false;
    }
  }

  toggleShow() {
    //this.isShown=true;
    this.isShown = !this.isShown;
  }

  toggleShowNew() {
    //this.isShown=true;
    this.isShownNew = !this.isShownNew;
  }
  toggleShowAddTask() {
    //this.isShown=true;
    this.isShownAddTask = !this.isShownAddTask;
  }
  toggleShowAddTaskClose() {
    this.isShownAddTask = false;
    this.isShown = false;
    this.isShownNew = false;
  }
  toggleShowCalendar() {
    this.isShownCalender = !this.isShownCalender;
  }

  toggleShowProTaskList(){
    this.isShowTaskList=!this.isShowTaskList;
  }

  addCalenderTask(
    projectid: any,
    employeeid: any,
    taskid: any,
    startdate: any,
    enddate: any,
    estimatedhrs: any,
    description: any,
    newold: any,
    taskname: any,
    parenttask: any,
    status: any

  ) {
    this.database.addCalenderTask(
      projectid,
      employeeid,
      taskid,
      startdate,
      enddate,
      estimatedhrs,
      description,
      newold,
      taskname,
      parenttask,
      status
    );
  }

  levelNav1(navX: string, id: any) {
    if (this.isNav1Displayed(navX)) {
      this.menuLevel1 = null;
    } else {
      this.menuLevel1 = navX;
      // this.gettaskId(id);
    }
  }

  gettaskId(id: any, name: any) {
    this.taskMainId = id;
    this.taskName = name;
    console.log('taskId: ', this.taskMainId);
    console.log('taskName: ', this.taskName);
  }

  isNav1Displayed(navX: string) {
    return this.menuLevel1 === navX;
  }

  levelNav2(navX: string, id: any) {
    if (this.isNav2Displayed(navX)) {
      this.menuLevel2 = null;
    } else {
      this.menuLevel1 = navX;
      this.menuLevel2 = navX;
      // this.gettaskId1(id);
    }
  }

  isNav2Displayed(navX: string) {
    return this.menuLevel2 === navX;
  }

  levelNav3(navX: string, id: any) {
    if (this.isNav3Displayed(navX)) {
      this.menuLevel3 = null;
    } else {
      this.menuLevel2 = navX;
      this.menuLevel3 = navX;
      //  this.gettaskId(id);
    }
  }

  isNav3Displayed(navX: string) {
    return this.menuLevel3 === navX;
  }

  clearAccordionNav() {
    this.menuLevel1 = null;
    this.menuLevel2 = null;
    this.menuLevel3 = null;
  }

  callServiceTasks(pid: any){
    this.taskService.getTasks(pid).subscribe((res1: any) => {
      console.log('tskService: ',res1.data.tasks);
      this.navPages = res1.data.tasks;
    });
  }
  finalizeTaskId(){
    this.toggleShowProTaskList();
    this.taskNamePro=this.taskName;
    this.isShowInput=true;
   // this.toggleInput();

  }

  toggleInput(){
        this.isShowInput=!this.isShowInput;

  }

}
