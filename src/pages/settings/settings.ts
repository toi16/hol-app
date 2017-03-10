import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../providers/settingsService';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public form 			    : FormGroup;
  public setStartDate 	: any;
  public setEndDate	 	: any;
  public setHolDays 	    : any;
  public setBankDays		    : any;
  public setBankInc  		: any;
  public pageTitle         : string;
  public entitlement: any;
  settings: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public NP: NavParams, public fb: FormBuilder, public service: SettingsService, public toastCtrl: ToastController)
  {
    this.form = fb.group({
       "startdate"            : ["", Validators.required],
       "enddate"                : ["", Validators.required],
       "holdays"               : ["", Validators.required],
       "bankdays"                 : ["", Validators.required],
       "bankinc"         : ["", Validators.required]
    });

    this.pageTitle 		= 'Amend Settings';
  }

if(setBankInc = true) {
  this.entitlement = this.setHolDays + this.setBankDays;
  console.log(this.entitlement);
}

//when page is loaded get settings from DB
  ionViewDidLoad(){
   this.service.getSettings().then((data) => {
     this.settings = data;
     this.setStartDate = this.settings.startdate;
     this.setEndDate = this.settings.enddate;
     this.setHolDays = this.settings.daysperyear;
     this.setBankInc = this.settings.bankholinc;
     this.setBankDays = this.settings.bankholdays;
   });
  }

//pass settings as an object to the service for saving
saveNewSettings() {
  this.service.updateSettings({
    _id: this.settings._id,
    _rev: this.settings._rev,
    startdate: this.setStartDate,
    enddate: this.setEndDate,
    daysperyear: this.setHolDays,
    bankholinc: this.setBankInc,
    bankholdays: this.setBankDays
    });
    this.sendNotification('Settings have been Saved');
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
