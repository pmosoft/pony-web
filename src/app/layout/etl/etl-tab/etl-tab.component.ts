import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../../dams/table/tab-info.service';
import { TabInfo } from '../../dams/table/tab-info';
import { TabListExcel } from '../../dams/table/tab-list/tab-list-excel';
import { JdbcInfoService } from '../../dams/jdbc/jdbc-info.service';
import { JdbcInfo } from '../../dams/jdbc/jdbc-info';
import { Router } from '@angular/router';
import { Comm } from '../../comm/comm';
import { CommService } from '../../comm/comm.service';

@Component({
  selector: 'app-etl-tab',
  templateUrl: './etl-tab.component.html',
  styleUrls: ['./etl-tab.component.scss']
})
export class EtlTabComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/
  comm : Comm = new Comm();

  srcTabInfoInVo: TabInfo = new TabInfo();
  tarTabInfoInVo: TabInfo = new TabInfo();
  srcTabInfoOutVoList: TabInfo[]
  tarTabInfoOutVoList: TabInfo[]
  srcJdbcInfoInVo: JdbcInfo = new JdbcInfo();
  tarJdbcInfoInVo: JdbcInfo = new JdbcInfo();

  comboSrcJdbc : JdbcInfo[];
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
  
  
  srcCnt = 0;
  tarCnt = 0;
  
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
    this.onSetComboSrcJdbc();
    this.onSetComboTarJdbc();
    //this.onSelectSrcTabList();
    
    this.srcTabInfoInVo.whereTabs1 = this.comm.nullToSpace(localStorage.getItem('whereTabs1'));
    this.srcTabInfoInVo.whereTabs2 = this.comm.nullToSpace(localStorage.getItem('whereTabs2'));
    this.srcTabInfoInVo.whereTabs3 = this.comm.nullToSpace(localStorage.getItem('whereTabs3'));
    this.srcTabInfoInVo.whereTabs4 = this.comm.nullToSpace(localStorage.getItem('whereTabs4'));
    
  }

  /***************************
   * JDBC콤보 박스 초기 세팅
   **************************/
  onSetComboSrcJdbc() {
    this.jdbcInfoService.selectComboJdbcList(this.srcJdbcInfoInVo)
    //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //console.log(result.jdbcInfoOutVoList);
        this.comboSrcJdbc = result.jdbcInfoOutVoList;
      }
    });
  }

  onSetComboTarJdbc() {
    this.jdbcInfoService.selectComboJdbcList(this.tarJdbcInfoInVo)
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
  onChangeComboSrcJdbc(i) {
    if(i==0) {
      this.srcTabInfoInVo.jdbcNm = ""
      this.srcTabInfoInVo.owner = ""
    } else {
      this.srcTabInfoInVo.jdbcNm = this.comboSrcJdbc[i].jdbcNm;
      this.srcTabInfoInVo.owner = this.comboSrcJdbc[i].usrId;
    }
    this.onSelectSrcTabList();
  }

  onChangeComboTarJdbc(i) {
    if(i==0) {
      this.tarTabInfoInVo.jdbcNm = ""
      this.tarTabInfoInVo.owner = ""
    } else {
      this.tarTabInfoInVo.jdbcNm = this.comboTarJdbc[i].jdbcNm;
      this.tarTabInfoInVo.owner = this.comboTarJdbc[i].usrId;
    }
  }


  /*****************************
   * IN 테이블 검색
   ****************************/
  onChangeComboWhereTabs(i: number) {
    //localStorage.setItem('ponyTabs1' , this.tabInfoInVo.whereTabs);
    console.log(i);
    console.log(this.comboWhereTabs[i].value);
    this.srcTabInfoInVo.chkWhereTabs = (i==0) ? false : true;
    this.srcTabInfoInVo.selectedTabs = i;
    //this.srcTabInfoInVo.whereTabs = this.comboWhereTabs[i-1].value;
    this.srcTabInfoInVo.tabNm = "";
    if(this.srcTabInfoInVo.selectedTabs==0) this.srcTabInfoInVo.whereTabs = "";
    if(this.srcTabInfoInVo.selectedTabs==1) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs1;
    if(this.srcTabInfoInVo.selectedTabs==2) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs2;
    if(this.srcTabInfoInVo.selectedTabs==3) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs3;
    if(this.srcTabInfoInVo.selectedTabs==4) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs4;

  }
  onChangeTabs(i: number) {
    if(this.srcTabInfoInVo.selectedTabs==0) this.srcTabInfoInVo.whereTabs = "";
    if(this.srcTabInfoInVo.selectedTabs==1) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs1;
    if(this.srcTabInfoInVo.selectedTabs==2) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs2;
    if(this.srcTabInfoInVo.selectedTabs==3) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs3;
    if(this.srcTabInfoInVo.selectedTabs==4) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs4;

    if(i==1) localStorage.setItem('whereTabs1',this.srcTabInfoInVo.whereTabs1);
    if(i==2) localStorage.setItem('whereTabs2',this.srcTabInfoInVo.whereTabs2);
    if(i==3) localStorage.setItem('whereTabs3',this.srcTabInfoInVo.whereTabs3);
    if(i==4) localStorage.setItem('whereTabs4',this.srcTabInfoInVo.whereTabs4);

    console.log("this.srcTabInfoInVo.whereColTab=="+this.srcTabInfoInVo.whereColTab); 
  }
  /*****************************
   * 컬럼 혹은 컬럼포함 테이블 검색
   ****************************/
  onChangeComboWhereColTab(i: number) {
    this.srcTabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
  }  


  /********************************************
   * 그리드 전체 선택
   ********************************************/
  onCheckGridAll() {
    for (var i = 0; i < this.srcTabInfoOutVoList.length; i++) {
      this.srcTabInfoOutVoList[i].chk = this.isCheckAll;
      console.log("chk["+i+"]="+this.srcTabInfoOutVoList[i].chk);
    }
  }

  onCheckGrid(i : number) {
    console.log("chk1="+this.srcTabInfoOutVoList[i].chk);
  }



/***************************************************
 * 버튼 이벤트
 ***************************************************/

  /********************
   * 테이블정보 조회
   ********************/
  onSelectSrcTabList(){
    //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
    //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);
    //alert("onSelectEtlTab");
    if(this.srcTabInfoInVo.selectedTabs==0) this.srcTabInfoInVo.whereTabs = "";
    if(this.srcTabInfoInVo.selectedTabs==1) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs1;
    if(this.srcTabInfoInVo.selectedTabs==2) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs2;
    if(this.srcTabInfoInVo.selectedTabs==3) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs3;
    if(this.srcTabInfoInVo.selectedTabs==4) this.srcTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs4;
  
    this.tabInfoService.selectTabList(this.srcTabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.srcTabInfoOutVoList = result.tabInfoOutVoList;
        this.srcCnt = this.srcTabInfoOutVoList.length;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
    
    this.onSelectTarTabList();
  }

  onSelectTarTabList(){
    //this.tabInfoService.tabInfoInVo = this.tabInfoInVo;
    //this.tabInfoService.onSetLocalStorageTabInfo(this.tabInfoInVo);
    //alert("onSelectEtlTab");
    if(this.srcTabInfoInVo.selectedTabs==0) this.tarTabInfoInVo.whereTabs = "";
    if(this.srcTabInfoInVo.selectedTabs==1) this.tarTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs1;
    if(this.srcTabInfoInVo.selectedTabs==2) this.tarTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs2;
    if(this.srcTabInfoInVo.selectedTabs==3) this.tarTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs3;
    if(this.srcTabInfoInVo.selectedTabs==4) this.tarTabInfoInVo.whereTabs = this.srcTabInfoInVo.whereTabs4;
  
    this.tabInfoService.selectTabList(this.tarTabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tarTabInfoOutVoList = result.tabInfoOutVoList;
        this.tarCnt = this.tarTabInfoOutVoList.length;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * 테이블건수 현행화 갱신
   ********************/
  onUpdateTabRowsUpdateScript() {
    console.log("onUpdateTabRowsUpdateScript");
    this.tabInfoService.updateTabRowsUpdateScript(this.srcTabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.tabRowsUpdateScript);
        //this.tabRowsUpdateScript = result.tabRowsUpdateScript;
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

      for( var i in this.srcTabInfoOutVoList ) {
          var excel = new TabListExcel();
          excel.owner        = this.srcTabInfoOutVoList[i].owner      ; 
          excel.tabNm        = this.srcTabInfoOutVoList[i].tabNm       ; 
          excel.tabHnm       = this.srcTabInfoOutVoList[i].tabHnm      ; 
          excel.tabRows      = this.srcTabInfoOutVoList[i].tabRows     ; 
          excel.tabUpdDt2    = this.srcTabInfoOutVoList[i].tabUpdDt2   ; 
          excel.tabRegDt2    = this.srcTabInfoOutVoList[i].tabRegDt2   ;
          tabListExcels.push(excel);
      }         

      let data = JSON.stringify(tabListExcels);

      const fd = new FormData();
      fd.append('fileNm', "etl-tab.xls");
      fd.append('data', data);
      
      this.commService.downloadExcel(fd)
      .subscribe(result => {
         if(!result.isSuccess) alert(result.errUsrMsg)
        else {
        } 
      });

      
  }


}
