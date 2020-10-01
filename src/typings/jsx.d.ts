declare module JSX {
  type Element = any;

  interface IntrinsicElements {
    /**HTML Markers */
    _marker: HTML.Attributes;
    /**Defines a hyperlink */
    a: HTML.AAttributes;
    /**Defines an abbreviation or an acronym */
    abbr: HTML.Attributes;
    /**Defines contact information for the author/owner of a document/article */
    address: HTML.Attributes;
    /**Defines an area inside an image-map */
    area: HTML.AreaAttributes;
    /**Defines an article */
    article: HTML.Attributes;
    /**Defines content aside from the page content */
    aside: HTML.Attributes;
    /**Defines sound content */
    audio: HTML.AudioVideoAttributes;
    /**Defines bold text */
    b: HTML.Attributes;
    /**Specifies the base URL/target for all relative URLs in a document */
    base: HTML.BaseAttributes;
    /**Isolates a part of text that might be formatted in a different direction from other text outside it */
    bdi: HTML.Attributes;
    /**Overrides the current text direction */
    bdo: HTML.Attributes;
    /**Defines big text */
    big: HTML.Attributes;
    /**Defines a section that is quoted from another source */
    blockquote: HTML.QAttributes;
    /**Defines the document's body */
    body: HTML.Attributes;
    /**Inserts a single line break */
    br: HTML.Attributes;
    /**Defines a clickable button */
    button: HTML.ButtonAttributes;
    /**Used to draw graphics, on the fly, via scripting (usually JavaScript) */
    canvas: HTML.CanvasAttributes;
    /**Defines a table caption */
    caption: HTML.Attributes;
    /**Defines the title of a work */
    cite: HTML.Attributes;
    /**Defines a piece of computer code */
    code: HTML.Attributes;
    /**Specifies column properties for each column within a <colgroup> element */
    col: HTML.ColAttributes;
    /**Specifies a group of one or more columns in a table for formatting */
    colgroup: HTML.ColAttributes;
    /**Links the given content with a machine-readable translation */
    data: HTML.Attributes;
    /**Specifies a list of pre-defined options for input controls */
    datalist: HTML.Attributes;
    /**Defines a description of a term/name in a description list */
    dd: HTML.Attributes;
    /**Defines text that has been deleted from a document */
    del: HTML.DelInsAttributes;
    /**Defines additional details that the user can view or hide */
    details: HTML.DetailsAttributes;
    /**Represents the defining instance of a term */
    dfn: HTML.Attributes;
    /**Defines a dialog box or window */
    dialog: HTML.Attributes;
    /**Defines a section in a document */
    div: HTML.Attributes;
    /**Defines a description list */
    dl: HTML.Attributes;
    /**Defines a term/name in a description list */
    dt: HTML.Attributes;
    /**Defines emphasized text  */
    em: HTML.Attributes;
    /**Defines a container for an external (non-HTML) application */
    embed: HTML.EmbedAttributes;
    /**Groups related elements in a form */
    fieldset: HTML.FieldsetAttributes;
    /**Defines a caption for a <figure> element */
    figcaption: HTML.Attributes;
    /**Specifies self-contained content */
    figure: HTML.Attributes;
    /**Defines a footer for a document or section */
    footer: HTML.Attributes;
    /**Defines an HTML form for user input */
    form: HTML.FormAttributes;
    /**Defines HTML headings */
    h1: HTML.Attributes;
    /**Defines HTML headings */
    h2: HTML.Attributes;
    /**Defines HTML headings */
    h3: HTML.Attributes;
    /**Defines HTML headings */
    h4: HTML.Attributes;
    /**Defines HTML headings */
    h5: HTML.Attributes;
    /**Defines HTML headings */
    h6: HTML.Attributes;
    /**Defines information about the document */
    head: HTML.Attributes;
    /**Defines a header for a document or section */
    header: HTML.Attributes;
    /**Defines a thematic change in the content */
    hr: HTML.Attributes;
    /**Defines an HTML document */
    html: HTML.Attributes;
    /**Defines a part of text in an alternate voice or mood */
    i: HTML.Attributes;
    /**Defines an inline frame */
    iframe: HTML.IFrameAttributes;
    /**Defines an image */
    img: HTML.ImgAttributes;
    /**Defines an input control */
    input: HTML.InputAttributes;
    /**Defines a text that has been inserted into a document */
    ins: HTML.DelInsAttributes;
    /**Defines keyboard input */
    kbd: HTML.Attributes;
    keygen: HTML.Attributes;
    /**Defines a label for an <input> element */
    label: HTML.LabelAttributes;
    /**Defines a caption for a <fieldset> element */
    legend: HTML.Attributes;
    /**Defines a list item */
    li: HTML.LiAttributes;
    /**Defines the relationship between a document and an external resource (most used to link to style sheets) */
    link: HTML.LinkAttributes;
    /**Specifies the main content of a document */
    main: HTML.Attributes;
    /**Defines a client-side image-map */
    map: HTML.MapAttributes;
    /**Defines marked/highlighted text */
    mark: HTML.Attributes;
    menu: HTML.MenuAttributes;
    menuitem: HTML.Attributes;
    /**Defines metadata about an HTML document */
    meta: HTML.MetaAttributes;
    /**Defines a scalar measurement within a known range (a gauge) */
    meter: HTML.MeterAttributes;
    /**Defines navigation links */
    nav: HTML.Attributes;
    /**Defines an alternate content for users that do not support client-side scripts */
    noscript: HTML.Attributes;
    /**Defines an embedded object */
    object: HTML.ObjectAttributes;
    /**Defines an ordered list */
    ol: HTML.Attributes;
    /**Defines a group of related options in a drop-down list */
    optgroup: HTML.OptGroupAttributes;
    /**Defines an option in a drop-down list */
    option: HTML.OptionAttributes;
    /**Defines the result of a calculation */
    output: HTML.OutputAttributes;
    /**Defines a paragraph */
    p: HTML.Attributes;
    /**Defines a parameter for an object */
    param: HTML.ParamAttributes;
    /**Defines a container for multiple image resources */
    picture: HTML.Attributes;
    /**Defines preformatted text */
    pre: HTML.Attributes;
    /**Represents the progress of a task */
    progress: HTML.ProgressAttributes;
    /**Defines a short quotation */
    q: HTML.QAttributes;
    /**Defines what to show in browsers that do not support ruby annotations */
    rp: HTML.Attributes;
    /**Defines an explanation/pronunciation of characters (for East Asian typography) */
    rt: HTML.Attributes;
    /**Defines a ruby annotation (for East Asian typography) */
    ruby: HTML.Attributes;
    /**Defines text that is no longer correct */
    s: HTML.Attributes;
    /**Defines sample output from a computer program */
    samp: HTML.Attributes;
    /**Defines a client-side script */
    script: HTML.ScriptAttributes;
    /**Defines a section in a document */
    section: HTML.Attributes;
    /**Defines a drop-down list */
    select: HTML.SelectAttributes;
    /**Defines smaller text */
    small: HTML.Attributes;
    /**Defines multiple media resources for media elements (<video>, <audio> and <picture>) */
    source: HTML.SourceAttributes;
    /**Defines a section in a document */
    span: HTML.Attributes;
    /**Defines important text */
    strong: HTML.Attributes;
    /**Defines style information for a document */
    style: HTML.StyleAttributes;
    /**Defines subscripted text */
    sub: HTML.Attributes;
    /**Defines a visible heading for a <details> element */
    summary: HTML.Attributes;
    /**Defines superscripted text */
    sup: HTML.Attributes;
    /**Defines a table */
    table: HTML.Attributes;
    /**Groups the body content in a table */
    tbody: HTML.Attributes;
    /**Defines a cell in a table */
    td: HTML.TdThAttributes;
    /**Defines a multiline input control (text area) */
    textarea: HTML.TextAreaAttributes;
    /**Groups the footer content in a table */
    tfoot: HTML.Attributes;
    /**Defines a header cell in a table */
    th: HTML.ThAttributes;
    /**Groups the header content in a table */
    thead: HTML.Attributes;
    /**Defines a date/time */
    time: HTML.Attributes;
    /**Defines a title for the document */
    title: HTML.Attributes;
    /**Defines a row in a table */
    tr: HTML.Attributes;
    /**Defines text tracks for media elements (<video> and <audio>) */
    track: HTML.TrackAttributes;
    /**Defines text that should be stylistically different from normal text */
    u: HTML.Attributes;
    /**Defines an unordered list */
    ul: HTML.Attributes;
    /**Defines a variable */
    var: HTML.Attributes;
    /**Defines a video or movie */
    video: HTML.VideoAttributes;
    /**Defines a possible line-break */
    wbr: HTML.Attributes;
    /**Defines a container for SVG graphics */
    svg: HTML.SVGAttributes;
    circle: HTML.SVGAttributes;
    defs: HTML.SVGAttributes;
    ellipse: HTML.SVGAttributes;
    g: HTML.SVGAttributes;
    line: HTML.SVGAttributes;
    linearGradient: HTML.SVGAttributes;
    mask: HTML.SVGAttributes;
    path: HTML.SVGAttributes;
    pattern: HTML.SVGAttributes;
    polygon: HTML.SVGAttributes;
    polyline: HTML.SVGAttributes;
    radialGradient: HTML.SVGAttributes;
    rect: HTML.SVGAttributes;
    stop: HTML.SVGAttributes;
    text: HTML.SVGAttributes;
    tspan: HTML.SVGAttributes;
  }
}