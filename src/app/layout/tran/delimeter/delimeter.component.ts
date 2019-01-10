import { Component, OnInit, Input } from '@angular/core';
import { TranService } from '../tran.service';
import { Tran } from '../tran';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delimeter',
  templateUrl: './delimeter.component.html', 
  styleUrls: ['./delimeter.component.scss']
})
export class DelimeterComponent implements OnInit {

  tranInVo: Tran = new Tran();
  tranOutVo: Tran = new Tran();
 
  constructor(private tranService: TranService
             ,private router: Router) { }

  ngOnInit() {
  }

  ondelimeterToArray() {
    this.tranService.delimeterToArray(this.tranInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tranOutVo = result.tranOutVo;  
        //console.log(result.codeOutVoList);  
      } 
    });
  }
}
