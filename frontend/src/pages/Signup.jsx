import { React, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner';


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value

        }))

    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = async (e) => {
        // e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/user/register", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/verify');
                toast.success(res.data.message);

            } else {
                toast.error(res.message);
                console.log(res.message);
            }
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-blue-100'>
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>Create  your account</CardTitle>
                    <CardDescription>
                        Enter given details below to create your account
                    </CardDescription>
                    {/* <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction> */}
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John."
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe."
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="relative">

                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Create a password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                                {
                                    showPassword ? <EyeOff onClick={changeShowPassword} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2' /> : <Eye onClick={changeShowPassword} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2' />
                                }
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" onClick={submitHandler} className="w-full bg-gray-600 hover:bg-gray-500">
                        {loading?<><Loader2 className="h-4 w-4 animate-spin mr-2"/> Please wait</>:'Signup'}
                    </Button>
                    <p className='text-gray-700'>Already have a account?  <Link className='hover:underline cursor-pointer  text-blue-900' to={'/login'}>Login</Link></p>
                    {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup