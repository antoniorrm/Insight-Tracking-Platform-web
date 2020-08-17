import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Modal,
  Backdrop,
  Fade
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import api from 'src/service/api';

import { useSnackbar } from 'notistack';
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'_'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const UserModalForm = ({ className, open, handleClose, user, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const editUser = () => {
      return user ? setValues(user) : null;
    };
    editUser();
  }, [user]);

  const handleChange = event => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = async event => {
    event.preventDefault();
    user
      ? await api.put(`/user/${user.id}`, values).then(res => {
          enqueueSnackbar('Atualizado com Sucesso', {
            variant: 'success'
          });
          handleClose(res.data);
        })
      : await api.post('/user', values).then(res => {
          enqueueSnackbar('Adicionado com Sucesso', {
            variant: 'success'
          });
          handleClose(res.data);
        });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => handleClose(user ? user : {})}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <form
          onSubmit={handleOnSubmit}
          autoComplete="true"
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardHeader
              subheader={user ? 'Editar usuário' : 'Adicionar um novo usuário'}
              title="Usuário"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={values.phone}
                    variant="outlined"
                    InputProps={{
                      inputComponent: TextMaskCustom
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Endereço"
                    name="address"
                    onChange={handleChange}
                    required
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Box p={1} />
              <Button type="submit" color="primary" variant="contained">
                {user ? 'Editar' : 'Adicionar'}
              </Button>
            </Box>
          </Card>
        </form>
      </Fade>
    </Modal>
  );
};

UserModalForm.propTypes = {
  className: PropTypes.string
};

export default UserModalForm;
