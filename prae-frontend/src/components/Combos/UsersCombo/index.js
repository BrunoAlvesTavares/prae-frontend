import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function UserCombo({ onUserChanged, value, disabled, multiple = false }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3333/users').then(response => {
      setUsers(response.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Autocomplete
      multiple={multiple}
      options={users}
      getOptionLabel={(option) => option.email}
      loading={loading}
      onChange={(event, newValue) => {
        onUserChanged(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={loading ? 'Carregando usuários...' : 'Selecione o usuário'}
          variant="outlined"
          disabled={disabled}
          fullWidth={true}
          sx={{ minWidth: '220px' }}
        />
      )}
    />
  );
}

export default UserCombo;
