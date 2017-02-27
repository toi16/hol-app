import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Settings } from '../../providers/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

settings: any;

  constructor(public navCtrl: NavController, public settingsService: Settings, public alertCtrl: AlertController) {

  }


    createTodo(){

        let prompt = this.alertCtrl.create({
          title: 'Add',
          message: 'What do you need to do?',
          inputs: [
            {
              name: 'title'
            }
          ],
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Save',
              handler: data => {
                this.settingsService.createSettings({bankHolDays: data.title});
              }
            }
          ]
        });

        prompt.present();

      }

}
