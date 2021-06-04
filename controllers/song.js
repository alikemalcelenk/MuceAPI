const request = require('request');

//multer
const upload = require('./middleware/multer');
const getImageFile = upload.single('photo');

//models
const Song = require('../models/Song');

//config
const env = require('../config/environment');

exports.add = (req, res) => {
  const { name, artist, emotion, spotifyUrl, youtubeUrl } = req.body;

  const newSong = new Song({
    name,
    artist,
    emotion,
    spotifyUrl,
    youtubeUrl,
  });

  newSong
    .save()
    .then((song) => {
      if (song.name) {
        res.json({ song });
      } else {
        res.status(500).json();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.propose = (req, res) => {
  getImageFile(req, res, async function (err) {
    if (err) {
      return res
        .json({
          errors: [{ title: 'File Upload Error', details: err.message }],
        })
        .status(404);
    }

    request.post(
      {
        url: env.FER_SERVICE_API + '/upload',
        formData: {
          image: {
            value: req.file.buffer, // Give your node.js buffer to here
            options: {
              filename: req.file.originalname, // filename
              contentType: req.file.mimetype, // file content-type
            },
          },
        },
      },
      (err, httpResponse, emotionPred) => {
        if (err) res.status(404).json(err);
        res.json(JSON.parse(emotionPred));
      }
    );
  });
};
