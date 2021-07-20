import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config';
import { IPageRequest } from '../global';

@Injectable()
export class AccessoriesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAccessories(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.ACCESSORIES.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getAccessoriesWithProductId(request: IPageRequest, id: string) {
    return this.http.get<any>(`${APICONFIG.ACCESSORIES.GET_WITH_PRODUCT_ID(id)}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getAccessoryDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.ACCESSORIES.GET_DETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public createAccessory(payload: any) {
    return this.http.post<any>(`${APICONFIG.ACCESSORIES.CREATE}`, payload).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.CREATE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editAccessory(id: string, modifier: any) {
    return this.http.put<any>(`${APICONFIG.ACCESSORIES.EDIT(id)}`, modifier).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public deleteAccessory(id: string) {
    return this.http.delete(`${APICONFIG.ACCESSORIES.DELETE(id)}`).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }
}
