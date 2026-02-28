import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-blue-900 text-gray-200 py-10'>
            <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
                <div className='mb-6 md:mb-0 '>
                    <Link to={'/'}>
                        <img src='./zapp.png' className='h-15 w-30 -mt-4 bg-white rounded-2xl mb-8'></img>
                    </Link>
                    <p className='mt-2 text-sm'>Cutting Edge Technologies at your doorsteps</p>
                    <p className='mt-2 text-sm'>Address: Near Lokmanya Nagar,Nagpur,440016</p>
                    <p className='mt-2 text-sm'>Phone: (+91)1231231234</p>
                    <p className='mt-2 text-sm'>Email: zapp@gmail.com</p>

                </div>
                <div className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Customer Services</h3>
                    <ul className='mt-2 text-sm space-y-2'>
                        <li>Contact Us</li>
                        <li>Shipping</li>
                        <li>Cancellations and Returns</li>
                        <li>FAQs</li>
                        <li>Order Tracking</li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Customer Services</h3>
                    <div className='mt-2 flex space-x-4'>
                        <FaFacebook />
                        <FaInstagram />
                        <FaTwitterSquare />
                    </div>
                </div>
                <div>
                    <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
                    <p className='mt-2 text-sm'> Suscribe to get special offers,free giveaways,and more</p>
                    <form action="" className='mt-4 flex'>
                        <input type='email' placeholder='Your email here'
                            className='w-full p-2 bg-gray-100 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500'></input>
                        <button type='submit' className='bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-700'>Subscribe</button>
                    </form>

                </div>
            </div>
            <div className='mt-4 border-gray-700 pt-6 text-center text-sm'>
                <p>&copy; {new Date().getFullYear()} <span className='text-blue-600'>Zapp</span> . &nbsp; All rights reserved</p>

            </div>

        </footer>
    )
}

export default Footer