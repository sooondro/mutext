import retrieveRandomWords from '../data/words.js';

const getWords = (req, res, next) => {
  const numberOfWords = req.query.count;
  res.status(200).json({
    randomWords: retrieveRandomWords(numberOfWords)
  });
};

export default {
  getWords
};