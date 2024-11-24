import axios from "axios";
import { Router } from "./Router";
import { useEffect } from "react";


function App() {

  const token = localStorage.getItem('JWTtoken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <Router />
  );
}

export default App;
