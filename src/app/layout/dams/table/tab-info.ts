export class TabInfo {

  stsNm        : string;
  jdbcNm       : string;
  owner        : string;
  tabNm        : string;
  tabHnm       : string;
  colId        : string;
  colNm        : string;
  colHnm       : string;
  dataTypeDesc : string;
  nullable     : string;
  pk           : string;
  dataTypeNm   : string;
  len          : string;
  decimalCnt   : string;
  colDesc      : string;
  regDtm       : string;

  condJdbcNm   : string = ""; // [조회조건] jdbc
  condOwner    : string = ""; // [조회조건] 소유자
  condTabNm    : string = ""; // [조회조건] 테이블명

}
