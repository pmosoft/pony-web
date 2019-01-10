import { Component, OnInit, Input } from '@angular/core';
import { JdbcService } from './jdbc.service';
import { Jdbc } from './jdbc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jdbc-reg',
  templateUrl: './jdbc-reg.component.html', 
  styleUrls: ['./jdbc-reg.component.scss']
})
export class JdbcRegComponent implements OnInit {

  jdbcInVo: Jdbc = new Jdbc();
  jdbcOutVo: Jdbc = new Jdbc();
 
  constructor(private jdbcService: JdbcService
             ,private router: Router) { }

  ngOnInit() {
  }
 
  onSave() {
    console.log("onSaveSrcPath");
  }

  onExecute() {
    this.onSave();
    /*
    this.jdbcService.jdbcReg(this.jdbcInVo)
    .subscribe(result => {
       if(!result.isSuccess) alert(result.errUsrMsg)
      else {
        this.jdbcOutVo = result.jdbcOutVo;  
        //console.log(result.codeOutVoList);  
      }  
    });
    */
  }

}
