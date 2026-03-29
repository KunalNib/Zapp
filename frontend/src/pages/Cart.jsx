import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { useSelector } from 'react-redux';
import image from '../assets/image.png'
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { cart } = useSelector(store => store.product);
  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 299 ? 0 : 20;

  const tax = subtotal * 0.05; //5% Tax;
  const total = subtotal + shipping + tax;

  // const handleQuantity = async (productId, type) => {
  //   try {
  //     // const res =
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  return (
    <div className='pd-20 g-gray-50 min-h-screen  bg-blue-100 pt-5'>
      {
        cart?.items?.length > 0 ?
          <div className='max-w-7xl mx-auto '>
            <h1 className='text-2xl font-bold text-gray-800 mb-7 '>Shopping Cart</h1>
            <div className='max-w-7xl mx-auto flex gap-7'>
              <div className='flex flex-col gap5 flex-1 '>
                {cart?.items?.map((product, index) => {
                  return <Card key={index} className='mb-5 '>
                    <div className='flex justify-between items-center pr-7 '>
                      <div className=' flex items-center w-[350px]'>
                        <img src={product?.productId?.productImg[0]?.url || image} alt='' className='w-25 h-25 border rounded-lg mr-5 ml-5'></img>
                        <div className='w-[280px]'>
                          <h1 className='font-semibold truncate'>{product?.productId?.productName}</h1>
                          <p>₹{product?.productId?.productPrice}</p>
                        </div>
                      </div>
                      <div className='flex gap-5 items-center'>
                        <Button variant='outline' className='bg-blue-100'>-</Button>
                        <span>1</span>
                        <Button variant='outline' className='bg-blue-100'>+</Button>
                      </div>
                      <p>₹{product?.productId?.productPrice * product.quantity}</p>
                      <p className='flex text-red-500 items-center gap-1 cursor-pointer'><Trash2 className='w-4 h-4'></Trash2>Remove</p>
                    </div>
                  </Card>
                })}
              </div>
              <div><Card className='w-[400px]'>
                <CardHeader>
                  <CardTitle>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex justify-between'>
                    <span>Subtotal ({cart?.items?.length} Items)</span>
                    <span>₹{cart?.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <span>Tax(5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <Separator></Separator>
                  <div className='flex justify-between font-bold text-lg mt-2'>
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <div className='space-y-3 pt-4'>
                    <div className='flex space-x-2'>
                      <Input placeholder='Promo Code'></Input>
                      <Button variant='outline'>Apply</Button>
                    </div>
                    <Button className='w-full bg-blue-600'>Place Order</Button>
                    <Button variant='outline' className='w-full'>
                      <Link to='/products'>See Other Products</Link>
                    </Button>
                    <div className='text-sm text-muted-foreground pt-4'>
                      <p>* Free shipping over 299</p>
                      <p>* 7-Days Return Policy</p>
                      <p>* Secure Checkout with Razerpay</p>
                    </div>

                  </div>
                </CardContent></Card></div>
            </div>
          </div> :
          <div className='flex flex-col items-center justify-center min-h=[60vh] p-6 text-center'>
            <div className='bg-blue-200 p-6 rounded-full'>
              <ShoppingCart className='w-16 h-16 text-blue-600' />
            </div>
            <h2 className='mt-6 text-2xl font-bold text-gray-800'>Your cart is empty</h2>
            <p className='mt-2 text-gray-600'>Looks like you haven't added anything to your cart yet</p>
            <Button className='mt-6 bg-blue-600 text-white px-6 hover:bg-blue-700'>
              <Link to='/products'>Start Shopping</Link>
            </Button>
          </div>
      }

    </div>
  )
}


export default Cart;