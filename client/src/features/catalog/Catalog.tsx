import { Product } from "../../app/models/product"
import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useState, useEffect } from "react"
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      agent.Catalog.list().then(products => setProducts(products))
    },[])
  
    return (
        <>
            <Header />
            <Gallery />
            
            <ProductList products={products}/>
        
        </>
    )
}