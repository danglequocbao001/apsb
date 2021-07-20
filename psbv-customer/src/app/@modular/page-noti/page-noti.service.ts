import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageNotiService {

  private data: BehaviorSubject<IDataNoti> = new BehaviorSubject<IDataNoti>({ title: '', description: '', routerLink: '' });

  constructor() { }

  public get dataStatusNoti(): Observable<IDataNoti> {
    return this.data.asObservable();
  }
  
  public setdataStatusNoti(value: IDataNoti) {
    this.data.next(value);
  }
}
export interface IDataNoti {
  title: string;
  description: string;
  routerLink: string;
}