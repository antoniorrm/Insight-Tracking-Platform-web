import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  toolbar: {
    height: 64
  },
  title: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 100
    }
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Insight Tracking Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
