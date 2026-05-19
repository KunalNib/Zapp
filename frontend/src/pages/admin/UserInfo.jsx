import React, {  useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import image from '../../assets/image.png'
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'





const UserInfo = () => {
    // const { user } = useSelector(store => store.user);
  const params = useParams();
  const userId=params.id;
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [updateUser, setUpdateUser] = useState(null);
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

  const getUserDetails=async()=>{
    try{
      const res=await axios.get(`http://localhost:8000/api/user/get-user/${userId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      })

      if(res.data.success){
        setUpdateUser(res.data.user)
      }
    }
    catch(error){
        console.log(error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      if (file) {
        formData.append("file", file);
      }
      const res=await axios.put(`http://localhost:8000/api/user/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }

    
  }

  useEffect(()=>{
    getUserDetails();
  },[])

  const navigate=useNavigate();
  return (
    <div className='pt-5 mih-h-screen  bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
          <div className='flex justify-between gap-10'>
            <Button onClick={()=>navigate(-1)}><ArrowLeft/></Button>
            <h1 className='font-bold mb-7  text-2xl text-gray-800'>Update Profile</h1>
          </div>
           <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
                <div className='flex flex-col items-center'>
                  <img src={updateUser?.profilePic || image} alt="profile" className='w-42 h-32 rounded-full object-cover border-blue-800'>
                  </img>
                  <Label className="mt-4 cursor-pointer  bg-blue-600 text-white px-4 py-2 ps-8 rounded-md hover:bg-blue-700" >Change Picture
                    <input type="file" onChange={handleFileChange}  accept="image/*" className="hidden" />
                  </Label>
                </div>
                <form className='space-y-4 shadow-lg p-5 rounded-lg bg-white' onSubmit={handleSubmit}>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">First Name</Label>
                      <Input type="text" value={updateUser?.firstName} onChange={handleChange}  name="firstName" placeholder="John" className="w-full border rounded-lg px-3 py-2 mt-1" ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">Last Name</Label>
                      <Input type="text" value={updateUser?.lastName} name="lastName" placeholder="Doe"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1" ></Input>
                    </div>
                    
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Email</Label>
                    <Input type="email" value={updateUser?.email} name="email"  onChange={handleChange}  disabled className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Phone Number</Label>
                    <Input type="text" value={updateUser?.phoneNo} name="phoneNo" placeholder="Enter your Contact"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-500">Address</Label>
                    <Input type="text" name="address" value={updateUser?.address}  placeholder="Enter your Address"  onChange={handleChange}  className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                  </div>
                  <div className='grid grid-cols-2 gap-4 '>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">City</Label>
                      <Input type="text" value={updateUser?.city} name="city"  onChange={handleChange}  placeholder="Enter your City" className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">Zip Code</Label>
                      <Input type="text" value={updateUser?.zipCode} name="zipCode"  onChange={handleChange}  placeholder="Enter your Zip Code" className="w-full border rounded-lg px-3 py-2 mt-1 "></Input>
                    </div>                    
                  </div>
                  <Button type="submit"  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">Update Profile</Button>
                </form>
              </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo