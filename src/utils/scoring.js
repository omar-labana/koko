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

const renderScore = () => {
  let scoresDiv = document.getElementById('scoresDiv');
  if (scoresDiv) {
    const scoreText = document.getElementById('scoreText');
    scoreText.innerHTML = 'Score : 0';
    return;
  }
  scoresDiv = create('div');
  scoresDiv.id = 'scoresDiv';

  const scoreText = create('label');
  scoreText.id = 'scoreText';
  scoreText.innerHTML = 'Score : '.concat(window.game.points.toString());

  scoresDiv.appendChild(scoreText);
  document.body.appendChild(scoresDiv);
}

const renderHealth = () => {
  let HealthDiv = document.getElementById('HealthDiv');
  if (HealthDiv) {
    const HealthText = document.getElementById('HealthText');
    HealthText.innerHTML = 'health : '.concat(window.game.health).concat('%');
    return;
  }
  HealthDiv = create('div');
  HealthDiv.id = 'HealthDiv';

  const HealthText = create('label');
  HealthText.id = 'HealthText';
  HealthText.innerHTML = 'health : '.concat(window.game.health).concat('%');

  HealthDiv.appendChild(HealthText);
  document.body.appendChild(HealthDiv);
}

const addPoints = (game, points) => {
  const newPoints = game.points + points;
  return newPoints;
}

const renderPoints = () => {
  const scoreText = document.getElementById('scoreText');
  if (scoreText) scoreText.innerHTML = 'Score : '.concat(window.game.points.toString());
}

const checkScore = () => {
  if (window.game.points >= 0) {
    if (window.game.playerName === '') {
      renderInput();
    } else if (window.game.points > 0) {
      saveScore(showSaved, 1, window.game.playerName, window.game.points);
    }
  }
}


// TODO: Fix call back error
const fetchScores = async (callBack, errorCallBack, scene) => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/sHO7yOclRItalZudkjtg/scores';

  await fetch(url)
    .then((response) => response.json())
    .then((data) => callBack(data, scene))
    .catch((err) => errorCallBack('Error', err));
}

const renderScoreData = (scene, scoreData, yPos) => {
  const tcolor = scoreData.user === window.game.playerName ? 'yellow' : '#ffffff';
  scene.add.text(100, yPos, scoreData.user, {
    fontFamily: 'monospace',
    fontSize: 22,
    color: tcolor,
    align: 'left',
  });
  scene.add.text(280, yPos, scoreData.score, {
    fontFamily: 'monospace',
    fontSize: 22,
    color: tcolor,
    align: 'right',
    fixedWidth: 100,
  });
}

const gotScores = (data, scene) => {
  const { result } = data;
  const rsort = result.sort((a, b) => b.score - a.score);
  let yPos = 100;
  const players = [];
  for (let index = 0; index < rsort.length; index += 1) {
    const element = rsort[index];
    if (!players.includes(element.user)) {
      players.push(element.user);
      renderScoreData(scene, element, yPos);
      yPos += 30;
      if (players.length > 9) break;
    }
  }
}


export {
  saveScore, showSaved, renderInput, renderScore, renderHealth
}

export {
  addPoints, renderPoints, checkScore, fetchScores, renderScoreData, gotScores
}