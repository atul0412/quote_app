import Login from './components/Login'
import Signup from './components/signup'
import Profile from './components/profile'
import CreateQuote from './components/createQuote'
import Home from './components/home'
export const routes = [
    { path: "/", element: <Home /> },
    { path: "/create", element: <CreateQuote /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> }
]