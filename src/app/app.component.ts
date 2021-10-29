import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController,
    private router: Router) {}

    onMenukClick(){
    this.router.navigate(['user-profile']);
    this.menu.close();

  }
  onMenukClickDiary(){
   // this.router.navigate(['diary']);
   this.router.navigate(['diaries']);

    this.menu.close();

  }
  onMenukClickProjectInfo(){
    this.router.navigate(['project-info']);
    this.menu.close();

  }
  onMenukClickServiceRequest(){
    this.router.navigate(['service-request']);
    this.menu.close();

  }
  onMenukClickDashboard(){
    this.router.navigate(['dashboard']);
    this.menu.close();

  }
  onMenukClickTeamMembers(){
    this.router.navigate(['employee-project']);
    this.menu.close();

  }

}
