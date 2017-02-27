import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-editholiday',
  templateUrl: 'editholiday.html'
})
export class EditHolidayPage {

  startDate = '2016-04-01';
  endDate = '2017-03-31';


  daysTaken = '10';


}
