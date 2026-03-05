import { ShoppingCart } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';

const Navbar = () => {
  const {user}=useSelector(store=>store.user)
  const accessToken=localStorage.getItem('accessToken')
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const logoutHandler=async()=>{
    try{
      const res=await axios.post('http://localhost:8000/api/user/logout',{},{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setUser(null));
        localStorage.setItem('accessToken','');
        navigate('/login');
        
      }
      else{
        toast.error(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  const toLogin=()=>{
    navigate('/login');
  }
  return (
    <header className=' bg-blue-50 w-full z-20 border-b border-blue-200 '>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
        <div className='border '>
          <img src='./zapp1.png' alt='Zapp' className='w-[100px]  bg-blue-50'></img>
        </div>
        <nav className='flex gap-10 justify-between items-center'>
          <ul className='flex gap-7 items-center md:text-lg text-gray-700 font-semibold'>
            <Link to={'/'}>Home</Link>
            <Link to={'products'}>Products</Link>
            {
              user && <Link to={`/profile/${user._id}`}>{user.firstName}</Link>
            }
            {/* <Link to=''></Link> */}

          </ul>
          <Link to={'/cart'} className='relative'>
            <ShoppingCart />
            <span className=' rounded-full absolute text-xl text-blue-400 -top-3 -right-5  px-2'>1</span>
          </Link>
          {
            user? <Button onClick={logoutHandler} className='bg-blue-600'>Logout</Button>: <Button onClick={toLogin} className='bg-blue-400'>Login</Button>
          }
          {/* // <Button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Logout</Button>:<Button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Login</Button> */}

        </nav>
      </div>

    </header>
  )
}

export default Navbar
