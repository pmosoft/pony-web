import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    public test() {
        return "aaa";
    }

    public nullToSpace(str : string) {
        if(str == null || str == 'null' || str == undefined || str == 'undefined') str = "";
        return str;
    }

    public nullToZero(str : string) {
        if(str == null || str == 'null' || str == undefined || str == 'undefined') str = "0";
        return str;
    }

}

