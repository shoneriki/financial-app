import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.scss';
import "./AllStyles.scss"
import App from './App';
import {ThemeProvider} from "@mui/material/styles"
import theme from "./ThemeProvider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
