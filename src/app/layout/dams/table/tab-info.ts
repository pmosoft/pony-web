export class TabInfo {

  stsNm        : string = "";
  jdbcNm       : string = "";
  owner        : string = "";
  tabNm        : string = "";
  tabHnm       : string = "";
  colId        : number     ;
  colNm        : string = "";
  colHnm       : string = "";
  dataTypeDesc : string = "";
  nullable     : string = "";
  pk           : string = "";
  dataTypeNm   : string = "";
  len          : number     ;
  decimalCnt   : number     ;
  tabRows      : number     ;
  tabRegDt     : string = "";
  tabRegDt2    : string = "";
  tabUpdDt     : string = "";
  tabUpdDt2    : string = "";
  regDtm       : string = "";
  regUsrId     : string = "";
  updDtm       : string = "";
  updUsrId     : string = "";

  chk          : boolean = false;
  orderBy      : string = "1";
  ascDesc      : string = "ASC";

  chkSelect    : boolean = false;
  txtSelect    : string = "";
  chkWhere     : boolean = false;
  txtWhere     : string = "";

  whereColTab  : string = "COL";
  
  chkWhereTabs : boolean = false;
  selectedTabs : number = 0;
  whereTabs    : string = "";
  whereTabs1   : string = "";
  whereTabs2   : string = "";
  whereTabs3   : string = "";
  whereTabs4   : string = "";

  pathFileNm   : string = "";
  limitCnt     : number = 50000;

  tarDb        : string = "";
  tarJdbcNm    : string = "";

}
