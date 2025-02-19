import axios from 'axios';
import './index.css'
import { Router } from './Router'
import { WebSocketActions } from './components/WebSocketActions';

function App() {
  const token = localStorage.getItem('JWTtoken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <>
      <WebSocketActions />
      <Router />
    </>
  )
}

export default App
