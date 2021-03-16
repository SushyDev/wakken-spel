// ! Import all the dice imaged in a object
import dices from '../dice/*.svg';

let stats = {
    correct: 0,
    incorrect: 0,
    rolls: 0,
};

const hardMode = () => (sessionStorage.getItem('penguings') === 'true' ? true : false);

// ! Build answer based on current dice
const getAnswer = () => {
    const answer = hardMode()
        ? {
              polarbears: 0,
              iceholes: 0,
              penguings: 0,
          }
        : {
              polarbears: 0,
              iceholes: 0,
          };

    // # For each dice in container check values
    document.getElementById('dices').childNodes.forEach((dice) => {
        const number = dice.value;

        if (hardMode()) {
            if (number === 6) answer.penguings += 3;
            if (number === 5) answer.penguings += 4;
            if (number === 4) answer.penguings += 5;
            if (number === 3) answer.penguings += 6;
            if (number === 2) answer.penguings += 1;
            if (number === 1) answer.penguings += 2;
        }

        if (number === 5) {
            answer.polarbears += 4;
            answer.iceholes++;
        }
        if (number === 3) {
            answer.polarbears += 2;
            answer.iceholes++;
        }
        if (number === 1) {
            answer.polarbears += 0;
            answer.iceholes++;
        }

        // ! Write algorithm to calculate bottom side of dice
        /*
        ? 1 = 2 / 2 = 1
        ? 3 = 6 / 6 = 3
        ? 4 = 5 / 5 = 4
        */
    });

    return answer;
};

// ! Create a dice with a random number between 1-6
const createDice = () => {
    // ? Roll random number between 1-6
    const rand = Math.floor(Math.random() * 6) + 1;

    const dice = document.createElement('div');
    dice.className = 'dice';
    dice.value = rand;

    const img = document.createElement('img');
    img.src = dices[rand];
    img.alt = rand

    dice.appendChild(img);

    return dice;
};

// ! Create options for select
const createDiceOption = (num) => {
    const option = document.createElement('option');
    option.value = num;
    option.textContent = num;

    return option;
};

// ! Check penguing mode
function checkMode(checked) {
    if (checked) {
        document.querySelectorAll('.penguings').forEach((element) => element.classList.remove('disabled'));
    } else {
        document.querySelectorAll('.penguings').forEach((element) => element.classList.add('disabled'));
    }
}

// # Add options 3-12 to select
for (let added = 3; added <= 12; added++) document.getElementById('dice-count').appendChild(createDiceOption(added));

// ? Winows functions

// ! Log answer
window.get = () => console.log(getAnswer());

// ! Verify answer
window.answer = function answer() {
    const polarbears = parseInt(document.getElementById('polarbears').value);
    const iceholes = parseInt(document.getElementById('iceholes').value);
    const penguings = parseInt(document.getElementById('penguings').value);
    const answer = hardMode() ? {polarbears, iceholes, penguings} : {polarbears, iceholes};

    // ? On correct
    if (JSON.stringify(answer) === JSON.stringify(getAnswer())) {
        alert('Congratiolations, thats the correct answer');
        stats.correct++;
        document.getElementById('stats-correct').value = stats.correct;
    } else {
        alert('You guessed it wrong, retry');
        stats.incorrect++;
        document.getElementById('stats-incorrect').value = stats.incorrect;
    }

    // # Display correct answer
    document.getElementById('polarbears-correct').value = getAnswer().polarbears || 0;
    document.getElementById('iceholes-correct').value = getAnswer().iceholes || 0;
    document.getElementById('penguings-correct').value = getAnswer().penguings || 0;

    // # Reset
    addDices(document.getElementById('dice-count').value);
};

// ! Reroll dice
window.reroll = function reroll() {
    stats.rolls++;
    document.getElementById('stats-rolls').value = stats.rolls;
    addDices(document.getElementById('dice-count').value);
};

// ! For dice count add dice to container
window.addDices = function addDices(amount) {
    const container = document.getElementById('dices');
    container.innerHTML = '';

    for (let added = 1; added <= amount; added++) container.appendChild(createDice());
};

// ! Toggle penguing mode
window.toggleMode = (elem) => {
    sessionStorage.setItem('penguings', elem.checked);
    checkMode(elem.checked);
};

// ! Toggle help dialog
window.help = function help() {
    const dialog = document.getElementById('help-dialog');
    dialog.classList.contains('shown') ? dialog.classList.remove('shown') : dialog.classList.add('shown');
};

// # Do some stuff on load
addDices(3);
sessionStorage.setItem('penguings', false);
checkMode();
