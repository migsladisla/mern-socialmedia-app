import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Search() {
  const styles = useStyles();
  const [search, setSearch] = useState('Test');

  const handeSearchText = e => {
    setSearch(e.target.value);
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={search}
        onChange={handeSearchText}
        classes={{ root: styles.inputRoot, input: styles.inputInput }}
      />
    </div>
  );
}

function Logo() {
  const styles = useStyles();
  return (
    <Typography className={styles.title} variant="h6" noWrap>
      SureBlog
    </Typography>
  );
}

function Navbar(props) {
  return (
    <AppBar position="static" color="primary">
      {props.children}
    </AppBar>
  );
}

function Layout() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Navbar>
        <Container maxWidth="md">
          <Toolbar>
            <Logo />
            <Search />
          </Toolbar>
        </Container>
      </Navbar>
    </div>
  );
}

export default Layout;