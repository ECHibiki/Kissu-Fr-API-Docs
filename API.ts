import {MouseEvent , FormEvent , ChangeEvent} from "react"
import * as Actions from "../actions/Actions"
import * as Activities from "./Activities"
import * as Signals from "./Signals"
import * as Triggers from "./Triggers"


interface APIFlags {
  qr_menu_inactive:boolean;
  qr_com_inactive:boolean;
}

export interface InputQRObjectDetail{
  qr_menu_inactive?:boolean;
  qr_com_inactive?:boolean;
  qr_com_text?:string;
}

export interface InputOptionsTabDetail {
  tab_title:string;
  options_items:OptionsFieldItem[];
}
// currently handles value/onInput and checked/onChange type inputs
export interface OptionsFieldItem{
  id:string; // UNIQUE. storage key and event response id
  label:string;
  name:string;
  type:string;
  callback:(e:MouseEvent|FormEvent|ChangeEvent) => void;
}

export interface OutputOptionsCustomDetail{
  value:any;
}

export interface OutputLocationDetail {
  unset: boolean ;
  error: boolean ;
  board:string ;
  page_number:number ;
  thread:number ;
}
export interface OutputLoadedDetail{
  hard_error: boolean ;
  page: boolean ;
  view?: string ;
  board:string ;
  thread:number ;
  page_number:number ;
}
export interface OutputItemStarted{
  state:boolean;
  time:number;
}
export interface OutputMarkupDetail{
  tag_start:string;
  tag_end:string;
}

export interface OutputBudDetail{
  comment_body:string
}

// class will fire actions
export default class API {

  private static flags:APIFlags;
  private static custom_options:InputOptionsTabDetail[];

  static init(){
    API.flags = {
      qr_menu_inactive: false,
      qr_com_inactive: false
    }
    API.custom_options = [];
    this.activateEventListeners();
  }

  static getQRInactive() : boolean{
    return this.flags.qr_menu_inactive;
  }
  static getQRComInactive() : boolean{
    return this.flags.qr_com_inactive;
  }
  static getCustomOptions() : InputOptionsTabDetail[] {
    return this.custom_options;
  }
  static setQRInactive(s: boolean){
    this.flags.qr_menu_inactive = s;
  }
  static setQRComInactive(s: boolean){
    this.flags.qr_com_inactive = s;
  }
  static addCustomOptions(c: InputOptionsTabDetail) {
    this.custom_options.push(c);
  }

/* EVENT SENDERS */
  static sendNavigationEvent(location_detail:OutputLocationDetail){
    Signals.sendNavigationEvent(location_detail);
  }
  //When a page is loaded send a singal
  static sendPageLoadedSignal(load_detail:OutputLoadedDetail){
    Signals.sendPageLoadedSignal(load_detail);
  }
  static sendOptionsOpenSignal(state:boolean){
    Signals.sendOptionsOpenSignal(state);
  }
  static sendCustomOptionsSignal(signature:string , custom_detail:OutputOptionsCustomDetail){
    Signals.sendCustomOptionsSignal(signature , custom_detail);
  }
  static sendQROpenSignal(state:boolean){
    Signals.sendQROpenSignal(state);
  }
  static sendQRMarkupSignal(markup_detail:OutputMarkupDetail){
    Signals.sendQRMarkupSignal(markup_detail);
  }
  static sendQRBudChangeSignal(bud_detail:OutputBudDetail){
    Signals.sendQRBudChangeSignal(bud_detail);
  }

  private static testSignals(){

    document.body.addEventListener('location-change' ,  console.log);

    document.body.addEventListener('page-loaded' ,  console.log);

    document.body.addEventListener('qr-menu-state' ,  console.log);

    document.body.addEventListener('qr-markup-clicked' ,  console.log);

    document.body.addEventListener('qr-bud-changed' ,  console.log);

    // Attatch custom options here
    document.body.addEventListener('option-menu-state' ,  console.log);
    document.body.addEventListener('test-1' ,  console.log);
    document.body.addEventListener('test-r1' ,  console.log);
    document.body.addEventListener('test-r2' ,  console.log);
    document.body.addEventListener('test-c' ,  console.log);
    document.body.addEventListener('test-b' ,  console.log);
  }

  private static testTriggers(){
    let qr_off = {  qr_menu_inactive:true  } as InputQRObjectDetail;
    let qr_off_event = new CustomEvent<InputQRObjectDetail>('qr-force-off', { detail:  qr_off });
    document.body.dispatchEvent(qr_off_event);

    let qr_com_off = {  qr_com_inactive:true  } as InputQRObjectDetail;
    let qr_com_off_event = new CustomEvent<InputQRObjectDetail>('qr-com-off', { detail:  qr_com_off });
    document.body.dispatchEvent(qr_com_off_event);

    let qr_alter_text = {  qr_com_inactive:true  } as InputQRObjectDetail;
    let qr_alter_text_event = new CustomEvent<InputQRObjectDetail>('qr-alter-text', { detail:  qr_alter_text });
    document.body.dispatchEvent(qr_alter_text_event);

    let new_option_tab = {  tab_title: "Test Tab" , options_items: [
      {
        id: "test-1",
        label: "test-1" ,
        name: "test-1-name",
        type: "text" ,
        callback: (e) => {console.log("Callback: test-1" , e)}
      },
      {
        id: "test-r1",
        label: "test-r1" ,
        name: "test-r",
        type: "radio" ,
        callback: (e) => {console.log("Callback: test-r1" , e)}
      },
      {
        id: "test-r2",
        label: "test-r2" ,
        name: "test-r",
        type: "radio" ,
        callback: (e) => {console.log("Callback: test-r2" , e)}
      },
      {
        id: "test-c",
        label: "test-c" ,
        name: "test-c",
        type: "checkbox" ,
        callback: (e) => {console.log("Callback: test-c" , e)}
      },
      {
        id: "test-b",
        label: "test-b" ,
        name: "test-b",
        type: "button" ,
        callback: (e) => {console.log("Callback: test-b" , e)}
      }
  ] as OptionsFieldItem[]  } as InputOptionsTabDetail;
    let new_option_tab_event = new CustomEvent<InputOptionsTabDetail>('options-new-tab', { detail:  new_option_tab });
    document.body.dispatchEvent(new_option_tab_event);

  }

  private static activateEventListeners(){
    let opt:Triggers.Options = {
      QROffEvent: Activities.handleQREvents,
      QRComOffEvent: Activities.handleQREvents,
      QRTextEvent: Activities.handleQREvents,
      NewOptTabEvent: Activities.handleOptionEvents
    }
    Triggers.init(opt);
    this.testSignals();
    this.testTriggers();
  }
}
