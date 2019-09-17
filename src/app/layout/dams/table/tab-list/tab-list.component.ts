import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { TabListExcel } from './tab-list-excel';
import { JdbcInfoService } from '../../jdbc/jdbc-info.service';
import { JdbcInfo } from '../../jdbc/jdbc-info';
import { Router } from '@angular/router';
import { Comm } from '../../../comm/comm';
import { CommService } from '../../../comm/comm.service';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/
  comm : Comm = new Comm();

  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[]
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  
  createScript = "";
  tabRowsUpdateScript = "";
  
  //comboJdbc : JdbcCombo[];
  comboJdbc : JdbcInfo[];
  comboTarJdbc : JdbcInfo[];
  
  comboWhereTabs = [
	    {name : 'T0' , value : 'T0' }
	   ,{name : 'T1' , value : 'T1' }
	   ,{name : 'T2' , value : 'T2' }
	   ,{name : 'T3' , value : 'T3' }
	   ,{name : 'T4' , value : 'T4' }
	  ];

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

  isCheckAll : boolean = false;

  constructor(private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private commService: CommService
             ,private router: Router) { }

/***************************************************
 * 초기화
 ***************************************************/
  ngOnInit() {
    //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
    this.onSetComboJdbc();
    this.onSetComboTarJdbc();
    this.onSelectTabList();
    
    this.tabInfoInVo.whereTabs1 = this.comm.nullToSpace(localStorage.getItem('whereTabs1'));
    this.tabInfoInVo.whereTabs2 = this.comm.nullToSpace(localStorage.getItem('whereTabs2'));
    this.tabInfoInVo.whereTabs3 = this.comm.nullToSpace(localStorage.getItem('whereTabs3'));
    this.tabInfoInVo.whereTabs4 = this.comm.nullToSpace(localStorage.getItem('whereTabs4'));
    
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

  onSetComboTarJdbc() {
    this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
    //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //console.log(result.jdbcInfoOutVoList);
        this.comboTarJdbc = result.jdbcInfoOutVoList;
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

  onChangeComboTarJdbc(i) {
    if(i==0) {
      this.tabInfoInVo.tarJdbcNm = ""
    } else {
      this.tabInfoInVo.tarJdbcNm = this.comboTarJdbc[i].jdbcNm;
    }
  }

  /*****************************
   * IN 테이블 검색
   ****************************/
  onChangeComboWhereTabs(i: number) {
    //localStorage.setItem('ponyTabs1' , this.tabInfoInVo.whereTabs);
    console.log(i);
    console.log(this.comboWhereTabs[i].value);
    this.tabInfoInVo.chkWhereTabs = (i==0) ? false : true;
    this.tabInfoInVo.selectedTabs = i;
    //this.tabInfoInVo.whereTabs = this.comboWhereTabs[i-1].value;
    this.tabInfoInVo.tabNm = "";
    if(this.tabInfoInVo.selectedTabs==0) this.tabInfoInVo.whereTabs = "";
    if(this.tabInfoInVo.selectedTabs==1) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
    if(this.tabInfoInVo.selectedTabs==2) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
    if(this.tabInfoInVo.selectedTabs==3) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
    if(this.tabInfoInVo.selectedTabs==4) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;

  }
  onChangeTabs(i: number) {
    if(this.tabInfoInVo.selectedTabs==0) this.tabInfoInVo.whereTabs = "";
    if(this.tabInfoInVo.selectedTabs==1) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
    if(this.tabInfoInVo.selectedTabs==2) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
    if(this.tabInfoInVo.selectedTabs==3) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
    if(this.tabInfoInVo.selectedTabs==4) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;

    if(i==1) localStorage.setItem('whereTabs1',this.tabInfoInVo.whereTabs1);
    if(i==2) localStorage.setItem('whereTabs2',this.tabInfoInVo.whereTabs2);
    if(i==3) localStorage.setItem('whereTabs3',this.tabInfoInVo.whereTabs3);
    if(i==4) localStorage.setItem('whereTabs4',this.tabInfoInVo.whereTabs4);

    console.log("this.tabInfoInVo.whereColTab=="+this.tabInfoInVo.whereColTab); 
  }
  /*****************************
   * 컬럼 혹은 컬럼포함 테이블 검색
   ****************************/
  onChangeComboWhereColTab(i: number) {
    this.tabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
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
    if(this.tabInfoInVo.selectedTabs==0) this.tabInfoInVo.whereTabs = "";
    if(this.tabInfoInVo.selectedTabs==1) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
    if(this.tabInfoInVo.selectedTabs==2) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
    if(this.tabInfoInVo.selectedTabs==3) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
    if(this.tabInfoInVo.selectedTabs==4) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;
  
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
    console.log("onDDL == tarJdbc ==" + this.tabInfoInVo.tarJdbcNm);
    
    for (var i = 0; i < this.tabInfoOutVoList.length; i++) {
      if(this.tabInfoOutVoList[i].chk) this.tabInfoOutVoList[i].tarJdbcNm = this.tabInfoInVo.tarJdbcNm;	
    }
    
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
   * SELECT 쿼리
   ********************/
  onSelectSelectScript() {
//    console.log("onSelectSelectScript");
//    this.tabInfoService.selectSelectScript(this.tabInfoOutVoList)
//    .subscribe(result => {
//       if(!result.isSuccess) alert(result.errUsrMsg)
//      else {
//        //this.tabInfoOutVoList = result.tabInfoOutVoList;
//        console.log(result.sqlScript);
//        //this.createScript = result.createScript;
//        //alert(this.createScript);
//        //this.router.navigate(["/ext-stat-view/"+this.createScript]);
//        this.router.navigate(['/ext-stat-view',{result: result.sqlScript}]);
//        //this.router.navigate(['/ext-stat-view/',{debug: true}]);
//      }
//    });
  }

  /********************
   * 테이블건수 현행화 갱신
   ********************/
  onUpdateTabRowsUpdateScript() {
    console.log("onUpdateTabRowsUpdateScript");
    this.tabInfoService.updateTabRowsUpdateScript(this.tabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.tabRowsUpdateScript);
        this.tabRowsUpdateScript = result.tabRowsUpdateScript;
        //alert(this.createScript);
        //this.router.navigate(["/ext-stat-view/"+this.createScript]);
        //this.router.navigate(['/ext-stat-view',{result: this.createScript}]);
        //this.router.navigate(['/ext-stat-view/',{debug: true}]);
       
      }
    });
  }
    
  
  /********************
   * 엑셀 다운로드
   ********************/
  onDownloadExcel() {

      var tabListExcels = []; 

      for( var i in this.tabInfoOutVoList ) {
          var excel = new TabListExcel();
          excel.owner        = this.tabInfoOutVoList[i].owner      ; 
          excel.tabNm        = this.tabInfoOutVoList[i].tabNm       ; 
          excel.tabHnm       = this.tabInfoOutVoList[i].tabHnm      ; 
          excel.tabRows      = this.tabInfoOutVoList[i].tabRows     ; 
          excel.tabUpdDt2    = this.tabInfoOutVoList[i].tabUpdDt2   ; 
          excel.tabRegDt2    = this.tabInfoOutVoList[i].tabRegDt2   ;
          tabListExcels.push(excel);
      }         

      let data = JSON.stringify(tabListExcels);

      const fd = new FormData();
      fd.append('fileNm', "tab-list.xls");
      fd.append('data', data);
      
      this.commService.downloadExcel(fd)
      .subscribe(result => {
         if(!result.isSuccess) alert(result.errUsrMsg)
        else {
        } 
      });

      
  }


}
