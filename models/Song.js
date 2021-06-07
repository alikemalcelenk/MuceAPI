const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  artist: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  coverArt: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  emotion: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  spotifyUrl: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  youtubeUrl: {
    type: String,
    required: [true, '`{PATH}` is necessary.'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Song', SongSchema);
