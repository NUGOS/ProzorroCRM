import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
