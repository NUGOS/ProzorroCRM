import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {ApiService} from './api.service';
import {CalendarComponent} from './calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

const appRoutes: Routes = [
  {path: 'calendar', component: CalendarComponent},
  {path: 'main/test', component: TestComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
