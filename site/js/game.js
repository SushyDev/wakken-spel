// ! Import all the dice imaged in a object
import dices from '../dice/*.svg';

let stats = {
    correct: 0,
    incorrect: 0,
    rolls: -1,
};

// ! Build answer based on current dice
const getAnswer = () => {
    const correct = {
        icebears: 0,
        wakken: 0,
        penguings: 0,
    };

    // ? For each dice in container check values
    document.getElementById('dices').childNodes.forEach((dice) => {
        const number = dice.value;

        if (number === 6) correct.penguings += 3;
        if (number === 5) {
            correct.icebears += 4;
            correct.wakken++;
            correct.penguings += 4;
        }
        if (number === 4) correct.penguings += 5;
        if (number === 3) {
            correct.icebears += 2;
            correct.wakken++;
            correct.penguings += 6;
        }
        if (number === 2) correct.penguings += 1;
        if (number === 1) {
            correct.icebears += 0;
            correct.wakken++;
            correct.penguings += 2;
        }

        // ! Write algorithm to calculate bottom side of dice
        /*
        1 = 2 / 2 = 1
        3 = 6 / 6 = 3
        4 = 5 / 5 = 4
        */
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
for (let added = 3; added <= 12; added++) document.getElementById('dice-count').appendChild(createDiceOption(added));

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
        stats.correct++;
        document.getElementById('stats-correct').textContent = `Answered correctly: ${stats.correct}`;
    } else {
        alert('You guessed it wrong, retry');
        stats.incorrect++;
        document.getElementById('stats-incorrect').textContent = `Answered wrong: ${stats.incorrect}`;
    }

    // ? Display correct answer
    document.getElementById('icebears-correct').value = getAnswer().icebears;
    document.getElementById('wakken-correct').value = getAnswer().wakken;
    document.getElementById('penguings-correct').value = getAnswer().penguings;

    // ? Reset
    addDices(document.getElementById('dice-count').value);
};

// ! For dice count add dice to container
window.addDices = function addDices(amount) {
    const container = document.getElementById('dices');
    container.innerHTML = '';
    stats.rolls++;
    document.getElementById('stats-rolls').textContent = `Rolled the dice: ${stats.rolls}`;
    for (let added = 1; added <= amount; added++) container.appendChild(createDice());
};
addDices(3);
