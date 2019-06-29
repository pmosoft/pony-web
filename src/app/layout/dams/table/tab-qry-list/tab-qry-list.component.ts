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

  isParam : boolean = false;
 
  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[];
  tabQryOutVoList: any;
  jdbcInfoInVo: JdbcInfo = new JdbcInfo();
  comboJdbc : JdbcInfo[];
  cnt = 0;
  jj : any;

  chkWhere : boolean = false;
  txtWhere : string = ""; 

  constructor(private commService: CommService
             ,private tabInfoService: TabInfoService
             ,private jdbcInfoService: JdbcInfoService
             ,private router: Router
             ,private route: ActivatedRoute) { }

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
    this.onSetComboJdbc();

    if(this.tabInfoInVo.jdbcNm.length > 3){
      this.isParam = true;
      this.onSelectTabQryList();
    }
  }

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

  comboOrderBy = [
      {name : '선택(정렬)' , value : 'JDBC_NM' }
     ,{name : '테이블명'   , value : 'TAB_NM'  }
     ,{name : '테이블한글명', value : 'TAB_HNM'  }
     ,{name : 'Rows'     , value : 'TAB_ROWS'}
     ,{name : '최근변경일' , value : 'TAB_UPD_DT'}
     ,{name : '테이블생성일', value : 'TAB_REG_DT'}
  ];

  comboAscDesc = this.tabInfoService.comboAscDesc;

  /*************
   * Check
   *************/
  onCheckWhere(){
    console.log(this.chkWhere);
  }

  /*************
   * Input
   *************/
  onChangeWhere(){
    console.log(this.chkWhere);
  }


  /******************************************
   * Event
   ******************************************/
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

  onChangeComboOrderBy(event) {
    console.log(event.value);
    this.tabInfoInVo.orderBy = event.value;
    this.onSelectTabQryList();
  }
  onChangeComboAscDesc(event) {
    this.tabInfoInVo.ascDesc = event.value;
    this.onSelectTabQryList();
  }


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

  onDownloadExcel() {

    this.tabInfoService.downloadExcel(this.tabInfoInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        //this.tabInfoOutVoList = result.tabInfoOutVoList;
        //console.log(result.tabInfoOutVoList);
        //alert("onSelectMetaTabInfoList");
      }
    });
  }

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
