// ! Import all the dice imaged in a object
import dices from '../dice/*.svg';

// # Create a dice with a random number between 1-6
const createDice = () => {
    const rand = Math.floor(Math.random() * 6) + 1;

    const dice = document.createElement('div');
    dice.className = 'dice';

    const img = document.createElement('img');
    img.src = dices[rand];

    dice.appendChild(img);
    return dice;
};

// # For dice count add dice to container
window.addDices = function addDices(amount) {
    const container = document.getElementById('dices');
    container.innerHTML = '';
    for (let added = 1; added <= amount; added++) container.appendChild(createDice());
};

// # Add all options to select
{
    const createDiceOption = (num) => {
        const option = document.createElement('option');
        option.value = num;
        option.textContent = num;
        return option;
    };
    for (let added = 1; added <= 12; added++) document.getElementById('dice-count').appendChild(createDiceOption(added));
}
addDices(1);
