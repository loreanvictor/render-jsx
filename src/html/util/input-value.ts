export function setOptionObjectValue($: HTMLOptionElement, value: any) {
  ($ as any)._value = value;
}


export function getOptionObjectValue($: HTMLOptionElement) {
  return ($ as any)._value;
}

export function getInputValue($: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if ($ instanceof HTMLInputElement) {
    if ($.type === 'number'){
      return parseFloat($.value);
    } else if ($.type === 'checkbox' || $.type === 'radio') {
      return $.checked;
    } else {
      return $.value;
    }
  } else if ($ instanceof HTMLSelectElement) {
    const selected = Array.from($.selectedOptions).map(option =>
      getOptionObjectValue(option)
      || option.value
      || option.text
    );

    return $.multiple ? selected : selected[0];
  } else {
    return $.value;
  }
}


export function setInputValue($: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: any) {
  if ($ instanceof HTMLInputElement) {
    if ($.type === 'checkbox' || $.type === 'radio') {
      $.checked = !!value;
    } else {
      $.value = value;
    }
  } else if ($ instanceof HTMLSelectElement) {
    const selected = Array.isArray(value) ? value : [value];

    Array.from($.options).forEach(option => {
      option.selected = (
        (getOptionObjectValue(option) && selected.includes(getOptionObjectValue(option)))
        || (option.value && selected.includes(option.value))
        || (!option.value && selected.includes(option.text))
      );
    });
  } else {
    $.value = value;
  }
}
