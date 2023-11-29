import ProductList from "./ProductList"
import { useEffect } from "react"
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import SideBar from "../../app/layout/SideBar";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog);

    useEffect(() => {
      agent.Catalog.list()
        if(!productsLoaded) dispatch(fetchProductsAsync())
        
    },[productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message="Fetching Posts..."/>
    return (
        <>
            <Header />
            <Grid container spacing={3} marginLeft={1}>
                <Grid item xs={2} marginTop={10}>
                    <SideBar />
                </Grid>
                <Grid item xs={10}>
                    <ProductList products={products}/>
                </Grid>
            </Grid>
        
        </>
    )
}