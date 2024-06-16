import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  public loading = true;
  public errorMsg = '';
  public successMsg = '';
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private _appointmentService: AppointmentService) {}

  ngOnInit() {
    this._appointmentService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }

  cancelAppointment(id: string) {
    this._appointmentService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this._appointmentService.getAppointments()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.successMsg = `Successfully cancelled appointment`;
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
