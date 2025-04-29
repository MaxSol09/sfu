import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Question } from "./pages/Question/Question"
import { Login } from "./pages/Login/Login"
import { Registration } from "./pages/Registration/Registration"
import { Profile } from "./pages/Profile/Profile"

const routes = [
  { path: '/register', element:  <Registration />},
  { path: '/login', element: <Login /> },
  { path: '/question/:id', element: <Question /> },
  { path: '/about', element: <About /> },
  { path: '/profile/:id', element: <Profile /> },
  { path: '/', element: <Home /> },
]

export const Router = () => {
  return (
      <Routes>
          {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path='*' element={<h1>Не найдено</h1>} />
      </Routes>
  )
}