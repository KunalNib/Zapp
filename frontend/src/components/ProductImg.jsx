import React from 'react'

const ProductImg = ({images}) => {
  return (
    <div className='flex gap-5 w-max'>
        <div className='gap-5 flex flex-col'>
            {
                images.map((img)=>{
                    return <img src={img.url} className='cursor-pointer  w-20  h-20 border shadow-lg rounded-md'></img>
                })
            }
        </div>
    </div>
  )
}

export default ProductImg