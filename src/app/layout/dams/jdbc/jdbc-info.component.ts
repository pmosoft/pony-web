import { Component, OnInit, Input } from '@angular/core';
import { JdbcInfoService } from './jdbc-info.service';
import { JdbcInfo } from './jdbc-info';
import { Router } from '@angular/router';
import { TabInfo } from '../table/tab-info';

@Component({
  selector: 'app-jdbc-info',
  templateUrl: './jdbc-info.component.html',
  styleUrls: ['./jdbc-info.component.scss']
})
export class JdbcInfoComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/

  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  jdbcInfoOutVoList: JdbcInfo[];
  tabInfoInVo : TabInfo = new TabInfo();

  //----------------
  // select
  //----------------
  comboDbDriver = [
     {driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy" , db: "oracle" }
    ,{driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy" , db: "mariadb"}
    ,{driver: "net.sf.log4jdbc.sql.jdbcapi.DriverSpy" , db: "sqlite" }
//    ,{value: "db2"    , name: "db2"    }
//    ,{value: "sybase" , name: "sybase" }
//    ,{value: "IQ"     , name: "iq"     }
//    ,{value: "mssql"  , name: "mssql"  }
//    ,{value: "Exadata", name: "exadata"}
//    ,{value: "mysql"  , name: "mysql"  }
//    ,{value: "hsqldb" , name: "hsqldb" }
//    ,{value: "postgre", name: "postgre"}
  ];


  constructor(private jdbcInfoService: JdbcInfoService
             ,private router: Router) { }


/***************************************************
 * 초기화
 ***************************************************/
  ngOnInit() {
    this.jdbcInfoInVo.db = "oracle";
    this.jdbcInfoInVo.driver = "net.sf.log4jdbc.sql.jdbcapi.DriverSpy";
    this.onSelect();
  }

/***************************************************
 * 이벤트
 ***************************************************/

  /********************
   * 입력 DB 콤보 변경시
   ********************/
  onComboChange(i:number) {
    this.jdbcInfoInVo.db = this.comboDbDriver[i].db;
    this.jdbcInfoInVo.driver = this.comboDbDriver[i].driver;
  }

  /********************
   * 그리드 클릭시
   ********************/
  onClick(jdbcInfoInVo) {
    this.jdbcInfoInVo = jdbcInfoInVo;
  }
  
  /********************
   * 신규
   ********************/
  onNew() {
    this.jdbcInfoInVo = new JdbcInfo();
    this.jdbcInfoInVo.db = "oracle";

  }

  /********************
   * 저장
   ********************/
  onSave() {
    console.log("onSave");
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

  /********************
   * 테스트
   ********************/
  onTest() {
    console.log("onTest");
    this.tabInfoInVo.jdbcNm = this.jdbcInfoInVo.jdbcNm;
    this.tabInfoInVo.owner = this.jdbcInfoInVo.usrId;
    this.jdbcInfoService.testJdbcInfo(this.tabInfoInVo)
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

  /********************
   * 조회
   ********************/
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

  /********************
   * 삭제
   ********************/
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


}
