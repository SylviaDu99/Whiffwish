import { Product } from "../../app/models/product"
import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useState, useEffect } from "react"
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    },[])

    if (loading) return <LoadingComponent message="Fetching Posts..."/>
    return (
        <>
            <Header />
            <Gallery />
            
            <ProductList products={products}/>
        
        </>
    )
}