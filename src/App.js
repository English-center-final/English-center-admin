import { fetchNameRoles, fetchUserProfile } from 'app/globalSlice';
import ProtectedRoute from 'components/ProtectedRoute';
import Login from 'features/Login';
import AdminLayout from 'layout/AdminLayout';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isFetch, setFetch] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('kltn-token');

      if (token) {
        await dispatch(fetchNameRoles());
        await dispatch(fetchUserProfile());
      }

      setFetch(true);
    };

    checkLogin();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {isFetch && (
          <Switch>
            <Redirect exact from="/" to="/admin" />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
