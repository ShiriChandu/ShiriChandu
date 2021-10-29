import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {

  constructor(private toastController: ToastController) { }

  async presentToast(infoMessage: string) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000
    });
    toast.present();
  }

}
