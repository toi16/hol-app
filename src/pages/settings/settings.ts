import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Settingsdb } from '../../providers/settingsdb';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public hasSettings 		: boolean = false;
  public settings  			: any;
  public form 			    : FormGroup;
  public setStartDate 	: any;
  public setEndDate	 	: any;
  public setHolDays 	    : any;
  public setBankDays		    : any;
  public setBankInc  		: any;
  public recordId 		    : any;
  public revisionId 		: any;
  public isEdited 		    : boolean = false;
  public hideForm 		    : boolean = false;
  public pageTitle         : string;


  constructor( public navCtrl 		: NavController,
           public NP   		: NavParams,
           public fb 			: FormBuilder,
             public DB       	:Settingsdb,
             public toastCtrl    :ToastController)
  {
    this.form = fb.group({
       "startdate"            : ["", Validators.required],
       "enddate"                : ["", Validators.required],
       "holdays"               : ["", Validators.required],
       "bankdays"                 : ["", Validators.required],
       "bankinc"         : ["", Validators.required]
    });



    if(NP.get("key") && NP.get("rev"))
    {
       this.recordId 			= NP.get("key");
       this.revisionId 		= NP.get("rev");
       this.isEdited 			= true;
       this.pageTitle 		= 'Amend entry';
    }
    else
    {
       this.recordId 			= '';
       this.revisionId 		= '';
       this.isEdited 			= false;
       this.pageTitle 		= 'Create entry';
    }
  }


  ionViewWillEnter(){
    this.DB.getSettings();
  }


  displaySettings()
     {
        this.DB.retrieveSettings().then((data)=>
        {
           let existingData = Object.keys(data).length;
           if(existingData !== 0)
  	 {
              this.hasSettings = true;
    	        this.settings = data;
              console.log(data);

  	 }
  	 else
  	 {
  	    console.log("no data available!");
  	 }
        });
     }




     saveSettings()
     {
        let startdate	: string	   = this.form.controls["startdate"].value,
          enddate 	: string       = this.form.controls["enddate"].value,
            holdays  	: number	   = this.form.controls["holdays"].value,
            bankdays	  	: string	   = this.form.controls["bankdays"].value,
            bankinc : boolean       = this.form.controls["bankinc"].value,
            revision  : string 	   = this.revisionId,
            id 	    : any 		   = this.recordId;

        if(this.recordId !== '')
        {
           this.DB.updateSettings(id, startdate, enddate, holdays, bankdays, bankinc, revision)
       .then((data) =>
       {
          this.sendNotification(`Settings have been Updated`);
       });
        }
        else
        {
           this.DB.addSettings(startdate, enddate, holdays, bankdays, bankinc)
           .then((data) =>
           {
              this.sendNotification(`Settings have been Saved`);
           });
        }
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
