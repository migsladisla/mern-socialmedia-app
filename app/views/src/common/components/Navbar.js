import React, { Component } from 'react';
import { withRouter } from "react-router";

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './../../store/actions/authAction';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                SureBlog
              </Typography>
              <Button color="inherit" onClick={this.onLogoutClick.bind(this)}>
                Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(withStyles(useStyles)(Navbar)));