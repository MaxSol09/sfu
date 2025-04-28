import axios from 'axios';
import './index.css'
import { WebSocketActions } from './components/WebSocketActions';
import { Loading } from './pages/Login/Loading';
import { Router } from './Router';

function App() {

  const token = localStorage.getItem('JWTtoken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <div className='w-full h-full'>
      <WebSocketActions />
      <Router/> 
    </div>
  )
}

export default App
