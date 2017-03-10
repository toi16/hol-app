import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class HolidayData {

  data: any;
  db: any;

  constructor() {
    this.db = new PouchDB('holidaydata');

  }

//add new holiday object with auto generated id
addHoliday(holiday) {
  this.db.post(holiday).then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log(err);
});
}


getAllHolidays() {

if (this.data) {
  return Promise.resolve(this.data);
}

return new Promise(resolve => {

  this.db.allDocs({

    include_docs: true

  }).then((result) => {

    this.data = [];

    let docs = result.rows.map((row) => {
      this.data.push(row.doc);
    });

    resolve(this.data);

    }).catch((error) => {

    console.log(error);

  });

});

}

}
