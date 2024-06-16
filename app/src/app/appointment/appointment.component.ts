import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent implements OnInit {
  public successMsg = '';
  public errorMsg = '';
  appointmentDate = '';
  name = '';
  email = '';

  constructor(private _appointmentService: AppointmentService) {}

  ngOnInit() {}

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';

    this._appointmentService
      .createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe(
        (appointment: Appointment) => {
          this.appointmentDate = '';
          this.name = '';
          this.email = '';
          const appointmentDate = new Date(
            appointment.appointmentDate
          ).toDateString();
          this.successMsg = `Appointment Booked successfully for ${appointmentDate}`;
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
