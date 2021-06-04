const Song = require('../models/Song');

//multer
const upload = require('./middleware/multer');
const getImageFile = upload.single('photo');

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

    res.json('Photo is pulled!');
  });
};
