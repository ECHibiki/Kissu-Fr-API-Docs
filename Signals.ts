import * as API_Interfaces from "./API";

// These are called after the virtual DOM has been constructed.
// The items are still yet to be placed onto the screen.
// Because of how events are handled in Javascript this shouldn't be a problem
// If it is then you may have to manually place in a pause or set up an anticipation for the DOM to be painted

/* EVENT SENDERS */
  // Message sends whenever a URL change has been confirmed and is about to be entered into the browser history
  // Page navigation has completed and the page is begining to render
  // Fires on hash changes which result in the page to focus on new posts.
  // In this case it is unacompanied by a page-load-state signal
  /*
  SIGNAL: location-change
  PATTERN: interface OutputLocationDetail {
    unset: boolean ; // is an empty request
    error: boolean ; // is an error page
    board:string ; // the board that is being moved to
    page_number:number ; // the page number being moved to
    thread:number ; // the thread number being moved to
  }
  */
  export function sendNavigationEvent(location_detail:API_Interfaces.OutputLocationDetail){
    let navigation_event = new CustomEvent<API_Interfaces.OutputLocationDetail>('location-change', { detail:  location_detail });
    document.body.dispatchEvent(navigation_event);
  }

  // When a page has finished loading send a signal. The window may still move, but thread contents are stable.
  // Further page changes may occur with threads being added or removed
  // Some notable oddities: Catalog/Index/Article views all fire this signal but are not accompanied with a URL change
  // Generaly speaking a URL acomanies a paticularly specific dataset,
  // but the changes in views tend to mean that the dataset acompanying a page is more flexible than threads for example
  /*
  SIGNAL: 'page-loaded'
  PATTERN: interface OutputLoadedDetail{
    hard_error: boolean ;
    page: boolean ;
    view?: undefined|string ; // undefined, index, fileboard-index, article, catalog
    board:string ;
    thread:number ;
    page_number:number ;
  }
  */
  export function sendPageLoadedSignal(load_detail:API_Interfaces.OutputLoadedDetail){
    let open_event = new CustomEvent<API_Interfaces.OutputLoadedDetail>('page-loaded',{ detail: load_detail });
    document.body.dispatchEvent(open_event);
  }

  // Message will send a signal true if turned on, false if turned off
  /*
  SIGNAL: option-menu-state
  PATTERN:
    boolean // qr is turning on or off
  */
  export function sendOptionsOpenSignal(state:boolean){
    let d:API_Interfaces.OutputItemStarted = {state: state , time: Date.now()}
    let open_event = new CustomEvent<API_Interfaces.OutputItemStarted>('option-menu-state',{ detail: d });
    document.body.dispatchEvent(open_event);
  }


  // Implementation varies
  /*
  SIGNAL: Set by trigger creation
  PATTERN: interface OutputOptionsCustomDetail{
    value:any;
  }
  */
  export function sendCustomOptionsSignal(signature:string , custom_detail:API_Interfaces.OutputOptionsCustomDetail){
    let option_event = new CustomEvent<API_Interfaces.OutputOptionsCustomDetail>(signature , { detail: custom_detail });
    document.body.dispatchEvent(option_event);
  }


  // Message will send a signal true if turned on, false if turned off
  // This will fire whenever the UI will display the QR menu,
  // This signal is independant of the qr-menu-off trigger
  /*
  SIGNAL: qr-menu-state
  PATTERN:
    boolean // qr is turning on or off
  */
  export function sendQROpenSignal(state:boolean){
    let open_event = new CustomEvent<boolean>('qr-menu-state',{ detail: state });
    document.body.dispatchEvent(open_event);
  }
  // message sends signal if a markup helper is clicked
  // contains all information about the given markup item
  /*
  SIGNAL: qr-markup-clicked
  PATTERN: interface OutputMarkupDetail{
    tag_start:string;
    tag_end:string;
  }
  */
  export function sendQRMarkupSignal(markup_detail:API_Interfaces.OutputMarkupDetail){
    let markup_event = new CustomEvent<API_Interfaces.OutputMarkupDetail>('qr-markup-clicked',{ detail: markup_detail });
    document.body.dispatchEvent(markup_event);
  }

  // When the a queue item is clicked it will send a message with the bud details
  /*
  SIGNAL: qr-bud-changed
  PATTERN: interface OutputBudDetail{
    comment_body:string
  }
  */
  export function sendQRBudChangeSignal(bud_detail:API_Interfaces.OutputBudDetail){
    let change_event = new CustomEvent<API_Interfaces.OutputBudDetail>('qr-bud-changed',{ detail: bud_detail });
    document.body.dispatchEvent(change_event);
  }
