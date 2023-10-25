import { Container } from "react-bootstrap";
import { Product } from "../../app/models/product"
import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useState, useEffect } from "react"
import Header from "../../app/layout/Header";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    },[])
  
    return (
        <>
            <Header />
            <Gallery />
            
            <ProductList products={products}/>
        
        </>
    )
}