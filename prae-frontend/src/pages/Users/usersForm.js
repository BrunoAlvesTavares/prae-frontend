import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';

const UserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', accessLevel: '', password: '' });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:3333/users/${id}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (id) {
      axios.patch(`http://localhost:3333/users/${id}`, user)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Usuário salvo com sucesso!"
          }).then(() => {
            navigate("/user");
          });
        }).catch(err => {
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        });
    } else {
      axios.post('http://localhost:3333/users', user)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Usuário salvo com sucesso!"
          }).then(() => {
            navigate("/users");
          });
        }).catch(err => {
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="name"
          label="Nome"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="password"
          label="Senha"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="accessLevel"
          label="Nível de acesso"
          variant="outlined"
          size="small"
          margin="normal"
          value={user.accessLevel}
          onChange={handleChange}
        />
      </Grid>
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Loading...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default UserForm;
