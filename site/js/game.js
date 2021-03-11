// ! Import all the dice imaged in a object
import dices from '../dice/*.svg';

// ! Build answer based on current dice
const getAnswer = () => {
    const container = document.getElementById('dices');

    const correct = {
        icebears: 0,
        wakken: 0,
        penguings: 0,
    };

    // ? For each dice in container check values
    container.childNodes.forEach((dice) => {
        const number = dice.value;

        if (number === 5) {
            correct.icebears += 4;
            correct.wakken++;
        }
        if (number === 3) {
            correct.icebears += 2;
            correct.wakken++;
        }
        if (number === 1) {
            correct.icebears += 0;
            correct.wakken++;
        }
    });

    return correct;
};

// ! Create a dice with a random number between 1-6
const createDice = () => {
    const rand = Math.floor(Math.random() * 6) + 1;

    const dice = document.createElement('div');
    dice.className = 'dice';
    dice.value = rand;

    const img = document.createElement('img');
    img.src = dices[rand];

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

// ! Add options to select
for (let added = 1; added <= 12; added++) document.getElementById('dice-count').appendChild(createDiceOption(added));

// ? Winows functions
// ! Log answer
window.get = () => console.log(getAnswer());

// ! Verify answer
window.answer = function answer() {
    const icebears = parseInt(document.getElementById('icebears').value);
    const wakken = parseInt(document.getElementById('wakken').value);
    const penguings = parseInt(document.getElementById('penguings').value);
    const answer = {icebears, wakken, penguings};

    // ?  On correct
    if (JSON.stringify(answer) === JSON.stringify(getAnswer())) {
        alert('Congratiolations, thats the correct answer');
        // ? reset
        addDices(document.getElementById('dice-count').value);
    }
};

// ! For dice count add dice to container
window.addDices = function addDices(amount) {
    const container = document.getElementById('dices');
    container.innerHTML = '';
    for (let added = 1; added <= amount; added++) container.appendChild(createDice());
};
addDices(1);
