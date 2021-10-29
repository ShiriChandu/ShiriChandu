import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastserviceService } from 'src/app/services/toastservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  employeeList: any = [];

  constructor(
    public toastservice: ToastserviceService,
    private databse: DatabaseService
  ) {
    this.getEmployeeInfo();
  }

  ngOnInit() {}

  getEmployeeInfo() {
    this.databse.getEmployeeInfo().then((data) => {
      this.employeeList = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.employeeList.push(data.rows.item(i));
        }
      }
    });
  }
}
