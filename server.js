const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, user: 'migs', pass: 'p@ssw0rd'})
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.error(err))

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}..`));