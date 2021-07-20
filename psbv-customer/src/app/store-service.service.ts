import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoreServiceService {
  private dataSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);  

  public get data(): Observable<any> {
    return this.dataSub.asObservable();
}

  public dataChangePassword(value: any) {
    this.dataSub.next(value);
  }

  constructor() { }
}
