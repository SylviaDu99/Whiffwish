import Gallery from "./Gallery";
import ProductList from "./ProductList"
import { useEffect } from "react"
import Header from "../../app/layout/Header";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Grid } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded} = useAppSelector(state => state.catalog);

    useEffect(() => {
      agent.Catalog.list()
        if(!productsLoaded) {
            dispatch(fetchProductsAsync())
        }
    },[productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message="Fetching Posts..."/>
    return (
        <>
            <Header />
            <Gallery />
            <Grid container spacing={3} marginLeft={1}>
                <Grid item xs={2} marginTop={10}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{boxShadow:"none", borderRadius:"16px", color:"#333333"}}
                    startIcon={<CreateIcon />}
                >
                    Create a post
                </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth 
                        style={{ marginTop: '15px' }}
                        sx={{boxShadow:"none", borderRadius:"16px", color:"#333333"}}
                        startIcon={<StorefrontIcon />}
                    >
                        Sell an item
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <ProductList products={products}/>
                </Grid>
            </Grid>
        
        </>
    )
}