import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { TabColListExcel } from './tab-col-list-excel';
import { JdbcInfoService } from '../../jdbc/jdbc-info.service';
import { JdbcInfo } from '../../jdbc/jdbc-info';
import { ActivatedRoute } from '@angular/router';
import { Comm } from '../../../comm/comm';
import { CommService } from '../../../comm/comm.service';

@Component({
  selector: 'app-tab-col-list',
  templateUrl: './tab-col-list.component.html',
  styleUrls: ['./tab-col-list.component.scss']
})
export class TabColListComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/
  comm : Comm = new Comm();

  tabInfoInVo: TabInfo = new TabInfo();

  tabInfoOutVoList: TabInfo[]
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  //comboJdbc  : JdbcCombo[];
  comboJdbc    : JdbcInfo[];

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

  isLoading : boolean = false;

  constructor(private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private commService: CommService
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

    this.tabInfoInVo.whereTabs1 = this.comm.nullToSpace(localStorage.getItem('whereTabs1'));
    this.tabInfoInVo.whereTabs2 = this.comm.nullToSpace(localStorage.getItem('whereTabs2'));
    this.tabInfoInVo.whereTabs3 = this.comm.nullToSpace(localStorage.getItem('whereTabs3'));
    this.tabInfoInVo.whereTabs4 = this.comm.nullToSpace(localStorage.getItem('whereTabs4'));

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
  onChangeComboJdbc(i: number) {
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
   * 정렬 컬럼 선택
   ********************/
  onChangeComboOrderBy(i: number) {
    this.tabInfoInVo.orderBy = this.comboOrderBy[i].value;
    this.onSelectTabInfoList();
  }
  /********************
   * 오름-내림 정렬
   ********************/
  onChangeComboAscDesc(i: number) {
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
    console.log("this.tabInfoInVo.selectedTabs=="+this.tabInfoInVo.selectedTabs);
    if(this.tabInfoInVo.selectedTabs==0) this.tabInfoInVo.whereTabs = "";
    if(this.tabInfoInVo.selectedTabs==1) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs1;
    if(this.tabInfoInVo.selectedTabs==2) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs2;
    if(this.tabInfoInVo.selectedTabs==3) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs3;
    if(this.tabInfoInVo.selectedTabs==4) this.tabInfoInVo.whereTabs = this.tabInfoInVo.whereTabs4;
    console.log(this.comboWhereTabs[this.tabInfoInVo.selectedTabs].value);
    console.log("11="+this.tabInfoInVo.whereTabs);
    console.log("22="+this.tabInfoInVo.whereTabs1);

    this.isLoading = true;    
    this.tabInfoService.selectTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        this.cnt = this.tabInfoOutVoList.length;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
      this.isLoading = false;
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

    this.isLoading = true;    
    this.tabInfoService.selectMetaTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
      this.isLoading = false;
    });
  }

  onUploadMetaTabInfo(){}

  /********************
   * 비교
   ********************/
  onCompare(){
    this.isLoading = true;    
    this.tabInfoService.selectCmpTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
      this.isLoading = false;
    });
  }

  /********************
   * 저장
   ********************/
  onSave(){
    this.isLoading = true;    
    this.tabInfoService.saveCmpTabInfoList(this.tabInfoInVo)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        this.onCompare();
        //alert("onSelectMetaTabInfoList");
      }
      this.isLoading = false;
    });
  }

  onDelete(){}

  /********************
   * 엑셀 다운로드
   ********************/
  onDownloadExcel() {
    var infoArray = []; 

    var tabColListExcels = []; 

    for( var i in this.tabInfoOutVoList ) {
        var excel = new TabColListExcel();
        excel.jdbcNm       = this.tabInfoOutVoList[i].jdbcNm      ; 
        excel.tabNm        = this.tabInfoOutVoList[i].tabNm       ; 
        excel.tabHnm       = this.tabInfoOutVoList[i].tabHnm      ; 
        excel.colId        = this.tabInfoOutVoList[i].colId       ; 
        excel.colNm        = this.tabInfoOutVoList[i].colNm       ; 
        excel.colHnm       = this.tabInfoOutVoList[i].colHnm      ; 
        excel.dataTypeDesc = this.tabInfoOutVoList[i].dataTypeDesc; 
        excel.nullable     = this.tabInfoOutVoList[i].nullable    ; 
        excel.pk           = this.tabInfoOutVoList[i].pk          ; 
        excel.tabRows      = this.tabInfoOutVoList[i].tabRows     ; 
        excel.tabUpdDt2    = this.tabInfoOutVoList[i].tabUpdDt2   ; 
        excel.tabRegDt2    = this.tabInfoOutVoList[i].tabRegDt2   ;
        tabColListExcels.push(excel);
    }         

    var infoArray = []; 
    infoArray.push({jdbcNm : 'aa', tabNm : '20'}); 
    infoArray.push({jdbcNm : 'SASS', num1 : 100, num2 : 70 });

    var aa = new TabColListExcel();
    aa.jdbcNm = 'aa'; 
    aa.tabNm = 'aa'; 
    infoArray.push(aa); 
    
    //this.tabColListExcels[0] = new TabColListExcel; 
    //this.tabColListExcels[1] = new TabColListExcel; 
    //this.tabColListExcels[0].jdbcNm = 'aa'; 
    //this.tabColListExcels[0].tabNm = 'aa'; 
    //this.tabColListExcels[1].jdbcNm = 'aa'; 
    //this.tabColListExcels[1].tabNm = 'aa'; 

    let data = JSON.stringify(tabColListExcels);
    //console.log(data);

    const fd = new FormData();
    fd.append('fileNm', "tab-col-list.xls");
    fd.append('data', data);
    
    this.isLoading = true;    
    this.commService.downloadExcel(fd)
    .subscribe(result => {
      if(!result.isSuccess) alert(result.errUsrMsg)
      else {
      } 
      this.isLoading = false;      
    });
  }
  

}
