const words = require("../data/words");

module.exports = (n) => {
    let randomIndex;
    let wordsArray = [];
    for(let i = 0; i < n; i++) {
        randomIndex = Math.floor(Math.random() * 178187);
        wordsArray.push(words[randomIndex]);
    }
    return wordsArray;
};
