import { Component, OnInit, Input } from '@angular/core';
import { TranService } from '../tran.service';
import { Tran } from '../tran';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thinq',
  templateUrl: './thinq.component.html', 
  styleUrls: ['./thinq.component.scss']
})
export class ThinqComponent implements OnInit {

  tranInVo: Tran = new Tran();
  tranOutVo: Tran = new Tran();

  parserCombo = [
    {name : 'monJson' , value : 'monJson' }
   ,{name : 'sdsJson' , value : 'sdsJson' }
  ];

  constructor(private tranService: TranService,private router: Router) { }

  ngOnInit() {
    this.tranInVo.delimiter = this.parserCombo[0].value;
  }

  onChangeSrcTxt(ev:any) {
    this.tranInVo.strRows = ev.target.value;
  }

  onChangeParserCombo(i: number) {
    //localStorage.setItem('ponyTabs1' , this.tabInfoInVo.whereTabs);
    console.log(i);
    this.tranInVo.delimiter = this.parserCombo[i].value;

  }

  onExecute() {
    console.log(this.tranInVo.delimiter);
    console.log(this.tranInVo.strRows);
    this.tranService.thinq(this.tranInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tranOutVo = result.tranOutVo;
        console.log(result.tranOutVo);
      }
    });
  }


}
