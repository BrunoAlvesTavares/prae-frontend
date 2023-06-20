import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import UserCombo from '../../components/Combos/UsersCombo';
import api from '../../utils/api';

const BookForm = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', category: '', state: 'Novo', trocadoPor: null });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const titleFieldLabel = id ? 'Título do livro que deseja trocar' : 'Título';
  const AutorFieldLabel = id ? 'Autor do livro que deseja trocar' : 'Título';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConditionChange = (event) => {
    setBook((prevState) => ({
      ...prevState,
      state: event.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!book.title) {
      errors.title = 'O título é obrigatório.';
    }

    if (!book.author) {
      errors.author = 'O autor é obrigatório.';
    }

    if (!book.category) {
      errors.category = 'A categoria é obrigatória.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (validateForm()) {
      if (id) {
        api.patch(`/books/${id}`, book)
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Livro Trocado com sucesso!',
            }).then(() => {
              navigate('/books');
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: err.response.data.message,
            });
          });
      } else {
        api.post('/books', book)
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Livro Criado com sucesso!',
            }).then(() => {
              navigate('/books');
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: err.response.data.message,
            });
          });
      }
    } else {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/books');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="title"
          label={titleFieldLabel}
          variant="outlined"
          size="small"
          margin="normal"
          value={book.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="author"
          label={AutorFieldLabel}
          variant="outlined"
          size="small"
          margin="normal"
          value={book.author}
          onChange={handleChange}
          error={!!errors.author}
          helperText={errors.author}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="category"
          label="Categoria"
          variant="outlined"
          size="small"
          margin="normal"
          value={book.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <FormControl variant="outlined" size="small" margin="normal" style={{ width: '225px' }}>
          <InputLabel>Condição</InputLabel>
          <Select
            name="condition"
            value={book.state}
            onChange={handleConditionChange}
            label="Condição"
          >
            <MenuItem value="Novo">Novo</MenuItem>
            <MenuItem value="Usado">Usado</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {id && (
        <Grid item md={12} sm={6} xs={6}>
          <UserCombo value={book.trocadoPor} onUserChanged={(value) => setBook({ ...book, trocadoPor: value })} />
        </Grid>
      )}
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Loading...' : 'Salvar'}
      </Button>
      <Button
        variant="outlined"
        onClick={handleCancel}
        disabled={loading}
        style={{ marginTop: '1rem', color: '#ec2300' }}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default BookForm;
