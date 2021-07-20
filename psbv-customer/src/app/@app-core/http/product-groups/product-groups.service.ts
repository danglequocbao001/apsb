import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG, SUCCESS, STATUS } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from 'src/app/@app-core/utils';
import { IPageRequest } from '../global';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductGroupsService {

  constructor(
    // private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  public getProductGroups(request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.PRODUCT_GROUP.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
 //Search
 public searchProductGroup(request: IPageRequest, nameProductGroup: string, code: string,counter: number) {
  return this.http.get(`${APICONFIG.PRODUCT_GROUP.SEARCH_PRODUCTS(nameProductGroup, code)}&${(requestQuery(request))}`).pipe(
    map((result) => {
      return result;
    }),
  catchError((errorRes) =>{throw errorRes.error}));
}
public searchGroup(request: IPageRequest, nameProductGroup: string,counter: number) {
  return this.http.get(`${APICONFIG.PRODUCT_GROUP.SEARCH_GROUP(nameProductGroup)}&${(requestQuery(request))}`).pipe(
    map((result) => {
      return result;
    }),
  catchError((errorRes) =>{throw errorRes.error}));
}

  public getProductGroupDetail(id: string, request: IPageRequest) {
    return this.http.get<any>(`${APICONFIG.PRODUCT_GROUP.GETDETAIL(id)}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public createProductGroup(payload) {
    return this.http.post<any>(`${APICONFIG.PRODUCT_GROUP.CREATE}`, payload).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.CREATE, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

  public editProductGroup(id: string, modifer: any) {
    return this.http.put<any>(`${APICONFIG.PRODUCT_GROUP.EDIT(id)}`, modifer).pipe(
      map((result) => {
        // this.toastr.success(SUCCESS.EDIT, STATUS.SUCCESS);
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }

    // XOA
    public DeleteProductGroups(id: string) {
      return this.http.delete(`${APICONFIG.PRODUCT_GROUP.DELETE(id)}`).pipe(
        map((result) => {
          // this.toastr.success(SUCCESS.DELETE, STATUS.SUCCESS);
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        }));
    }
}