import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, LOCALE_ID} from '@angular/core';
import {isSameMonth, isSameDay, startOfDay, endOfDay} from 'date-fns';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import {CalendarEventModel, EventService} from "../event.service";
import localeUk from '@angular/common/locales/uk';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeUk);

class CustomDateFormatter extends CalendarNativeDateFormatter {
   public weekViewHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }

   public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
  }

   public override monthViewTitle({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date);
  }
}



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LOCALE_ID, useValue: 'uk' },
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ]

})

export class CalendarComponent {

  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any> | undefined;



  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  constructor(private modal: NgbModal, private eventService: EventService) {
    this.modalData = {
      action: '',
      event: {
        start: new Date(),
        title: '',
        actions: this.actions
      }
    };
    this.loadEvents();
  }
  private loadEvents(): void {
    this.eventService.getEvents().subscribe((events: CalendarEventModel[]) => {
      this.events = events.map(event => ({
        title: event.title,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        allDay: event.allDay,
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF',
          secondaryText: '#1e90ff'
        },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        actions: this.actions
      }));
    });
  }


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // Add your initial events here
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  addEvent(): void {
    const newEvent: CalendarEventModel = {
      id: 0,
      title: 'New event',
      description: '',
      startTime: startOfDay(new Date()),
      endTime: endOfDay(new Date()),
      allDay: true,
      location: ''
    };

    this.eventService.createEvent(newEvent).subscribe((event: CalendarEventModel) => {
      this.events = [
        ...this.events,
        {
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
            secondaryText: '#1e90ff'
          },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          actions: this.actions
        }
      ];
    });
  }



  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
