import * as API_Interfaces from "./API";
import API from "./API";
import * as Actions from "../actions/Actions";
/* EVENT LISTENERS */
export function handleQREvents(e:any){
  let d = <API_Interfaces.InputQRObjectDetail>e.detail
  let operation_performed = false;
  if(d.qr_menu_inactive != undefined){
    operation_performed = true;
    API.setQRInactive(d.qr_menu_inactive);
  }
  if(d.qr_com_inactive != undefined){
    operation_performed = true;
    API.setQRComInactive(d.qr_com_inactive);
  }
  if(d.qr_com_text != undefined){
    operation_performed = true;
    Actions.updateStandardComment(d.qr_com_text);
  }
  operation_performed ? "" : console.log("unkown QR-API action performed");
}

export function handleOptionEvents(e:any){
  let d = <API_Interfaces.InputOptionsTabDetail>e.detail;
  let operation_performed = false;
  if(d.tab_title != undefined && d.options_items != undefined){
    operation_performed = true;
    API.addCustomOptions(d);
  }
  operation_performed ? "" : console.log("unkown Options-API action performed");
}
