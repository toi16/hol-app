import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../providers/settingsService';
import { HolidayData } from '../../providers/holidayData';

@Component({
  selector: 'page-addholiday',
  templateUrl: 'addholiday.html'
})
export class AddHolidayPage {

  public startDate: any;
  public endDate: any;
  public approved: any;
  public daysTaken: any;
  public form: FormGroup;
  public pageTitle: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public NP: NavParams, public fb: FormBuilder, public service: SettingsService, public holservice: HolidayData, public toastCtrl: ToastController)
  {
    this.form = fb.group({
       "startdate"            : ["", Validators.required],
       "enddate"                : ["", Validators.required],
       "approved"               : ["", Validators.required],
       "daystaken"                 : ["", Validators.required]

    });

    this.pageTitle 		= 'Add Holiday';
  }

ionViewDidLoad(){
    this.startDate = '2016-04-01';
    this.endDate = '2017-03-31';
    this.approved = false;
    this.daysTaken = '';
}

    //pass settings as an object to the service for saving
    saveNewHoliday() {
      this.holservice.addHoliday({
        startdate: this.startDate,
        enddate: this.endDate,
        approved: this.approved,
        daystaken: this.daysTaken
        });
        this.sendNotification('Your Holiday has been Saved');
    }


    sendNotification(message)  : void
       {
          let notification = this.toastCtrl.create({
                 message 		: message,
                 duration 		: 3000
            });
          notification.present();
       }

}
