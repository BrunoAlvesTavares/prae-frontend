import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksList } from './pages/Books/booksList';
import { UsersList } from './pages/Users/usersList';
import BookForm from './pages/Books/booksForm';
import Menu from './components/menu/menu';
import UserForm from './pages/Users/usersForm';
import LoginPage from './pages/Login/login';
import Logout from './pages/Logout/logout';
import HomePage from './pages/Home/home';
import { MyBookingList } from './pages/MyBookings/Mybookings';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ListHomeMenu/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<FormUserMenu />} />
        <Route path="/users/:id/edit" element={<FormUserMenu />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/reservedBooks" element={<MyBookingList />} />
        <Route path="/books/new" element={<FormBookMenu />} />
        <Route path="/books/:id/edit" element={<FormBookMenu />} />
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

const ListHomeMenu = () => {
  return (
    <>
      <Menu />
      <HomePage />
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
