import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './Context/user';
import { CourseProvider } from './Context/course';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
