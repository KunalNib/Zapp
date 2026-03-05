import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import image from '../../public/image.png'



const Profile = () => {
  const { user } = useSelector(store => store.user);
  const { userId } = useParams();
  const [updateUser, setUpdateUser] = useState({
    firstName:user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo:user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role:user?.role,
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    })
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateUser);
    
  }
  
  
  return (
    <div className='pt-10 min-h-screen bg-gray-100'>
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile" >Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" >
          <div>
            <div className='flex flex-col justify-center items-center bg-gray-100'>
              <h1 className='font-bold mb-7 text-2xl text-blue-600 '>Update Profile</h1>
              <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
                <div className='flex flex-col items-center'>
                  <img src={updateUser.profilePic || image} alt="profile" className='w-32 h-32 rounded-full object-cover border-blue-800'>
                  </img>
                  <Label className="mt-4 cursor-pointer  bg-blue-600 text-white px-4 py-2 ps-8 rounded-md hover:bg-blue-700" >Change Picture
                    <input type="file" onChange={handleFileChange}  accept="image/*" className="hidden" />
                  </Label>
                </div>
                <form className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">First Name</Label>
                      <Input type="text" value={updateUser.firstName} onChange={handleChange}  name="firstName" placeholder="John" className="w-full border rounded-lg px-3 py-2 mt-1" ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">Last Name</Label>
                      <Input type="text" value={updateUser.lastName} name="lastName" placeholder="Doe"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1" ></Input>
                    </div>
                    
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Email</Label>
                    <Input type="email" value={updateUser.email} name="email"  onChange={handleChange}  disabled className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Phone Number</Label>
                    <Input type="text" value={updateUser.phoneNo} name="phoneNo" placeholder="Enter your Contact"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Address</Label>
                    <Input type="text" name="address" placeholder="Enter your Address"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">City</Label>
                    <Input type="text" value={updateUser.city} name="city"  onChange={handleChange}  placeholder="Enter your City" className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Zip Code</Label>
                    <Input type="text" value={updateUser.zipCode} name="zipCode"  onChange={handleChange}  placeholder="Enter your Zip Code" className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <Button type="submit" onSubmit={handleSubmit} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">Update Profile</Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends and
                identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
