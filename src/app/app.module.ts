import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { AddHolidayPage } from '../pages/addholiday/addholiday';
import { EditHolidayPage } from '../pages/editholiday/editholiday';
import { RemovePage } from '../pages/remove/remove';
import { SettingsService } from '../providers/settingsService';
import { HolidayData } from '../providers/holidayData';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddHolidayPage,
    EditHolidayPage,
    RemovePage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddHolidayPage,
    EditHolidayPage,
    RemovePage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, SettingsService, HolidayData]
})
export class AppModule {}
