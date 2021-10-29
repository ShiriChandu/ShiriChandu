import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private menu1: MenuController,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {}
  onMenukClick() {
    this.router.navigate(['user-profile']);
    this.menu.close();
  }
  onMenukClickDiary() {
    this.router.navigate(['diary']);
    this.menu.close();
  }
  onMenukClickProjectInfo() {
    this.router.navigate(['project-info']);
    this.menu.close();
  }
  onMenukClickServiceRequest() {
    this.router.navigate(['service-request']);
    this.menu.close();
  }
}
