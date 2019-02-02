import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ext-stat-view',
  templateUrl: './ext-stat-view.component.html',
  styleUrls: ['./ext-stat-view.component.scss']
})
export class ExtStatViewComponent implements OnInit {

  constructor(private router: Router
             ,private route: ActivatedRoute) { }

  result = ""
  ngOnInit() {
    console.log("aa="+this.route.snapshot.paramMap.get('result'));
    this.result = this.route.snapshot.paramMap.get('result');
  }

  onExtStatViewToRows() {
  }
}
