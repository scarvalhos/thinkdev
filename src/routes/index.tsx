import { Route, Routes as Switch } from "react-router-dom";

import Home from '../pages/Home';
import Login from '../pages/login';
import Profile from "../pages/Profile";
import SignUp from '../pages/SignUp';

import { RequireAuth } from "./private.routes";
import { PublicRoute } from "./public.routes";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
          }
      />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
          }
      />
      <Route
        path="/me"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
          }
      />
    </Switch>
  )
}

export default Routes
