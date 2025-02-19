import { Route, Routes } from "react-router-dom"
import { UserProfile } from "./pages/UserProfile"
import { Question } from "./components/Question/Question"
import { Users } from "./components/Users/Users"
import { Questions } from "./components/Questions/Questions"
import { Chats } from "./components/Chats/Chats"
import { Complaints } from "./components/Complaints/Complaints"

export const Router = () => {
    return (
      <Routes> 
          <Route path="/profile/:id" element={<UserProfile />}></Route>
          <Route path='/question/:id' element={<Question />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/questions' element={<Questions />}></Route>
          <Route path='/complaints' element={<Complaints />}></Route>
          <Route path='/chats' element={<Chats />}></Route>
          <Route path='/' element={<Users/>}></Route>
          <Route path='*' element={<h1>Не найденно</h1>}></Route>
      </Routes>
    )
  }
  