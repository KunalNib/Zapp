import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ProductDesc from '@/components/ProductDesc'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ImageUpload from '@/components/ImageUpload'
import { Loader2 } from 'lucide-react'
import { setProduct } from '@/redux/productSlice'

const AddProduct = () => {

  const accessToken=localStorage.getItem("accessToken");
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false);
  const {products}=useSelector(store=>store.product);


  const [productData,setProductData]=useState({
  productName:"",
  productPrice:0,
  productDesc:"",
  productImg:[],
  brand:"",
  category:""
})


const handleChange=(e)=>{
  const {name,value}=e.target;

  setProductData((prev)=>({
    ...prev,
    [name]:value
  }))
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  const formData=new FormData;

  formData.append("productName",productData.productName);
  formData.append("productPrice",productData.productPrice);
  formData.append("productDesc",productData.productDesc);
  formData.append("brand",productData.brand);
  formData.append("category",productData.category);
  if(productData.productImg.length==0){
    toast.error("Please select atleast one image");
    return;
  }

  productData.productImg.forEach((img)=>{
    formData.append("files",img);
  })
  

  try{

    setLoading(true);
    const res=await axios.post(`http://localhost:8000/api/product/add-product`,formData,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    });
    
    if(res.data.success){
      dispatch(setProduct([...products,res.data.product]));
      toast("Product added successfully");
    }
  }
  catch(error){
    console.log(error);

  }
  finally{
    setLoading(false);
  }
}

  return (
    <div className='pl-[350px]  py-20 pr-20 mx-auto px-4 bg-gray-100 '>
      <div className=' lg:40 xl:mx-70' >
      <Card className='w-full  my-20 '>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter product details Below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input type='text' name='productName' value={productData.productName} onChange={handleChange} placeholder='E.g-Samsung,Sony-TV' required></Input>
            </div>
            <div className='grid gap-2'>
              <Label>Price</Label>
              <Input type='number' name='productPrice' value={productData.productPrice} onChange={handleChange} required></Input>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label>Brand</Label>
                <Input type='text' name='brand' placeholder="e.g samsung" value={productData.brand} onChange={handleChange} required></Input>
              </div>
              <div className='grid gap-2'>
                <Label>Category</Label>
                <Input type='text' name='category' placeholder="e.g watch" value={productData.category} onChange={handleChange} required></Input>
              </div>
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label> Description</Label>
              </div>
              <Textarea name="productDesc" value={productData.productDesc} onChange={handleChange} placeholder="Enter description of product"/>
            </div>
            <ImageUpload  productData={productData} setProductData={setProductData}/>
          </div>
          <CardFooter className="flex-col gap-2 mt-5" >
            <Button disabled={loading} className='w-full bg-blue-600 cursor-pointer' onClick={handleSubmit} type="submit">{loading?<span className='flex gap-1 items-center '><Loader2 className='animate-spin'>Please Wait</Loader2></span>:"Add Product"}</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default AddProduct;