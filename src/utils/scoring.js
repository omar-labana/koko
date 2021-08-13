import { create } from './helpers';


const saveScore = async (callBack, errorCallBack, user, score) => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/sHO7yOclRItalZudkjtg/scores';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  };

  await fetch(url, data)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((err) => errorCallBack('Error ', err));
}
// TODO: Fix buttons logic
const showSaved = (data) => {
  const scoreText = document.getElementById('scoreText');
  scoreText.innerHTML = data.result;
}

const renderInput = () => {
  let inputDiv = document.getElementById('inputDiv');
  if (inputDiv) return;
  console.log('aaa');
  inputDiv = create('div');
  inputDiv.classList.add('absolute', 'w-screen', 'h-screen', 'z-10', 'flex', 'flex-col', 'bg-black', 'items-center', 'justify-center')
  inputDiv.id = 'inputDiv';
  const input = create('input');
  input.type = 'text';
  input.setAttribute('placeholder', 'Your Name');
  input.classList.add('p-3', 'my-1', 'rounded', 'text-xl')
  const submitButton = create('button');
  submitButton.innerHTML = 'Submit';
  submitButton.addEventListener('click', () => {
    if (input.value.trim() !== '') {
      window.game.playerName = input.value;
      saveScore(showSaved, 1, window.game.playerName, window.game.points);
      inputDiv.remove();
    }
  });

  const cancelButton = create('button');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.addEventListener('click', () => {
    inputDiv.remove();
  });

  submitButton.classList.add('p-3', 'bg-red-900', 'my-1', 'text-white', 'rounded', 'w-32')
  cancelButton.classList.add('p-3', 'bg-red-900', 'my-1', 'text-white', 'rounded', 'w-32')

  inputDiv.appendChild(input);
  inputDiv.appendChild(submitButton);
  inputDiv.appendChild(cancelButton);
  document.body.appendChild(inputDiv);
}

