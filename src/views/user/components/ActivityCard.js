import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ActivityCard = ({ className, activity, onEdit, onRemove, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {activity.type}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {activity.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button color="primary" variant="outlined" onClick={onRemove}>
          Remover
        </Button>
        <Box p={1} />
        <Button color="primary" variant="outlined" onClick={onEdit}>
          Editar
        </Button>
      </Box>
    </Card>
  );
};

ActivityCard.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.object.isRequired
};

export default ActivityCard;
