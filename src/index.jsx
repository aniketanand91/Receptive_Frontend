import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import store from './store/index'; 
import AppRoutes from './Routes';
import Footer from './component/Fotter'; 
import Header from './component/Header';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a theme object
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
});

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup', '/aboutus', '/TandC', '/policies', '/Footer'].includes(location.pathname); // List of routes to hide header/footer

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="295744727460-12t1vbiuaefho381ta0bfpotlp2mbrrn.apps.googleusercontent.com">
      <Provider store={store}> 
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Layout />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
