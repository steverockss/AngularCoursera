import { Injectable, Inject } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
@Inject({
  providedIn: 'root',
})
export class LeaderService {
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }
  getLeader(id: String): Observable<Leader> {
    return of(LEADERS.filter((leaders) => leaders.id === id)[0])
      .pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leaders) => leaders.featured)[0])
      .pipe(delay(2000));

  }
  constructor() {}
}
