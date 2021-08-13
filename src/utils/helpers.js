const create = (elementName, styles = false, text = false) => {
  const element = document.createElement(elementName);
  if (styles) {
    styles.forEach((style) => {
      element.classList.add(style);
    });
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

export { create }