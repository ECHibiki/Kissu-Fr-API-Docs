[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D5D5W2P)
# Kissu-Fr-API-Docs
Documentation for the user interface developer API. The given .ts files are in use for the API and can help to understand some of what is going on in the UI application. This is not a final product and may be changed in any way as I develope my own extentions. I don't even garuntee that the example files here or documentation is accurate to what is running on the site. If there are problems contact me through any means. Preferably use my website for reporting instead of issues.

## Signals
Signals are sent from the application to the user through the use of `CustomEvents`. The following interfaces and function signatures are in use and may be read for your own purposes.

```
// These are called after the virtual DOM has been constructed.
// The items are still yet to be placed onto the screen.
// Because of how events are handled in Javascript this shouldn't be a problem
// If it is then you may have to manually place in a pause or set up an anticipation for the DOM to be painted
// It's possible that requestAnimationFrame() can be used.
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
// If it turns out this is a problem for the creation of my own Kissu userscripts then some of the implementations will change
```

### function sendNavigationEvent(location_detail:API_Interfaces.OutputLocationDetail)
```
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
  ```
  ### function sendPageLoadedSignal(load_detail:API_Interfaces.OutputLoadedDetail)
  ```
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
  ```
  
  ### function sendOptionsOpenSignal(state:boolean)
  ```
  // Message will send a signal true if turned on, false if turned off
  /*
  SIGNAL: option-menu-state
  PATTERN:
    boolean // qr is turning on or off
  */
  ```
  
  ### function sendCustomOptionsSignal(signature:string , custom_detail:API_Interfaces.OutputOptionsCustomDetail)
  ```
  // When a custom option field is altered it will send out a message of change with the associated ID value
  /*
  SIGNAL: Set by trigger creation through the id field
  PATTERN: interface OutputOptionsCustomDetail{
    value:any;
  }
  */
  ```
  ### function sendQROpenSignal(state:boolean)
  ```
  // Message will send a signal true if turned on, false if turned off
  // This will fire whenever the UI will display the QR menu,
  // This signal is independant of the qr-menu-off trigger
  /*
  SIGNAL: qr-menu-state
  PATTERN:
    boolean // qr is turning on or off
  */

  ```
  ### sendQRMarkupSignal(markup_detail:API_Interfaces.OutputMarkupDetail)
  ```
  // message sends signal if a markup helper is clicked
  // contains all information about the given markup item
  /*
  SIGNAL: qr-markup-clicked
  PATTERN: interface OutputMarkupDetail{
    tag_start:string;
    tag_end:string;
  }
  */
  ```
  ### function sendQRBudChangeSignal(bud_detail:API_Interfaces.OutputBudDetail)
  ```
  // When the a queue item is clicked it will send a message with the bud details
  /*
  SIGNAL: qr-bud-changed
  PATTERN: interface OutputBudDetail{
    comment_body:string
  }
  */
  ```
  
  ## Triggers
  Triggers are sent by the user to the application to modify the website's behavior.
  ```
  // Of incidental interest, all of the QR options can be fed into any of the QR listeners
  // Each QR event processes the same variables, but for readability sake this is not recomended
```
  ### document.body.addEventListener("qr-force-off", opt.QROffEvent)
  ```
  // When the user calls for the QR menu to open, it will not.
  // Send a boolean where true is off
  // {detail : { qr_menu_inactive : bool }}
  ```
  ### document.body.addEventListener("qr-com-off", opt.QRComOffEvent)
  ```
  // When the QR is opened the comment will not appear.
  // (
  //   markup helper and post-queue will remain and signals sent on click
  // )
  // Send a boolean where true is off
  // {detail : { qr_com_inactive : bool } }
  ```
  
  ### document.body.addEventListener("qr-alter-text", opt.QRTextEvent)
  ```
  // Send a signal to the application that there is a new comment on the currently active bud
  // (
  //    When buds are switched in the post-queue a signal will be sent with the stored information.
  //    At that point it's up to the requesting application to handle it properly
  // )
  // send a text string representing the comment
  // {detail : {qr-alter-text: string} }
  
  ```
  ### document.body.addEventListener("options-new-tab", opt.NewOptTabEvent)
  ```
    // Send a signal to the application that there is a new options tab
  // Stored for the program's durration
  // Values will be stored by the program and reapplied if you set the trigger after the user refreshes
  // Does not handle select tags. Radio could be used as a replacement.
  // (
  //   Allows for callbacks taking the event object as an argument
  //   Returns an event signal (onInput/onClick/onChange depending on the type) containing the altered value and the ID tag
  //   Tested to work on radio, checkbox, text and button
  //   Radio won't unset the automatically unset options, use callbacks/signals for this
  //   Button clicks store a value that you'll have to unset or ignore
  //   Feature is best used on 'text' and 'checkbox' with support for 'radio' and 'button'
  //   A CSS style automatically arranges the options
  // )
  // send a text string representing the comment
  /*
  {detail : {
    tab_title: string ,
    options_items: OptionsFieldItem[]
    }
  }
  interface OptionsFieldItem{
    id:string;  // UNIQUE. storage key and event response id. Must be set
    label:string;
    name:string;
    type:string;
    callback:(e:Event) => void;
  }
  */
  ```
  
  ## Examples
  Used for my testing purposes, also shows how each situation could be implemented.
  ```
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
  ```
  
