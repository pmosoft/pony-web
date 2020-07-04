import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';
import { Gen } from '../gen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-java-vo',
  templateUrl: './java-vo.component.html', 
  styleUrls: ['./java-vo.component.scss']
})

export class JavaVoComponent implements OnInit {

  genInVo: Gen = new Gen();
  genOutVo: Gen = new Gen();

  srcTxt  = "class testClass\n"
          + "string s01\n"
          + "string s02\n"
          + "int i01\n"
          + "bool b01\n"

  tarTxt : string = ""



  constructor(private genService: GenService
             ,private router: Router) { }

  ngOnInit() {
    this.genInVo.srcTxt = "" 
    + "class testClass\n"
    + "string s01\n"
    + "string s02\n"
    + "int i01\n"
    + "bool b01\n"
  }

  onChangeSrcTxt(ev:any) {this.srcTxt = ev.target.value;}
          
  textToJavaVo() {
    this.genInVo.srcTxt = this.srcTxt
    this.genService.textToJavaVo(this.genInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.genOutVo = result.genOutVo;
        this.tarTxt = this.genOutVo.tarTxt;
        console.log("aaa=="+result.genOutVo);
      }
    });
  }


}
