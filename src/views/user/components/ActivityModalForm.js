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
import { useSnackbar } from 'notistack';
import api from 'src/service/api';

const states = [
  {
    value: 'CURSO',
    label: 'Curso'
  },
  {
    value: 'APRESENTAÇÃO',
    label: 'Apresentação'
  },
  {
    value: 'PALESTRA',
    label: 'Palestra'
  }
];

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const ActivityModalForm = ({
  className,
  open,
  handleClose,
  user,
  activity,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    type: 'CURSO',
    description: '',
    user: { id: user.id }
  });

  useEffect(() => {
    const editUser = () => {
      return JSON.stringify(activity) !== '{}'
        ? setValues(activity)
        : setValues({
            type: 'CURSO',
            description: '',
            user: { id: user.id }
          });
    };
    editUser();
  }, [activity, user]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = async event => {
    event.preventDefault();

    JSON.stringify(activity) !== '{}'
      ? await api.put(`/activity/${activity.id}`, values).then(res => {
          enqueueSnackbar('Atualizado com Sucesso', {
            variant: 'success'
          });
          handleClose(res.data);
        })
      : await api.post('/activity', values).then(res => {
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
      onClose={() => handleClose(activity)}
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
              subheader={
                JSON.stringify(activity) === '{}'
                  ? 'Adicionar uma novo atividade'
                  : 'Editar atividade'
              }
              title="Atividade"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Selecione o Tipo"
                    name="type"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.type}
                    variant="outlined"
                  >
                    {states.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    name="description"
                    onChange={handleChange}
                    required
                    value={values.description || ''}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
              <Box p={1} />
              <Button type="submit" color="primary" variant="contained">
                {JSON.stringify(activity) === '{}' ? 'Adicionar' : 'Editar'}
              </Button>
            </Box>
          </Card>
        </form>
      </Fade>
    </Modal>
  );
};

ActivityModalForm.propTypes = {
  className: PropTypes.string
};

export default ActivityModalForm;
