import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/processHTTPMsg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseUrl + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return of(DISHES).pipe(delay(2000));
    */
  }

  getDish(id: String): Observable<Dish> {
    return this.http
      .get<Dish>(baseUrl + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
  */
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish>(baseUrl + 'dishes?featured=true')
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    /*
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(DISHES.filter((dish) => dish.featured)[0]),
        2000
      );
    });
    */
  }
  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));

    /*
    return of(DISHES.map((dish) => dish.id));
    */
  }
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Dish>(baseUrl + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
