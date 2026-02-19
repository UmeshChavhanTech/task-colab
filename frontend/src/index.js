import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App';   // 🔥 FIXED
import authReducer from './components/store/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
