const retrieveRandomWords = require('../util/retrieve-random-numbers');

exports.getWords = (req, res, next) => {
  const numberOfWords = req.query.count;
  res.status(200).json({
    randomWords: retrieveRandomWords(numberOfWords)
  });

};


