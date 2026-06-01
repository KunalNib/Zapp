import { Input } from '@/components/ui/input';
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { addAddress, deleteAddress, setSelectedAddress } from '@/redux/productSlice';
import { Currency, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setCart } from '@/redux/productSlice';

const AddressForm = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const accessToken = localStorage.getItem("accessToken");
  const { cart, addresses, selectedAddress } = useSelector(store => store.product);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  const dispatch = useDispatch();


  const subtotal = cart.totalPrice;
  const shipping = subtotal > 299 ? 0 : 20;

  const tax = parseFloat((subtotal * 0.05).toFixed(2)); //5% Tax;
  const total = subtotal + shipping + tax;

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  }
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/api/orders/create-order`, {
        products: cart?.items?.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        tax,
        shipping,
        amount:total,
        currency: "INR"
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!data.success) toast.error("something went wrong");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Zapp",
        description: "Order Payment",
        handler: async function (res) {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/verify-payment`, res, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            if (verifyRes.data.success) {
              toast.success("Payment Successfull!")
              dispatch(setCart({ items: [], totalPrice: 0 }))
              navigate('/order-success')
            }
            else {
              toast.error("payment verification failed")
            }

          }
          catch (err) {
            console.log(err);
            toast.error("Error Verifying Payment");
          }
        },
        modal: {
          ondismiss: async function () {
            await axios.post(`http://localhost:8000/api/orders/verify-payment`, {
              razorpay_order_id: data.order.id, paymentFailed: true,
            }, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            toast.error("Payment Cancelled or Failed")
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: "#2563EB" }
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", async function (res) {
        await axios.post(`http://localhost:8000/api/orders/verify-payment`, {
          razorpay_order_id: data.order.id, paymentFailed: true,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        toast.error("payment failed please try again");
      })
      rzp.open();
    }
    catch (err) {
      console.log(err);
      toast.error('something went wrong while processing payment')
    }
  }

  return (
    <div className='max-w-7xl mx-auto grid place-items-center p-10'>
      <div className='grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto '>
        <div className='space-y-4 p-6 bg-white '>
          {
            showForm ?
              (<>
                <div>
                  <h1 className='text-3xl  text-gray-600 mb-5'>Address Form</h1>
                  <Label htmlFor='fullName'>Full Name</Label>
                  <Input id='fullName' className='bg-blue-50 mt-2' placeholder='Human Being....' name='fullName' value={formData.fullName} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input id='phone' className='bg-blue-50 mt-2' placeholder='xxxxxxxxx' name='phone' value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' className='bg-blue-50 mt-2' placeholder='just@xyz.com' name='email' value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor='address'>Address</Label>
                  <Input id='address' className='bg-blue-50 mt-2' placeholder='just Street,Nagpur' name='address' value={formData.address} onChange={handleChange} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input id='city' className='bg-blue-50 mt-2' placeholder='Nagpur' name='city' value={formData.city} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor='state'>State</Label>
                    <Input id='state' className='bg-blue-50 mt-2' placeholder='Maharashtra' name='state' value={formData.state} onChange={handleChange} />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='zip'>Zip Code</Label>
                    <Input id='zip' className='bg-blue-50 mt-2' placeholder='your zip code ..' name='zip' value={formData.zip} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Input id='country' className='bg-blue-50 mt-2' placeholder='India' name='country' value={formData.country} onChange={handleChange} />
                  </div>
                </div>
                <Button onClick={handleSave} className='bg-blue-500 hover:bg-blue-700 w-full '>Save & Continue</Button>
              </>) :
              (<div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Saved Addresses</h2>
                {
                  addresses.map((add, index) =>
                    <div key={index} onClick={() => dispatch(setSelectedAddress(index))} className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? 'border-blue-600  bg-blue-50' : 'border-gray-300'}`}>
                      <p className='font-medium'>{add.fullName}</p>
                      <p>{add.phone}</p>
                      <p>{add.email}</p>
                      <p>{add.address}, {add.city}, {add.state}, {add.zip}, {add.country}</p>
                      <Trash2 onClick={(e) => dispatch(deleteAddress(index))} className='absolute top-2 right-2 text-red-500'></Trash2>
                    </div>
                  )
                }
                <Button variant='outline' className='w-full' onClick={() => setShowForm(true)}>+ Add New Address</Button>
                <Button onClick={handlePayment} className='w-full bg-blue-600 hover:bg-blue-800' disabled={selectedAddress === null}>Proceed To CheckOut</Button>
              </div>)
          }
        </div>
        <div>
          <Card className='w-[400px] '>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span>Subtotal ({cart.items.length}) items</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping </span>
                <span>₹{shipping}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <Separator />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className='text-sm text-muted-foreground pt-4'>
                <p>* Free shipping over 299</p>
                <p>* 7-Days Return Policy</p>
                <p>* Secure Checkout with Razorpay</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddressForm