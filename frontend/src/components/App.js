import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BoardView from './pages/BoardView';
import Profile from './pages/Profile';

// Components
import PrivateRoute from './common/PrivateRoute';
import Navbar from './common/Navbar';

// ✅ Corrected path
import { loadUser } from './store/authSlice';



const theme = createTheme({
    palette: {
        primary: { main: '#0079bf' },
        secondary: { main: '#f50057' },
    },
});

function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(loadUser());
        }
    }, [dispatch, token]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                {token && <Navbar />}

                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/board/:id"
                        element={
                            <PrivateRoute>
                                <BoardView />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />

                    {/* Default Routes */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
