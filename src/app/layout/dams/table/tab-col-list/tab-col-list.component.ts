import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { JdbcInfoService } from '../../jdbc/jdbc-info.service';
import { JdbcInfo } from '../../jdbc/jdbc-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-col-list',
  templateUrl: './tab-col-list.component.html',
  styleUrls: ['./tab-col-list.component.scss']
})
export class TabColListComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/

  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[]
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  //comboJdbc  : JdbcCombo[];
  comboJdbc    : JdbcInfo[];

  comboWhereColTab = [
    {name : 'COL' , value : 'COL' }
   ,{name : 'TAB' , value : 'TAB' }
  ];

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

  constructor(private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private route: ActivatedRoute) { }

/***************************************************
 * 초기화
 ***************************************************/

  ngOnInit() {
    //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
    this.route.queryParams.subscribe(params => {
      //console.log("tabNm="+params['tabNm']);
      const tabNm = params['tabNm'];
      if(tabNm==null ||tabNm==':tabNm') this.tabInfoInVo.tabNm = "";
      else this.tabInfoInVo.tabNm = tabNm;
    })

    this.onSetComboJdbc();
    this.onSelectTabInfoList();
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
    //console.log(i);
    //console.log("aa".toUpperCase());
    if(i==0) {
      this.tabInfoInVo.jdbcNm = ""
      this.tabInfoInVo.owner = ""
    } else {
      this.tabInfoInVo.jdbcNm = this.comboJdbc[i].jdbcNm;
      this.tabInfoInVo.owner = this.comboJdbc[i].usrId;
    }
    this.onSelectTabInfoList();
  }
  /********************
   * 정렬기준컬럼 변경시
   ********************/
  onChangeComboWhereColTab(i) {
    this.tabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
  }
  /********************
   * 정렬기준컬럼 변경시
   ********************/
  onChangeComboOrderBy(i) {
    this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
    this.onSelectTabInfoList();
  }
  /********************
   * 오름-내림기준 변경시
   ********************/
  onChangeComboAscDesc(i) {
    this.tabInfoInVo.ascDesc = this.comboAscDesc[i].value;
    this.onSelectTabInfoList();
  }

  /********************************************
   * 그리드 전체 선택
   ********************************************/
  onCheckAll() {
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
 * 버튼 이벤트
 ***************************************************/

  /********************
   * 테이블정보 조회
   ********************/
  onSelectTabInfoList(){
    this.tabInfoService.selectTabInfoList(this.tabInfoInVo)
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
   * 메타테이블정보 조회
   ********************/
  onSelectMetaTabInfoList(){
    //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
    //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);

    if(this.tabInfoInVo.jdbcNm=="") {
      alert("JDBC를 선택해 주십시요.");
      return;
    }
    this.tabInfoService.selectMetaTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  onUploadMetaTabInfo(){}

  /********************
   * 비교
   ********************/
  onCompare(){
    this.tabInfoService.selectCmpTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * 저장
   ********************/
  onSave(){
    this.tabInfoService.saveCmpTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        this.onCompare();
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  onDelete(){}


  /********************
   * 엑셀 다운로드
   ********************/
  onDownloadExcel() {

    // let data = JSON.stringify(this.codeOutVoList);
    // //console.log(data);

    // const fd = new FormData();
    // fd.append('fileNm', "tab-col-list.xls");
    // fd.append('data', data);

    // this.codeService.downloadExcel(fd)
    // .subscribe(result => {
    //    if(!result.isSuccess) alert(result.errUsrMsg)
    //   else {
    //   }
    // });
  }


}
