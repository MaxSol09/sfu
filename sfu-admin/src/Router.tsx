import { Route, Routes } from "react-router-dom"
import { Profile } from "./pages/Profile"
import { Question } from "./components/Question/Question"
import { Questions } from "./pages/Questions"
import { Complaints } from "./components/Complaints/Complaints"
import { Users } from "./pages/Users"
import { Login } from "./pages/Login/Login"
import { Chats } from "./pages/Chats"

export const Router = () => {
    return (
      <Routes> 
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path='/question/:id' element={<Question />}></Route>
          <Route path='/questions' element={<Questions />}></Route>
          <Route path='/complaints' element={<Complaints />}></Route>
          <Route path='/chats' element={<Chats />}></Route>
          <Route path='/' element={<Users/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='*' element={<h1>Не найденно</h1>}></Route>
      </Routes>
    )
  }
  