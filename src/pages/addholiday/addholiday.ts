import { Component } from '@angular/core';

@Component({
  selector: 'page-addholiday',
  templateUrl: 'addholiday.html'
})
export class AddHolidayPage {

    startDate = '2016-04-01';
    endDate = '2017-03-31';
    approved = false;


  daysTaken = '10';

}
