const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb+srv://muceadmin:muceadmin1122@maincluster.lt01l.mongodb.net/Muce?retryWrites=true&w=majority',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });
};
