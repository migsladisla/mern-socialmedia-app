import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authAction';
import { withStyles } from "@material-ui/core/styles";
import { 
  CssBaseline,
  Box, 
  Grid, 
  Paper,
  Avatar,
  Button,
  Link,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel }
from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Copyright from '../../common/components/Copyright';

const UserAssistance = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="inherit">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href="/register" variant="inherit">
          Don't have an account yet? Sign Up
        </Link>
      </Grid>
    </Grid>
  )
}

const useStyles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1554068292-ce72e2521c9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
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
    backgroundImage: 'linear-gradient(90deg,  rgba(201,234,252,0.51) 14.9%, rgba(139,192,216,0.73) 80% )'
  },
  header: {
    marginBottom: theme.spacing(8),
    fontWeight: 400
  },
  loginText: {
    marginBottom: theme.spacing(1)
  },
  avatar: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user);
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    
    return (
      <div>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={5} md={7} className={classes.image} />
          <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} className={classes.paperBackground} square>
            <div className={classes.paper}>
              <Typography component="h1" variant="h3" className={classes.header}>
                See what's happening in the gaming world right now!
              </Typography>
              <Grid container alignItems="center" className={classes.loginText}>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LockIcon/>
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h6">
                    Sign in
                  </Typography>
                </Grid>
              </Grid>
              <form className={classes.form} onSubmit={this.onSubmit} autoComplete="off" noValidate>
                <TextField
                  error={errors.email ? true : false}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                  autoFocus
                />
                <TextField
                  error={errors.password ? true : false}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  helperText={errors.password}
                  value={this.state.password}
                  onChange={this.onChange}
                  autoFocus
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                >
                  SIGN ME IN
                </Button>
                <UserAssistance />
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withStyles(useStyles)(Landing));