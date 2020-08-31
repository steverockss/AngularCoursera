import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/internal/operators';
import { baseUrl } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/processHTTPMsg.service';
@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  getPromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(baseUrl + 'promotion')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(PROMOTIONS).pipe(delay(2000));
    /*
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PROMOTIONS);
      }, 2000);
    });
    */
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseUrl + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return of(PROMOTIONS.filter((promotions) => promotions.id === id)[0]).pipe(
      delay(2000)
    );
    */
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseUrl + 'promotions?featured=true')
      .pipe(map((promotions) => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
      /*
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(
      delay(2000)
    );*/
  }
}
