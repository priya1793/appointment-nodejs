import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private BASE_URL = environment.API_URL;

  constructor(private _http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this._http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }

  createAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<Appointment> {
    return this._http.post<Appointment>(`${this.BASE_URL}/appointment`, {
      appointmentDate,
      name,
      email,
    });
  }

  cancelAppointment(id: string): Observable<any> {
    return this._http.delete(`${this.BASE_URL}/appointment/${id}`);
  }
}
