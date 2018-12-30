import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { Code } from '../code';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html', 
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit {

  comboCode = [
     {key : '코드ID명'     , value : 'CD_ID_NM'    }
    ,{key : '코드ID한글명' , value : 'CD_ID_HNM'   }
    ,{key : '코드ID그룹명' , value : 'CD_ID_GRP_NM'}
    ,{key : '코드'         , value : 'CD'          }
    ,{key : '코드명'       , value : 'CD_NM'       }
    ,{key : '코드한글명'   , value : 'CD_HNM'      }
    ,{key : '코드설명'     , value : 'CD_DESC'     }
  ];  

  selectedValue : string = "1";

  constructor(private codeService: CodeService
             ,private router: Router) { }

  ngOnInit() {
    //this.onSelectUsrSttlMstrList();
  }

  codeInVo: Code = new Code();
  codeOutVoList: Code[]

  onChange(deviceValue) {
    console.log(deviceValue);
    this.selectedValue = deviceValue;
    console.log(this.selectedValue);
  }
  
  onSelectCodeList() {
    //this.codeInVo.usrId = this.usrId;
    this.codeService.selectCodeList(this.codeInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.codeOutVoList = result.codeOutVoList;  
        console.log(result.codeOutVoList);  
      } 
    });
  }

  onClick(code: Code) {
    
    //console.log("code.sttlNm=="+code.sttlNm);
    if(this.selectedValue=="1") {
      //this.router.navigate(['/code-view/'+code.sttlNm]);
    } else {
      //this.router.navigate(['/code-view-mother/'+code.sttlNm]);
    }
  }

}
