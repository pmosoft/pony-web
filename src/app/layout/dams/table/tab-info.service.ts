import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { TabInfo } from './tab-info';
import { DOCUMENT } from '@angular/platform-browser';

import { Comm } from '../../comm/comm';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TabInfoService {

  comm : Comm = new Comm();
  tabInfoInVo: TabInfo = new TabInfo();

  comboAscDesc = [
    {name : 'ASC' , value : 'ASC' }
   ,{name : 'DESC', value : 'DESC'}
  ];


  constructor(private http: HttpClient
             ,@Inject(DOCUMENT) private document: any) { }

  /********************************************
   * Http
   ********************************************/
  selectMetaTabInfoList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectMetaTabInfoList', tabInfo, httpOptions);
  }

  selectCmpTabInfoList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectCmpTabInfoList', tabInfo, httpOptions);
  }

  saveCmpTabInfoList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/saveCmpTabInfoList', tabInfo, httpOptions);
  }

  deleteTabInfo(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/deleteTabInfo', tabInfo, httpOptions);
  }

  selectTabInfoList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectTabInfoList', tabInfo, httpOptions);
  }

  selectTabList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectTabList', tabInfo, httpOptions);
  }

  selectColList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectColList', tabInfo, httpOptions);
  }

  selectCreateScript(tabInfoOutVoList: TabInfo[]): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectCreateScript', tabInfoOutVoList, httpOptions);
  }

  selectTabQryList(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/selectTabQryList', tabInfo, httpOptions);
  }

  downloadInsStat(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/downloadInsStat', tabInfo, httpOptions);
  }

  downloadExcel(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/downloadExcel', tabInfo, httpOptions);
  }

  downloadCommaFile(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/downloadCommaFile', tabInfo, httpOptions);
  }

  downloadBarFile(tabInfo: TabInfo): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/dams/table/downloadBarFile', tabInfo, httpOptions);
  }


  /********************************************
   * Param
   ********************************************/
  onGetLocalStorageTabInfo() {
    console.log("tabNm="+localStorage.getItem('tabNm'  ));
    //console.log(this.comm.nullToSpace(localStorage.getItem('jdbcNm'  )));

    this.tabInfoInVo.jdbcNm   = this.comm.nullToSpace(localStorage.getItem('jdbcNm'  ));
    this.tabInfoInVo.tabNm    = this.comm.nullToSpace(localStorage.getItem('tabNm'   ));
    this.tabInfoInVo.tabHnm   = this.comm.nullToSpace(localStorage.getItem('tabHnm'  ));
    //this.tabInfoInVo.tabRows  = parseInt(this.comm.nullToZero(localStorage.getItem('tabRows' )));
    this.tabInfoInVo.tabRegDt = this.comm.nullToSpace(localStorage.getItem('tabRegDt'));
    this.tabInfoInVo.tabUpdDt = this.comm.nullToSpace(localStorage.getItem('tabUpdDt'));

    return this.tabInfoInVo
  }

  onSetLocalStorageTabInfo(tabInfoInvo : TabInfo) {
    localStorage.setItem('jdbcNm'  , this.tabInfoInVo.jdbcNm  );
    localStorage.setItem('tabNm'   , this.tabInfoInVo.tabNm   );
    localStorage.setItem('tabHnm'  , this.tabInfoInVo.tabHnm  );
    //localStorage.setItem('tabRows' , this.tabInfoInVo.tabRows.toString());
    localStorage.setItem('tabRegDt', this.tabInfoInVo.tabRegDt);
    localStorage.setItem('tabUpdDt', this.tabInfoInVo.tabUpdDt);
  }



}
