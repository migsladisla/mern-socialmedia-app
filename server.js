const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./app/routes/api/users');
const posts = require('./app/routes/api/posts');
const profile = require('./app/routes/api/profile');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, user: 'migs', pass: 'p@ssw0rd'})
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.error(err))

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport.js')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Listening on port ${port}..`));