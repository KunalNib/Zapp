import { Input } from '@/components/ui/input'
import { Edit, Projector, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";

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
import { useDispatch, useSelector } from 'react-redux'
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ImageUpload'
import { toast } from 'sonner'
import { setProduct } from '@/redux/productSlice'



const AdminProduct = () => {

  const { products } = useSelector(store => store.product);

  const [editProduct, setEditProduct] = useState(null);

  const [open, setOpen] = useState(false);
  const [searchTerm,setSearchTerm]=useState("");

  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const filteredProducts=products.filter((product)=>
  product.productName.toLowerCase().includes(searchTerm.toLowerCase())||
  product.brand.toLowerCase().includes(searchTerm.toLowerCase())||
  product.category.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData;

    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);


    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      })

    try {

      const res = await axios.put(`http://localhost:8000/api/product/update/${editProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (res.data.success) {
        toast.success("Product Updated Successfully");
        const updateProducts = products.map((p) => p._id === editProduct._id ? res.data.product : p);
        dispatch(setProduct(updateProducts))
        setOpen(false);
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(`http://localhost:8000/api/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setProduct(remainingProducts));
      }
    }

    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input type='text' value ={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search product..." className='w-[400px] items-center'></Input>
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
        filteredProducts.map((product, idx) => {

          return <Card key={idx} className="px-4 ">
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={product.productImg[0].url} alt="" className='w-25  h-25 rounded-lg'></img>
                <h1 className='font-bold w-96 text-gray-700 ms-4'>{product.productName}</h1>

              </div>
              <h1 className='font-semibold text-gray-800'>₹{product.productPrice}</h1>
              <div className='flex gap-3'>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild  >
                    <Edit onClick={() => {
                      setEditProduct(product),
                        setOpen(true)
                    }} className='text-blue-500 cursor-pointer' />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll selection:bg-blue-500 selection:text-white">
                    <DialogHeader>
                      <DialogTitle className='text-blue-500'>Edit Product</DialogTitle>
                      <DialogDescription >
                        Make changes to your product here. Click save when you&apos;re
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className='flex flex-col gap-2 '>
                      <Field className='grid gap-2 '>
                        <Label >Product Name</Label>
                        <Input type='text' name="productName" value={editProduct?.productName} onChange={handleChange} placeholder="e.g  IQOO Neo-6" required />
                      </Field>
                      <Field className='grid gap-2'>
                        <Label >Price</Label>
                        <Input type='number' name="productPrice" value={editProduct?.productPrice} onChange={handleChange} required />
                      </Field>
                      <FieldGroup className='grid grid-cols-2 gap-4'>
                        <Field className='grid gap-2'>
                          <Label >Brand</Label>
                          <Input type='text' name="brand" placeholder='e.g IQOO ' value={editProduct?.brand} onChange={handleChange} required />
                        </Field>
                        <Field className='grid gap-2'>
                          <Label >Category</Label>
                          <Input type='text' name="category" placeholder='e.g Television ' value={editProduct?.category} onChange={handleChange} required />
                        </Field>
                      </FieldGroup>
                      <div className='grid gap-2'>
                        <div className='flex items-center'>
                          <Label>Description</Label>
                        </div>
                        <Textarea name="productDesc" placeholder="Enter description of the product" value={editProduct?.productDesc} onChange={handleChange} />
                      </div>
                      <ImageUpload productData={editProduct} setProductData={setEditProduct} />

                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave} className="bg-blue-500">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className='text-red-500 cursor-pointer' />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure,you want to delete your product?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>deleteProductHandler(product._id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>


              </div>

            </div>
          </Card>
        })
      }

    </div>
  )
}

export default AdminProduct