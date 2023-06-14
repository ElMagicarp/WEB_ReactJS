import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext({});

function App() {
  const [user, setUser] = useState({});
  let isLogged = Object.keys(user).length > 0;;

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: (response) => {
        setUser((u) => {
          let credential = jwtDecode(response.credential);
          return {
            name : credential.name,
            sub: credential.sub, // user id
            picture: credential.picture,
            token: response.credential
          }
      });
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
            <Route 
            path="/" 
            element={
              <UserContext.Provider value={user}>
                {isLogged ? <ChatPage />: <LoginPage />}
              </UserContext.Provider>
              }
            />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
