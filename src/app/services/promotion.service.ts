import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
    /*
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PROMOTIONS);
      }, 2000);
    });
    */
  }
  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotions) => promotions.id === id)[0]).pipe(
      delay(2000)
    );
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(
      delay(2000)
    );
  }
  constructor() {}
}
