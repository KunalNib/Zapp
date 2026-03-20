import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select.jsx"
import Filter from "../components/Filter.jsx"
import { React ,useEffect,useState} from "react"
import ProductCard from "../components/ProductCard.jsx"
import { toast } from "sonner"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setProduct } from "@/redux/productSlice.js"

export const Products = () => {
  const {products}=useSelector(store=>store.product);

  const [priceRange,setPriceRange]=useState([0,99999]);
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("All");
  const [brand,setBrand]=useState("All");

  const [sortOrder,setSortOrder]=useState("");
  
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/product/all-products`);
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProduct(res.data.products));
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }  
    finally {
      setLoading(false);
    }
  }
  
  console.log(allProducts);
  
  useEffect(() => {
    getAllProduct();
  }, [])

  useEffect(()=>{
    if(allProducts.length===0) return;
    let filtered=[...allProducts]
    if(search.trim()!==""){
      filtered=filtered.filter(p=>p.productName?.toLowerCase().includes(search.toLowerCase()));
    }
    if(category!=="All"){
      filtered=filtered.filter(p=>p.category===category);
    }
    if(brand!=="All"){
      filtered=filtered.filter(p=>p.brand===brand);
    }
    filtered=filtered.filter(p=>p.productPrice>=priceRange[0] && p.productPrice<=priceRange[1]);
    // setAllProducts(filtered);
    if(sortOrder==="lowtohigh"){
      filtered.sort((a,b)=>a.productPrice-b.productPrice);
    }
    else if(sortOrder==="hightolow"){
      filtered.sort((a,b)=>b.productPrice-a.productPrice);
    }
    dispatch(setProduct(filtered));


  },[brand,category,priceRange,search,sortOrder,dispatch,allProducts])
  
  
  
  return <>
    <div className='pt-10 pb-10 bg-blue-100'>
      <div className="max-w-7xl mx-auto flex gap-7">
        <Filter allProducts={allProducts} priceRange={priceRange} setPriceRange={setPriceRange} search={search} setSearch={setSearch} category={category} setCategory={setCategory} brand={brand} setBrand={setBrand}/>
        <div className="flex flex-col flex-1">
          <div className='flex justify-end mb-4'>
            <Select onValueChange={(value)=>setSortOrder(value)}>
              <SelectTrigger className='w-50'>
                <SelectValue placeholder="Sort By Price "></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                  <SelectItem value="hightolow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
            {
              products.map((product)=><ProductCard key={product._id} product={product} loading={loading} />)
            }
          </div>
        </div>
        
      </div>
    </div>
    
  </>
}