import axios from "axios";
import { Router } from "./Router";
import {useFavicon} from 'react-use'
import Logo from './images/logo.png'
import { WebSocketActions } from "./components/WebSocketActions";


function App() {

  useFavicon(Logo)

  const token = localStorage.getItem('JWTtoken')

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


  return (
    <>
      <WebSocketActions />
      <Router />
    </>
  );
}

export default App;
