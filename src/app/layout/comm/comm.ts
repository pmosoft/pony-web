export class Comm {

  public nullToSpace(str : string) {
    if(str == null || str == 'null' || str == undefined || str == 'undefined') str = "";
    return str;
  }

  public nullToZero(str : string) {
    if(str == null || str == 'null' || str == undefined || str == 'undefined') str = "0";
    return str;
  }

}
