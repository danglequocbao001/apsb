import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPageRequest } from '../global';
import { map, catchError } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';
import { Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductsService {

  constructor(
    // private toastr: ToastrService,
    private http: HttpClient,
  ) { }
 
  public getProducts(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.PRODUCTS.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  //Search
  public searchProduct(request: IPageRequest, nameProduct: string, code: string, counter: number) {
    return this.http.get(`${APICONFIG.PRODUCTS.SEARCH(nameProduct, code)}&${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
    catchError((errorRes) =>{throw errorRes.error}));
  }

  public getProductDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.PRODUCTS.GETDETAIL(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public getProductsTrending(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.PRODUCTS.GET_TRENDING}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public createProduct(payload: any) {
    return this.http.post<any>(`${APICONFIG.PRODUCTS.CREATE}`, payload).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.CREATE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editProduct(id: string, modifer: any) {
    return this.http.put<any>(`${APICONFIG.PRODUCTS.EDIT(id)}`, modifer).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error; }));
  }

    // XOA
    public DeleteProducts(id: string) {
      return this.http.delete(`${APICONFIG.PRODUCTS.DELETE(id)}`).pipe(
        map((result) => {
          // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        }));
    }
}
