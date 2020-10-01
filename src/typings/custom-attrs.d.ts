declare module HTML {
  /**
   *
   * Signifies state types, i.e. values that can be read from and can be updated
   * (e.g. state of an input element).
   *
   */
  export type StateType = any;

  interface Attributes {
    /**
     *
     * A reference to this element, when it is resolved.
     * This allows for cleaner code by referencing an element using a reference
     * and specifying the element within the layout afterwards.
     *
     */
    _ref?: RefLike<Node>;

    /**
     *
     * The internal HTML of the element.
     *
     */
    _content?: HTML.Renderable;
  }

  interface InputAttributes {
    _state?: StateType;
    _value?: any;
  }

  interface TextAreaAttributes {
    _state?: StateType;
  }

  interface SelectAttributes {
    _state?: StateType;
  }

  interface OptionAttributes {
    _value?: any;
  }
}
