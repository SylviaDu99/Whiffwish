import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useEffect } from "react"
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import SideBar from "../../app/layout/SideBar";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);

    useEffect(() => {
      agent.Catalog.list()
        if(!productsLoaded) dispatch(fetchProductsAsync())
        
    },[productsLoaded, dispatch])

    useEffect(() => {
        if(!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message="Fetching Posts..."/>
    return (
        <>
            <Header />
            <Gallery />
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