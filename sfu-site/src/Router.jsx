import { Route, Routes } from "react-router-dom"
import { Registration } from "./pages/Registration.tsx"
import { Login } from "./pages/Login.tsx"
import { Home } from "./pages/Home"
import { About } from "./components/Tabs/About"
import { Profile } from "./components/Profile/Profile"
import { Question } from "./components/Question/Question"

const routes = [
  { path: '/register', element: <Registration /> },
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