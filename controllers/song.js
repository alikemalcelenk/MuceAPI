const Song = require('../models/Song');

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
