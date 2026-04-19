import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddProduct = () => {
  return (
    <div className='pl-[350px] py-20 pr-20 mx-auto px-4 bg-gray-100'>
      <Card className='w-full my-20'>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter product details Below</CardDescription>
        </CardHeader>
        <CardContent>
           <div className='flex felx-col gap-2'>
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input type='text' name='productName' placeholder='E.g-Samsung,Sony-TV'></Input>
            </div>
          </div> 
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct