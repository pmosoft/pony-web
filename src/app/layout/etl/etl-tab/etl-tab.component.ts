import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../../dams/table/tab-info.service';
import { EtlTabService } from './etl-tab.service';



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

  comboSrcJdbcIdx = 0;
  comboTarJdbcIdx = 0;
  
  
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
             ,private etlTabService: EtlTabService
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
	this.comboSrcJdbcIdx = i;
	
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
	this.comboTarJdbcIdx = i;
	  
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
    this.tarTabInfoInVo.chkWhereTabs = (i==0) ? false : true;
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
    this.tarTabInfoInVo.whereColTab = this.comboWhereColTab[i].value;
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

    if(!this.onValidation()) return;
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
   * 추출 및 로딩 수행
   ********************/
  onEtl() {
    console.log("onEtl");
    if(!this.onValidation()) return;

    for (var i = 0; i < this.srcTabInfoOutVoList.length; i++) {
      this.srcTabInfoOutVoList[i].tarJdbcNm = this.tarTabInfoInVo.jdbcNm;
      this.srcTabInfoOutVoList[i].isExtract = true;
      this.srcTabInfoOutVoList[i].isLoad = true;
    }
    //alert("이행이 진행중입니다.....");
    this.etlTabService.executeDbToDb(this.srcTabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        alert("이행이 완료되었습니다.");
        this.onSelectTarTabList();
      }
    });
  } 

  /********************
   * 추출
   ********************/
  onExtract() {
    console.log("onExtract");
    if(!this.onValidation()) return;

    for (var i = 0; i < this.srcTabInfoOutVoList.length; i++) {
      this.srcTabInfoOutVoList[i].tarJdbcNm = this.tarTabInfoInVo.jdbcNm;
      this.srcTabInfoOutVoList[i].isExtract = true;
      this.srcTabInfoOutVoList[i].isLoad = false;
    }
    this.etlTabService.executeDbToDb(this.srcTabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        alert("추출이 완료되었습니다.");
      }
    });
  } 

  /********************
   * 로딩 수행
   ********************/
  onLoad() {
    console.log("onLoad");
    if(!this.onValidation()) return;

    for (var i = 0; i < this.srcTabInfoOutVoList.length; i++) {
      this.srcTabInfoOutVoList[i].tarJdbcNm = this.tarTabInfoInVo.jdbcNm;
      this.srcTabInfoOutVoList[i].isExtract = false;
      this.srcTabInfoOutVoList[i].isLoad = true;
    }

    this.etlTabService.executeDbToDb(this.srcTabInfoOutVoList)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        alert("로딩이 완료되었습니다.");
        this.onSelectTarTabList();
      }
    });
  } 
  

  /********************
   * 정합성 체크
   ********************/
  onValidation() {
    var isValid = true;
    if(this.comboSrcJdbcIdx==0) { alert("추출할 DB를 선택해 주십시요"); isValid = false; }
    if(this.comboTarJdbcIdx==0) { alert("로딩할 DB를 선택해 주십시요"); isValid = false; }
    if(this.comboSrcJdbcIdx==this.comboTarJdbcIdx) { alert("추출DB와 로딩DB는 상이해야 합니다."); isValid = false; }

    return isValid;
  }  


}
