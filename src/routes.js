import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from 'src/layouts/AppLayout';
import MainLayout from 'src/layouts/MainLayout';
import UserListView from 'src/views/user/UserListView';
import NotFoundView from 'src/views/errors/NotFoundView';
import UserShowView from './views/user/UserShowView';

const routes = [
  {
    path: 'app',
    element: <AppLayout />,
    children: [
      { path: 'users', element: <UserListView /> },
      { path: 'users/show', element: <UserShowView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/users" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
