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

  srcPathFile = null;
  srcPathFileDefaultNm = "Choose Source Folder and HTML file";
  srcPathFileNm = this.srcPathFileDefaultNm;


  cloneAngularInVo: CloneAngular = new CloneAngular();
  cloneAngularOutVoList: CloneAngular[]
 
  constructor(private cloneAngularService: CloneAngularService
             ,private router: Router) { }

  ngOnInit() {
  }


  onChangeSrcFile(event : any) {
    var fReader = new FileReader();
    fReader.readAsDataURL(event.target.files[0]);
    fReader.onloadend = function(event){
        console.log(event.target);
    }
    

    this.srcPathFile = <File> event.target.files[0];
    this.srcPathFileNm = this.srcPathFile.name;
    //this.srcPathFileNm = this.srcPathFile.path;
    if(this.srcPathFileNm.indexOf(".html") == -1){
      alert("Please, choose html file only" );
      this.srcPathFile = null;
      this.srcPathFileNm = this.srcPathFileDefaultNm;
    }    
  
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
