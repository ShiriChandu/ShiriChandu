import { data } from 'jquery';
import { LoginService } from './../../services/login.service';
import { HTTP } from '@ionic-native/http/ngx';
import { JsonTWO } from './../../two-item';
import { JsonInt } from './../../one-item';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastserviceService } from 'src/app/services/toastservice.service';
import { RmdInt } from 'src/app/rmd-item';
import { EmployeesInterface } from 'src/app/pc-items';
import { DatabaseService } from 'src/app/services/database.service';
import { Constants } from 'src/app/common/common-constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public postData = {
    employeeid: '',
    epassword: '',
  };


  constructor(
    private route2: Router,
    private http: HTTP,
    public toastService: ToastserviceService,
    private databse: DatabaseService,
    private loginService: LoginService
  ) {
    this.databse.createDatabase().then(() => {
      console.log('database creted');
    });
  }

  ngOnInit() {}

  getPostLogin() {
    if (this.validateInputs) {
      const eid: any = this.postData.employeeid;
      const pas: any = this.postData.epassword;

      this.loginService.getLogin(eid, pas).subscribe((res1: any) => {
        const responsebody = res1;
        console.log('responsebody', responsebody);
       // const obj: JsonInt = JSON.parse(responsebody);

        const error1 = res1.error;

        if (error1 === false) {
          const data1: string = res1.data;
          // employee json......
          const myObjStr = JSON.stringify(data1);
          const obj2: JsonTWO = JSON.parse(myObjStr);

          // add Employee  call ......
          this.addEmployee(
            obj2.UserId,
            obj2.EmployeeId,
            obj2.EmpRole,
            obj2.EmployeeName,
            obj2.CompanyEmail,
            obj2.ContactNumber,
            obj2.ProfileImg,
            obj2.ReportingManager
          );
          Constants.userId = obj2.UserId;

          // rmd data json......
          const rmdData = res1.data.EmpRMData;
          console.log('rmdData',rmdData);

          const myObjStrRMD = JSON.stringify(rmdData);
          console.log('myObjStrRMD',myObjStrRMD);
          const obj3: RmdInt = JSON.parse(myObjStrRMD);

          // addRMD call......
          this.addRMD(obj3.rm_userid, obj3.rm_employeeid, obj3.rm_name);

          if (obj2.EmpRole === '3') {
            // addEmpAsRMEmployees array
            const empAsRMEmployees = obj2.EmpAsRMEmployees;

            // addEmpAsRMEmployees database call
            for (const value of empAsRMEmployees) {
              const userid = Object.values(value)[0];
              const employeeid = Object.values(value)[1];
              const employeename = Object.values(value)[2];

              this.addEmpAsRMEmployees(userid, employeeid, employeename);
            }
            // assign Projects array
            const assignedProjects = obj2.AssignedProjects;

            // add AssignMentProjects data base call
            for (const value of assignedProjects) {
              const pIdVal = Object.values(value)[0];

              const projectIdVal = Object.values(value)[1];
              const projectNameVal = Object.values(value)[2];
              const projectShortNameVal = Object.values(value)[3];
              const pcval = Object.values(value)[4];
              const isPc = Object.values(value)[5];

              const employeeval = Object.values(value)[6];

              //Json generation of Employees of assignedProjects
              const myObjStrEmployees = JSON.stringify(employeeval);

              const obj4: EmployeesInterface = JSON.parse(myObjStrEmployees);

              if (employeeval !== null) {
                // eslint-disable-next-line prefer-const
                let array = obj4;

                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < array.length; i++) {
                  const useridValStr = JSON.stringify(array[i]);

                  const obj5: EmployeesInterface = JSON.parse(useridValStr);

                  //database call to employees from assignprojects
                  this.addEmployees(
                    obj5.userid,
                    obj5.employeeid,
                    obj5.employeename,
                    obj5.project_id
                  );
                }
              }

              //database call to assign projects
              this.addAssignProjects(
                pIdVal,
                projectIdVal,
                projectNameVal,
                projectShortNameVal,
                isPc
              );
            }

            this.route2.navigate(['home']);
          }
        } else {
          this.toastService.presentToast('Invalid Credentials');
        }
      });
    }
    else {
      this.toastService.presentToast('Please give the Credentials');
    }
  }

  // getResponseFromServer() {
  //   if (this.validateInputs) {
  //     const eid: any = this.postData.employeeid;
  //     const pas: any = this.postData.epassword;
  //     console.log('hel');

  //     this.http
  //       .get(
  //         'http://sraossinc.net:7071/dailydiaryapi/hrmsloginget/employeeid/' +
  //           eid +
  //           '/epassword/' +
  //           pas,
  //         {},
  //         {}
  //       )
  //       .then((response) => {
  //         const responsebody: string = response.data;

  //         const obj: JsonInt = JSON.parse(responsebody);

  //         const error1 = obj.error;

  //         if (error1 === false) {
  //           const data3: string = obj.data;
  //           // employee json......
  //           const myObjStr = JSON.stringify(data3);
  //           const obj2: JsonTWO = JSON.parse(myObjStr);

  //           // add Employee  call ......
  //           this.addEmployee(
  //             obj2.UserId,
  //             obj2.EmployeeId,
  //             obj2.EmpRole,
  //             obj2.EmployeeName,
  //             obj2.CompanyEmail,
  //             obj2.ContactNumber,
  //             obj2.ProfileImg,
  //             obj2.ReportingManager
  //           );
  //           Constants.userId = obj2.UserId;

  //           // rmd data json......
  //           const rmdData = obj2.EmpRMData;
  //           const myObjStrRMD = JSON.stringify(rmdData);
  //           const obj3: RmdInt = JSON.parse(myObjStrRMD);

  //           // addRMD call......
  //           this.addRMD(obj3.rm_userid, obj3.rm_employeeid, obj3.rm_name);

  //           if (obj2.EmpRole === '3') {
  //             // addEmpAsRMEmployees array
  //             const empAsRMEmployees = obj2.EmpAsRMEmployees;

  //             // addEmpAsRMEmployees database call
  //             for (const value of empAsRMEmployees) {
  //               const userid = Object.values(value)[0];
  //               const employeeid = Object.values(value)[1];
  //               const employeename = Object.values(value)[2];

  //               this.addEmpAsRMEmployees(userid, employeeid, employeename);
  //             }
  //             // assign Projects array
  //             const assignedProjects = obj2.AssignedProjects;

  //             // add AssignMentProjects data base call
  //             for (const value of assignedProjects) {
  //               const pIdVal = Object.values(value)[0];

  //               const projectIdVal = Object.values(value)[1];
  //               const projectNameVal = Object.values(value)[2];
  //               const projectShortNameVal = Object.values(value)[3];
  //               const pcval = Object.values(value)[4];
  //               const isPc = Object.values(value)[5];

  //               const employeeval = Object.values(value)[6];

  //               //Json generation of Employees of assignedProjects
  //               const myObjStrEmployees = JSON.stringify(employeeval);

  //               const obj4: EmployeesInterface = JSON.parse(myObjStrEmployees);

  //               if (employeeval !== null) {
  //                 // eslint-disable-next-line prefer-const
  //                 let array = obj4;

  //                 // eslint-disable-next-line @typescript-eslint/prefer-for-of
  //                 for (let i = 0; i < array.length; i++) {
  //                   const useridValStr = JSON.stringify(array[i]);

  //                   const obj5: EmployeesInterface = JSON.parse(useridValStr);

  //                   //database call to employees from assignprojects
  //                   this.addEmployees(
  //                     obj5.userid,
  //                     obj5.employeeid,
  //                     obj5.employeename,
  //                     obj5.project_id
  //                   );
  //                 }
  //               }

  //               //database call to assign projects
  //               this.addAssignProjects(
  //                 pIdVal,
  //                 projectIdVal,
  //                 projectNameVal,
  //                 projectShortNameVal,
  //                 isPc
  //               );
  //             }

  //             this.route2.navigate(['home']);
  //           }
  //         } else {
  //           this.toastService.presentToast('Invalid Credentials');
  //         }
  //       });
  //   } else {
  //     this.toastService.presentToast('Please give the Credentials');
  //   }
  // }

  validateInputs() {
    const username1 = this.postData.employeeid.trim();
    const password1 = this.postData.epassword.trim();

    return (
      this.postData.employeeid &&
      this.postData.epassword &&
      username1.length > 0 &&
      password1.length > 0
    );
  }

  addEmployee(
    userId: string,
    employeeId: string,
    empRole: string,
    employeeName: string,
    companyEmail: string,
    contactNumber: string,
    profileImg: string,
    reportingManager: string
  ) {
    this.databse
      .addEmployee(
        userId,
        employeeId,
        empRole,
        employeeName,
        companyEmail,
        contactNumber,
        profileImg,
        reportingManager
      )
      .then(() => {
        console.log('employee added');
      });
  }

  addRMD(rmuserid: string, rmemploeid: string, rmname: string) {
    this.databse.addRMD(rmuserid, rmemploeid, rmname).then(() => {
      console.log('RMD added');
    });
  }

  addEmpAsRMEmployees(userid: any, employeeid: any, employeename: any) {
    this.databse
      .addEmpAsRMEmployees(userid, employeeid, employeename)
      .then(() => {
        console.log('assign added');
      });
  }

  addAssignProjects(
    pid: any,
    projectid: any,
    projectname: any,
    projectshortname: any,
    ispc: any
  ) {
    this.databse
      .addAssignProjects(pid, projectid, projectname, projectshortname, ispc)
      .then(() => {
        console.log('assign added');
      });
  }

  addPC(userid: string, employeeid: string, employeename: string) {
    this.databse.addPCdata(userid, employeeid, employeename).then(() => {
      console.log('PC added');
    });
  }

  addEmployees(
    userid: any,
    employeeid: any,
    employeename: any,
    projectId: any
  ) {
    this.databse
      .addEmployeesData(userid, employeeid, employeename, projectId)
      .then(() => {
        console.log('Employees added');
      });
  }
}
