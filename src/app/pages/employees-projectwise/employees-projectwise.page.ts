import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-employees-projectwise',
  templateUrl: './employees-projectwise.page.html',
  styleUrls: ['./employees-projectwise.page.scss'],
})
export class EmployeesProjectwisePage implements OnInit {
  empList: any = [];


  constructor(private databasee: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.paramMap.subscribe(paraMap =>{
        if(!paraMap.has('eprojectId')) {
          // redirect
          return;
        }
        const eprojectId = paraMap.get('eprojectId');
        this.getEmployeesByProjectsById(eprojectId);
        console.log('eprojectId: ',eprojectId);


      });

    }

  ngOnInit() {
  }
  getEmployeesByProjectsById(projectId: string){
    this.databasee.getEmployees(projectId).then((data) =>{
      this.empList = [];
      console.log('size: ',data.rows.length);
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.empList.push(data.rows.item(i));
        }
      }

    });
  }
  gotoCalenderscreen(){
    this.router.navigate(['calender']);
  }
}
