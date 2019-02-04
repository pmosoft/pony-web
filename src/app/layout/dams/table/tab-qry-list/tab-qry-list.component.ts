import { Component, OnInit, Input } from '@angular/core';
import { TabInfoService } from '../tab-info.service';
import { TabInfo } from '../tab-info';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-qry-list',
  templateUrl: './tab-qry-list.component.html',
  styleUrls: ['./tab-qry-list.component.scss']
})
export class TabQryListComponent implements OnInit {

  tabInfoInVo: TabInfo = new TabInfo();
  tabInfoOutVoList: TabInfo[];
  tabQryOutVoList: any;
  cnt = 0;

  jj : any;

  constructor(private tabInfoService: TabInfoService
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
    this.onSelectTabQryList();
  }


  /******************************************
   * Event
   ********************************************/
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


  onDownloadExcel() {

    // let data = JSON.stringify(this.codeOutVoList);
    // //console.log(data);

    // const fd = new FormData();
    // fd.append('fileNm', "tab-qry-list.xls");
    // fd.append('data', data);

    // this.codeService.downloadExcel(fd)
    // .subscribe(result => {
    //    if(!result.isSuccess) alert(result.errUsrMsg)
    //   else {
    //   }
    // });
  }


}
