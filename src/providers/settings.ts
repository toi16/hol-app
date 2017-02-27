import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class Settings {

    data: any;
    db: any;
    remote: any;

    doc = {
      '_id': 'holsets',
    'startDate': '2016-04-01',
    'endDate': '2017-03-31',
    'daysPerYear': 20,
    'bankHolDays': 8,
    'bankHolInc': false
    }

  constructor() {

        this.db = new PouchDB('hols');

        this.remote = 'http://localhost:5984/hols';

        let options = {
          live: true,
          retry: true,
          continuous: true
        };

        this.db.sync(this.remote, options);
        //this.db.put(this.doc);
        this.getSettings();
  }




  getSettings() {
    this.db.get('holsets').then(function (doc) {
      return doc;
  });
    }

    createSettings(todo){
      this.db.post(todo);
    }

    updateSettings(doc){
      this.db.put(doc).catch((err) => {
          console.log(err);
        });
      }



    handleChange(change){
      let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) => {

          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
          }

        });

        //A document was deleted
        if(change.deleted){
          this.data.splice(changedIndex, 1);
        }
        else {

          //A document was updated
          if(changedDoc){
            this.data[changedIndex] = change.doc;
          }

          //A document was added
          else {
            this.data.push(change.doc);
          }

        }
    }


}
