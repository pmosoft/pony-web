import { Component, OnInit, Input } from '@angular/core';
import { CommService } from '../../../comm/comm.service';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { JdbcInfoService } from '../../jdbc/jdbc-info.service';
import { JdbcInfo } from '../../jdbc/jdbc-info';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-qry-list',
  templateUrl: './tab-qry-list.component.html',
  styleUrls: ['./tab-qry-list.component.scss']
})
export class TabQryListComponent implements OnInit {

/***************************************************
 * 변수부
 ***************************************************/

  isParam : boolean = false;
 
  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[];
  tabQryOutVoList: any;
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  comboJdbc : JdbcInfo[];
  cnt = 0;
  jj : any;

  jdbcIdx = 0;

  comboOrderBy = [
    {name : '선택(정렬)'  , value : 'JDBC_NM' }
   ,{name : '테이블명'    , value : 'TAB_NM'  }
   ,{name : '테이블한글명', value : 'TAB_HNM'  }
   ,{name : 'Rows'       , value : 'TAB_ROWS'}
   ,{name : '최근변경일'  , value : 'TAB_UPD_DT'}
   ,{name : '테이블생성일', value : 'TAB_REG_DT'}
  ];

  constructor(private commService: CommService
             ,private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private router: Router
             ,private route: ActivatedRoute) { }

/***************************************************
 * 초기화
 ***************************************************/
  ngOnInit() {
    //this.tabInfoInVo = this.tabInfoService.onGetLocalStorageTabInfo();
    this.route.queryParams.subscribe(params => {
      console.log("jdbcNm="+params['jdbcNm']);
      console.log("owner=" +params['owner']);
      console.log("tabNm=" +params['tabNm']);
      this.tabInfoInVo.jdbcNm = params['jdbcNm'];
      this.tabInfoInVo.owner  = params['owner'];
      this.tabInfoInVo.tabNm  = params['tabNm'];
    })

    this.onSelectTabInfoList();
    this.setComboJdbc();

    if(this.tabInfoInVo.jdbcNm.length > 3){
      this.isParam = true;
      this.onSelectTabQryList();
    }
  }

  /***************************
   * JDBC콤보 박스 초기 세팅
   **************************/
  setComboJdbc() {
      this.jdbcInfoService.selectComboJdbcList(this.jdbcInfoInVo)
      //this.jdbcInfoService.selectJdbcInfoList(this.jdbcInfoInVo)
      .subscribe(result => {
        if(!result.isSuccess) alert(result.errUsrMsg)
        else {
          //console.log(result.jdbcInfoOutVoList);
          this.comboJdbc = result.jdbcInfoOutVoList;
          console.log("this.comboJdbc=============================");
          console.log("this.comboJdbc==="+result.jdbcInfoOutVoList);

          for( var key in this.comboJdbc ) {
            console.log( key + '=>' + this.comboJdbc[key].jdbcNm.toUpperCase() );
          }        
          this.jdbcIdx = this.comboJdbc.findIndex(jdbc => jdbc.jdbcNm.toUpperCase() === this.tabInfoInVo.jdbcNm.toUpperCase())
          console.log("this.tabInfoInVo.jdbcNm==="+this.tabInfoInVo.jdbcNm);
          console.log("this.jdbcIdx==="+this.jdbcIdx);
          this.jdbcIdx = 2;
        }
      });
    }

  /***************************
   * 정렬콤보 박스 초기 세팅
   **************************/
  comboAscDesc = this.tabInfoService.comboAscDesc;

/***************************************************
 * 검색 조건 이벤트
 ***************************************************/

  /********************
   * 컬럼조건이 체크될때
   ********************/
  onCheckCol(){
    console.log(this.tabInfoInVo.chkWhere);
    this.tabInfoService.selectColScript (this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.tabInfoInVo.txtSelect = result.sqlScript
      }
    });
  }

  /********************
   * Where조건이 체크될때
   ********************/
  onCheckWhere(){
    console.log(this.tabInfoInVo.chkWhere);
    //if(this.tabInfoInVo.chkWhere) {
    //  this.tabInfoInVo.txtWhere = localStorage.getItem('txtWhere');
    //}
  }

  /********************
   * 순차정렬
   ********************/
  onChangeComboOrderBy(event) {
    console.log(event.value);
    this.tabInfoInVo.orderBy = event.value;
    this.onSelectTabQryList();
  }

  /********************
   * 역순정렬
   ********************/
  onChangeComboAscDesc(event) {
    this.tabInfoInVo.ascDesc = event.value;
    this.onSelectTabQryList();
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
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * 쿼리 데이터 조회
   ********************/
  onSelectTabQryList(){
    this.tabInfoService.selectTabQryList(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.tabQryOutVoList);
        this.tabQryOutVoList = result.tabQryOutVoList;
        this.cnt = this.tabQryOutVoList.length;
        console.log("list="+this.tabQryOutVoList[0]);
        console.log([{aaa:'aaa',bbb:'bbb'},{aaa:'aaa',bbb:'bbb'}]);
        this.jj = [{aaa:'aaa111',bbb:'bbb111'},{aaa:'aaa2222',bbb:'bbb2222'}];
        console.log("jj="+this.jj[0]['aaa']);
        console.log("jj="+this.jj[0].aaa);
      }
    });
  }

  /********************
   * Insert문장 조회
   ********************/
  onDownloadInsStat() {
    this.tabInfoService.downloadInsStat(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }
  
  /********************
   * SELECT 쿼리
   ********************/
  onSelectColScript() {
    console.log("onSelectColScript");
    this.tabInfoService.selectColScript(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        console.log(result.sqlScript);
        //this.createScript = result.createScript;
        //alert(this.createScript);
        //this.router.navigate(["/ext-stat-view/"+this.createScript]);
        this.router.navigate(['/ext-stat-view',{result: result.sqlScript}]);
        //this.router.navigate(['/ext-stat-view/',{debug: true}]);
      }
    });
  }
  

  /********************
   * 엑셀 다운로드
   ********************/
  onDownloadExcel() {

    this.tabInfoService.downloadExcel2(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * 콤마샘파일 조회
   ********************/
  onDownloadCommaFile() {

    this.tabInfoService.downloadCommaFile(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

  /********************
   * 바샘파일 조회
   ********************/
  onDownloadBarFile() {

    this.tabInfoService.downloadBarFile(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

}
