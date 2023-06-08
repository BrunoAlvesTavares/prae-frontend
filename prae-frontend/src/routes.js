import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksList } from './pages/Books/booksList';
import { UsersList } from './pages/Users/usersList';
import BookForm from './pages/Books/booksForm';
import Menu from './components/menu/menu';
import UserForm from './pages/Users/usersForm';
import LoginPage from './pages/Login/login';

const Layout = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<FormUserMenu />} />
        <Route path="/books/:id/edit" element={<FormBookMenu />} />
        <Route path="/user/new" element={<FormBookMenu />} />
      </Routes>
    </Router>
  );
};

const FormBookMenu = () => {
  return (
    <>
      <Menu />
      <BookForm />
    </>
  );
};

const FormUserMenu = () => {
  return (
    <>
      <Menu />
      <UserForm />
    </>
  );
};

export default Layout;
