import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class SettingsService {

    db: any;

constructor() {
    this.db = new PouchDB('settingconfig');
    this.configDatabase(); //create default settings document
  }

configDatabase() {
  this.db.put({
    _id: 'holsets',
    startdate: '2016-04-01',
    enddate: '2017-03-31',
    daysperyear: 20,
    bankholdays: 8,
    bankholinc: false
     }).then(function (response) {
       console.log('Default settings have been created');

     }).catch(function (err) {
       console.log('settings already exist!');
     });
   }

//get settings
getSettings() {
  return new Promise(resolve => {
  this.db.get('holsets').then((result) => {
      resolve(result);
    });
    })
  }

//update settings
//take settings object from settings controller and save to pouchdb
updateSettings(appsettings){
this.db.put(appsettings).then(function(response) {
  console.log(response);
}).catch((err) => {
  console.log(err);
});
}






}
