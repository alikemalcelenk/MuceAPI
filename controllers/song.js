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
            value: req.file.buffer,
            options: {
              filename: req.file.originalname,
              contentType: req.file.mimetype,
            },
          },
        },
      },
      (err, httpResponse, emotionPred) => {
        if (err) res.status(500).json(err);

        //propose randomly a song
        Song.aggregate([
          {
            $match: {
              emotion: JSON.parse(emotionPred).emotion,
            },
          },
          { $sample: { size: 1 } },
        ])
          .then((song) => {
            res.json({ song: song[0] });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      },
    );
  });
};
