import React from "react";
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import BackImage from "../assets/BackLogin.jpg";

function LoginPage() {
  return (
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
  );
}

export default LoginPage;
