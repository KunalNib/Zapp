import { React } from "react"

const ProductCard = ({product}) => {
  return <>
    <div>
      {product.productName}
      {product.productDesc}
      Rs {product.productPrice}
      {product.brand}
      {product.category}
    </div>
  </>
}

export default ProductCard;