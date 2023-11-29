import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useEffect } from "react"
import Header from "../../app/layout/Header";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import SideBar from "../../app/layout/SideBar";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, types, brands } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())

    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message="Fetching Posts..." />
    return (
        <>
            <Header />
            <Gallery />
            <Grid container spacing={3} marginLeft={1} marginTop={2}>
                <Grid item xs={2} marginTop={6.6}>
                    <SideBar />
                </Grid>

                <Grid item xs={10}>
                    {/* Tag Buttons */}
                    <Grid container spacing={1} marginBottom={2}>
                        <Grid item>
                            <Button variant="text">Recommended</Button>
                        </Grid>
                        {types.map((type) => (
                            <Grid item>
                                <Button variant="text">{type}</Button>
                            </Grid>
                        ))}
                        {brands.map((brand) => (
                            <Grid item>
                                <Button variant="text">{brand}</Button>
                            </Grid>
                        ))}
                    </Grid>
                    {/* Product List */}
                    <ProductList products={products} />
                </Grid>
            </Grid>

        </>
    )
}