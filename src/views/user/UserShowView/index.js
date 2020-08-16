import React, { useEffect } from 'react';
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
  Container,
  Typography
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import ActivityCard from '../components/ActivityCard';
import ActivityModalForm from '../components/ActivityModalForm';
import UserModalForm from '../components/UserModalForm';
import api from 'src/service/api';
import { useSnackbar } from 'notistack';

const states = [
  { value: 'TODOS', label: 'Todos' },
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
  root: {}
}));

const UserShowView = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [activities, setActivities] = React.useState([]);
  const [activity, setActivity] = React.useState({});
  const [user, setUser] = React.useState(state);
  const [open, setOpen] = React.useState(false);

  const [type, setType] = React.useState('TODOS');

  useEffect(() => {
    async function getActivityUserType() {
      return await api
        .get(`activity/user/${user.id}`, {
          params: {
            type
          }
        })
        .then(res => {
          setActivities(res.data);
        });
    }
    async function getActivityUser() {
      return await api.get(`activity/user/${user.id}`).then(res => {
        setActivities(res.data);
      });
    }
    if (type !== 'TODOS') {
      getActivityUserType();
    } else {
      getActivityUser();
    }
  }, [activity, type, user]);

  const handleOpen = activity => {
    setActivity(activity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActivity({});
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenEdit = async () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = user => {
    setUser(user);
    setOpenEdit(false);
  };

  const handleDelete = async id => {
    await api.delete(`/activity/${id}`).then(res => {
      enqueueSnackbar('Removido com Sucesso', {
        variant: 'success'
      });
      setActivities(activities.filter(a => a.id !== id));
    });
  };

  return (
    <>
      <Page className={classes.root} title="Currículo">
        <Container maxWidth={false}>
          <UserModalForm
            open={openEdit}
            handleClose={handleCloseEdit}
            user={user}
          />
          <ActivityModalForm
            open={open}
            handleClose={handleClose}
            activity={activity}
            user={user}
          />
          <Box mt={3}>
            <Card>
              <CardHeader
                subheader="Dados do candidato"
                title="Currículo"
                action={
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleOpenEdit}
                  >
                    Editar
                  </Button>
                }
              ></CardHeader>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Typography color="textPrimary" variant="body1">
                      <strong>Nome: </strong> {user.name}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography color="textPrimary" variant="body1">
                      <strong>Email: </strong> {user.email}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography color="textPrimary" variant="body1">
                      <strong>Telefone: </strong> {user.phone}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography color="textPrimary" variant="body1">
                      <strong>Endereço: </strong> {user.adress}
                    </Typography>
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
                  Voltar
                </Button>
                <Box p={1} />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleOpen({})}
                >
                  Adicionar Atividade
                </Button>
              </Box>
            </Card>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <TextField
              fullWidth
              label="Selecione o Filtro"
              name="type"
              onChange={e => setType(e.target.value)}
              required
              select
              SelectProps={{ native: true }}
              value={type || ''}
              variant="outlined"
            >
              {states.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box mt={3}>
            <Grid container spacing={3}>
              {activities.map(activity => (
                <Grid item key={activity.id} lg={4} md={6} xs={12}>
                  <ActivityCard
                    activity={activity}
                    onEdit={() => handleOpen(activity)}
                    onRemove={() => handleDelete(activity.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Page>
    </>
  );
};

UserShowView.propTypes = {
  className: PropTypes.string
};

export default UserShowView;
