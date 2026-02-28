import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className='bg-blue-400 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='grid md:grid-cols-2 gap-8 items-center '>
                <div>
                    <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold mb-4'>Top-tier current tech at peak discounts</h1>
                    <p className='text-xl mb-6 text-blue-100'>
                        Experience the forefront of innovaton with exclusive offers on next-gen smartphones,laptops,and premium gear.
                    </p>
                    <div className='flex flex-col sm:flex-row fap-4'>
                        <Button className='bg-white text-blue-600 hover:bg-blue-300 mb-4 hover:text-white'>Shop Now</Button>
                        <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600 bg-transparent ms-2'>Get Best Deals</Button>
                    </div>
                </div>
                <div className=''>
                        <img src='./home2.png' alt='home image'  className=' md:animate-pulse ' />
                    </div>
            </div>
        </div>

    </section>
  )
}

export default Hero