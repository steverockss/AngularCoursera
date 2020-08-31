import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from '../shared/feedback';
import { baseUrl } from '../shared/baseurl';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}
  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    console.log(`ey ${feedback.agree}`)
    return this.http.post<Feedback>(baseUrl + 'feedback', feedback, httpOptions);
  }
}
