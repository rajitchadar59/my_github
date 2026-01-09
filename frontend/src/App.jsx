import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from './components/activities/CreateRepo'

import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import UserRepos from "./components/activities/UserRepos";
import UpdateProfile from "./components/user/UpdateProfile";
import HomePage from "./components/Homepage";
import CreateIssue from "./components/activities/CreateIssue";
import StarredRepo from "./components/activities/StarredRepo";
import RepoDetailsPage from "./components/activities/RepoDetails/RepoDetailsPage";
import YourIssue from "./components/activities/YourIssue";
import NotFound from '../src/components/activities/NotFound'


import Notifications from "./components/activities/Notifications";
import Following from "./components/activities/Following";


const AppRoutes = () => {
  const { CurrentUser } = useAuth();


  return (
    <Routes>

      <Route path="/" element={
        CurrentUser
          ? <Navigate to="/dashboard" replace />
          : < HomePage />
      } />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/auth"
        element={
          CurrentUser
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route
        path="/yourissue"
        element={
          <ProtectedRoute>
            <YourIssue />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/profile/:username" element={

        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>

      } />


      <Route path="/notification" element={<Notifications />} />





      <Route path="/profile/:username/repos" element={

        <ProtectedRoute>
          <UserRepos />
        </ProtectedRoute>

      } />

      <Route path="/profile/:username/starred/" element={

        <ProtectedRoute>
          <StarredRepo />
        </ProtectedRoute>

      } />

      <Route path="/profile/updateprofile" element={

        <ProtectedRoute>
          <UpdateProfile />
        </ProtectedRoute>

      } />

      <Route path="/profile/:username/following/" element={

        <ProtectedRoute>
          <Following />
        </ProtectedRoute>

      } />

      <Route path="/createrepo" element={

        <ProtectedRoute>
          <CreateRepo />
        </ProtectedRoute>

      } />

      <Route path="/createissue" element={

        <ProtectedRoute>
          <CreateIssue />
        </ProtectedRoute>

      } />

      <Route
        path="/repo/:username/:reponame"
        element={<RepoDetailsPage />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />


    </Routes>

  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
