import React, { useState, useEffect } from 'react';

// Material UI
import { 
  CssBaseline,
  Box, 
  Grid,
  Avatar,
  Button,
  Link,
  Paper,
  Typography,
  TextField }
from '@material-ui/core';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Copyright from '../../common/components/Copyright';
import { makeStyles } from "@material-ui/core/styles";

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authAction';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  },
  paperBackground: {
    backgroundImage: 'linear-gradient(109.6deg, rgba(204,228,247,1) 11.2%, rgba(237,246,250,1) 100.2%)'
  },
  header: {
    marginBottom: theme.spacing(6),
    fontWeight: 400
  },
  emoji: {
    color: theme.palette.primary.main,
    fontSize: 40
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signIn: {
    marginTop: theme.spacing(1),
  }
}));

function Register(props) {
  const styles = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(props.auth.isAuthenticated) {
      props.history.push('/home');
    }

    if(props.errors) {
      setErrors(props.errors);
    }
  }, [props])

  const handleNameChange = e => {
    setName(e.target.value);
    setErrors({});
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setErrors({});
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrors({});
  }

  const handlePassword2Change = e => {
    setPassword2(e.target.value);
    setErrors({});
  }

  const handleRegister = e => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2
    }

    props.registerUser(newUser, props.history);
  }

  return (
    <div>
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} className={styles.paperBackground} square>
          <div className={styles.paper}>
            <Typography component="h1" variant="h3" className={styles.header}>
              Join the community today! <SentimentVerySatisfiedIcon className={styles.emoji} />
            </Typography>
            <Avatar className={styles.avatar}>
              <FaceOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={styles.form} onSubmit={handleRegister} autoComplete="off" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={handleNameChange}
                    helperText={errors.name}
                    error={errors.name ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    onChange={handlePasswordChange}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="password2"
                    onChange={handlePassword2Change}
                    helperText={errors.password2}
                    error={errors.password2 ? true : false}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={styles.submit}
              >
                Sign Up
              </Button>
              <Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by searching your email address.
                  </Typography>
                </Grid>
              </Grid>
              <Grid>
                <Grid className={styles.signIn}>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={false} md={6} lg={7} className={styles.image} />
      </Grid>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);