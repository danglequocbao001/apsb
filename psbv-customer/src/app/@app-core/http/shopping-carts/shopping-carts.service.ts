import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';

@Injectable()
export class ShoppingCartsService {

  constructor(
    private http: HttpClient
  ) { }

  getShoppingCarts() {
    return this.http.get<any>(`${APICONFIG.SHOPPING_CARTS.GET}`).pipe(
      map(result => {
        return result;
      }),
      catchError(errorResult => {
        throw errorResult.error;
      })
    )
  }

  updateShoppingCarts(data) {
    const payload = {
      shopping_cart: {
        preferences: {
          cartItems: data
        }
      }
    }
    return this.http.post<any>(`${APICONFIG.SHOPPING_CARTS.UPDATE}`, payload).pipe(
      map(result => {
        return result;
      }),
      catchError(errorResult => {
        throw errorResult.error;
      })
    )
  }
}
