const Joi = require('joi');

exports.add = (req, res, next) => {
  const addSchema = Joi.object().keys({
    name: Joi.string().trim().max(300).required(),
    artist: Joi.string().trim().max(300).required(),
    coverArt: Joi.string().trim().max(500).required(),
    emotion: Joi.string().trim().max(15).required(),
    spotifyUrl: Joi.string().trim().max(500).required(),
    youtubeUrl: Joi.string().trim().max(500).required(),
  });

  addSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(500).json({ data: 'Validation Error' });
    });
};
