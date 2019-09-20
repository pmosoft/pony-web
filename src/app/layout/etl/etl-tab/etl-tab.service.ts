import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { TabInfo } from '../../dams/table/tab-info';
import { DOCUMENT } from '@angular/platform-browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EtlTabService {

  constructor(private http: HttpClient
             ,@Inject(DOCUMENT) private document: any) { }

  /********************************************
   * Http
   ********************************************/
  executeDbToDb(tabInfoOutVoList: TabInfo[]): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/etl/executeDbToDb', tabInfoOutVoList, httpOptions);
  }

}
