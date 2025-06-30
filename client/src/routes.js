import Login from './components/Login'
import Signup from './components/signup'
import Profile from './components/profile'
import CreateQuote from './components/createQuote'
import Home from './components/home'
import ProtectedRoute from './components/protectedRoute.jsx'
export const routes = [
    { path: "/", element: <ProtectedRoute><Home/></ProtectedRoute>},
    { path: "/create", element:<ProtectedRoute><CreateQuote /></ProtectedRoute>  },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> }
]