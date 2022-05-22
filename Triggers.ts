export interface Options {
  QROffEvent:(...args:any[]) => void;
  QRComOffEvent:(...args:any[]) => void;
  QRTextEvent:(...args:any[]) => void;
  NewOptTabEvent:(...args:any[]) => void;
}

// Of incidental interest, all of the QR options can be fed into any of the QR listeners
// Each QR event processes the same variables, but for readability sake this is not recomended
export function init(opt:Options){
  // When the user calls for the QR menu to open, it will not.
  // Send a boolean where true is off
  // {detail : { qr_menu_inactive : bool }}
  document.body.addEventListener("qr-force-off", opt.QROffEvent)

  // When the QR is opened the comment will not appear.
  // (
  //   markup helper and post-queue will remain and signals sent on click
  // )
  // Send a boolean where true is off
  // {detail : { qr_com_inactive : bool } }
  document.body.addEventListener("qr-com-off", opt.QRComOffEvent)

  // Send a signal to the application that there is a new comment on the currently active bud
  // (
  //    When buds are switched in the post-queue a signal will be sent with the stored information.
  //    At that point it's up to the requesting application to handle it properly
  // )
  // send a text string representing the comment
  // {detail : {qr-alter-text: string} }
  document.body.addEventListener("qr-alter-text", opt.QRTextEvent)

  // Send a signal to the application that there is a new options tab
  // Stored for the program's durration
  // Options will be stored by the program and reapplied if you set the trigger after the user refreshes
  // Does not handle select tags. Radio can be used as a replacement.
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
    id:string;  // UNIQUE. storage key and event response id
    label:string;
    name:string;
    type:string;
    callback:(e:Event) => void;
  }
  */
  document.body.addEventListener("options-new-tab", opt.NewOptTabEvent)
}
