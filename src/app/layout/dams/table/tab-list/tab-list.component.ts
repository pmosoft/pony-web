import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { JdbcInfoService } from '../../jdbc/jdbc-info.service';
import { JdbcInfo } from '../../jdbc/jdbc-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/

  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[]
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();

  createScript = "";
  //comboJdbc : JdbcCombo[];
  comboJdbc : JdbcInfo[];
  comboOrderBy = [
      {name : '선택(정렬)' , value : 'JDBC_NM' }
     ,{name : '테이블명'   , value : 'TAB_NM'  }
     ,{name : '테이블한글명', value : 'TAB_HNM'  }
     ,{name : 'Rows'     , value : 'TAB_ROWS'}
     ,{name : '최근변경일' , value : 'TAB_UPD_DT'}
     ,{name : '테이블생성일', value : 'TAB_REG_DT'}
  ];
  
  cnt = 0;
  
  comboAscDesc = this.tabInfoService.comboAscDesc;

  isCheckAll : boolean = false;

  constructor(private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private router: Router) { }

/***************************************************
 * 초기화
 ***************************************************/
  ngOnInit() {
    //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
    this.onSetComboJdbc();
    this.onSelectTabList();
  }

  /***************************
   * JDBC콤보 박스 초기 세팅
   **************************/
  onSetComboJdbc() {
    this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
    //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //console.log(result.jdbcInfoOutVoList);
        this.comboJdbc = result.jdbcInfoOutVoList;
      }
    });
  }

/***************************************************
 * 검색 조건 이벤트
 ***************************************************/

  /********************
   * JDBC변경시
   ********************/
  onChangeComboJdbc(i) {
    //console.log("event.value=="+event.value);
    //console.log("event.value=="+event.selectedIndex);
    //console.log("event.value=="+event.options[event.selectedIndex]);
    //console.log("event.value=="+event.options[event.selectedIndex].owner);
    //var aa = event.options[event.selectedIndex];
    //console.log("event.value=="+aa.owner);
    //console.log("event.value=="+this.comboJdbc[0].usrId);
    //console.log(usrId);
    //console.log("aa".toUpperCase());
    if(i==0) {
      this.tabInfoInVo.jdbcNm = ""
      this.tabInfoInVo.owner = ""
    } else {
      this.tabInfoInVo.jdbcNm = this.comboJdbc[i].jdbcNm;
      this.tabInfoInVo.owner = this.comboJdbc[i].usrId;
    }
    this.onSelectTabList();
  }

  /********************
   * 순차정렬
   ********************/
  onChangeComboOrderBy(i) {
    this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
    this.onSelectTabList();
  }

  /********************
   * 역순정렬
   ********************/
  onChangeComboAscDesc(i) {
    this.tabInfoInVo.ascDesc = this.comboAscDesc[i].value;
    this.onSelectTabList();
  }

  /********************************************
   * 그리드 전체 선택
   ********************************************/
  onCheckGridAll() {
    for (var i = 0; i < this.tabInfoOutVoList.length; i++) {
      this.tabInfoOutVoList[i].chk = this.isCheckAll;
      console.log("chk["+i+"]="+this.tabInfoOutVoList[i].chk);
    }
  }

  onCheckGrid(i) {
    console.log("chk1="+this.tabInfoOutVoList[i].chk);
  }



/***************************************************
 * 버튼 이벤트
 ***************************************************/

  /********************
   * 테이블정보 조회
   ********************/
  onSelectTabList(){
    //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
    //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);
    //alert("onSelectTabList");
    this.tabInfoService.selectTabList(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        this.cnt = this.tabInfoOutVoList.length;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * DDL 생성
   ********************/
  onDDL() {
    console.log("onDDL");
    this.tabInfoService.selectCreateScript(this.tabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.createScript);
        this.createScript = result.createScript;
        //alert(this.createScript);
        //this.router.navigate(["/ext-stat-view/"+this.createScript]);
        this.router.navigate(['/ext-stat-view',{result: this.createScript}]);
        //this.router.navigate(['/ext-stat-view/',{debug: true}]);
      }
    });



  }

  /********************
   * 엑셀 다운로드
   ********************/
  onDownloadExcel() {

    // let data = JSON.stringify(this.codeOutVoList);
    // //console.log(data);

    // const fd = new FormData();
    // fd.append('fileNm', "tab-list.xls");
    // fd.append('data', data);

    // this.codeService.downloadExcel(fd)
    // .subscribe(result => {
    //    if(!result.isSuccess) alert(result.errUsrMsg)
    //   else {
    //   }
    // });
  }


}
