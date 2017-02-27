import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

@Injectable()
export class Settingsdb {

  private _DB: any;
  private success: boolean = true;

  constructor(public http: Http, public alertCtrl: AlertController) {
    this.initialiseDB();
  }

   initialiseDB() {
     this._DB = new PouchDB('holsettings');
   }

   addSettings(startDate, endDate, holDays, bankDays, bankInc)
      {
         var holset,
            settings = {
       	     _id: holset,
       	     startdate: startDate,
       	     enddate: endDate,
       	     holdays: holDays,
       	     bankdays: bankDays,
             bankinc: bankInc
       	  };

         return new Promise(resolve =>
         {
            this._DB.put(settings).catch((err) =>
            {
               this.success = false;
            });

            resolve(true);

         });
      }

      updateSettings(id, startDate, endDate, holDays, bankDays, bankInc, revision)
         {
            var settings 	 = {
                   _id: id,
                   _rev: revision,
                   startdate: startDate,
             	     enddate: endDate,
             	     holdays: holDays,
             	     bankdays: bankDays,
                   bankinc: bankInc
                };

            return new Promise(resolve =>
            {
               this._DB.put(settings)
               .catch((err) =>
               {
                  this.success = false;
               });

               if(this.success)
               {
                  resolve(true);
               }
            });
         }

         retrieveSettings()
            {
               return new Promise(resolve =>
               {
                  this._DB.allDocs({include_docs: true, descending: true}, function(err, doc)
           {
              let k,
                  items 	= [],
                  row 	= doc.rows;

              for(k in row)
              {
                 var item = row[k].doc;

                 items.push(
                 {
                    id: 	item._id,
                    rev: 	item._rev,
                    startdate: item.startDate,
                    enddate: item.endDate,
                    holdays: item.holDays,
                    bankdays: item.bankDays,
                    bankinc: item.bankInc
                 });
              }
                     resolve(items);
                  });
               });
            }

            errorHandler(err)
              {
                 let headsUp = this.alertCtrl.create({
                    title: 'Heads Up!',
                    subTitle: err,
                    buttons: ['Got It!']
                 });

                 headsUp.present();
              }

getSettings(){
  var holset;
  var  _id;
  var startdate;
  var enddate;
  var holdays;
  var bankdays;
  var bankinc;

  this._DB.get('holset').catch(function (err) {
      if (err.status === 404) { // not found!
        return {
          _id: 'holset',
          startdate: '2017-jan-01',
          enddate: '2018-jan-01',
          holdays: '20',
          bankdays: '8',
          bankinc: 'false'
        };
      } else { // hm, some other error
      	throw err;
      }
    }).then(function (holsetDoc) {
      // sweet, here is our configDoc
      console.log(holsetDoc);
      return holsetDoc;
    }).catch(function (err) {
      // handle any errors
      console.log(err);
    });

}

}
