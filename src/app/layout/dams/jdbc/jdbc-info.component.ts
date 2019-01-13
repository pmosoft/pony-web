import { Component, OnInit, Input } from '@angular/core';
import { JdbcInfoService } from './jdbc-info.service';
import { JdbcInfo } from './jdbc-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jdbc-info',
  templateUrl: './jdbc-info.component.html',
  styleUrls: ['./jdbc-info.component.scss']
})
export class JdbcInfoComponent implements OnInit {

  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  jdbcInfoOutVoList: JdbcInfo[];

  selectedValue : string = "mariadb";


  //----------------
  // select
  //----------------
  comboDriver = [
     {id: "oracle" , name: "oracle" }
    ,{id: "mariadb", name: "mariadb"}
    ,{id: "sqlite" , name: "sqlite" }
//    ,{id: "db2"    , name: "db2"    }
//    ,{id: "sybase" , name: "sybase" }
//    ,{id: "IQ"     , name: "iq"     }
//    ,{id: "mssql"  , name: "mssql"  }
//    ,{id: "Exadata", name: "exadata"}
//    ,{id: "mysql"  , name: "mysql"  }
//    ,{id: "hsqldb" , name: "hsqldb" }
//    ,{id: "postgre", name: "postgre"}
  ];


  constructor(private jdbcInfoService: JdbcInfoService
             ,private router: Router) { }

  ngOnInit() {
    this.onSelect();
  }

  onComboChange(comboValue) {
    this.selectedValue = comboValue;
    this.jdbcInfoInVo.driver = comboValue;
  }

  onClick(jdbcInfoInVo) {
    this.jdbcInfoInVo = jdbcInfoInVo;
  }


  onNew() {
    this.jdbcInfoInVo.jdbcNm = "";
    this.jdbcInfoInVo.driver = "";
    this.jdbcInfoInVo.url    = "";
    this.jdbcInfoInVo.usrId  = "";
    this.jdbcInfoInVo.usrPw  = "";
    this.selectedValue = "oracle";

  }

  onSave() {
    console.log("onSave");
    this.jdbcInfoInVo.driver = this.selectedValue;
    this.jdbcInfoService.saveJdbcInfo(this.jdbcInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.jdbcInfoOutVoList = result.jdbcOutVo;
        this.onSelect();
        //console.log(result.codeOutVoList);
      }
    });
  }

  onSelect() {
    this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.jdbcInfoOutVoList = result.jdbcInfoOutVoList;
        console.log(result.jdbcInfoOutVoList);
        console.log(result.jdbcInfoOutVoJson);
      }
    });
  }

  onDelete() {
    this.jdbcInfoService.deleteJdbcInfo(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.onNew();
        this.onSelect();
      }
    });
  }

  onTest() {
    console.log("onTest");
    this.jdbcInfoService.testJdbcInfo(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess)
        //alert(result.errUsrMsg)
        alert("Fail");
      else {
        alert("Success");
        //console.log(result.codeOutVoList);
      }
    });
  }


}
