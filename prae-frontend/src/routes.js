import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksList } from './pages/Books/booksList';
import { UsersList } from './pages/Users/usersList';
import BookForm from './pages/Books/booksForm';
import Menu from './components/menu/menu';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/books/new" element={<FormWithMenu />} />
        <Route path="/books/:id/edit" element={<FormWithMenu />} />
      </Routes>
    </Router>
  );
};

const FormWithMenu = () => {
  return (
    <>
      <Menu />
      <BookForm />
    </>
  );
};

export default Layout;
