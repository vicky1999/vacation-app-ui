import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  public loaderEvt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sideNavEvt$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  triggerLoader(isLoading: boolean): void {
    this.loaderEvt$.next(isLoading);
  }

  receiveLoader(): Observable<boolean> {
    return this.loaderEvt$.asObservable();
  }

  triggerSideNav(data: any[]): void {
    this.sideNavEvt$.next(data);
  }

  receiveSideNav(): Observable<any[]> {
    return this.sideNavEvt$.asObservable();
  }

}
