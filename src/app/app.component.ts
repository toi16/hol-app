import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { AddHolidayPage } from '../pages/addholiday/addholiday';
import { EditHolidayPage } from '../pages/editholiday/editholiday';
import { RemovePage } from '../pages/remove/remove';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{icon: string, title: string, component: any, color: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage, color: '#E63135' },
      { icon: 'add-circle',title: 'Add Holiday', component: AddHolidayPage, color: '#0CA9EA' },
      { icon: 'paper',title: 'Edit Holiday', component: EditHolidayPage, color: '#F46529' },
      { icon: 'remove-circle',title: 'Remove Holiday', component: RemovePage, color: '#FFD439' },
      { icon: 'settings', title: 'Settings', component: SettingsPage, color: '#CE6296' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
