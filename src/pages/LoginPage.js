import React from "react";
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginPage() {
  return (
    <>
    <div className="loginPage">
      <Header />
      <Paper 
      elevation={3}
      sx={{padding:"40px"}}
      >
        <h1 style={{marginBottom:'30px'}}><LoginIcon /> Connexion</h1>
        <div id="googleSignIn"></div>

      </Paper>
      <Footer />
    </div>
    </>
  );
}

export default LoginPage;
