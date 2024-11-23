import { Route, Routes } from "react-router-dom"
import { Registration } from "./pages/Registration.tsx"
import { Login } from "./pages/Login.tsx"
import { Home } from "./pages/Home"

export const Router = () => {
    return (
      <div>
      <Routes> 
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='*' element={<h1>Не найденно</h1>}></Route>
      </Routes>
      </div>
    )
  }
  