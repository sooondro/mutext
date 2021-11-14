import words from "../data/words.js";

const retrieveRandomWords = (n) => {
    let randomIndex;
    let wordsArray = [];
    for(let i = 0; i < n; i++) {
        randomIndex = Math.floor(Math.random() * 178187);
        wordsArray.push(words[randomIndex]);
    }
    return wordsArray;
};

export default retrieveRandomWords;