import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Gen } from './gen';
import { DOCUMENT } from '@angular/platform-browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class GenService {

  gen : Gen;
  private heroesUrl = '/gen/test3';  // URL to web api

  constructor(private http: HttpClient
             ,@Inject(DOCUMENT) private document: any) { }


  textToJavaVo(gen: Gen): Observable<any> {
    return this.http.post<any>('http://'+this.document.location.hostname+':9201/gens/textToJavaVo', gen, httpOptions);
  }


}
