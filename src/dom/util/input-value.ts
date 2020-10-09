export function setOptionObjectValue($: HTMLOptionElement, value: any) {
  ($ as any)._value = value;
}


export function getOptionObjectValue($: HTMLOptionElement) {
  return ($ as any)._value;
}

export function getInputValue($: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if ($.nodeName === 'INPUT') {
    if ($.type === 'number'){
      return parseFloat($.value);
    } else if ($.type === 'checkbox' || $.type === 'radio') {
      return ($ as HTMLInputElement).checked;
    } else {
      return $.value;
    }
  } else if ($.nodeName === 'SELECT') {
    const s = $ as HTMLSelectElement;
    const selected = Array.from(s.selectedOptions).map(option =>
      getOptionObjectValue(option)
      || option.value
      || option.text
    );

    return s.multiple ? selected : selected[0];
  } else {
    return $.value;
  }
}


export function setInputValue($: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: any) {
  if ($.nodeName === 'INPUT') {
    if ($.type === 'checkbox' || $.type === 'radio') {
      ($ as HTMLInputElement).checked = !!value;
    } else {
      $.value = value;
    }
  } else if ($.nodeName === 'SELECT') {
    const s = $ as HTMLSelectElement;
    const selected = Array.isArray(value) ? value : [value];

    Array.from(s.options).forEach(option => {
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
