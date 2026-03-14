import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
import Filter from "../components/Filter.jsx"
import { React ,useEffect,useState} from "react"
import ProductCard from "../components/ProductCard.jsx"
import { toast } from "sonner"
import axios from "axios"

export const Products = () => {
  
  const [allProducts, setAllProducts] = useState([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/all-products`);
      if (res.data.success) {
        setAllProducts(res.data.products);
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }  
  }
  
  console.log(allProducts);
  
  useEffect(() => {
    getAllProduct();
  }, [])
  
  
  
  return <>
    <div className='pt-10 pb-10'>
      <div className="max-w-7xl mx-auto flex gap-7">
        <Filter />
        <div className="flex flex-col flex-1">
          <div className='flex justify-end mb-4'>
            <Select>
              <SelectTrigger className='w-50'>
                <SelectValue placeholder="Sort By Price "></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowtoHigh">Price: Low to High</SelectItem>
                  <SelectItem value="hightolow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
            {
              allProducts.map((product)=><ProductCard key={product._id} product={product} />)
            }
          </div>
        </div>
        
      </div>
    </div>
    
  </>
}