import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HolidayData } from '../../providers/holidayData';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private totalDays = 28;
 private daysBooked = 3;
 private daysAvailable = this.totalDays - this.daysBooked;
 private daysTaken = 5;

public items: any;

  constructor(public navCtrl: NavController, public holservice: HolidayData) {

  }


  ionViewDidLoad(){
      this.holservice.getAllHolidays().then((data) => {
        this.items = data;
        console.log(this.items);
})
}

}
