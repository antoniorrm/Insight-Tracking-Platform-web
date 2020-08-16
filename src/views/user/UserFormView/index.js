import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import UserForm from '../components/UserForm';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserFormView = () => {
  const classes = useStyles();
  // const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Formulário">
      <Container maxWidth={false}>
        <UserForm />
      </Container>
    </Page>
  );
};

export default UserFormView;
