declare module HTML {
  /**
   *
   * Signifies the type of objects that can be rendered.
   *
   */
  type Renderable = any;

  /**
   *
   * Signifies the type of event handlers.
   *
   */
  type EventHandler = any;

  interface Attributes {
    /**Specifies a shortcut key to activate/focus an element*/
    accesskey?: Renderable;
    /**Specifies one or more classnames for an element (refers to a class in a style sheet) */
    class?: Renderable;
    /**Specifies whether the content of an element is editable or not */
    contenteditable?: Renderable;
    /**Specifies the text direction for the content in an element */
    dir?: Renderable;
    /**Specifies whether an element is draggable or not */
    draggable?: Renderable;
    /**Specifies whether the dragged data is copied, moved, or linked, when dropped */
    dropzone?: Renderable;
    /**Specifies that an element is not yet, or is no longer, relevant */
    hidden?: Renderable;
    /**Specifies a unique id for an element */
    id?: Renderable;
    /**Specifies the language of the element's content */
    lang?: Renderable;
    /**Specifies whether the element is to have its spelling and grammar checked or not */
    spellcheck?: Renderable;
    /**Specifies an inline CSS style for an element */
    style?: Renderable;
    /**Specifies the tabbing order of an element */
    tabindex?: Renderable;
    /**Specifies extra information about an element */
    title?: Renderable;
    /**Specifies whether the content of an element should be translated or not */
    translate?: Renderable;

    /**Script to be run when the element loses focus */
    onblur?: EventHandler;
    /**Script to be run when the value of the element is changed */
    onchange?: EventHandler;
    /**Script to be run when the element is being clicked */
    onclick?: EventHandler;
    /**Script to be run when a context menu is triggered */
    oncontextmenu?: EventHandler;
    /**Script to be run when the content of the element is being copied */
    oncopy?: EventHandler;
    /**Script to be run when the content of the element is being cut */
    oncut?: EventHandler;
    /**Script to be run when the element is being double-clicked */
    ondblclick?: EventHandler;
    /**Script to be run when the element is being dragged */
    ondrag?: EventHandler;
    /**Script to be run at the end of a drag operation */
    ondragend?: EventHandler;
    /**Script to be run when an element has been dragged to a valid drop target */
    ondragenter?: EventHandler;
    /**Script to be run when an element leaves a valid drop target */
    ondragleave?: EventHandler;
    /**Script to be run when an element is being dragged over a valid drop target */
    ondragover?: EventHandler;
    /**Script to be run at the start of a drag operation */
    ondragstart?: EventHandler;
    /**Script to be run when dragged element is being dropped */
    ondrop?: EventHandler;
    /**Script to be run when the element gets focus */
    onfocus?: EventHandler;
    /**Script to be run when the element gets user input */
    oninput?: EventHandler;
    /**Script to be run when the element is invalid */
    oninvalid?: EventHandler;
    /**Script to be run when a user is pressing a key */
    onkeydown?: EventHandler;
    /**Script to be run when a user presses a key */
    onkeypress?: EventHandler;
    /**Script to be run when a user releases a key */
    onkeyup?: EventHandler;
    /**Script to be run when a mouse button is pressed down on an element */
    onmousedown?: EventHandler;
    /**Script to be run as long as the  mouse pointer is moving over an element */
    onmousemove?: EventHandler;
    /**Script to be run when a mouse pointer moves out of an element */
    onmouseout?: EventHandler;
    /**Script to be run when a mouse pointer moves onto an element */
    onmouseenter?: EventHandler;
    /**Script to be run when a mouse pointer is moved out of an element */
    onmouseleave?: EventHandler;
    /**Script to be run when a mouse pointer moves over an element */
    onmouseover?: EventHandler;
    /**Script to be run when a mouse button is released over an element */
    onmouseup?: EventHandler;
    /**Script to be run when a mouse wheel is being scrolled over an element */
    onmousewheel?: EventHandler;
    /**Script to be run when the user pastes some content in an element */
    onpaste?: EventHandler;
    /**Script to be run when an element's scrollbar is being scrolled */
    onscroll?: EventHandler;
    /**Script to be run when the element gets selected */
    onselect?: EventHandler;
    /**Script to be run when the mouse wheel rolls up or down over an element */
    onwheel?: EventHandler;
  }

  interface MetaAttributes extends Attributes {
    /**Specifies the character encoding for the HTML document */
    charset?: Renderable;
    /**Gives the value associated with the http-equiv or name attribute */
    content?: Renderable;
    /**Provides an HTTP header for the information/value of the content attribute */
    'http-equiv'?: Renderable;
    /**Specifies a name for the metadata */
    name?: Renderable;
    /**Specifies a special property */
    property?: Renderable;
  }

  interface ImgAttributes extends Attributes {
    /**Specifies an alternate text when the original element fails to display */
    alt?: Renderable;
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies an image as a server-side image-map */
    ismap?: Renderable;
    /**Specifies the size of the linked resource */
    sizes?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the URL of the image to use in different situations */
    srcset?: Renderable;
    /**Specifies an image as a client-side image-map */
    usemap?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;

    /**Script to be run on abort */
    onabort?: EventHandler;
    /**Script to be run when an error occurs */
    onerror?: EventHandler;
    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
  }

  interface AAttributes extends Attributes {
    /**Specifies that the target will be downloaded when a user clicks on the hyperlink */
    download?: Renderable;
    /**Specifies the URL of the page the link goes to */
    href?: Renderable;
    /**Specifies the language of the linked document */
    hreflang?: Renderable;
    /**Specifies what media/device the linked document is optimized for */
    media?: Renderable;
    /**Specifies the relationship between the current document and the linked document */
    rel?: Renderable;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;
  }

  interface InputAttributes extends Attributes {
    /** Specifies the types of files that the server accepts (only for type="file") */
    accept?: Renderable; 
    /**Specifies an alternate text when the original element fails to display */
    alt?: Renderable;
    /**Specifies whether the <form> or the <input> element should have autocomplete enabled */
    autocomplete?: Renderable;
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: Renderable;
    /**Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio") */
    checked?: Renderable;
    /**Specifies that the text direction will be submitted */
    dirname?: Renderable;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies where to send the form-data when a form is submitted. Only for type="submit" */
    formaction?: Renderable;
    /**Specifies the height of the element */
    height?: Renderable;
    /**Refers to a <datalist> element that contains pre-defined options for an <input> element */
    list?: Renderable;
    /**Specifies the maximum value */
    max?: Renderable;
    /**Specifies the maximum number of characters allowed in an element */
    maxlength?: Renderable;
    /**Specifies a minimum value */
    min?: Renderable;
    /**Specifies that a user can enter more than one value */
    multiple?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies a regular expression that an <input> element's value is checked against */
    pattern?: Renderable;
    /**Specifies a short hint that describes the expected value of the element */
    placeholder?: Renderable;
    /**Specifies that the element is read-only */
    readonly?: Renderable;
    /**Specifies that the element must be filled out before submitting the form */
    required?: Renderable;
    /**Specifies the width, in characters */
    size?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the legal number intervals for an input field */
    step?: Renderable;
    /**Specifies the type of element */
    type: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;

    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
    /**Script to be run when the user writes something in a search field (for <input="search">) */
    onsearch?: EventHandler;
  }

  interface ButtonAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: Renderable;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies where to send the form-data when a form is submitted. Only for type="submit" */
    formaction?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface SelectAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: Renderable;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies that a user can enter more than one value */
    multiple?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies that the element must be filled out before submitting the form */
    required?: Renderable;
    /**Specifies the number of visible options */
    size?: Renderable;
  }

  interface OptionAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the title of the text track */
    label?: Renderable;
    /**Specifies that an option should be pre-selected when the page loads */
    selected?: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface OptGroupAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the title of the text track */
    label?: Renderable;
  }

  interface TextAreaAttributes extends Attributes {
    /**Specifies that the element should automatically get focus when the page loads */
    autofocus?: Renderable;
    /**Specifies the visible width of a text area */
    cols?: Renderable;
    /**Specifies that the text direction will be submitted */
    dirname?: Renderable;
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies the maximum number of characters allowed in an element */
    maxlength?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies a short hint that describes the expected value of the element */
    placeholder?: Renderable;
    /**Specifies that the element is read-only */
    readonly?: Renderable;
    /**Specifies that the element must be filled out before submitting the form */
    required?: Renderable;
    /**Specifies the visible number of lines in a text area */
    rows?: Renderable;
    /**Specifies how the text in a text area is to be wrapped when submitted in a form */
    wrap?: Renderable;
  }

  interface LabelAttributes extends Attributes {
    /**Specifies which form element(s) a label/calculation is bound to */
    for?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
  }

  interface FieldsetAttributes extends Attributes {
    /**Specifies that the specified element/group of elements should be disabled */
    disabled?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
  }

  interface FormAttributes extends Attributes {
    /**Specifies the character encodings that are to be used for the form submission*/ 
    'accept-charset'?: Renderable;
    /**Specifies where to send the form-data when a form is submitted */
    action?: Renderable;
    /**Specifies whether the <form> or the <input> element should have autocomplete enabled */
    autocomplete?: Renderable;
    /**Specifies how the form-data should be encoded when submitting it to the server (only for method="post") */
    enctype?: Renderable;
    /**Specifies the HTTP method to use when sending form-data */
    method?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies that the form should not be validated when submitted */
    novalidate?: Renderable;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: Renderable;

    /**Script to be run when a reset button in a form is clicked. */
    onreset?: EventHandler;
    /**Script to be run when a form is submitted */
    onsubmit?: EventHandler;
  }

  interface OutputAttributes extends Attributes {
    /**Specifies which form element(s) a label/calculation is bound to */
    for?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
  }

  interface ObjectAttributes extends Attributes {
    /**Specifies the URL of the resource to be used by the object */
    data?: Renderable;
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;
    /**Specifies an image as a client-side image-map */
    usemap?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;

    /**Script to be run on abort */
    onabort?: EventHandler;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: EventHandler;
    /**Script to be run when an error occurs */
    onerror?: EventHandler;
  }

  interface ParamAttributes extends Attributes {
    /**Specifies the name of the element */
    name?: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface OlAttributes extends Attributes {
    /**Specifies that the list order should be descending (9,8,7...) */
    reversed?: Renderable;
    /**Specifies the start value of an ordered list */
    start?: Renderable;
  }

  interface LiAttributes extends Attributes {
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface MeterAttributes extends Attributes {
    /**Specifies the name of the form the element belongs to */
    form?: Renderable;
    /**Specifies the range that is considered to be a high value */
    high?: Renderable;
    /**Specifies the range that is considered to be a low value */
    low?: Renderable;
    /**Specifies the maximum value */
    max?: Renderable;
    /**Specifies a minimum value */
    min?: Renderable;
    /**Specifies what value is the optimal value for the gauge */
    optimum?: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface ProgressAttributes extends Attributes {
    /**Specifies the maximum value */
    max?: Renderable;
    /**Specifies the value of the element */
    value?: Renderable;
  }

  interface TdThAttributes extends Attributes {
    /**Specifies the number of columns a table cell should span */
    colspan?: Renderable;
    /**Specifies one or more headers cells a cell is related to */
    headers?: Renderable;
    /**Specifies the number of rows a table cell should span */
    rowspan?: Renderable;
  }

  interface ThAttributes extends TdThAttributes {
    /**Specifies whether a header cell is a header for a column, row, or group of columns or rows */
    scope?: Renderable;
  }

  interface CanvasAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;
  }

  interface EmbedAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;

    /**Script to be run on abort */
    onabort?: EventHandler;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: EventHandler;
    /**Script to be run when an error occurs */
    onerror?: EventHandler;
  }

  interface IFrameAttributes extends Attributes {
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies the name of the element */
    name?: Renderable;
    /**Enables an extra set of restrictions for the content in an <iframe> */
    sandbox?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the HTML content of the page to show in the <iframe> */
    srcdoc?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;

    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
  }

  interface AudioVideoAttributes extends Attributes {
    /**Specifies that the audio/video will start playing as soon as it is ready */
    autoplay?: Renderable;
    /**Specifies that audio/video controls should be displayed (such as a play/pause button etc) */
    controls?: Renderable;
    /**Specifies that the audio/video will start over again, every time it is finished */
    loop?: Renderable;
    /**Specifies that the audio output of the video should be muted */
    muted?: Renderable;
    /**Specifies if and how the author thinks the audio/video should be loaded when the page loads */
    preload?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;

    /**Script to be run on abort */
    onabort?: EventHandler;
    /**Script to be run when a file is ready to start playing (when it has buffered enough to begin) */
    oncanplay?: EventHandler;
    /**Script to be run when a file can be played all the way to the end without pausing for buffering */
    oncanplaythrough?: EventHandler;
    /**Script to be run when the length of the media changes */
    ondurationchange?: EventHandler;
    /**Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects) */
    onemptied?: EventHandler;
    /**Script to be run when the media has reach the end (a useful event for messages like "thanks for listening") */
    onended?: EventHandler;
    /**Script to be run when an error occurs */
    onerror?: EventHandler;
    /**Script to be run when media data is loaded */
    onloadeddata?: EventHandler;
    /**Script to be run when meta data (like dimensions and duration) are loaded */
    onloadedmetadata?: EventHandler;
    /**Script to be run just as the file begins to load before anything is actually loaded */
    onloadstart?: EventHandler;
    /**Script to be run when the media is paused either by the user or programmatically */
    onpause?: EventHandler;
    /**Script to be run when the media has started playing */
    onplay?: EventHandler;
    /**Script to be run when the media has started playing */
    onplaying?: EventHandler;
    /**Script to be run when the browser is in the process of getting the media data */
    onprogress?: EventHandler;
    /**Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode). */
    onratechange?: EventHandler;
    /**Script to be run when the seeking attribute is set to false indicating that seeking has ended */
    onseeked?: EventHandler;
    /**Script to be run when the seeking attribute is set to true indicating that seeking is active */
    onseeking?: EventHandler;
    /**Script to be run when the browser is unable to fetch the media data for whatever reason */
    onstalled?: EventHandler;
    /**Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason */
    onsuspend?: EventHandler;
    /**Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media) */
    ontimeupdate?: EventHandler;
    /**Script to be run each time the volume of a video/audio has been changed */
    onvolumechange?: EventHandler;
    /**Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data) */
    onwaiting?: EventHandler;
  }

  interface VideoAttributes extends AudioVideoAttributes {
    /**Specifies the height of the element */
    height?: Renderable;
    /**Specifies an image to be shown while the video is downloading, or until the user hits the play button */
    poster?: Renderable;
    /**Specifies the width of the element */
    width?: Renderable;
  }

  interface SourceAttributes extends Attributes {
    /**Specifies what media/device the linked document is optimized for */
    media?: Renderable;
    /**Specifies the size of the linked resource */
    sizes?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the URL of the image to use in different situations */
    srcset?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;
  }

  interface TrackAttributes extends Attributes {
    /**Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate */
    default?: Renderable;
    /**Specifies the kind of text track */
    kind?: Renderable;
    /**Specifies the title of the text track */
    label?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the language of the track text data (required if kind="subtitles") */
    srclang?: Renderable;

    /**Script to be run when the cue changes in a <track> element */
    oncuechange?: EventHandler;
  }

  interface AreaAttributes extends Attributes {
    /**Specifies an alternate text when the original element fails to display */
    alt?: Renderable;
    /**Specifies the coordinates of the area */
    coords?: Renderable;
    /**Specifies that the target will be downloaded when a user clicks on the hyperlink */
    download?: Renderable;
    /**Specifies the URL of the page the link goes to */
    href?: Renderable;
    /**Specifies the language of the linked document */
    hreflang?: Renderable;
    /**Specifies what media/device the linked document is optimized for */
    media?: Renderable;
    /**Specifies the relationship between the current document and the linked document */
    rel?: Renderable;
    /**Specifies the shape of the area */
    shape?: Renderable;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: Renderable;
  }

  interface ColAttributes extends Attributes {
    /**Specifies the number of columns to span */
    span?: Renderable;
  }

  interface QAttributes extends Attributes {
    /**Specifies a URL which explains the quote/deleted/inserted text */
    cite?: Renderable;
  }

  interface DetailsAttributes extends Attributes {
    /**Specifies that the details should be visible (open) to the user */
    open?: Renderable;

    /**Script to be run when the user opens or closes the <details> element */
    ontoggle?: EventHandler;
  }

  interface DelInsAttributes extends Attributes {
    /**Specifies a URL which explains the quote/deleted/inserted text */
    cite?: Renderable;
    /**Specifies the date and time */
    datetime?: Renderable;
  }

  interface TimeAttributes extends Attributes {
    /**Specifies the date and time */
    datetime?: Renderable;
  }

  interface BaseAttributes extends Attributes {
    /**Specifies the URL of the page the link goes to */
    href?: Renderable;
    /**Specifies the target for where to open the linked document or where to submit the form */
    target?: Renderable;
  }

  interface LinkAttributes extends Attributes {
    /**Specifies the URL of the page the link goes to */
    href?: Renderable;
    /**Specifies the language of the linked document */
    hreflang?: Renderable;
    /**Specifies what media/device the linked document is optimized for */
    media?: Renderable;
    /**Specifies the relationship between the current document and the linked document */
    rel?: Renderable;
    /**Specifies the size of the linked resource */
    sizes?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;

    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
  }

  interface MapAttributes extends Attributes {
    /**Specifies the name of the element */
    name?: Renderable;
  }

  interface MenuAttributes extends Attributes {
    /**Specifies the type of element */
    type?: Renderable;
  }

  interface StyleAttributes extends Attributes {
    /**Specifies what media/device the linked document is optimized for */
    media?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;

    /**Script to be run when an error occurs */
    onerror?: EventHandler;
    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
  }
  
  interface ScriptAttributes extends Attributes {
    /**Specifies that the script is executed asynchronously (only for external scripts) */
    async?: Renderable;
    /**Specifies the character encoding */
    charset?: Renderable;
    /**Specifies that the script is executed when the page has finished parsing (only for external scripts) */
    defer?: Renderable;
    /**Specifies the URL of the media file */
    src?: Renderable;
    /**Specifies the type of element */
    type?: Renderable;

    /**Script to be run when an error occurs */
    onerror?: EventHandler;
    /**Script to be run when the element is finished loading */
    onload?: EventHandler;
  }

  interface SVGAttributes {
    [name: string]: Renderable;
  }
}