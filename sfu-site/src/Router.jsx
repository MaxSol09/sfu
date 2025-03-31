import { Route, Routes } from "react-router-dom"
import { Registration } from "./pages/Registration.tsx"
import { Login } from "./pages/Login.tsx"
import { Home } from "./pages/Home"
import { About } from "./components/Tabs/About"
import { Profile } from "./components/Profile/Profile"
import { Question } from "./components/Question/Question"

const token = localStorage.getItem('JWTtoken')

const routes = [
  { path: '/register', element: !token ? <Registration /> : <Login/>},
  { path: '/home', element: <Home /> },
  { path: '/home/question/:id', element: <Question /> },
  { path: '/about', element: <About /> },
  { path: '/profile/:id', element: <Profile /> },
  { path: '/', element: token ? <Login /> : <Registration />},
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