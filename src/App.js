import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({});
  let isLogged = Object.keys(user).length > 0;

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: (response) => {
        setUser((u) => jwtDecode(response.credential));
      }
    });
    //google.accounts.id.prompt();
    google.accounts.id.renderButton(
      document.getElementById("googleSignIn"),
      {size: "large", text: "login with google", shape: "rectangular", width: "long" }
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogged ? <ChatPage user={user} />: <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
