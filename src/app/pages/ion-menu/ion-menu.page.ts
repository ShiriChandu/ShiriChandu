import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ion-menu',
  templateUrl: './ion-menu.page.html',
  styleUrls: ['./ion-menu.page.scss'],
})
export class IonMenuPage implements OnInit {

  constructor(private menu1: MenuController) { }

  ngOnInit() {
  }
  openSideNav(){
    this.menu1.enable(true,'menu-content');
    this.menu1.open('menu-content');

}
}
