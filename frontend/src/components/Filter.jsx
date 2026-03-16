import { React } from "react"
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Button } from "./ui/button";

const Filter = ({ allProducts ,priceRange}) => {
  
  const Categories = allProducts.map(product => product.category);
  const uniqueCategory = ["All", ...new Set(Categories)];
  const Brands = allProducts.map(product => product.brand);
  const uniqueBrands = ["All", ...new Set(Brands)];
  return(
  <>
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64'>
      <Input type="text" placeholder="Search..." className="bg-white p-2 rounded-md border-gray-400 border-2 w-full" />
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className=" flex flex-col gap-2 mt-3">
      {
        uniqueCategory.map((Item,index)=>(
        <div key={index} className="flex items-center gap-2">
          <input type='radio'/>
          <label >{Item}</label>
        </div>
        
      ))
      }
      </div>
      <h1 className='mt-5 font-semibold text-xl'>Brands</h1>
      <div className=" flex flex-col gap-2 mt-3">
        
        <div  className="flex items-center gap-2">
          <select className='bg-white w-full p-2 border-gray-200 border-2 rounded-md'>
            {
              uniqueBrands.map((Brand,Index)=>(
                <option key={Index} >{Brand.toUpperCase()}</option>
              ))

            }
          </select>
        </div>

        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
        <div className="flex flex-col gap-2">
          <label>
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input type="number" min="0" max="5000" className="w-20 p-1 border border-gray-300 rounded"></input>
          <span>-</span>
          <input type="number" min="0" max={priceRange[1]} className="w-20 p-1 border border-gray-300 rounded"></input>
        </div>
        <input type="range" min="0" max="5000" step="100" className="w-full "></input>
        <input type="range" min="0" max={`${priceRange[1]}`} step="100" className="w-full "></input>
      </div>
      <Button className="bg-blue-600 mt-5 cursor-pointer w-full hover:bg-blue-900">Reset Filters</Button>
    </div>
  </>)
}

export default Filter;