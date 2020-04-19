import React, { Component } from 'react';

// Material UI
import { Grid, CssBaseline, Container } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import LeftDashboard from './LeftDashboard';
import CenterDashboard from './CenterDashboard';
import RightDashboard from './RightDashboard';

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.auth.isAuthenticated ? 
    this.props.history.push('/dashboard') :
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <LeftDashboard />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CenterDashboard />
            </Grid>
            <Grid item xs={12} lg={3}>
              <RightDashboard />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(useStyles)(Dashboard));