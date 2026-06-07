import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Edit, Search,Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import UserLogo from '../../assets/image.png'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const accessToken=localStorage.getItem("accessToken");

  const[users,setUsers]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const navigate=useNavigate();

  let filteredUsers=users.filter(user=>`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())|| user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const getAllUsers=async()=>{
    try{
      const res=await axios.get("http://localhost:8000/api/user/all-user",{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        console.log(res.data.users);
          setUsers(res.data.users);
        }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllUsers();
  },[]);

  // console.log("users are",users);


  return (
    <div className='pl-[350px] py-20 pr-20 mx-auto px-4'> 
      <h1 className='font-bold text-2xl'>User Management</h1>
      <p>View and manage registered users</p>
      <div className='flex relative w-[300px] mt-6'>
        <Search className='absolute right-2 top-1 text-gray-500'/>
        <Input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search users..."></Input>
      </div>
      <div className=' grid  lg:grid-cols-3  gap-7 mt-7'>
        {
          filteredUsers.map((user,index)=>{
            return <div key={index} className='bg-blue-100  p-5 rounded-lg'>
              <div className='flex items-center gap-2'>
                <img src={user?.profilePic ||UserLogo} className='rounded-full w-16 aspect-square object-cover border border-blue-600'/>
                <div>
                  <h1 className='font-semibold'>{user?.firstName} {user?.lastname}</h1>
                  <h3>{user?.email}</h3>
                </div>
              </div>
              <div className='flex  gap-3 mt-3'>
                <Button className='bg-white hover:bg-black hover:text-white' onClick={()=>navigate(`/dashboard/users/${user?._id}`)} variant='outlined'><Edit/>Edit</Button>
                <Button onClick={()=>navigate(`/dashboard/users/orders/${user?._id}`)}  className='bg-blue-600 hover:bg-blue-800'><Eye/>Show Order</Button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AdminUsers