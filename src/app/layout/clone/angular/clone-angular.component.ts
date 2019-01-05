import { Component, OnInit, Input } from '@angular/core';
import { CloneAngularService } from './clone-angular.service';
import { CloneAngular } from './clone-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clone-angular',
  templateUrl: './clone-angular.component.html', 
  styleUrls: ['./clone-angular.component.scss']
})
export class CloneAngularComponent implements OnInit {

  srcPath = "";
  srcPathFileDefaultNm = "Choose Source Folder and HTML file";
  srcPathFileNm = this.srcPathFileDefaultNm;

  cloneAngularInVo: CloneAngular = new CloneAngular();
  cloneAngularOutVoList: CloneAngular[]
 
  constructor(private cloneAngularService: CloneAngularService
             ,private router: Router) { }

  ngOnInit() {
    this.cloneAngularInVo.srcPathNm = localStorage.getItem('srcPathNm')
    console.log("this.cloneAngularInVo.srcPathNm="+this.cloneAngularInVo.srcPathNm);
  }


  onSaveSrcPath() {
    console.log("onSaveSrcPath");
    localStorage.setItem('srcPathNm', this.cloneAngularInVo.srcPathNm);
  }

  onCloneAngular() {

//    let data = JSON.stringify(this.cloneAngularOutVoList);
//    //console.log(data);
//    
//    const fd = new FormData();
//    fd.append('fileNm', "clone-angular.xls");
//    fd.append('data', data);
//    
//    this.cloneAngularService.downloadExcel(fd)
//    .subscribe(result => {
//       if(!result.isSuccess) alert(result.errUsrMsg)
//      else {
//      } 
//    });
  }

}
