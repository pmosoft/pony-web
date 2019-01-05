import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CloneAngular } from './clone-angular';
import { DOCUMENT } from '@angular/platform-browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CloneAngularService {

  private heroesUrl = '/code/test3';  // URL to web api

  constructor(private http: HttpClient
             ,@Inject(DOCUMENT) private document: any) { }

  saveUsrCodes (fd: FormData): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/code/saveUsrCodes', fd);
  }

  downloadExcel (fd: FormData): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/comm/excel/downloadExcel', fd);
  }

}
