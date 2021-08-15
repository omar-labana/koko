function create(type) {
  return document.createElement(type);
}

function appendElement(container, element) {
  container.appendChild(element);
}

function setDisplay(element) {
  element.style.display = 'flex';
  element.style.opacity = '1';
}

function setTransparency(element) {
  element.style.opacity = '0';
  setTimeout(() => { element.style.display = 'none'; }, 600);
}

function hideView(backView) {
  setTransparency(backView);
  setTimeout(() => { backView.remove(); }, 200);
}

function appAlert(title, text) {
  const backView = create('div');
  backView.className = 'backView';
  appendElement(document.body, backView);
  backView.setAttribute('tabindex', '0');
  backView.addEventListener('keypress', (e) => {
    if (e.keyCode === 27) {
      hideView(backView);
    }
  });

  const alertPanel = create('div');
  alertPanel.className = 'alertPanel';

  const alertTitle = create('div');
  alertTitle.className = 'alertTitle';
  alertTitle.textContent = title;

  const alertText = create('div');
  alertText.className = 'alertText';
  alertText.textContent = text;

  const okAlertButton = create('div');
  okAlertButton.className = 'okAlertButton';
  okAlertButton.textContent = 'OK';
  okAlertButton.addEventListener('click', () => {
    hideView(backView);
  });

  appendElement(alertPanel, alertTitle);
  appendElement(alertPanel, alertText);
  appendElement(alertPanel, okAlertButton);
  appendElement(backView, alertPanel);
  setDisplay(backView);
}

export {
  create,
  appendElement,
  appAlert,
  setDisplay,
  setTransparency,
};
