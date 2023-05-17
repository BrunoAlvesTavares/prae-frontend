import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from '../../components/swal';
import UserCombo from '../../components/Combos/UsersCombo';

const BookForm = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', category: [], state: '', trocadoPor: '' });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:3333/books/${id}`)
        .then(response => {
          setBook(response.data);
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
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (id) {
      axios.patch(`http://localhost:3333/books/${id}`, book)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Livro Trocado com sucesso!"
          }).then(() => {
            navigate("/books");
          });
        }).catch(err => {
          Toast.fire({
            icon: "error",
            title: err.response.data.message
          });
        });
    } else {
      axios.post('http://localhost:3333/books', book)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Livro Criado com sucesso!"
          }).then(() => {
            navigate("/books");
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
          name="title"
          label="Titulo"
          variant="outlined"
          size="small"
          margin="normal"
          value={book.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="author"
          label="Autor"
          variant="outlined"
          size="small"
          margin="normal"
          value={book.author}
          onChange={handleChange}
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
        />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <TextField
          name="state"
          label="Estado"
          variant="outlined"
          size="small"
          margin="normal"
          value={book.state}
          onChange={handleChange}
        />
      </Grid>
      { id &&
  <Grid item md={12} sm={6} xs={6}>
    <UserCombo value={book.trocadoPor} onUserChanged={(value) => setBook({ ...book, trocadoPor: value })} />
  </Grid>
}
      <Button variant="contained" color="primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Loading...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default BookForm;
