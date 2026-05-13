import { Input } from '@/components/ui/input'
import { Edit, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import { Card } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ImageUpload'


const AdminProduct = () => {

  const { products } = useSelector(store => store.product);

  const [editProduct,setEditProduct]=useState(null);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setEditProduct((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSave=(e)=>{
    e.preventDefault();

    const formData=new formData;

    formData.append("productName",editProduct.productName);
    formData.append("productDesc",editProduct.productDesc);
    formData.append("productPrice",editProduct.productPrice);
    formData.append("brand",editProduct.brand);
    formData.append("category",editProduct.category);
    

    const existingImages=editProduct.productImg.filter((img)=>!(img instanceof File) && img.public_id)
    
  }
  return (
    <div className='pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input type='text' placeholder="search product..." className='w-[400px] items-center'></Input>
          <Search className='absolute right-3 top-1.5 text-gray-500'></Search>
        </div>
        <Select>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Sort By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {
        products.map((product, idx) => {
          return <Card key={idx} className="px-4 ">
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={product.productImg[0].url} alt="" className='w-25  h-25 rounded-lg'></img>
                <h1 className='font-bold w-96 text-gray-700 ms-4'>{product.productName}</h1>

              </div>
              <h1 className='font-semibold text-gray-800'>₹{product.productPrice}</h1>
              <div className='flex gap-3'>
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Edit className='text-blue-500 cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle className='text-blue-500'>Edit Product</DialogTitle>
                        <DialogDescription >
                          Make changes to your product here. Click save when you&apos;re
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className='flex flex-col gap-2'>
                        <Field className='grid gap-2'>
                          <Label >Product Name</Label>
                          <Input type='text' name="productName" placeholder="e.g  IQOO Neo-6" required />
                        </Field>
                        <Field className='grid gap-2'>
                          <Label >Price</Label>
                          <Input type='number' name="productPrice" required />
                        </Field>
                        <FieldGroup className='grid grid-cols-2 gap-4'>
                          <Field className='grid gap-2'>
                            <Label >Brand</Label>
                            <Input type='text' name="brand" placeholder='e.g IQOO ' required />
                          </Field>
                          <Field className='grid gap-2'>
                            <Label >Category</Label>
                            <Input type='text' name="category" placeholder='e.g Television ' required />
                          </Field>
                        </FieldGroup>
                        <div className='grid gap-2'>
                            <div className='flex items-center'>
                              <Label>Description</Label>
                            </div>
                            <Textarea name="productDesc" placeholder="Enter description of the product"/>
                          </div>
                          {/* <ImageUpload/> */}

                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-500">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>

                <Trash2 className='text-red-500 cursor-pointer' />
              </div>

            </div>
          </Card>
        })
      }

    </div>
  )
}

export default AdminProduct