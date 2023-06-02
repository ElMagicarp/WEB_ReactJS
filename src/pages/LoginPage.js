import React from "react";
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';

function LoginPage() {
  return (
    <div className="loginPage">
      <Paper 
      elevation={3}
      sx={{padding:"40px"}}
      >
        <h1 style={{marginBottom:'30px'}}><LoginIcon />  Connexion</h1>
        <div id="googleSignIn"></div>

      </Paper>
    </div>
  );
}

export default LoginPage;
