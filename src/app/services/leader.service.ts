import { Injectable, Inject } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/processHTTPMsg.service';
@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  getLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(baseUrl + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    //  return of(LEADERS).pipe(delay(2000));
  }
  getLeader(id: String): Observable<Leader> {
    return this.http
      .get<Leader>(baseUrl + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return of(LEADERS.filter((leaders) => leaders.id === id)[0]).pipe(
      delay(2000)
    );*/
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader>(baseUrl + 'leadership?featured=true')
      .pipe(map((leaders) => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return of(LEADERS.filter((leaders) => leaders.featured)[0]).pipe(
      delay(2000)
    );*/
  }
}
