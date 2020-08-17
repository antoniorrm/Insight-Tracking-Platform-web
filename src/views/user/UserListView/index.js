import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';

import api from 'src/service/api';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import UserModalForm from '../components/UserModalForm';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [searchReset, setSearchReset] = useState('');

  useEffect(() => {
    async function getUsers() {
      await api.get('/user').then(res => setUsers(res.data));
    }
    if (searchReset === '') {
      getUsers();
    }
  }, [searchReset]);

  const handleOpen = user => {
    setOpen(true);
  };

  const handleClose = user => {
    if (JSON.stringify(user) !== '{}') {
      navigate(`show`, { state: user });
    }
    setOpen(false);
  };

  const handleSearch = async (type, value) => {
    setSearchReset('a');
    setSearchReset(prev =>
      prev === '' ? setSearchReset('') : setSearchReset(value)
    );
    await api
      .get('/user', {
        params: {
          type,
          value
        }
      })
      .then(res => setUsers(res.data));
  };

  const handleDelete = async id => {
    await api.delete(`/user/${id}`).then(res => {
      enqueueSnackbar('Removido com Sucesso', {
        variant: 'success'
      });
      setUsers(users.filter(a => a.id !== id));
    });
  };

  return (
    <Page className={classes.root} title="Usuários">
      <UserModalForm open={open} handleClose={handleClose} />
      <Container maxWidth={false}>
        <Toolbar handleOpen={handleOpen} handleSearch={handleSearch} />
        <Box mt={3}>
          <Results
            users={users}
            handleOpen={handleOpen}
            handleDelete={handleDelete}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
