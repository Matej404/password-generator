const characterAmountRange = document.querySelector('#characterAmountRange');
const characterAmountNumber = document.querySelector('#characterAmountNumber');
const form = document.querySelector('#passwordGeneratorForm');
const includeUpperCaseElement = document.querySelector('#includeUppercase');
const includeNumbersElement = document.querySelector('#includeNumbers');
const includeSymbolsElements = document.querySelector('#includeSymbols');
const LOWER_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPER_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));
const displayPassword = document.querySelector('.password-display');

characterAmountRange.addEventListener('input', syncCharacterAmount);
characterAmountNumber.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', e => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUpperCase = includeUpperCaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElements.checked;
    const password = passwordGenerator(characterAmount, includeUpperCase, includeNumbers, includeSymbols);
    displayPassword.innerText = password;
})

function passwordGenerator(characterAmount, includeUpperCase, includeNumbers, includeSymbols) {
    let charCodes = LOWER_CHAR_CODES;
    if (includeUpperCase) charCodes = charCodes.concat(UPPER_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
    if(includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

    const passwordCharacters = [];
    for(let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.round(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {

    const array = [];
    for(let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountRange.value = value;
    characterAmountNumber.value = value;
}