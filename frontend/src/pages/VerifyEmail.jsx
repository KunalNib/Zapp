import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const {token}=useParams();
    const [status,setStatus]=useState("Verifying...");
    const navigate=useNavigate();

    const verify=async ()=>{
        try{
            const res=await axios.post('http://localhost:8000/api/user/verify',{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.data.success){
                setStatus('Email Verified successfully');
                setTimeout(()=>{

                },2000);
                navigate('/login');
            }
        }
        catch(error){
            console.log(error);
            setStatus("Verification Failed, Please try again")
        }
    }

    useEffect(()=>{
        verify();
    },[token]);

  return (
    <div className='relative w-full h-[760px] bg-blue-100 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
                <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>

            </div>
        </div>
        VerifyEmail
    </div>
  )
}

export default VerifyEmail