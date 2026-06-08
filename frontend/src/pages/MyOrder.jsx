import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {
    const [userOrder,setUserOrder]=useState(null);
    const accessToken=localStorage.getItem('accessToken');
    const navigate=useNavigate();
    const getUserOrders=async ()=>{
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-order`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        if(res.data.success){
            setUserOrder(res.data.orders);
        }
    }

    useEffect(()=>{
        getUserOrders();
    },[]);
  return (
    <div className='pr-20 flex flex-col gap-3'>
        <div className='w-full p-6 '>
            <div className='flex items center gap-4 mb-6'>
                <Button onClick={()=>navigate(-1)}><ArrowLeft/></Button>
                <h1 className='text-2xl font-bold'>Orders</h1>
            </div>
            {
                userOrder?.length===0?(
                    <p className='text-gray-800 spac-y-6 text-2xl'>No Orders found </p>
                ):(
                    <div className='space-y-6 w-full'>
                        {
                            userOrder?.map((order)=>(
                                <div key={order._id} className='shadow-lh rounded-2xl p-5 border border-gray-200 '>
                                    <div className='flex justify-between items-center mb-4'>
                                        <h2 className='text-lg font-semibold'>
                                        Order ID:{" "}
                                        <span className='text-gray-600'>{order._id}</span>
                                         <p className='text-sm text-gray-500'>
                                        Amount:{" "}
                                        <span className='font-bold'>{order.currency} {order.amount.toFixed(2)}</span>
                                    </p>
                                    </h2>
                                    <br></br>
                                   
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <div className='mb-4'>
                                            <p className='text-sm text-gray-700'>
                                                <span className='font-medium'>
                                                    User:
                                                </span>
                                                {order.user?.firstName || "Unknown"} {order.user?.lastName}
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                Email: {order.user?.email || "N/A"}
                                            </p>
                                        </div>
                                        <span className={`${order.status==='Paid'?'bg-green-500': order.status==='Failed'?'bg-red-500':'bg-orange-300'} text-white px-2 py-1 rounded-lg`}>
                                            {order.status}
                                        </span>

                                    </div>
                                    <div>
                                        <h3 className='font-medium mb-2'>Products</h3>
                                        <ul className='space-y-2'>
                                            {
                                                order.products.map((product,index)=>(
                                                    <li onShowUserOrdersClick={()=>navigate(`/products/${product?.productId._id}`)} key={index} className='flex justify-between items-center bg-gray-50 p-3 rounded-lg'>
                                                        <img src= {product.productId?.productImg?.[0].url} className='w-16 cursor-pointer rounded '/>
                                                        <span className='w-[300px] ms-4'>{product.productId?.productName}</span>
                                                        <span >{product.productId?._id}&nbsp;</span>
                                                        <span className='font-medium text-gray-700'>₹{ product.productId?.productPrice} x  {product.quantity}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default MyOrder