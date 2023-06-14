import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import Footer from './components/Footer';
import Header from './components/Header';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
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
          return {
            ...jwtDecode(response.credential),
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
    <div className='App'>
      <BrowserRouter>
          <Header />
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
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
