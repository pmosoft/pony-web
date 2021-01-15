import { Component, OnInit, Input } from '@angular/core';
import { TranService } from '../tran.service';
import { Tran } from '../tran';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delimiter',
  templateUrl: './delimiter.component.html',
  styleUrls: ['./delimiter.component.scss']
})
export class DelimiterComponent implements OnInit {

  tranInVo: Tran = new Tran();
  tranOutVo: Tran = new Tran();

  tokenCnt = 0;
  delimiterCnt = 0;
  constructor(private tranService: TranService
             ,private router: Router) { }

  ngOnInit() {
  }

  onDelimiterToRows() {
    console.log(this.tranInVo.strToken);
    console.log(this.tranInVo.delimiter);
    this.tranService.delimiterToRows(this.tranInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tranOutVo = result.tranOutVo;
        this.tokenCnt = this.tranOutVo.tokenCnt;
        this.delimiterCnt = this.tranOutVo.delimiterCnt;

        console.log(result.tranOutVo);
      }
    });
  }
}
