import { React } from "react"
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";



const ProductCard = ({ product,loading }) => {
  const { productImg, productPrice, productName } = product;
  const productId=product._id;

  const accessToken=localStorage.getItem("accessToken");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const addToCart=async()=>{
    try{
        const res= await axios.post("http://localhost:8000/api/cart/add",{productId},{
          headers: {
          Authorization: `Bearer ${accessToken}`,
        }, 
        })
        if(res.data.success){
          toast.success(res.data.message);
          console.log(res.data.cart);
          dispatch(setCart(res.data.cart));

        }else{
          toast.error(res.data.message);
        }
    }
    catch(error){
      console.log(error);
    }
  }



  return <>
    <div className='shadow-lg rounded-lg overflow-hidden h-max' >
      <div className='w-full h-full aspect-square  overflow-hidden'>
        {
          loading? <Skeleton  className='w-full h-full rounded-lg'/>:<img src={productImg[0]?.url} className=' w-full h-full transition-transform duration-300 hover:scale-105'></img>
        }
        
      </div>
      {
        loading ?
        <div className='px-2 space-y-2 my-2'>
          <Skeleton className='w[200px] h-4' />
          <Skeleton className='w[100px] h-4' />
          <Skeleton className='w[150px] h-8'/>
        </div>
          : <div className='px-2 space-y-1'>
            <h1 className='font-semibold h-12 line-clamp-2e-clamp-2'>{productName}</h1>
            <h2 className='font-bold'>₹{productPrice}</h2>
            <Button onClick={()=> addToCart()} className='bg-blue-600 mb-3 w-full hover:bg-blue-900'><ShoppingCart />Add to Cart</Button>
          </div>
      }
      
    </div>
  </>
}

export default ProductCard;