import React from "react";
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import BackImage from "../assets/BackLogin.jpg";
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginPage() {
  return (
    <>
    <Header />
    <div className="loginPage" style={{backgroundImage: `url(${BackImage})`}}>
      <div className="leftSide"></div>
      <div className="rightSide">
        <Paper 
        elevation={3}
        sx={{padding:"40px"}}
        >
          <h1 style={{marginBottom:'30px'}}><LoginIcon />Connexion</h1>
          <div id="googleSignIn"></div>

        </Paper>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default LoginPage;
