import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

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

const Toolbar = ({ className, handleOpen, handleSearch, ...rest }) => {
  const classes = useStyles();
  const [type, setType] = React.useState('CURSO');
  const [value, setValue] = React.useState('');

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={handleOpen} color="primary" variant="contained">
          Adicionar Usuário
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="flex-start">
              <TextField
                label="Selecine o filtro"
                name="type"
                onChange={e => setType(e.target.value)}
                required
                select
                SelectProps={{ native: true }}
                value={type}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <Box p={1} />
              <TextField
                fullWidth
                onKeyPress={ev => {
                  if (ev.key === 'Enter') {
                    ev.preventDefault();
                    handleSearch(type, value);
                  }
                }}
                onChange={e => setValue(e.target.value)}
                value={value}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        onClick={() => handleSearch(type, value)}
                      >
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear"
                        onClick={() => {
                          setValue('');
                          handleSearch(type, '');
                        }}
                      >
                        <SvgIcon fontSize="small" color="action">
                          <ClearIcon />
                        </SvgIcon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                placeholder="Pesquisar usuários"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
