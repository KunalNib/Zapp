import { Phone,Handshake ,Wallet} from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section className='py-12  bg-muted/50'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='grid md:grid-cols-3 gap-8 '>
                <div className='flex items-center space-x-4 md:h-30'>
                    <div className='h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center'>
                        <Phone className='h-6 w-6 text-blue-600'></Phone>
                    </div>
                    <h3 className='font-semibold'>24/7 Support</h3>
                    <p className='text-muted-foreground'>Full Time Customer Support Available</p>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center'>
                        <Handshake className='h-6 w-6 text-purple-600'></Handshake>
                    </div>
                    <h3 className='font-semibold'>Trust & Safety</h3>
                    <p className='text-muted-foreground'>Genuine Brand Products Only</p>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='h-12 w-12 bg-green-100 rounded-full flex items-center justify-center'>
                        <Wallet className='h-6 w-6 text-green-600'></Wallet>
                    </div>
                    <h3 className='font-semibold'>Hassle Free Payments</h3>
                    <p className='text-muted-foreground'>Razerpay Payments</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features