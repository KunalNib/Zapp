import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './App.css'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'




const router=createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home /></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },{
    path:'/login',
    element:<><Login/></>
  },{
    path:'/verify',
    element:<><Verify /></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
