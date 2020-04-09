const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');
const router = express.Router();

// Load input validation
const validateRegisterInput = require('../../../validations/register');
const validateLoginInput = require('../../../validations/login');

// User model
const User = require('../../models/User');

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size 
          r: 'pg', // rating
          d: 'mm' // default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.error(err));
          });
        });
      }
    })
});

// @route   GET api/users/login
// @desc    Login user / Return JWT
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = { 
              id: user.id, 
              name: user.name,
              avatar: user.avatar
            }

            // Sign token
            jwt.sign(
              payload, 
              keys.secretKey, 
              { expiresIn: 3600 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
            });
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors)
          }
        })
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    email: req.user.email
  });
});

module.exports = router;